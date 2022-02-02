import AbstractObservable from '../utils/abstract-observable.js';
import {FilterType, MenuItem} from '../utils/constanta';

class FilterModel extends AbstractObservable {
  #filter = FilterType.ALL;
  #checkView = MenuItem.FILMS;

  get filter() {
    return this.#filter;
  }

  get checkView() {
    return this.#checkView;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}

export default FilterModel;
