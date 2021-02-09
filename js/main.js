/* eslint-disable */
function getRandomNumber (from, to) {
  if (from == to) {
    return from;
  }

  if (to < from) {
    console.log('Конечное значение диапазона меньше, чем его начало. Измените входные параметры.');
    return;
  }

  if (from < 0 || to < 0) {
    console.log('Конечное или начальное значения диапазона не могут быть отрицательными. Измените входные параметры.');
    return;
  }

  return Math.floor(Math.random() * (Math.floor(to) - Math.ceil(from) + 1)) + Math.ceil(from);
}

function getRandomNumberFloat (from, to, amountDigitals) {
  if (from == to) {
    return from;
  }

  if (to < from) {
    console.log('Конечное значение диапазона меньше, чем его начало. Измените входные параметры.');
    return;
  }

  if (from < 0 || to < 0) {
    console.log('Конечное или начальное значения диапазона не могут быть отрицательными. Измените входные параметры.');
    return;
  }

  const result = amountDigitals == 0 ? Math.trunc(from + Math.random() * (to - from)) : +(from + Math.random() * (to - from)).toFixed(amountDigitals);
  if (result > to) {
    const numberIntoString = String(to);
    return +(numberIntoString.slice(0, numberIntoString.indexOf('.') + amountDigitals + 1));
  } else {
    return result;
  }
}

getRandomNumber(0, 5);

getRandomNumberFloat(1.51, 1.59, 1);

/* eslint-enable */
