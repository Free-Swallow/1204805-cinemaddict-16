import {createElement} from '../renderTemplate.js';

const createMovieCounterTemplate = (data) => {
  let quantityFilms = '130 291';

  if (data.length === 0) {
    quantityFilms = '0';
  }

  return `<p>${quantityFilms} movies inside</p>`;
};

class QuantityFilmsView {
  #element = null;
  #data = null;

  constructor(data) {
    this.#data = data;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMovieCounterTemplate(this.#data);
  }

  removeElement() {
    this.#element = null;
  }
}

export default QuantityFilmsView;
