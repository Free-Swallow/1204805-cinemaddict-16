const checkFilter = {
  watchlist: (data) => data.filter((film) => film.isBookmark).length,
  history: (data) => data.filter((film) => film.isWatched).length,
  favorites: (data) => data.filter((film) => film.isFavorite).length,
};

const getNumberFilter = (data) => Object.entries(checkFilter).map(
  ([filterName, numberFilms]) => ({
    name: filterName,
    number: numberFilms(data),
  }),
);

export {getNumberFilter};
