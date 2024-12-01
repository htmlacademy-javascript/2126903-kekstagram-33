import { isEscKey, numDecline } from './util';
import { onEffectChange } from './effect-selection';
import { sendData } from './api';
import { showModal } from './api-util';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const SCALE_STEP = 25;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload');
const uploadFile = imgUpload.querySelector('#upload-file');
const uploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const imgUploadCancle = imgUpload.querySelector('.img-upload__cancel');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const smallerControl = document.querySelector('.scale__control--smaller');
const biggerControl = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const controlValue = document.querySelector('.scale__control--value');
const uploadPreviewPicture = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');

const successPopup = document.querySelector('#success').content.querySelector('.success');

const errorPopup = document.querySelector('#error').content.querySelector('.error');

const inputDescription = imgUploadForm.querySelector('.text__description');


let errorMessage = '';

const error = () => errorMessage;

const isHashtagValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputsArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputsArray.some((item) => item === '#'),
      error: 'Хэштгег не может состоять только из одной решетки'
    },
    {
      check: inputsArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами'
    },
    {
      check: inputsArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\''
    },
    {
      check: inputsArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться'
    },
    {
      check: inputsArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputsArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check: inputsArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const isDescriptionValid = () => inputDescription.value.length <= MAX_DESCRIPTION_LENGTH;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

pristine.addValidator(inputDescription, isDescriptionValid, 'Текст комментария не должен превышать 140 символов, включая пробелы', 1, false);

const resizesPicture = (evt) => {
  let numValue = parseInt(controlValue.value, 10);
  if (evt.target.classList.contains('scale__control--smaller') && numValue > 25) {
    numValue -= SCALE_STEP;
  } else if (evt.target.classList.contains('scale__control--bigger') && numValue < 100) {
    numValue += SCALE_STEP;
  }
  uploadPreviewPicture.style.transform = `scale(${numValue / 100})`;
  controlValue.value = `${numValue}%`;
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onHashtagInput = () => {
  submitButton.disabled = !pristine.validate();
};

const onCommentInput = () => {
  submitButton.disabled = !pristine.validate();
};

const onCloseFrom = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  effectLevel.classList.add('hidden');
  uploadPreviewPicture.style.filter = 'none';
  controlValue.value = '100%';
  uploadPreviewPicture.style.transform = `scale(${controlValue.value})`;
  uploadPreviewPicture.style.transform = '';
  uploadPreviewPicture.style.filter = '';
  unblockSubmitButton();
  imgUploadForm.reset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt) && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    onCloseFrom();
  }
}

const onOpenFrom = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancle.addEventListener('click', onCloseFrom);
};

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
        })
        .then(unblockSubmitButton)
        .then(() => {
          if (submitButton.textContent === SubmitButtonText.IDLE) {
            showModal(successPopup, 'success');
          }
        })
        .catch(() => {
          showModal(errorPopup, 'error');
          unblockSubmitButton();
        })
        .finally(() => unblockSubmitButton());
    }
  }
  );
};


effectsList.addEventListener('change', onEffectChange);

smallerControl.addEventListener('click', resizesPicture);

biggerControl.addEventListener('click', resizesPicture);

hashtagInput.addEventListener('input', onHashtagInput);
inputDescription.addEventListener('input', onCommentInput);

uploadFile.addEventListener('change', onOpenFrom);

export { onOpenFrom, onCloseFrom, setUserFormSubmit };
