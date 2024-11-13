const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElement = (object) => getRandomInteger(object.MIN, object.MAX);

const isEscKey = (evt) => evt.key === 'Escape';

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  const num1 = num % 10;
  const num2 = num % 100;

  if (num2 === 11 || num2 === 12 || num2 === 13 || num2 === 14) {
    return (genitivePlural);
  } else if (num1 >= 2 && num1 <= 4) {
    return (genitiveSingular);
  } else if (num1 === 1) {
    return (nominative);
  } else {
    return (genitivePlural);
  }
};


export { getRandomInteger, getRandomElement, isEscKey, numDecline };
