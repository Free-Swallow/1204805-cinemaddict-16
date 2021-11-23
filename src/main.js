import {renderTemplate, RenderPosition} from './renderTemplate.js';
import {createSiteMenuTemplate} from './view/main-menu-view.js';
import {createUserRating} from './view/user-rating-view.js';
import {createListFilms} from './view/list-films-view';
import {createPopupFilm} from './view/popup-film-view.js';
import {createMovieCounter} from './view/quanity-films-view';

const bodyNode = document.querySelector('body');
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');
const footerStatisticsNode = footerNode.querySelector('.footer__statistics');

renderTemplate(headerNode, createUserRating(), RenderPosition.BEFOREEND);
renderTemplate(mainNode, createSiteMenuTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(mainNode, createListFilms(), RenderPosition.BEFOREEND);
renderTemplate(bodyNode, createPopupFilm(), RenderPosition.BEFOREEND);
renderTemplate(footerStatisticsNode, createMovieCounter(), RenderPosition.BEFOREEND);
