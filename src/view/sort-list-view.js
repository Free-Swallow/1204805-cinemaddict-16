import AbstractView from './abstract-view.js';

const SortType = {
  DEFAULT: 'default',
  DATE: 'releaseYear',
  RATING: 'rating',
};

const createSortListTemplate = () => (
  `<ul class="sort">
   <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
   <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
   <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
   </ul>`
);

class SortListView extends AbstractView {
  get template() {
    return createSortListTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}

export default SortListView;
export {SortType};
