import AbstractView from './abstract-view.js';

const createCommentListTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`
);

class ListFilmsCommentView extends AbstractView {
  get template() {
    return createCommentListTemplate();
  }
}

export default ListFilmsCommentView;

