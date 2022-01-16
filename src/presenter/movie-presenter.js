import CardView from '../view/card-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import CommentView from '../view/comment-view.js';
import {remove, render, RenderPosition, replace} from '../utils/renderTemplate.js';

const KeysClose = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

class MoviePresenter {
  #movieListContainer = null;
  #movieComponent = null;
  #popupComponent = null;
  #movie = null;
  #boardContainer = document.querySelector('body');
  #changeData = null;

  constructor(movieListContainer, changeData) {
    this.#movieListContainer = movieListContainer;
    this.#changeData = changeData;
  }

  init = (dataMovie) => {
    this.#movie = dataMovie;

    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupFilmView(this.#movie);
    this.#movieComponent = new CardView(this.#movie);

    this.#movieComponent.setWatchlistHandler(this.#handlerWatchlistClick);
    this.#movieComponent.setWatchedHandler(this.#handlerWatchedClick);
    this.#movieComponent.setFavoriteHandler(this.#handlerFavoriteClick);

    this.#popupComponent.setPopupWatchlistHandler(this.#handlerPopupWatchlistClick);
    this.#popupComponent.setPopupWatchedHandler(this.#handlerPopupWatchedClick);
    this.#popupComponent.setPopupFavoriteHandler(this.#handlerPopupFavoriteClick);

    this.#movieComponent.setClickHandler(() => {
      this.#closeOtherPopup();
      this.#renderPopup(this.#movie, this.#popupComponent);
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

  #renderComment = (list) => {
    const popupListCommentNode = this.#boardContainer.querySelector('.film-details__comments-list');

    for (const item of list) {
      const commentComponent = new CommentView(item);
      render(popupListCommentNode, commentComponent, RenderPosition.BEFOREEND);
    }
  };

  #renderPopup = (card, popup) => {
    this.#boardContainer.classList.add('hide-overflow');

    const onRemovePopup = () => {
      remove(popup);
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

    this.#renderComment(card.comments);
  }

  #closeOtherPopup = () => {
    remove(this.#boardContainer.querySelector('.film-details'));
  }

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  }

  #handlerWatchlistClick = () => {
    this.#changeData({...this.#movie, isBookmark: !this.#movie.isBookmark});
  }

  #handlerWatchedClick = () => {
    this.#changeData({...this.#movie, isWatched: !this.#movie.isWatched});
  }

  #handlerFavoriteClick = () => {
    this.#changeData({...this.#movie, isFavorite: !this.#movie.isFavorite});
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  #handlerPopupWatchlistClick = () => {
    this.#changeData({...this.#movie, isBookmark: !this.#movie.isBookmark});
    this.#renderPopup(this.#movie, this.#popupComponent);
  }

  #handlerPopupWatchedClick = () => {
    this.#changeData({...this.#movie, isWatched: !this.#movie.isWatched});
    this.#renderPopup(this.#movie, this.#popupComponent);
  }

  #handlerPopupFavoriteClick = () => {
    this.#changeData({...this.#movie, isFavorite: !this.#movie.isFavorite});
    this.#renderPopup(this.#movie, this.#popupComponent);
  }
}

export default MoviePresenter;
