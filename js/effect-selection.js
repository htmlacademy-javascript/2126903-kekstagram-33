const imgUploadWrapper = document.querySelector('.img-upload__wrapper');

const effectLevelSlider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const previewPicture = imgUploadWrapper.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');

const effects = {
  none: { min: 0, max: 1, start: 1, step: 0, styleFilter: 'none', unit: '' },
  chrome: { min: 0, max: 1, start: 1, step: 0.1, styleFilter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, start: 1, step: 0.1, styleFilter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, start: 100, step: 1, styleFilter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, start: 3, step: 0.1, styleFilter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, start: 3, step: 0.1, styleFilter: 'brightness', unit: '' },
};

effectLevel.classList.add('hidden');

noUiSlider.create(effectLevelSlider, {
  start: 0,
  range: { min: 0, max: 1 },
  connect: 'lower',
  format: {
    from: (value) => parseFloat(value),
    to: (value) => Number.isInteger(value)
      ? value
      : value.toFixed(1),
  },
});

const setEffect = (effect) => {
  const { min, max, start, step, styleFilter, unit } = effect;

  effectLevelSlider.noUiSlider.off('update');
  effectLevelSlider.noUiSlider.updateOptions({
    start: start,
    step: step,
    range: { min: min, max: max },
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    previewPicture.style.filter = `${styleFilter}(${effectLevelValue.value}${unit})`;
  });
};

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    previewPicture.style.filter = 'none';
  } else {
    effectLevel.classList.remove('hidden');
  }

  setEffect(effects[effect]);
};

export { onEffectChange };
