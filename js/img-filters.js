
import { renderThumbnail } from './render-thumbnails.js';
import { debounce, shuffleArray } from './util.js';

const RENDER_PHOTOS_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const imgFiltersForm = document.querySelector('.img-filters__form');
const pictures = document.getElementsByClassName('picture');

let filteredData = [];
let currentFilter = 'filter-default';

const removePictures = () => {
  if (pictures) {
    [...pictures].forEach((item) => item.remove());
  }
};

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onButtonClick = (evt) => {
  const selectedButton = imgFiltersForm.querySelector(`.${ACTIVE_CLASS}`);
  if (isButton(evt)) {
    selectedButton.classList.toggle(`${ACTIVE_CLASS}`);
    evt.target.classList.toggle(`${ACTIVE_CLASS}`);
    currentFilter = evt.target.id;
  }
};

const applyFilter = (data) => {
  const filters = {
    'filter-default': data,
    'filter-random': shuffleArray([...data]).slice(0, RENDER_PHOTOS_COUNT),
    'filter-discussed': data.toSorted(
      (firstItem, secondItem) => secondItem.comments.length - firstItem.comments.length
    ),
  };

  removePictures();
  filteredData = filters[currentFilter];
  renderThumbnail(filteredData);
};

const changeFilter = (data) => {
  imgFiltersForm.addEventListener('click', onButtonClick);
  imgFiltersForm.addEventListener('click', debounce(() => applyFilter(data)));
};

export { changeFilter };
