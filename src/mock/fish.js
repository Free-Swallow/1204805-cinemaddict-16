import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomNumber, getRandomFractionalNumber, getRandomNumberValues} from '../utils/utils.js';

const minRating = 0;
const maxRating = 10;
const roundingRating = 1;
const maxComments = 15;
const minComments = 0;

const movieNames = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'The Man with the Golden Arm',
];

const urlPosters = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const listDescriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const listYears = [
  '1929',
  '1933',
  '1955',
  '1964',
  '1936',
  '1945',
];

const listKinds = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Mystery',
];

const listEmojis = [
  {
    url: './images/emoji/sleeping.png',
    alt: 'emoji-sleeping'
  },
  {
    url: './images/emoji/smile.png',
    alt: 'emoji-smile'
  },
  {
    url: './images/emoji/puke.png',
    alt: 'emoji-puke'
  },
  {
    url: './images/emoji/angry.png',
    alt: 'emoji-angry'
  },
];

const listNames = [
  'John Doe',
  'Tim Macoveev',
  'Женька из 3-го подъезда',
  'Валера настало твоё время',
  'Владимир Путин',
];

const listComments = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Видали и лучше',
];

const listDirectors = [
  'Steven Spielberg',
  'Michael Bay',
  'Russo brothers',
  'J. J. Abrams',
  'Peter Jackson',
  'James Cameron',
  'David Yates',
  'Christopher Nolan',
  'Tim Burton',
  'Jon Favreau',
];

const listWriters = [
  'Billy Wilder',
  'Ethan Coen and Joel Coen',
  'Robert Towne',
  'Quentin Tarantino',
  'Francis Ford Coppola',
  'William Goldman',
  'Charlie Kaufman',
  'Woody Allen',
  'Nora Ephron',
  'Ernest Lehman',
];

const listActors = [
  'Liam Neeson',
  'Kurt Russell',
  'Christopher Reeve',
  'Drew Barrymore',
  'Marilyn Monroe',
  'Sally Field',
  'Tim Allen',
  'Bruce Lee',
  'Shirley Temple',
  'Reese Witherspoon',
  'Andy Griffith',
  'Julie Andrews',
  'Jennifer Aniston',
  'Al Pacino',
  'Hugh Jackman',
  'Halle Berry',
];

const listCountry = [
  'Canada',
  'Japan',
  'Germany',
  'Switzerland',
  'Australia',
  'United States',
  'New Zealand',
  'United Kingdom',
  'Sweden',
  'Netherlands',
];

const arrDescription = () => {
  const renderDescription = getRandomNumberValues(listDescriptions, 5);
  return renderDescription.join(' ');
};

const arrWriters = () => {
  const renderWriters = getRandomNumberValues(listWriters, 3);
  return renderWriters.join(', ');
};

const arrActors = () => {
  const renderActors = getRandomNumberValues(listActors, 5);
  return renderActors.join(', ');
};

const getCommentDate = () => {
  const daysGap = getRandomNumber(-100, -1);
  return dayjs().add(daysGap, 'day').format('DD/MM/YYYY');
};

const renderComments = () =>(
  {
    emotion: listEmojis[getRandomNumber(0, listEmojis.length - 1)],
    comment: listComments[getRandomNumber(0, listComments.length - 1)],
    date: getCommentDate(),
    author: listNames[getRandomNumber(0, listNames.length - 1)],
  }
);

const getCommentsArr = () => Array.from({length: getRandomNumber(minComments, maxComments)}, renderComments);

const getRuntime = () => {
  const isHour = getRandomNumber(0, 2);
  const runtime = [];

  if (isHour) {
    runtime.push(`${isHour}h`);
  }
  const isMinutes = getRandomNumber(0, 59);
  runtime.push(`${isMinutes}m`);

  return runtime.join(' ');
};

const getReleaseDay = () => {
  const period = getRandomNumber(-100, -3);
  return dayjs().add(period, 'day').format('D MMMM');
};

const getKinds = () => getRandomNumberValues(listKinds, 3);

const renderData = () => (
  {
    name: movieNames[getRandomNumber(0, movieNames.length - 1)],
    director: listDirectors[getRandomNumber(0, listDirectors.length - 1)],
    writers: arrWriters(),
    actors: arrActors(),
    poster: urlPosters[getRandomNumber(0, urlPosters.length - 1)],
    description: arrDescription(),
    comments: getCommentsArr(),
    rating: getRandomFractionalNumber(minRating, maxRating, roundingRating),
    ageRating: getRandomNumber(0, 21),
    releaseYear: listYears[getRandomNumber(0, listYears.length - 1)],
    releaseMonthDay: getReleaseDay(),
    kind: getKinds(),
    country: listCountry[getRandomNumber(0, listCountry.length - 1)],
    runtime: getRuntime(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    isWatched: Boolean(getRandomNumber(0, 1)),
    isBookmark: Boolean(getRandomNumber(0, 1)),
    id: nanoid(),
  }
);

export {renderData};
