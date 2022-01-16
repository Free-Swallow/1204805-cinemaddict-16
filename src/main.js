import QuantityFilmsView from './view/quanity-films-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {RenderPosition, render} from './utils/renderTemplate.js';
import {renderData} from './mock/fish.js';

const QUANTITY_CREATE_MOCKS = 20;

const bodyNode = document.querySelector('body');
const footerNode = bodyNode.querySelector('.footer');
const footerStatisticsNode = footerNode.querySelector('.footer__statistics');

const cardsCreate = Array.from({length: QUANTITY_CREATE_MOCKS}, renderData);

render(footerStatisticsNode, new QuantityFilmsView(cardsCreate), RenderPosition.BEFOREEND);

const moviePresenter = new BoardPresenter(bodyNode);

moviePresenter.init(cardsCreate);

export {cardsCreate};

