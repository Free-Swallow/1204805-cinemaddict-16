import {RenderPosition, render} from './renderTemplate.js';
import MainMenuView from './view/main-menu-view.js';
import SortListView from './view/sort-list-view.js';
import MainNavView from './view/main-nav-view.js';
import UserRatingView from './view/user-rating-view.js';
import ListFilmsView from './view/list-films-view';
import PopupFilmView from './view/popup-film-view.js';
import QuantityFilmsView from './view/quanity-films-view.js';
import CardView from './view/card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
import {renderData} from './mock/fish.js';
import {getNumberFilter} from './mock/filter.js';
import CommentView from './view/comment-view.js';
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

const mainMenuElement = new MainMenuView().element;

// СОЗДАНИЕ ПОП-АПА!

const renderPopup = (card) => {
  const popupComponent = new PopupFilmView(card);
  const popupClose = popupComponent.element.querySelector('.film-details__close-btn');
  const commentComponent = new CommentView(card);
  bodyNode.classList.add('hide-overflow');

  render(bodyNode, popupComponent.element, RenderPosition.BEFOREEND);

  popupClose.addEventListener('click', () => {
    popupComponent.element.remove();
    bodyNode.classList.remove('hide-overflow');
  });

  const popupListCommentNode = bodyNode.querySelector('.film-details__comments-list');

  render(popupListCommentNode, commentComponent.element, RenderPosition.BEFOREEND);
};

// СОЗДАНИЕ КАРТОЧКИ ФИЛЬМА!

const renderCardFilm = (cardContainer, card) => {
  const cardComponent = new CardView(card);
  const cardLink = cardComponent.element.querySelector('.film-card__link');

  cardLink.addEventListener('click', () => {
    renderPopup(card);
  });

  render(cardContainer, cardComponent.element, RenderPosition.BEFOREEND);
};

render(headerNode, new UserRatingView().element, RenderPosition.BEFOREEND);
render(mainNode, mainMenuElement, RenderPosition.AFTERBEGIN);
render(mainNode, new ListFilmsView().element, RenderPosition.BEFOREEND);
render(footerStatisticsNode, new QuantityFilmsView().element, RenderPosition.BEFOREEND);

const mainMenuNode = mainNode.querySelector('.main-navigation');
const filmsNode = bodyNode.querySelector('.films');
const filmsListNode = filmsNode.querySelector('.films-list');
const filmsListWrapperNode = filmsListNode.querySelector('.films-list__container');
const filmsListTopRatedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(2)');
const filmsListMostCommentedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(3)');
const filmsListTopRatedNode = filmsListTopRatedWrapperNode.querySelector('.films-list__container');
const filmsListMostCommentedNode = filmsListMostCommentedWrapperNode.querySelector('.films-list__container');

// ОТРИСОВКА ГЛАВНОГО МЕНЮ!

render(mainMenuNode, new SortListView().element, RenderPosition.AFTEREND);
render(mainMenuNode, new MainNavView(getFilterArray).element, RenderPosition.AFTERBEGIN);

// ОТРИСОВКА КАРТОЧЕК ФИЛЬМОВ!

for (let i = 0; i < Math.min(cardsCreate.length, QUANTITY_CREATE_CARDS_START); i++) {
  renderCardFilm(filmsListWrapperNode, cardsCreate[i]);
}

// ОТРИСОВКА КНОПКИ "ПОКАЗАТЬ БОЛЬШЕ"!

if (filmsListWrapperNode.children.length < cardsCreate.length) {
  let showMoreFilms = QUANTITY_CREATE_CARDS_STEP;
  render(filmsListNode, new ButtonShowMoreView().element, RenderPosition.BEFOREEND);

  const loadMoreButtonNode = filmsListNode.querySelector('.films-list__show-more');
  loadMoreButtonNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    cardsCreate
      .slice(showMoreFilms, showMoreFilms + QUANTITY_CREATE_CARDS_STEP)
      .forEach((films) => render(filmsListWrapperNode, new CardView(films).element, RenderPosition.BEFOREEND));

    showMoreFilms += QUANTITY_CREATE_CARDS_STEP;

    if (filmsListWrapperNode.children.length >= cardsCreate.length) {
      loadMoreButtonNode.remove();
    }
  });
}

// ОТРИСОВКА БЛОКА ЭКСТРА!

for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
  renderCardFilm(filmsListTopRatedNode, sortFilmsRating[i]);
}

for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
  renderCardFilm(filmsListMostCommentedNode, sortFilmsComments[i]);
}

export {cardsCreate};

