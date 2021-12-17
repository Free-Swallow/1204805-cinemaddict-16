import {createElement} from '../renderTemplate.js';

const createFilterTemplate = () => (
  `<nav class="main-navigation">
     <a href="#stats" class="main-navigation__additional">Stats</a>
   </nav>`
);

class MainMenuView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilterTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default MainMenuView;
