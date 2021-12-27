import AbstractView from './abstract-view.js';

const createListFilmsTemplate = () => (
  `<section class="films">
    <section class="films-list">

    </section>
  </section>`
);

class ListFilmsView extends AbstractView {
  get template() {
    return createListFilmsTemplate();
  }
}

export default ListFilmsView;
