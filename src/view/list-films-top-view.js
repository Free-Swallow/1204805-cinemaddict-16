import AbstractView from './abstract-view.js';

const createTopListTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`
);

class ListFilmsTopView extends AbstractView {
  get template() {
    return createTopListTemplate();
  }
}

export default ListFilmsTopView;
