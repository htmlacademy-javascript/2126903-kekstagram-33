// Task 1

const stringLength = (string, fixLength) => string.length <= fixLength;

// console.log(stringLength('проверяемая строка', 20)); // true
// console.log(stringLength('проверяемая строка', 18)); //true
// console.log(stringLength('проверяемая строка', 10)); //false

// Task 2

const checkPalindrom = (string) => {
  const newString = string.toUpperCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    reverseString += newString.at(i);
  }
  return newString === reverseString;
};

// checkPalindrom('топот'); // true
// checkPalindrom('ДовОд'); // true
// checkPalindrom('Кекс');  // false
// checkPalindrom('Лёша на полке клопа нашёл '); // true

// Task 3

const parseNumber = (string) => {
  const newString = string.toString();
  let stringNumber = '';
  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(Number(newString[i])) && Number(newString[i]) && newString[i] !== ' ') {
      stringNumber += newString[i];
    }
  }
  if (stringNumber === '') {
    return NaN;
  }
  return stringNumber;
};

// parseNumber('2023 год');            // 2023
// parseNumber('ECMAScript 2022');     // 2022
// parseNumber('1 кефир, 0.5 батона'); // 105
// parseNumber('агент 007');           // 7
// parseNumber('а я томат');           // NaN
// parseNumber(2023); // 2023
// parseNumber(-1);   // 1
// parseNumber(1.5);  // 15
