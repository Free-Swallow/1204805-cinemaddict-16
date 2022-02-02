import SortListView from '../view/sort-list-view.js';
import UserRatingView from '../view/user-rating-view.js';
import ListFilmsView from '../view/list-films-view';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import ListFilmsContainerView from '../view/list-films-container-view.js';
import ListFilmsTopView from '../view/list-films-top-view.js';
import ListFilmsCommentView from '../view/list-films-comment-view.js';
import ListFilmsTitleView from '../view/list-films-title-view.js';
import ListFilmsEmptyView from '../view/list-films-empty-view.js';
import MoviePresenter from './movie-presenter.js';
import LoadingView from '../view/loading-view.js';
import {RenderPosition, render, remove} from '../utils/renderTemplate.js';
import {bySort, checkFilter} from '../utils/utils.js';
import {
  QUANTITY_CREATE_CARDS_STEP,
  QUANTITY_CREATE_CARDS_EXTRA,
  UpdateType,
  UserAction,
  FilterType
} from '../utils/constanta.js';
import {SortType} from '../view/sort-list-view.js';

class BoardPresenter {
  #boardContainer = null;
  #moviesModel = null;
  #commentModel = null;

  #listFilmsComponent = new ListFilmsView();
  #loadingComponent = new LoadingView();
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
  #renderMovieCount = QUANTITY_CREATE_CARDS_STEP;
  #currentTypeSort = SortType.DEFAULT;
  #filterModel = null;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor(boardContainer, moviesModel, filterModel, commentModel) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#commentModel = commentModel;
  }

  // Обёртка для получения списка фильмов модели
  get movies() {
    this.#filterType = this.#filterModel.filter;
    const movies = this.#moviesModel.movies;
    const filteredMovies = checkFilter[this.#filterType](movies);
    switch (this.#currentTypeSort) {
      case SortType.DATE:
        return filteredMovies.sort(bySort('releaseYear'));
      case SortType.RATING:
        return filteredMovies.sort(bySort('rating'));
    }
    return filteredMovies;
  }

  init = () => {
    this.mainNode = this.#boardContainer.querySelector('.main');
    this.headerNode = this.#boardContainer.querySelector('.header');

    render(this.mainNode, this.#listFilmsComponent, RenderPosition.BEFOREEND);

    this.filmsNode = this.#boardContainer.querySelector('.films');
    this.filmsListNode = this.filmsNode.querySelector('.films-list');

    this.#moviesModel.addObservable(this.#handleModelEvent);
    this.#filterModel.addObservable(this.#handleModelEvent);

    this.#renderPage();
  }

  destroy = () => {
    this.#clearBoard({resetRenderMovieCount: true, resetSortType: true});

    remove(this.#listFilmsContainerComponent);
    remove(this.#listFilmsTitle);

    this.#moviesModel.removeObservable(this.#handleModelEvent);
    this.#filterModel.removeObservable(this.#handleModelEvent);
  }

  #handlerMovieChange = (updateMovie) => {
    // Здесь будем вызывать обновление модели
    this.#movieKeys.get(updateMovie.id).init(updateMovie);
  }

  // Метод для работы с вью
  #handleViewChange = (actionType, updateType, update) => {
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
      // case UserAction.ADD_COMMENT:
      //   this.#moviesModel.add(updateType, update);
    }
  }

  // Метод для работы с моделью
  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда удалили комментарий)
        this.#movieKeys.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда фильм добавили в избранное)
        this.#clearBoard();
        this.#renderPage();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetRenderMovieCount: true, resetSortType: true});
        this.#renderPage();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPage();
        break;
    }
  }

  // Метод для выбранного типа сортировки
  #handlerSortTypeChange = (sortType) => {
    if (this.#currentTypeSort === sortType) {
      return;
    }

    this.#currentTypeSort = sortType;
    this.#clearBoard({resetRenderMovieCount: true});
    this.#renderPage();
    // this.#renderExtraBlock();
  }

  // Отрисовка карточки фильма
  #renderCardFilm = (cardContainer, card, commentModel) => {
    const moviePresenter = new MoviePresenter(cardContainer, this.#handleViewChange, commentModel);
    moviePresenter.init(card);
    this.#movieKeys.set(card.id, moviePresenter);
  }

  // Метод очитски доски
  #clearBoard = ({resetRenderMovieCount = false, resetSortType = false} = {}) => {
    const movieCount = this.movies.length;

    this.#movieKeys.forEach((presenter) => presenter.destroy());
    this.#movieKeys.clear();

    remove(this.#sortListComponent);
    remove(this.#buttonShowMoreComponent);
    remove(this.#loadingComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetRenderMovieCount) {
      this.#renderMovieCount = QUANTITY_CREATE_CARDS_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderMovieCount = Math.min(movieCount, this.#renderMovieCount);
    }

    if (resetSortType) {
      this.#currentTypeSort = SortType.DEFAULT;
    }
  }

  // Отрисовка списка сортировки
  #renderSortList = () => {
    this.#sortListComponent = new SortListView(this.#currentTypeSort);
    render(this.mainNode, this.#sortListComponent, RenderPosition.AFTERBEGIN);
    this.#sortListComponent.setSortTypeChangeHandler(this.#handlerSortTypeChange);
  }

  // Отрисовка пустого списка
  #renderEmptyList = () => {
    this.#emptyListComponent = new ListFilmsEmptyView(this.#filterType);
    render(this.filmsListNode, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  // Отрисовка процесса загрузки
  #renderLoading = () => {
    render(this.#listFilmsComponent, this.#loadingComponent, RenderPosition.BEFOREEND);
  }

  // Отрисовк скрытого поля тайтл
  #renderFilmsTitle = () => {
    render(this.filmsListNode, this.#listFilmsTitle, RenderPosition.BEFOREEND);
  }

  // Отрисовка кнопки показать больше
  #renderButtonShowMore = () => {
    this.#buttonShowMoreComponent = new ButtonShowMoreView();
    const movieCount = this.movies.length;
    const filmsListWrapperNode = this.filmsListNode.querySelector('.films-list__container');
    if (filmsListWrapperNode.children.length < movieCount) {
      render(this.filmsListNode, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);

      this.#buttonShowMoreComponent.setDownloadMoreHandler(() => {
        this.movies
          .slice(this.#renderMovieCount, this.#renderMovieCount + QUANTITY_CREATE_CARDS_STEP)
          .forEach((films) =>  this.#renderCardFilm(this.#listFilmsContainerComponent, films, this.#commentModel));

        this.#renderMovieCount += QUANTITY_CREATE_CARDS_STEP;

        if (filmsListWrapperNode.children.length >= movieCount) {
          remove(this.#buttonShowMoreComponent);
        }
      });
    }
  }

  // Отрисовка карточек фильмов
  #renderCardsFilms = (quantity, container, object) => {
    for (let i = 0; i < quantity; i++) {
      this.#renderCardFilm(container, object[i], this.#commentModel);
    }
  }

  // Отрисовка главного блока с фильмами
  #renderMainBlockFilms = () => {
    render(this.filmsListNode, this.#listFilmsContainerComponent, RenderPosition.BEFOREEND);
  }

  // Отрисовка блока Экстра Топ
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

  // Отрисовка блока Экстра по Комментариям
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

  // Отрисовка всего блока Экстра
  #renderExtraBlock = () => {
    this.#renderTopBlock();
    this.#renderCommentBlock();
  }

  // Отрисовка блока рейтинг пользователя
  #renderUserRating = () => {
    render(this.headerNode, this.#userRatingComponent, RenderPosition.BEFOREEND);
  }

  // Отрисовка всех элементов главной страницы
  #renderPage = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const movies = this.movies;
    const movieCount = movies.length;

    if (movieCount === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSortList();
    this.#renderFilmsTitle();
    this.#renderMainBlockFilms();
    this.#renderCardsFilms(
      Math.min(movieCount, this.#renderMovieCount),
      this.#listFilmsContainerComponent,
      movies
    );
    this.#renderButtonShowMore();
    // this.#renderExtraBlock();
    this.#renderUserRating();
  }
}

export default BoardPresenter;
