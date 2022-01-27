import MainMenuView from '../view/main-menu-view.js';
import SortListView from '../view/sort-list-view.js';
import MainNavView from '../view/main-nav-view.js';
import UserRatingView from '../view/user-rating-view.js';
import ListFilmsView from '../view/list-films-view';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import ListFilmsContainerView from '../view/list-films-container-view.js';
import ListFilmsTopView from '../view/list-films-top-view.js';
import ListFilmsCommentView from '../view/list-films-comment-view.js';
import ListFilmsTitleView from '../view/list-films-title-view.js';
import ListFilmsEmptyView from '../view/list-films-empty-view.js';
import MoviePresenter from './movie-presenter.js';
import {RenderPosition, render, remove} from '../utils/renderTemplate.js';
import {getNumberFilter} from '../mock/filter.js';
import {bySort} from '../utils/utils.js';
import {
  QUANTITY_CREATE_CARDS_STEP,
  QUANTITY_CREATE_CARDS_START,
  QUANTITY_CREATE_CARDS_EXTRA,
  UpdateType,
  UserAction
} from '../utils/constanta.js';
import {SortType} from '../view/sort-list-view.js';

class BoardPresenter {
  #boardContainer = null;
  #moviesModel = null;

  #mainMenuComponent = new MainMenuView();
  #listFilmsComponent = new ListFilmsView();
  #sortListComponent = null;
  #emptyListComponent = null;
  #listFilmsTitle = new ListFilmsTitleView();
  #listFilmsContainerComponent = new ListFilmsContainerView();
  #topBlockContainer = new ListFilmsContainerView();
  #commentBlockContainer = new ListFilmsContainerView();
  #userRatingComponent = new UserRatingView();
  #buttonShowMoreComponent = null;
  #listFilmsTop = new ListFilmsTopView();
  #listFilmsComment = new ListFilmsCommentView();
  #movieKeys = new Map();
  #showMoreFilms = QUANTITY_CREATE_CARDS_STEP;
  #currentTypeSort = SortType.DEFAULT;

  constructor(boardContainer, moviesModel) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObservable(this.#handleModelEvent);
  }

  // Обёртка для получения списка фильмов модели
  get movies() {
    switch (this.#currentTypeSort) {
      case SortType.DATE:
        return [...this.#moviesModel.movies].sort(bySort('releaseYear'));
      case SortType.RATING:
        return [...this.#moviesModel.movies].sort(bySort('rating'));
    }
    return this.#moviesModel.movies;
  }

  init = () => {
    this.headerNode = this.#boardContainer.querySelector('.header');
    this.mainNode = this.#boardContainer.querySelector('.main');

    render(this.mainNode, this.#mainMenuComponent, RenderPosition.AFTERBEGIN);
    render(this.mainNode, this.#listFilmsComponent, RenderPosition.BEFOREEND);

    this.mainMenuNode = this.#boardContainer.querySelector('.main-navigation');
    this.filmsNode = this.#boardContainer.querySelector('.films');
    this.filmsListNode = this.filmsNode.querySelector('.films-list');

    this.#renderMainNav();
    this.#renderPage();
  }

  #handlerMovieChange = (updateMovie) => {
    // Здесь будем вызывать обновление модели
    this.#movieKeys.get(updateMovie.id).init(updateMovie);
  }

  #handleViewChange = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (UpdateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда удалили комментарий)
        this.#movieKeys.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда фильм добавили в избранное)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentTypeSort === sortType) {
      return;
    }

    this.#currentTypeSort = sortType;
    this.#clearMovieList();
    this.#renderMainBlockFilms();
    // this.#renderExtraBlock();
  }

  #renderMainNav = () => {
    const getFilterArray = getNumberFilter(this.movies);
    const mainNavComponent = new MainNavView(getFilterArray);
    render(this.mainMenuNode, mainNavComponent, RenderPosition.AFTERBEGIN);
  }

  #renderCardFilm = (cardContainer, card) => {
    const moviePresenter = new MoviePresenter(cardContainer, this.#handleViewChange);
    moviePresenter.init(card);
    this.#movieKeys.set(card.id, moviePresenter);
  }

  // Очитска списка карточек и удаление кнопки показать больше
  #clearMovieList = () => {
    this.#movieKeys.forEach((presenter) => presenter.destroy());
    this.#movieKeys.clear();
    this.#showMoreFilms = QUANTITY_CREATE_CARDS_STEP;
    remove(this.#buttonShowMoreComponent);
  }

