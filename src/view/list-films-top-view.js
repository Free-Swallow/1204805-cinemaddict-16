import {createElement} from '../renderTemplate.js';

const createTopListTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`
);

class TopListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTopListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default TopListView;

