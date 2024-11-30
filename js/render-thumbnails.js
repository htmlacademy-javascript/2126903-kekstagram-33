import { openBigPicture } from './open-big-picutre';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (picture) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__img').alt = picture.description;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

  const onPictureElementClick = (evt) => {
    evt.preventDefault();

    openBigPicture(picture);
  };

  thumbnail.addEventListener('click', onPictureElementClick);

  return thumbnail;
};

const renderThumbnail = (pictures) => {
  const picturesFragment = document.createDocumentFragment();

  pictures.
    forEach((pictureElement) => {
      const thumbnail = createThumbnail(pictureElement);
      picturesFragment.append(thumbnail);
    });
  picturesContainer.append(picturesFragment);
};

export { renderThumbnail };

