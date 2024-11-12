const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (object) => getRandomInteger(object.MIN, object.MAX);

const isEscKey = (evt) => evt.key === 'Escape';


export { getRandomInteger, getRandomElement, isEscKey };
