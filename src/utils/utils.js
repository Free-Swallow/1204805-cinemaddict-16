import dayjs from 'dayjs';
import {FilterType} from './constanta';

const bySort = (field) => (b, a) => a[field] > b[field] ? 1 : -1;

const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min)) + min;

const getRandomFractionalNumber = (min, max, point) =>
  (Math.random() * Math.abs((max - min)) + Math.abs(min)).toFixed(point);

const getRandomNumberValues = (arr, maxLength) => {
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = arr[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }

  return array;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

function getTimeFromMins(mins) {
  const time = [];
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  time.push(hours, minutes);

  if (time[0] === 0) {
    return dayjs.duration({minutes: time[1]}).format('m[m]');
  }

  return dayjs.duration({hours: time[0], minutes: time[1]}).format('H[h] m[m]');
}

const checkFilter = {
  [FilterType.ALL]: (movies) => [...movies],
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.isBookmark),
  [FilterType.WATCHED]: (movies) => movies.filter((movie) => movie.isWatched),
  [FilterType.FAVORITE]: (movies) => movies.filter((movie) => movie.isFavorite),
};

export {
  bySort,
  getRandomNumber,
  getRandomFractionalNumber,
  getRandomNumberValues,
  updateItem,
  getTimeFromMins,
  checkFilter,
};
