import {createElement} from '../renderTemplate.js';

const createCommentListTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
);

class ListFilmsCommentView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createCommentListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default ListFilmsCommentView;

