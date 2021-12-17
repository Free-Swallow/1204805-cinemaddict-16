import {createElement} from '../renderTemplate.js';

const createMovieCounterTemplate = () => (
  '<p>130 291 movies inside</p>'
);

class MovieCounterView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMovieCounterTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default MovieCounterView;
