import {createElement} from '../renderTemplate.js';

const createFilmsListEmptyTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

class FilmsListEmptyView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsListEmptyTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default FilmsListEmptyView;
