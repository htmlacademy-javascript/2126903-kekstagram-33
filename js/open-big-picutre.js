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

let onDocumentKeydown = () => { };

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  showComment.classList.remove('hidden');
  buttonCommentsLoader.classList.remove('hidden');
  body.classList.remove('.modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
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
  const { url, description, likes, comments } = picture;
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  commentTotalCount.textContent = comments.length;
  bigPictureDescription.textContent = description;
  socialComments.innerHTML = '';

  socialComments.appendChild(createComment(comments));
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
