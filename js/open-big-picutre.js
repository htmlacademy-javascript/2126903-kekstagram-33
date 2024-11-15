import { pictures, commentAvatarSize, COMMENTS_STEP } from './data';
import { isEscKey, numDecline } from './util';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const buttonCommentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

let commentsCount = COMMENTS_STEP;
let currentComments = [];

const createComment = (comment) => {
  const commentElement = socialComment.cloneNode(true);
  const commentImg = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentImg.HEIGHT = commentAvatarSize.HEIGHT;
  commentImg.WIDTH = commentAvatarSize.WIDTH;
  commentText.textContent = comment.message;
  return commentElement;
};

const renderComments = () => {
  socialComments.innerHTML = '';
  socialCommentCount.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length < COMMENTS_STEP || commentsCount >= currentComments.length) {
    buttonCommentsLoader.classList.add('hidden');
  } else {
    buttonCommentsLoader.classList.remove('hidden');
  }

  socialCommentCount.innerHTML = `${commentsCount} из <span class='comments-count'>${currentComments.length}</span> ${numDecline(currentComments.length, 'комментария', 'комментариев', 'комментариев')}`;

  commentSelected.forEach((comment) => {
    socialComments.appendChild(createComment(comment));
  });
};

const onCommentsLoaderClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

const createBigPicture = (id) => {
  const picture = pictures.find((picturesElement) => picturesElement.id === Number(id));
  if (!picture) {
    return;
  }
  const { url, description, likes, comments } = picture;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  currentComments = comments;
  renderComments();
};

const closeBigPicture = () => {
  currentComments = [];
  commentsCount = COMMENTS_STEP;
  bigPicture.classList.add('hidden');
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('.modal-open');

  buttonCommentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', closeBigPicture);
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

buttonCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
picturesContainer.addEventListener('click', onClickPicture);
