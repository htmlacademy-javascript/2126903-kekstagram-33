import { isEscKey } from './util';

const ALERT_SHOW_TIME = 5000;

const body = document.body;

const dataErrorMessage = document.querySelector('#data-error').content.querySelector('.data-error');

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


const showErrorMessage = () => {
  body.appendChild(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export { showErrorMessage, showModal };
