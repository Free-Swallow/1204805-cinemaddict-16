import MainMenuView from './view/main-menu-view.js';
import SortListView from './view/sort-list-view.js';
import MainNavView from './view/main-nav-view.js';
import UserRatingView from './view/user-rating-view.js';
import ListFilmsView from './view/list-films-view';
import PopupFilmView from './view/popup-film-view.js';
import QuantityFilmsView from './view/quanity-films-view.js';
import CardView from './view/card-view.js';
import ButtonShowMoreView from './view/button-show-more-view.js';
import ListFilmsContainerView from './view/list-films-container-view.js';
import CommentView from './view/comment-view.js';
import ListFilmsTopView from './view/list-films-top-view.js';
import ListFilmsCommentView from './view/list-films-comment-view.js';
import ListFilmsTitleView from './view/list-films-title-view.js';
import ListFilmsEmptyView from './view/list-films-empty-view.js';
import {RenderPosition, render, remove} from './utils/renderTemplate.js';
import {renderData} from './mock/fish.js';
import {getNumberFilter} from './mock/filter.js';
import {bySort} from './utils/utils.js';

const QUANTITY_CREATE_CARDS_START = 5;
const QUANTITY_CREATE_CARDS_STEP = 5;
const QUANTITY_CREATE_CARDS_EXTRA = 2;
const QUANTITY_CREATE_MOCKS = 16;
const KeysClose = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const bodyNode = document.querySelector('body');
const headerNode = bodyNode.querySelector('.header');
const mainNode = bodyNode.querySelector('.main');
const footerNode = bodyNode.querySelector('.footer');
const footerStatisticsNode = footerNode.querySelector('.footer__statistics');

// ГЕНЕРАЦИЯ МАССИВА С КАРТОЧКАМИ ФИЛЬМОВ!

const cardsCreate = Array.from({length: QUANTITY_CREATE_MOCKS}, renderData);

// СЧЕТЧИК ФИЛЬТРОВ!

const getFilterArray = getNumberFilter(cardsCreate);

// СОРТИРОВКА КАРТОЧЕК ДЛЯ БЛОКА EXTRA!

const sortFilmsComments = cardsCreate.slice(0, cardsCreate.length).sort(bySort('comments'));
const sortFilmsRating =  cardsCreate.slice(0, cardsCreate.length).sort(bySort('rating'));

// СОЗДАНИЕ ПОП-АПА!

const renderPopup = (card) => {
  const popupComponent = new PopupFilmView(card);

  bodyNode.classList.add('hide-overflow');

  function onRemovePopup() {
    remove(popupComponent);
    bodyNode.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onCloseKey);
  }

  function onCloseKey(evt) {
    if (evt.key === KeysClose.ESC || evt.key === KeysClose.ESCAPE) {
      evt.preventDefault();
      onRemovePopup();
    }
  }

  render(bodyNode, popupComponent, RenderPosition.BEFOREEND);

  document.addEventListener('keydown', onCloseKey);
  popupComponent.setOpenPopupHandler(() => {
    onRemovePopup();
  });

  const popupListCommentNode = bodyNode.querySelector('.film-details__comments-list');

  const renderComment = (list) => {
    for (const item of list) {
      const commentComponent = new CommentView(item);
      render(popupListCommentNode, commentComponent, RenderPosition.BEFOREEND);
    }
  };
  renderComment(card.comments);

};

// СОЗДАНИЕ КАРТОЧКИ ФИЛЬМА!

const renderCardFilm = (cardContainer, card) => {
  const cardComponent = new CardView(card);

  cardComponent.setClickHandler(() => {
    renderPopup(card);
  });

  render(cardContainer, cardComponent, RenderPosition.BEFOREEND);
};

// ДОБАВЛЕНИЕ ВНУТРЕННИХ БЛОКОВ И ОБЪЯВЛЕНИЕ УЗЛОВ!

render(mainNode, new MainMenuView(), RenderPosition.AFTERBEGIN);
render(mainNode, new ListFilmsView(), RenderPosition.BEFOREEND);
render(footerStatisticsNode, new QuantityFilmsView(cardsCreate), RenderPosition.BEFOREEND);

