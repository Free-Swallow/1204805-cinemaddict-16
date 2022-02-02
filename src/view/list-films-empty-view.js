import AbstractView from './abstract-view.js';
import {FilterType} from '../utils/constanta';

const noMoviesTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.WATCHED]: 'There are no watched movies now',
  [FilterType.FAVORITE]: 'There are no favorite movies now',
};

const createFilmsListEmptyTemplate = (filterType) => {
  const noMoviesTextValue = noMoviesTextType[filterType];

  return (
    `<h2 class="films-list__title">${noMoviesTextValue}</h2>`
  );
};

class ListFilmsEmptyView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createFilmsListEmptyTemplate(this._data);
  }
}

export default ListFilmsEmptyView;
