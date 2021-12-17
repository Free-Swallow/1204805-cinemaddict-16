import {createElement} from '../renderTemplate.js';

const createFilterItem = (film, isChecked) => {
  const {name, number} = film;

  return (
    `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count" ${isChecked ? 'checked' : ''}
    ${number === 0 ? 'disabled' : ''}>${number}</span></a>`
  );
};

const createMainNavTemplate = (data) => {
  const filterItem = data
    .map((filter, index) => createFilterItem(filter, index === 0))
    .join('');
  return `<div class="main-navigation__items">
       <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
       ${filterItem}
     </div>`;
};

class MainNavView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMainNavTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}

export default MainNavView;
