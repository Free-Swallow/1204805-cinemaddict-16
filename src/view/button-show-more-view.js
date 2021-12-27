import AbstractView from './abstract-view.js';

const createButtonShowMoreTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

class ButtonShowMoreView extends AbstractView {
  get template() {
    return createButtonShowMoreTemplate();
  }

  setDownloadMoreHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#downloadMoreHandler);
  }

  #downloadMoreHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}

export default ButtonShowMoreView;
