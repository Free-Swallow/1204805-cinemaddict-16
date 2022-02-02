import MainNavView from '../view/main-nav-view.js';
import {render, RenderPosition, replace, remove} from '../utils/renderTemplate.js';
import {checkFilter} from '../utils/utils.js';
import {FilterType, UpdateType, MenuItem} from '../utils/constanta';

class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #moviesModel = null;

  #filterComponent = null;
  #handleSiteMenuClick;

  constructor(filterContainer, filterModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;
    // this.#handleSiteMenuClick = callback;


  }

  get filter() {
    const movies = this.#moviesModel.movies;

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        number: checkFilter[FilterType.ALL](movies).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        number: checkFilter[FilterType.WATCHLIST](movies).length,
      },
      {
        type: FilterType.WATCHED,
        name: 'History',
        number: checkFilter[FilterType.WATCHED](movies).length,
      },
      {
        type: FilterType.FAVORITE,
        name: 'Favorites',
        number: checkFilter[FilterType.FAVORITE](movies).length,
      },
    ];
  }

  init = () => {
    const filters = this.filter;
    const prevFilterComponent = this.#filterComponent;
    const currentFilter = this.#filterModel.checkView === MenuItem.FILMS ? this.#filterModel.filter : null;

    this.#filterComponent = new MainNavView(filters, currentFilter, this.#filterModel.checkView);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    // this.#filterComponent.setMenuClickHandler(this.#handleSiteMenuClick);

    this.#moviesModel.addObservable(this.#handleModelEvent);
    this.#filterModel.addObservable(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;

    this.#moviesModel.removeObservable(this.#handleModelEvent);
    this.#filterModel.removeObservable(this.#handleModelEvent);

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

export default FilterPresenter;
