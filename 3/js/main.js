const PHOTO_COUNT = 25;

const DESCRIPTION = [
  'Очень красивое фото!',
  'Посмотрите какой вид',
  'Это фото обязательно захватит мир!',
  'Посмотрите какой закат',
  'Случайная фотография, а получилось так классно!',
  'Я прирожденный фотограф'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Кристина',
  'Кирилл',
  'Камилла',
  'Варвара',
  'Никита',
  'Артем',
  'Даниэлла',
  'Антон',
  'Данил',
  'Диана',
  'Дамир',
];

const url = {
  MIN: 1,
  MAX: 25
};

const likes = {
  MIN: 15,
  MAX: 200
};

const avatar = {
  MIN: 1,
  MAX: 6
};

const COMMENTS = {
  MIN: 0,
  MAX: 30
};


const createIndex = () => {
  let currentCount = 1;
  return () => currentCount++;
};

const createIndexId = createIndex();
const createCommentId = createIndex();

// Альтернативный способ вместо замыкания для id фотографий и комментариев
// const createIndex = () => {
//   let currentCount = 0;
//   return count++;
// }

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (array) => getRandomInteger(array.MIN, array.MAX);

const createComments = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomElement(avatar)}.svg`,
  message: MESSAGE[getRandomInteger(0, MESSAGE.length - 1)],
  name: NAME[getRandomInteger(0, NAME.length - 1)],
});

const createPicture = () => ({
  id: createIndexId(),
  url: `photos/${getRandomElement(url)}.jpg`,
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomElement(likes),
  comments: Array.from({ length: getRandomElement(COMMENTS) }, createComments)
});

const pictures = Array.from({ length: PHOTO_COUNT }, createPicture);

console.log(pictures);