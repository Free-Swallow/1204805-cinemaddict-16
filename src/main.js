import QuantityFilmsView from './view/quanity-films-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {RenderPosition, render} from './utils/renderTemplate.js';
import {getRandomNumber} from './utils/utils.js';
import {renderData} from './mock/fish.js';
import MoviesModel from './model/movies-model.js';

// Определение колличества карточек
const QUANTITY_CREATE_MOCKS = getRandomNumber(3, 20);
// Создание карточек
const cardsCreate = Array.from({length: QUANTITY_CREATE_MOCKS}, renderData);

// Создаём экземпляр модели фильмов
const moviesModel = new MoviesModel();

// Передаём модели данные через setter
moviesModel.movies = cardsCreate;

// Определение узлов страницы
const bodyNode = document.querySelector('body');
const footerNode = bodyNode.querySelector('.footer');
const footerStatisticsNode = footerNode.querySelector('.footer__statistics');

render(footerStatisticsNode, new QuantityFilmsView(cardsCreate), RenderPosition.BEFOREEND);

// Создание экземпляра презентера доски, передаём контейнер и модель с данными
const moviePresenter = new BoardPresenter(bodyNode, moviesModel);

// Вызов метода инит для начала работы приложения
moviePresenter.init();

export {cardsCreate};

