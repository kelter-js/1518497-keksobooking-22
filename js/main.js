function getRandomNumber (from, to, amountDigitals) {
  from = (from !== Math.abs(from)) ? 0 : from;
  to = (to !== Math.abs(to)) ? 0 : to;
  if (to <= from) {
    [to, from] = [from, to];
  }
  return (Math.random() * (to - from + 1) + from).toFixed(amountDigitals);
}

getRandomNumber(0,5,2)
