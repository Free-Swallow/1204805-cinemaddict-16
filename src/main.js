import QuantityFilmsView from './view/quanity-films-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {RenderPosition, render} from './utils/renderTemplate.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filter-model.js';
import {MenuItem} from './utils/constanta.js';
import FilterPresenter from './presenter/filter-presenter';
import ApiService from './api-servise.js';
import CommentsModel from './model/comments-model';

const AUTHORIZATION = 'Basic gdfgoj43424iiisd';
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';
const apiData = new ApiService(END_POINT, AUTHORIZATION);

const bodyNode = document.querySelector('body');
const footerNode = bodyNode.querySelector('.footer');
const footerStatisticsNode = footerNode.querySelector('.footer__statistics');
const mainNode = bodyNode.querySelector('.main');

const moviesModel = new MoviesModel(apiData);
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(apiData);
const moviePresenter = new BoardPresenter(bodyNode, moviesModel, filterModel, commentsModel);


render(footerStatisticsNode, new QuantityFilmsView(moviesModel), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(mainNode, filterModel, moviesModel);

// function handleSiteMenuClick(menuItem) {
//   switch (menuItem) {
//     case MenuItem.FILMS:
//       filterPresenter.init();
//       moviePresenter.init();
//       // Скрыть статистику
//       break;
//     case MenuItem.STATISTICS:
//       filterPresenter.destroy();
//       moviePresenter.destroy();
//       filterPresenter.init();
//       // Скрыть доску
//
//       break;
//   }
// }

moviePresenter.init();
moviesModel.init().finally(() => {
  filterPresenter.init();
});

