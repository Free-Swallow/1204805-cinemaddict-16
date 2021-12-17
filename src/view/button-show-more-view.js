import {createElement} from '../renderTemplate.js';

const createButtonShowMoreTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

class ButtonShowMoreView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createButtonShowMoreTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default ButtonShowMoreView;
