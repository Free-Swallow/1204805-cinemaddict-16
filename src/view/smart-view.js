import AbstractView from './abstract-view.js';

// Абстрактный класс для попапа

class SmartView extends AbstractView {
  _data = {};

  updateElement = () => {
    // Записываем старый элемент.
    const previousElement = this.element;
    // Записываем родителя элемента, контейнер.
    const parent = previousElement.parentElement;
    // удалить старый DOM-элемент компонента;
    this.removeElement();
    // Создаём новый DOM-элемент.
    const newElement = this.element;
    // Помещаем новый элемент вместо старого.
    parent.replaceChild(newElement, previousElement);
    // Восстановить обработчики событий, вызвав restoreHandlers.
    this.restoreHandlers();
  }

  // Метод который будет обновлять данные и, если нужно, вызывать метод updateElement.
  updateData = (update, justDataUpdating) => {
    // Если обновлять нечего, сворачиваемся и на выход.
    if (!update) {
      return;
    }
    // Берём старый объект и заменяем на новый(изменённый).
    this._data = {...this._data, ...update};
    // Если только изменить данные, сворачиваемся и на выход.
    if (justDataUpdating) {
      return;
    }
    // Обновить элемент с изменёнными данными.
    this.updateElement();
  }

  // Его задача — восстанавливать обработчики событий после перерисовки.
  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}

export default SmartView;
