const QUANTITY_CREATE_CARDS_START = 5;
const QUANTITY_CREATE_CARDS_STEP = 5;
const QUANTITY_CREATE_CARDS_EXTRA = 2;
const POPUP_SCROLL = 0;

const KeysClose = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};
const SortType = {
  DEFAULT: 'default',
  DATE: 'releaseYear',
  RATING: 'rating',
};
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  QUANTITY_CREATE_CARDS_START,
  QUANTITY_CREATE_CARDS_STEP,
  QUANTITY_CREATE_CARDS_EXTRA,
  KeysClose,
  POPUP_SCROLL,
  SortType,
  RenderPosition,
  UserAction,
  UpdateType
};
