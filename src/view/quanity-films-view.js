import AbstractView from './abstract-view.js';

const createMovieCounterTemplate = (data) => {
  let quantityFilms = '130 291';

  if (data.length === 0) {
    quantityFilms = '0';
  }

  return `<p>${quantityFilms} movies inside</p>`;
};

class QuantityFilmsView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createMovieCounterTemplate(this.#data);
  }
}

export default QuantityFilmsView;
