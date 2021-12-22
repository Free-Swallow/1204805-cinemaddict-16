import {createElement} from '../renderTemplate.js';

const createFilmsTitleTemplate = () => (
  '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
);

class FilmsTitleView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsTitleTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default FilmsTitleView;
