// Task 1

const stringLength = (string, fixLength) => string.length <= fixLength;

stringLength('проверяемая строка', 20); // true

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

checkPalindrom('топот'); // true

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
  return Number(stringNumber);
};

parseNumber('2023 год'); // 2023

// parseNumber('ECMAScript 2022');     // 2022
// parseNumber('1 кефир, 0.5 батона'); // 105
// parseNumber('агент 007');           // 7
// parseNumber('а я томат');           // NaN
// parseNumber(2023); // 2023
// parseNumber(-1);   // 1
// parseNumber(1.5);  // 15

// Task 4

const timeInMinuters = (time) => {
  const arrayTime = time.split(':');
  const minuters = arrayTime[0] * 60 + Number(arrayTime[1]);
  return minuters;
};

const checkMeet = (startDay, endDay, startMeet, timeMeet) => timeInMinuters(startMeet) + timeMeet >= timeInMinuters(startDay) && timeInMinuters(startMeet) + timeMeet <= timeInMinuters(endDay);

checkMeet('08:00', '17:30', '14:00', 90);

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
// имяФункции('08:00', '17:30', '14:00', 90); // true
// имяФункции('8:0', '10:0', '8:0', 120);     // true
// имяФункции('08:00', '14:30', '14:00', 90); // false
// имяФункции('14:00', '17:30', '08:0', 90);  // false
// имяФункции('8:00', '17:30', '08:00', 900); // false
