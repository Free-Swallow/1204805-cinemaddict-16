import SmartView from './smart-view.js';
import CommentView from './comment-view.js';
import {render, RenderPosition} from '../utils/renderTemplate';

const createPopupFilmTemplate = (data) => {
  const {
    name,
    director,
    writers,
    actors,
    releaseYear,
    releaseMonthDay,
    runtime,
    country,
    kind,
    ageRating,
    emotionTarget,
    rating,
    description,
    comments,
    isFavorite,
    isWatched,
    isBookmark,
    message,
    poster,
  } = data;

  const setButtonStatus = (type) => type !== false ? 'film-details__control-button--active'
    : '';

  const listKind = [];

  for (let i = 0; i < kind.length; i++) {
    const current = kind[i];
    const template = `<span class="film-details__genre">${current}</span>`;
    listKind.push(template);
  }

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${name}</h3>
              <p class="film-details__title-original">Original: ${name}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseMonthDay} ${releaseYear}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${listKind.join('')}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${setButtonStatus(isBookmark)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${setButtonStatus(isWatched)}  film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${setButtonStatus(isFavorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${emotionTarget ? `<img src="./images/emoji/${emotionTarget}.png" width="55" height="55" alt="emoji-${emotionTarget}">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">
            ${message ? message : ''}
</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

class PopupFilmView extends SmartView {

  constructor(data) {
    super();
    this._data = PopupFilmView.parseCommentToData(data);

    this.#setInnerHandlers();
    this.#renderComment(this._data.comments);
  }

  get template() {
    return createPopupFilmTemplate(this._data);
  }

  #renderComment = (list) => {
    const popupListCommentNode = this.element.querySelector('.film-details__comments-list');

    for (const item of list) {
      const commentComponent = new CommentView(item);
      render(popupListCommentNode, commentComponent, RenderPosition.BEFOREEND);
    }
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setOpenPopupHandler(this._callback.openPopup);
    this.setPopupWatchlistHandler( this._callback.watchlistClick);
    this.setPopupWatchedHandler(this._callback.watchedClick);
    this.setPopupFavoriteHandler(this._callback.favoriteClick);
    this.#renderComment(this._data.comments);
  }

  setOpenPopupHandler = (callback) => {
    this._callback.openPopup = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#openClickHandler);
  }

  setPopupWatchlistHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#popupWatchClickHandler);
  }

  setPopupWatchedHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#popupWatchedClickHandler);
  }

  setPopupFavoriteHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#popupFavoriteClickHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#changeEmojiHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#descriptionInputHandler);
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPopup();
  }

  #popupWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #popupWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  #popupFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #changeEmojiHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      emotionTarget: evt.target.value,
    }, false);
  }

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      message: evt.target.value,
    }, true);
  }

  static parseCommentToData = (data) => ({
    ...data,
    emotionTarget: false,
    message: '',
  });

  // static parseDataToComment = (data) => {
  //   const comment = { ...data };
  //
  //   if (!comment) {
  //     comment.conditionEmoji = null;
  //   }
  //
  //   delete comment.conditionEmoji;
  //
  //   return comment;
  // }
}

export default PopupFilmView;
