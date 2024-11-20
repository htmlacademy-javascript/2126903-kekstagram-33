import { isEscKey, numDecline } from './util';
import { onEffectChange } from './effect-selection';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

const SCALE_STEP = 25;

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

let errorMessage = '';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const error = () => errorMessage;

const isHashtagValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштгег не может состоять только из одной решетки'
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\''
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться'
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} ${numDecline(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
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

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);

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

const onCloseImgUpload = () => {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  effectLevel.classList.add('hidden');
  uploadPreviewPicture.style.filter = 'none';
  controlValue.value = '100%';
  uploadPreviewPicture.style.transform = `scale(${controlValue.value})`;
  imgUploadForm.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt) && !evt.target.classList.contains('text__hashtags')
    && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    onCloseImgUpload();
  }
}

const onHashtagInput = () => {
  isHashtagValid(hashtagInput.value);
};

const onSelectPicture = () => {
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadCancle.addEventListener('click', onCloseImgUpload);
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    imgUploadForm.submit();
  }
};

effectsList.addEventListener('change', onEffectChange);

smallerControl.addEventListener('click', resizesPicture);

biggerControl.addEventListener('click', resizesPicture);

hashtagInput.addEventListener('input', onHashtagInput);

uploadFile.addEventListener('change', onSelectPicture);

imgUploadForm.addEventListener('submit', onSubmitForm);

