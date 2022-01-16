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
import {bySort, updateItem} from '../utils/utils.js';

const QUANTITY_CREATE_CARDS_START = 5;
const QUANTITY_CREATE_CARDS_STEP = 5;
const QUANTITY_CREATE_CARDS_EXTRA = 2;

class BoardPresenter {
  #boardContainer = null;

  #mainMenuComponent = new MainMenuView();
  #listFilmsComponent = new ListFilmsView();
  #sortListComponent = new SortListView();
  #emptyListComponent = new ListFilmsEmptyView();
  #listFilmsTitle = new ListFilmsTitleView();
  #listFilmsContainerComponent = new ListFilmsContainerView();
  #topBlockContainer = new ListFilmsContainerView();
  #commentBlockContainer = new ListFilmsContainerView();
  #userRatingComponent = new UserRatingView();
  #buttonShowMoreComponent = new ButtonShowMoreView();
  #listFilmsTop = new ListFilmsTopView();
  #listFilmsComment = new ListFilmsCommentView();
  #movieKeys = new Map();
  #showMoreFilms = QUANTITY_CREATE_CARDS_STEP;

  #boardFilms = [];

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (boardFilms) => {
    this.#boardFilms = [...boardFilms];

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
    this.#boardFilms = updateItem(this.#boardFilms, updateMovie);
    this.#movieKeys.get(updateMovie.id).init(updateMovie);
  }

  #renderMainNav = () => {
    const getFilterArray = getNumberFilter(this.#boardFilms);
    const mainNavComponent = new MainNavView(getFilterArray);
    render(this.mainMenuNode, mainNavComponent, RenderPosition.AFTERBEGIN);
  }

  #renderCardFilm = (cardContainer, card) => {
    const moviePresenter = new MoviePresenter(cardContainer, this.#handlerMovieChange);
    moviePresenter.init(card);
    this.#movieKeys.set(card.id, moviePresenter);
  }

  #clearMovieList = () => {
    this.#movieKeys.forEach((presenter) => presenter.destroy());
    this.#movieKeys.clear();
    this.#showMoreFilms = QUANTITY_CREATE_CARDS_STEP;
    remove(this.#buttonShowMoreComponent);
  }

  #renderSortList = () => {
    render(this.mainMenuNode, this.#sortListComponent, RenderPosition.AFTEREND);
  }

  #renderEmptyList = () => {
    render(this.filmsListNode, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsTitle = () => {
    render(this.filmsListNode, this.#listFilmsTitle, RenderPosition.BEFOREEND);
  }

  #renderButtonShowMore = () => {
    const filmsListWrapperNode = this.filmsListNode.querySelector('.films-list__container');
    if (filmsListWrapperNode.children.length < this.#boardFilms.length) {
      render(this.filmsListNode, this.#buttonShowMoreComponent, RenderPosition.BEFOREEND);

      this.#buttonShowMoreComponent.setDownloadMoreHandler(() => {
        this.#boardFilms
          .slice(this.#showMoreFilms, this.#showMoreFilms + QUANTITY_CREATE_CARDS_STEP)
          .forEach((films) =>  this.#renderCardFilm(this.#listFilmsContainerComponent, films));

        this.#showMoreFilms += QUANTITY_CREATE_CARDS_STEP;

        if (filmsListWrapperNode.children.length >= this.#boardFilms.length) {
          remove(this.#buttonShowMoreComponent);
        }
      });
    }
  }

  #renderMainBlockFilms = () => {
    render(this.filmsListNode, this.#listFilmsContainerComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(this.#boardFilms.length, QUANTITY_CREATE_CARDS_START); i++) {
      this.#renderCardFilm(this.#listFilmsContainerComponent, this.#boardFilms[i]);
    }

    this.#renderButtonShowMore();
  }

  #renderTopBlock = () => {
    const sortFilmsRating =  this.#boardFilms.slice(0, this.#boardFilms.length).sort(bySort('rating'));
    render(this.filmsNode, this.#listFilmsTop, RenderPosition.BEFOREEND);
    render(this.#listFilmsTop, this.#topBlockContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
      this.#renderCardFilm(this.#topBlockContainer, sortFilmsRating[i]);
    }
  }

  #renderCommentBlock = () => {
    const sortFilmsComments = this.#boardFilms.slice(0, this.#boardFilms.length).sort(bySort('comments'));
    render(this.filmsNode, this.#listFilmsComment, RenderPosition.BEFOREEND);
    render(this.#listFilmsComment, this.#commentBlockContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
      this.#renderCardFilm(this.#commentBlockContainer, sortFilmsComments[i]);
    }
  }

  #renderExtraBlock = () => {
    this.#renderTopBlock();
    this.#renderCommentBlock();
  }

  #renderUserRating = () => {
    render(this.headerNode, this.#userRatingComponent, RenderPosition.BEFOREEND);
  }

  #renderPage = () => {
    if (this.#boardFilms.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSortList();
      this.#renderFilmsTitle();
      this.#renderMainBlockFilms();
      this.#renderExtraBlock();
      this.#renderUserRating();
    }
  }
}

export default BoardPresenter;
