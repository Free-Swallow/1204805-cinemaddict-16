import AbstractView from './abstract-view.js';
import {MenuItem} from '../utils/constanta.js';

const createFilterItem = (filter, currentFilterType) => {
  const {type, name, number} = filter;

  return (
    `<a href="#${name}" data-menu-type="${name === 'All movies' ? MenuItem.FILMS : ''}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
    data-filter-type="${type}">${name}
    <span class="${name !== 'All movies' ? 'main-navigation__item-count' : ''}"
    >${name !== 'All movies' ? number : ''}</span></a>`
  );
};

const createMainNavTemplate = (data, currentFilterType) => {
  const filterItem = data
    .map((filter) => createFilterItem(filter, currentFilterType))
    .join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items" >
       ${filterItem}
     </div>
     <a href="#stats" data-menu-type="${MenuItem.STATISTICS}" class="main-navigation__additional">Stats</a>
  </nav>`;
};

class MainNavView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #checkView = null;

  constructor(filters, currentFilterType, checkView) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#checkView = checkView;
  }

  get template() {
    return createMainNavTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelector('.main-navigation__items').addEventListener('click', this.#filterTypeChangeHandler);
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuType);
  }
}

export default MainNavView;