const mainMenuNode = mainNode.querySelector('.main-navigation');
const filmsNode = bodyNode.querySelector('.films');
const filmsListNode = filmsNode.querySelector('.films-list');

// СОЗДАНИЕ БЛОКА РЕЙТИНГ ЮЗЕРА!

const createUserRatingView = () => {
  render(headerNode, new UserRatingView(), RenderPosition.BEFOREEND);
};

// ОТРИСОВКА ГЛАВНОГО МЕНЮ!

render(mainMenuNode, new MainNavView(getFilterArray), RenderPosition.AFTERBEGIN);
const createSortList = () => {
  render(mainMenuNode, new SortListView(), RenderPosition.AFTEREND);
};

// СОЗДАНИЕ ЗАГОЛОВКА СТРАНИЦЫ!

const createEmptyList = () => {
  render(filmsListNode, new ListFilmsEmptyView(), RenderPosition.BEFOREEND);
};

const createFilmsTitle = () => {
  render(filmsListNode, new ListFilmsTitleView(), RenderPosition.BEFOREEND);
};

// ОТРИСОВКА КАРТОЧЕК ФИЛЬМОВ!

const createMainBlockFilms = () => {
  render(filmsListNode, new ListFilmsContainerView(), RenderPosition.BEFOREEND);
  const filmsListWrapperNode = filmsListNode.querySelector('.films-list__container');
  for (let i = 0; i < Math.min(cardsCreate.length, QUANTITY_CREATE_CARDS_START); i++) {
    renderCardFilm(filmsListWrapperNode, cardsCreate[i]);
  }

  // ОТРИСОВКА КНОПКИ "ПОКАЗАТЬ БОЛЬШЕ"!

  const buttonShowMoreComponent = new ButtonShowMoreView();

  if (filmsListWrapperNode.children.length < cardsCreate.length) {
    let showMoreFilms = QUANTITY_CREATE_CARDS_STEP;
    render(filmsListNode, buttonShowMoreComponent, RenderPosition.BEFOREEND);

    buttonShowMoreComponent.setDownloadMoreHandler(() => {
      cardsCreate
        .slice(showMoreFilms, showMoreFilms + QUANTITY_CREATE_CARDS_STEP)
        .forEach((films) =>  renderCardFilm(filmsListWrapperNode, films));

      showMoreFilms += QUANTITY_CREATE_CARDS_STEP;

      if (filmsListWrapperNode.children.length >= cardsCreate.length) {
        buttonShowMoreComponent.removeElement();
      }
    });
  }
};

// ОТРИСОВКА БЛОКА ЭКСТРА!

const createExtraBlock = () => {
  render(filmsNode, new ListFilmsTopView(), RenderPosition.BEFOREEND);
  render(filmsNode, new ListFilmsCommentView(), RenderPosition.BEFOREEND);
  const filmsListTopRatedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(2)');
  const filmsListMostCommentedWrapperNode = filmsNode.querySelector('.films-list--extra:nth-child(3)');
  const filmsListTopRatedNode = filmsListTopRatedWrapperNode.querySelector('.films-list__container');
  const filmsListMostCommentedNode = filmsListMostCommentedWrapperNode.querySelector('.films-list__container');

  for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
    renderCardFilm(filmsListTopRatedNode, sortFilmsRating[i]);
  }

  for (let i = 0; i < QUANTITY_CREATE_CARDS_EXTRA; i++) {
    renderCardFilm(filmsListMostCommentedNode, sortFilmsComments[i]);
  }
};

// ГЕНЕРАЦИЯ СТАРТОВОЙ СТРАНИЦЫ!

const createPageStart = () => {
  if (cardsCreate.length === 0) {
    createEmptyList();
  } else {
    createSortList();
    createFilmsTitle();
    createMainBlockFilms();
    createExtraBlock();
    createUserRatingView();
  }
};

createPageStart();

export {cardsCreate};

