// Наблюдатель

class AbstractObservable {
  #observables = new Set();

  // Добавление наблюдателей
  addObservable(observable) {
    this.#observables.add(observable);
  }

  // Удаление наблюдателей
  removeObservable(observable) {
    this.#observables.delete(observable);
  }

  // Вызов всех наблюдателей
  _notify(event, payload) {
    this.#observables.forEach((observable) => observable(event, payload));
  }
}

export default AbstractObservable;