  // Метод очитски доски
  #clearBoard = ({resetRenderMovieCount = false, resetSortType = false} = {}) => {
    const movieCount = this.movies.length;

    this.#moviesModel.forEach((presenter) => presenter.destroy());
    this.#movieKeys.clear();

    remove(this.#sortListComponent);
    remove(this.#emptyListComponent);
    remove(this.#buttonShowMoreComponent);

    if (resetRenderMovieCount) {
      this.#showMoreFilms = QUANTITY_CREATE_CARDS_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#showMoreFilms = Math.min(movieCount, this.#showMoreFilms);
    }

    if (resetSortType) {
      this.#currentTypeSort = SortType.DEFAULT;
    }
  }

  // Отрисовка списка сортировки
  #renderSortList = () => {
    this.#sortListComponent = new SortListView(this.#currentTypeSort);
    render(this.mainMenuNode, this.#sortListComponent, RenderPosition.AFTEREND);
    this.#sortListComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  }

  // Отрисовка пустого списка
  #renderEmptyList = () => {
    this.#emptyListComponent = new ListFilmsEmptyView();
    render(this.filmsListNode, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  // Отрисовк скрытого поля тайтл
  #renderFilmsTitle = () => {
    render(this.filmsListNode, this.#listFilmsTitle, RenderPosition.BEFOREEND);
  }

  Отрисовка
  #renderButtonShowMore = () => {
    this.#buttonShowMoreComponent = new ButtonShowMoreView();
    const movieCount = this.movies.length;
    const filmsListWrapperNode = this.filmsListNode.querySelector('.films-list__container');
    if (filmsListWrapperNode.children.length < movieCount) {
      render(this.filmsListNode, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);

      this.#buttonShowMoreComponent.setDownloadMoreHandler(() => {
        this.movies
          .slice(this.#showMoreFilms, this.#showMoreFilms + QUANTITY_CREATE_CARDS_STEP)
          .forEach((films) =>  this.#renderCardFilm(this.#listFilmsContainerComponent, films));

        this.#showMoreFilms += QUANTITY_CREATE_CARDS_STEP;

        if (filmsListWrapperNode.children.length >= movieCount) {
          remove(this.#buttonShowMoreComponent);
        }
      });
    }
  }

  #renderCardsFilms = (quantity, container, object) => {
    for (let i = 0; i < quantity; i++) {
      this.#renderCardFilm(container, object[i]);
    }
  }

  #renderMainBlockFilms = () => {
    render(this.filmsListNode, this.#listFilmsContainerComponent, RenderPosition.BEFOREEND);

    this.#renderCardsFilms(
      Math.min(this.movies.length, QUANTITY_CREATE_CARDS_START),
      this.#listFilmsContainerComponent,
      this.movies
    );
    this.#renderButtonShowMore();
  }

  #renderTopBlock = () => {
    const movieCount = this.movies.length;
    const sortFilmsRating =   this.movies.slice(0, movieCount).sort(bySort('rating'));
    render(this.filmsNode, this.#listFilmsTop, RenderPosition.BEFOREEND);
    render(this.#listFilmsTop, this.#topBlockContainer, RenderPosition.BEFOREEND);

    this.#renderCardsFilms(
      Math.min(movieCount, QUANTITY_CREATE_CARDS_EXTRA),
      this.#topBlockContainer,
      sortFilmsRating
    );
  }

  #renderCommentBlock = () => {
    const movieCount = this.movies.length;
    const sortFilmsComments = this.movies.slice(0, movieCount).sort(bySort('comments'));
    render(this.filmsNode, this.#listFilmsComment, RenderPosition.BEFOREEND);
    render(this.#listFilmsComment, this.#commentBlockContainer, RenderPosition.BEFOREEND);

    this.#renderCardsFilms(
      Math.min(movieCount, QUANTITY_CREATE_CARDS_EXTRA),
      this.#commentBlockContainer,
      sortFilmsComments
    );
  }

  #renderExtraBlock = () => {
    this.#renderTopBlock();
    this.#renderCommentBlock();
  }

  #renderUserRating = () => {
    render(this.headerNode, this.#userRatingComponent, RenderPosition.BEFOREEND);
  }

  #renderPage = () => {
    if (this.movies.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSortList();
      this.#renderFilmsTitle();
      this.#renderMainBlockFilms();
      // this.#renderExtraBlock();
      this.#renderUserRating();
    }
  }
}

export default BoardPresenter;
