import {createElement} from '../renderTemplate.js';

const createListFilmsContainerTemplate = () => (
  `<div class="films-list__container">
  </div>`
);

class ListFilmsContainerView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createListFilmsContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default ListFilmsContainerView;
