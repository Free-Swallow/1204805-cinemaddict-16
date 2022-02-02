import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../utils/constanta.js';

class CommentsModel extends AbstractObservable {
  #comments = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = [...comments];
  }

  loadComments = async (filmId) => {
    try {
      const comments = await this.#apiService.getComments(filmId);
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.PATCH);
  }

  getCommentsToMovie = (idMovies) => this.#comments.get(idMovies);

  getCommentIdsByMoviesId = (idMovies) => [...this.getCommentsToMovie(idMovies)].map((comment) => comment.id);

  addComment = async (updateType, update) => {
    const {comment, idMovies} = update;
    try {
      const response = await this.#apiService.addComment(comment, idMovies);
      const {comments} = response;
      const newComments = comments.map(this.#adaptToClient);
      this.#comments.set(idMovies, newComments);
      this._notify(updateType, {idMovies: idMovies});
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  }

  deleteComment = async (updateType, update) => {
    const {comment, idMovies} = update;
    const comments = this.getCommentsToMovie(idMovies);

    if (!comments) {
      throw new Error('Can\'t delete comments for film');
    }

    const index = comments.findIndex((item) => item.id === comment.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#apiService.deleteComment(comment);
      const newComments = [
        ...comments.slice(0, index),
        ...comments.slice(index + 1),
      ];
      this.#comments.set(idMovies, newComments);
      this._notify(updateType, {idMovies: idMovies});
    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  }

  #adaptToClient = (comment) => {
    const adaptedComment = {...comment,
      emotion: `./images/emoji/${comment.emotion}.png`,
      textComment: comment.comment,
    };

    delete adaptedComment['emotion'];
    delete adaptedComment['comment'];

    return adaptedComment;
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
