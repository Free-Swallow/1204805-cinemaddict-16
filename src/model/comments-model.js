import AbstractObservable from '../utils/abstract-observable.js';

class CommentsModel extends AbstractObservable {
  #comments = new Map();

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = [...comments];
  }

  // updateTask = (updateType, update) => {
  //   const index = this.#comments.findIndex((comment) => comment.id === update.id);
  //
  //   if (index === -1) {
  //     throw new Error('Can\'t update unexisting task');
  //   }
  //
  //   this.#comments = [
  //     ...this.#comments.slice(0, index),
  //     update,
  //     ...this.#comments.slice(index + 1),
  //   ];
  //
  //   this._notify(updateType, update);
  // }

  deleteTask = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  }

  addTask = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  }
}

export default CommentsModel;
