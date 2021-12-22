const checkFilter = {
  Watchlist: (data) => data.filter((film) => film.isBookmark).length,
  History: (data) => data.filter((film) => film.isWatched).length,
  Favorites: (data) => data.filter((film) => film.isFavorite).length,
};

const getNumberFilter = (data) => Object.entries(checkFilter).map(
  ([filterName, numberFilms]) => ({
    name: filterName,
    number: numberFilms(data),
  }),
);

export {getNumberFilter};
