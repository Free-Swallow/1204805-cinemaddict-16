import AbstractView from './abstract-view.js';

const createFilterTemplate = () => (
  `<nav class="main-navigation">
     <a href="#stats" class="main-navigation__additional">Stats</a>
   </nav>`
);

class MainMenuView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}

export default MainMenuView;
