import {createElement} from '../renderTemplate.js';

const createListFilmsTemplate = () => (
  `<section class="films">
    <section class="films-list">

    </section>
  </section>`
);

class ListFilmsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createListFilmsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default ListFilmsView;
