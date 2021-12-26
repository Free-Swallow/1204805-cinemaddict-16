import AbstractView from './abstract-view.js';

const createListFilmsContainerTemplate = () => (
  `<div class="films-list__container">
  </div>`
);

class ListFilmsContainerView extends AbstractView {
  get template() {
    return createListFilmsContainerTemplate();
  }
}

export default ListFilmsContainerView;
