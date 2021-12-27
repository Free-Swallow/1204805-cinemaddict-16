import AbstractView from './abstract-view.js';

const createFilmsListEmptyTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

class ListFilmsEmptyView extends AbstractView {
  get template() {
    return createFilmsListEmptyTemplate();
  }
}

export default ListFilmsEmptyView;
