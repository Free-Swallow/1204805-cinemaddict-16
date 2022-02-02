import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../utils/constanta.js';
import dayjs from 'dayjs';

// Модель для хранения списка фильмов

class MoviesModel extends AbstractObservable {
  #movies = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.movies.then((movies) => {
      console.log(movies.map(this.#adaptToClient));
    });
  }

  init = async () => {
    try {
      const movies = await this.#apiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch(err) {
      this.movies = [];
    }

    this._notify(UpdateType.INIT);
  }

  set movies(movies) {
    this.#movies = [...movies];
  }

  get movies() {
    return this.#movies;
  }

  // Обновление элемента, указание типа изменения.
  updateMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  #adaptToClient = (movie) => {
    const adaptedMovies = {...movie,
      name: movie.film_info.title,
      originalName: movie.film_info?.alternative_title,
      director: movie.film_info?.director,
      writers: movie.film_info?.writers,
      actors: movie.film_info?.actors,
      runtime: movie.film_info?.runtime,
      country: movie.film_info?.release?.release_country,
      kind: movie.film_info?.genre,
      description: movie.film_info?.description,
      rating: movie.film_info?.total_rating,
      releaseYear: dayjs(movie.film_info?.release.date).year(),
      releaseDate: movie.film_info?.release?.date,
      poster: movie.film_info?.poster,
      ageRating: movie.film_info?.age_rating,
      isWatched: movie.user_details?.already_watched,
      isBookmark: movie.user_details?.watchlist,
      watchingDate: movie.user_details?.watching_date ? new Date(movie.user_details.watching_date) : null,
      isFavorite: movie.user_details?.favorite,
    };

    delete adaptedMovies['film_info'];
    delete adaptedMovies['user_details'];

    return adaptedMovies;
  }
}

export default MoviesModel;
