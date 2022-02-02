import SmartView from './smart-view.js';
import {getTimeFromMins} from '../utils/utils.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

const createCommentTemplate = (comment) => {
  const {textComment, date, author, conditionEmoji, id} = comment;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${conditionEmoji}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${textComment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date).fromNow()}</span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const renderComment = (list) => list.length ? list.map((item) => createCommentTemplate(item)).join('') : '';

const createPopupFilmTemplate = (data, commentsModel) => {
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
    originalName,
    comments,
    isFavorite,
    releaseDate,
    isWatched,
    isBookmark,
    message,
    poster,
  } = data;
  const convertTime = getTimeFromMins(runtime);
  const listKind = [];

  const setButtonStatus = (type) => type !== false ? 'film-details__control-button--active'
    : '';

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
              <p class="film-details__title-original">Original: ${originalName}</p>
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
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(releaseDate).format('D MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${convertTime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${kind.join(', ')}
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
        ${renderComment(commentsModel)}
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
  #comments = null;

  constructor(data, comments) {
    super();
    this._data = PopupFilmView.parseCommentToData(data);
    this.#comments = comments;

    this.#setInnerHandlers();
  }

  get template() {
    return createPopupFilmTemplate(this._data, this.#comments.comments);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setOpenPopupHandler(this._callback.openPopup);
    this.setPopupWatchlistHandler( this._callback.watchlistClick);
    this.setPopupWatchedHandler(this._callback.watchedClick);
    this.setPopupFavoriteHandler(this._callback.favoriteClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
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

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#deleteClickHandler);
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

  #deleteClickHandler = (evt) => {
    const  commentId = evt.target.dataset.commentId;
    const index = this.#comments.comments.findIndex((comment) => comment.id === commentId);
    if (evt.target.classList.contains('film-details__comment-delete')) {
      evt.preventDefault();
      if (index === -1) {
        throw new Error('Can\'t delete unexisting comment');
      }
      alert('deleteClickHandler - Работает.');
      console.log(commentId);
      this._callback.deleteClick(PopupFilmView.parseDataToComment(this._data));
    }
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

  static parseDataToComment = (data) => {
    const comment = { ...data };

    if (!comment) {
      comment.conditionEmoji = null;
    }

    delete comment.conditionEmoji;

    return comment;
  }
}

export default PopupFilmView;
