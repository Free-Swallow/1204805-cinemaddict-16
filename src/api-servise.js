const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get movies() {
    return this.#load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateMovie = async (movie) => {
    const response = await this.#load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  getComments = (idMovies) => this.#load({url: `comments/${idMovies}`}).then(ApiService.parseResponse);

  addComment = async (comment, idMovies) => {
    const response = await this.#load({
      url: `comments/${idMovies}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  }

  deleteComment = async (comment) => {
    const response = await this.#load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (movie) => {
    const moviesInfo = {
      'title': movie.name,
      'age_rating': movie.ageRating,
      'alternative_title': movie.titleOriginal,
      // 'release': {
      //   'date': movie.releaseDate instanceof Date ? movie.releaseDate.toISOString() : null,
      //   'release_country': movie.country
      // },
      'genre': movie.kind,
      'total_rating': movie.rating,
    };
    const userDetails = {
      'already_watched': movie.isWatched,
      'watchlist': movie.isBookmark,
      // 'watching_date': movie.watchingDate instanceof Date ? movie.watchingDate.toISOString() : null,
      'favorite': movie.isFavorite,
    };

    const adaptedFilm = {
      'id': movie.id,
      'comments': movie.comments,
      'film_info': moviesInfo,
      'user_details': userDetails,
    };

    delete moviesInfo.title;
    delete moviesInfo.age_rating;
    delete moviesInfo.alternative_title;
    // delete moviesInfo.release.date;
    // delete moviesInfo.release.release_country;
    delete moviesInfo.genre;
    delete moviesInfo.total_rating;

    return adaptedFilm;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
