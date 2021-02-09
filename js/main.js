function getRandomNumber (from, to) {
   if (to <= from) {
    console.log('Конечное значение диапазона меньше, чем его начало. Измените входные параметры.');
    return;
  }
  const start = (from < 0) ? 0 : from;
  const end = (to < 0) ? 0 : to;
  return Math.floor(Math.random() * (Math.floor(end) - Math.ceil(start) + 1)) + Math.ceil(start);
}

function getRandomNumberFloat (from, to, amountDigitals) {
  if (to <= from) {
    console.log('Конечное значение диапазона меньше, чем его начало. Измените входные параметры.');
    return;
  }
  const start = (from < 0) ? 0 : from;
  const end = (to < 0) ? 0 : to;
  const result = (start + Math.random() * (end - start)).toFixed(amountDigitals);
  return result > end ? end : +result;
}
