function getRandomNumber (from, to, amountDigitals) {
  if(!(from === Math.abs(from) && to === Math.abs(to))) {
    alert('Диапазон должен быть положительным.');
    return;
  }
  let result = (Math.random() * (to - from + 1) + from).toFixed(amountDigitals);
  return to <= from ? alert('Конец диапазона не может быть меньше, либо равен его началу.') : result;
}

getRandomNumber(0,5,2)
