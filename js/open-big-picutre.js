import { isEscKey, numDecline } from './util';

const CommentAvatarSize = {
  HEIGHT: 35,
  WIDTH: 35
};

const COMMENTS_STEP = 5;

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
  commentImg.HEIGHT = CommentAvatarSize.HEIGHT;
  commentImg.WIDTH = CommentAvatarSize.WIDTH;
  commentText.textContent = comment.message;
  return commentElement;
};

const renderComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length < COMMENTS_STEP || commentsCount >= currentComments.length) {
    buttonCommentsLoader.classList.add('hidden');
  } else {
    buttonCommentsLoader.classList.remove('hidden');
  }

  socialCommentCount.innerHTML = `<span class='social__comment-shown-count'>${commentsCount}</span> из <span class='social__comment-total-count'>${currentComments.length}</span> ${numDecline(currentComments.length, 'комментария', 'комментариев', 'комментариев')}`;

  commentsSelected.forEach((comment) => {
    socialComments.appendChild(createComment(comment));
  });
};

const onCommentsLoaderClick = () => {
  commentsCount += COMMENTS_STEP;
  renderComments();
};

const createBigPicture = (picture) => {
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
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  createBigPicture(picture);

  buttonCommentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', closeBigPicture);
};

buttonCommentsLoader.removeEventListener('click', onCommentsLoaderClick);

export { openBigPicture };

