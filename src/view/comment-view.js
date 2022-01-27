import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const createCommentTemplate = (data) => {

  const {comment, date, author, conditionEmoji, id} = data;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${conditionEmoji}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date).fromNow()}</span>
        <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
      </p>
    </div>
  </li>`;

};

class CommentView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createCommentTemplate(this.#data);
  }
}

export default CommentView;
