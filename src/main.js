import {renderTemplate, RenderPosition} from './renderTemplate.js';
import {createSiteMenuTemplate} from './view/main-menu-view.js';
import {createUserRating} from './view/user-rating-view.js';
import {createListFilms} from './view/list-films-view';
import {createPopupFilm} from './view/popup-film-view.js';
import {createMovieCounter} from './view/quanity-films-view';
import {filmsCards} from './view/card-view.js';
import {createButtonShowMoreTemplate} from './view/button-show-more-view';

const QUANITY_CREATE_CARDS = 5;
const QUANITY_CREATE_CARDS_EXTRA = 2;

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

const filmsNode = bodyNode.querySelector('.films');
const filmsListNode = filmsNode.querySelector('.films-list');
const filmsListWrapperNode = filmsListNode.querySelector('.films-list__container');
const filmsListTopRatedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(2)');
const filmsListMostCommentedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(3)');
const filmsListTopRatedNode = filmsListTopRatedWrapperNode.querySelector('.films-list__container');
const filmsListMostCommentedNode = filmsListMostCommentedWrapperNode.querySelector('.films-list__container');

for (let i = 0; i < QUANITY_CREATE_CARDS; i++) {
  renderTemplate(filmsListWrapperNode, filmsCards[i], RenderPosition.BEFOREEND);
}

renderTemplate(filmsListNode, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < QUANITY_CREATE_CARDS_EXTRA; i++) {
  renderTemplate(filmsListTopRatedNode, filmsCards[i + 4], RenderPosition.AFTERBEGIN);
}

for (let i = 0; i < QUANITY_CREATE_CARDS_EXTRA; i++) {
  renderTemplate(filmsListMostCommentedNode, filmsCards[i + 5], RenderPosition.AFTERBEGIN);
}
