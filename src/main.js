import {renderTemplate, RenderPosition} from './renderTemplate.js';
import {createFilterTemplate} from './view/main-menu-view.js';
import {createUserRating} from './view/user-rating-view.js';
import {createListFilms} from './view/list-films-view';
import {createPopupFilm} from './view/popup-film-view.js';
import {createMovieCounter} from './view/quanity-films-view.js';
import {createCardTemplate} from './view/card-view.js';
import {createButtonShowMoreTemplate} from './view/button-show-more-view.js';
import {renderData} from './mock/fish.js';
import {getNumberFilter} from './mock/filter.js';
import {createComment} from './view/comment-view.js';
import {bySort} from './utils.js';

const QUANTITY_CREATE_CARDS_START = 5;
const QUANTITY_CREATE_CARDS_STEP = 5;
const QUANTITY_CREATE_CARDS_EXTRA = 2;
const QUANTITY_CREATE_MOCKS = 16;

const bodyNode = document.querySelector('body');
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');
const footerStatisticsNode = footerNode.querySelector('.footer__statistics');

const cardsCreate = Array.from({length: QUANTITY_CREATE_MOCKS}, renderData);

const getFilterArray = getNumberFilter(cardsCreate);

const sortFilmsComments = cardsCreate.slice(0, cardsCreate.length).sort(bySort('comments'));

const sortFilmsRating =  cardsCreate.slice(0, cardsCreate.length).sort(bySort('rating'));

renderTemplate(headerNode, createUserRating(), RenderPosition.BEFOREEND);
renderTemplate(mainNode, createFilterTemplate(getFilterArray), RenderPosition.AFTERBEGIN);
renderTemplate(mainNode, createListFilms(), RenderPosition.BEFOREEND);
renderTemplate(bodyNode, createPopupFilm(cardsCreate[0]), RenderPosition.BEFOREEND);
renderTemplate(footerStatisticsNode, createMovieCounter(), RenderPosition.BEFOREEND);

const filmsNode = bodyNode.querySelector('.films');
const filmsListNode = filmsNode.querySelector('.films-list');
const filmsListWrapperNode = filmsListNode.querySelector('.films-list__container');
const filmsListTopRatedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(2)');
const filmsListMostCommentedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(3)');
const filmsListTopRatedNode = filmsListTopRatedWrapperNode.querySelector('.films-list__container');
const filmsListMostCommentedNode = filmsListMostCommentedWrapperNode.querySelector('.films-list__container');
const popupListCommentNode = bodyNode.querySelector('.film-details__comments-list');

renderTemplate(popupListCommentNode, createComment(cardsCreate[0]), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(cardsCreate.length, QUANTITY_CREATE_CARDS_START); i++) {
  renderTemplate(filmsListWrapperNode, createCardTemplate(cardsCreate[i]), RenderPosition.BEFOREEND);
}

if (filmsListWrapperNode.children.length < cardsCreate.length) {
  let showMoreFilms = QUANTITY_CREATE_CARDS_STEP;
  renderTemplate(filmsListNode, createButtonShowMoreTemplate(), RenderPosition.BEFOREEND);

  const loadMoreButtonNode = filmsListNode.querySelector('.films-list__show-more');
  loadMoreButtonNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    cardsCreate
      .slice(showMoreFilms, showMoreFilms + QUANTITY_CREATE_CARDS_STEP)
      .forEach((films) => renderTemplate(filmsListWrapperNode, createCardTemplate(films), RenderPosition.BEFOREEND));

    showMoreFilms += QUANTITY_CREATE_CARDS_STEP;

    if (filmsListWrapperNode.children.length >= cardsCreate.length) {
      loadMoreButtonNode.remove();
    }
  });
}

for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
  renderTemplate(filmsListTopRatedNode, createCardTemplate(sortFilmsRating[i]), RenderPosition.AFTERBEGIN);
}

for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
  renderTemplate(filmsListMostCommentedNode, createCardTemplate(sortFilmsComments[i]), RenderPosition.AFTERBEGIN);
}

export {cardsCreate};

