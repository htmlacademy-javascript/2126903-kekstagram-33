import { pictures } from './data';
import { isEscKey } from './util';

const commentAvatarSize = {
  HEIGHT: 35,
  WIDTH: 35
};

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const showComment = bigPicture.querySelector('.social__comment-count');
//const commentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  showComment.classList.remove('hidden');
  buttonCommentsLoader.classList.remove('hidden');
  body.classList.remove('.modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

bigPictureCancel.addEventListener('click', () => closeBigPicture());

const createComment = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const commentElement = socialComment.cloneNode(true);
    const commentImg = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentImg.src = avatar;
    commentImg.alt = name;
    commentImg.HEIGHT = commentAvatarSize.HEIGHT;
    commentImg.WIDTH = commentAvatarSize.WIDTH;

    commentText.textContent = message;

    commentFragment.appendChild(commentElement);
  });
  return commentFragment;
};

const createBigPicture = (id) => {
  const picture = pictures.find((picturesElement) => picturesElement.id === Number(id));
  if (!picture) {
    return;
  }
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  bigPictureLikes.textContent = picture.likes;
  commentTotalCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
  socialComments.innerHTML = '';

  socialComments.appendChild(createComment(picture.comments));
};

const openBigPicture = () => {
  createBigPicture();

  bigPicture.classList.remove('hidden');
  showComment.classList.add('hidden');
  buttonCommentsLoader.classList.add('hidden');
  body.classList.add('.modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const onClickPicture = (evt) => {
  evt.preventDefault();
  const pictureTarget = evt.target.closest('.picture');
  const pictureId = pictureTarget.dataset.id;

  if (pictureId) {
    createBigPicture(pictureId);
    openBigPicture();
  }
};

picturesContainer.addEventListener('click', onClickPicture);
