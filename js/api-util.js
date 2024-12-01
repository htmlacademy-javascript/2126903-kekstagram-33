import { isEscKey } from './util';
import { renderThumbnail } from './render-thumbnails.js';
import { changeFilter } from './img-filters.js';

const ALERT_SHOW_TIME = 5000;

const body = document.body;

const dataErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');
const imgFilters = document.querySelector('.img-filters');

let photos = [];

const showModal = (element, prefix) => {
  body.append(element);

  const onModalEscape = (evt) => {
    if (isEscKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      removeModal();
    }
  };

  const onCloseClick = (evt) => {
    if (evt.target.matches(`.${prefix}__button`) || !evt.target.closest(`.${prefix}__inner`)) {
      removeModal();
    }
  };

  function removeModal() {
    element.remove();
    body.removeEventListener('keydown', onModalEscape);
  }

  element.addEventListener('click', onCloseClick);

  body.addEventListener('keydown', onModalEscape);
};

const onSuccess = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  photos = [...data];
  renderThumbnail(photos);
  changeFilter(photos);
};

const onError = () => {
  imgFilters.classList.add('img-filters--inactive');
  body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export { showModal, onError, onSuccess };
