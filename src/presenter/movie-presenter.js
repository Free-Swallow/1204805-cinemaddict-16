import CardView from '../view/card-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import {remove, render, RenderPosition, replace} from '../utils/renderTemplate.js';
import {KeysClose, POPUP_SCROLL, UpdateType, UserAction} from '../utils/constanta.js';

class MoviePresenter {
  #movieListContainer = null;
  #movieComponent = null;
  #popupComponent = null;
  #movie = null;
  #boardContainer = document.querySelector('body');
  #changeData = null;
  #currentScroll = POPUP_SCROLL;
  #commentModal = null;

  constructor(movieListContainer, changeData, commentsModel) {
    this.#movieListContainer = movieListContainer;
    this.#changeData = changeData;
    this.#commentModal = commentsModel;
  }

  #getCurrentScrollPopup = () => {
    const popupCloseScroll = document.querySelector('.film-details');
    const valueScroll = () => {
      this.#currentScroll = popupCloseScroll.scrollTop;
    };
    popupCloseScroll.addEventListener('scroll', valueScroll);
  }

  #setCurrentScrollPopup = () => {
    const popup = document.querySelector('.film-details');
    popup.scrollTo(0, this.#currentScroll);
  }

  #scrollBundle = () => {
    this.#getCurrentScrollPopup();
    this.#setCurrentScrollPopup();
  }

  init = (dataMovie) => {
    this.#movie = dataMovie;

    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupFilmView(this.#movie, this.#commentModal);
    this.#movieComponent = new CardView(this.#movie);

    this.#movieComponent.setWatchlistHandler(this.#handlerWatchlistClick);
    this.#movieComponent.setWatchedHandler(this.#handlerWatchedClick);
    this.#movieComponent.setFavoriteHandler(this.#handlerFavoriteClick);

    this.#popupComponent.setPopupWatchlistHandler(this.#handlerPopupWatchlistClick);
    this.#popupComponent.setPopupWatchedHandler(this.#handlerPopupWatchedClick);
    this.#popupComponent.setPopupFavoriteHandler(this.#handlerPopupFavoriteClick);
    this.#popupComponent.setDeleteClickHandler(this.#handleDeleteClick);

    this.#movieComponent.setClickHandler(() => {
      this.#closeOtherPopup();
      this.#renderPopup(this.#movie, this.#popupComponent);
      this.#scrollBundle();
    });

    if (prevMovieComponent === null || prevPopupComponent === null) {
      render(this.#movieListContainer, this.#movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#movieListContainer.element.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (this.#movieListContainer.element.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  }

  #renderPopup = (card, popup) => {
    this.#boardContainer.classList.add('hide-overflow');

    const onRemovePopup = () => {
      remove(popup);
      this.#currentScroll = POPUP_SCROLL;
      this.#boardContainer.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onCloseKey);
    };

    function onCloseKey(evt) {
      if (evt.key === KeysClose.ESC || evt.key === KeysClose.ESCAPE) {
        evt.preventDefault();
        onRemovePopup();
      }
    }

    render(this.#boardContainer, popup, RenderPosition.BEFOREEND);

    document.addEventListener('keydown', onCloseKey);
    popup.setOpenPopupHandler(() => {
      onRemovePopup();
    });
  }

  #closeOtherPopup = () => {
    remove(this.#boardContainer.querySelector('.film-details'));
  }

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  }

  #handlerWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isBookmark: !this.#movie.isBookmark}
    );
  }

  #handlerWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isWatched: !this.#movie.isWatched}
    );
  }

  #handlerFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isFavorite: !this.#movie.isFavorite}
    );
  }

  #handlerPopupWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isBookmark: !this.#movie.isBookmark}
    );
    this.#renderPopup(this.#movie, this.#popupComponent);
    this.#scrollBundle();
  }

  #handlerPopupWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isWatched: !this.#movie.isWatched}
    );
    this.#renderPopup(this.#movie, this.#popupComponent);
    this.#scrollBundle();
  }

  #handlerPopupFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, isFavorite: !this.#movie.isFavorite}
    );
    this.#renderPopup(this.#movie, this.#popupComponent);
    this.#scrollBundle();
  }

  #handleDeleteClick = (movie) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      movie,
    );
    this.#renderPopup(this.#movie, this.#popupComponent);
    this.#scrollBundle();
  }
}

export default MoviePresenter;
