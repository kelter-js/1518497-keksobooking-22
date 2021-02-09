/* eslint-disable */
function getRandomNumber (from, to) {
  if (from == to) {
    return from;
  }
  if (to < from) {
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
  const result = amountDigitals == 0 ? Math.trunc(start + Math.random() * (end - start)) : +(start + Math.random() * (end - start)).toFixed(amountDigitals);
  if (result > end) {
   const numberIntoString = String(end);
   return +(numberIntoString.slice(0, numberIntoString.indexOf(".") + amountDigitals + 1));
  } else {
   return result;
  }
}
/* eslint-enable */
