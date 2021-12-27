import AbstractView from './abstract-view.js';

const createFilmsTitleTemplate = () => (
  '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
);

class ListFilmsTitleView extends AbstractView {
  get template() {
    return createFilmsTitleTemplate();
  }
}

export default ListFilmsTitleView;
