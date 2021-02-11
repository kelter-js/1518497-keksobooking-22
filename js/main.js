/* eslint-disable */
function getRandomNumber (from, to) {
  if (from === to) {
    console.log('Конечное значение диапазона cовпадает с начальным. Измените входные параметры.');
    return;
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
  if (from === to) {
    console.log('Конечное значение диапазона cовпадает с начальным. Измените входные параметры.');
    return;
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

function generatePromo () {
  const coordinatesX = getRandomNumberFloat(35.65000, 35.70000, 5);
  const coordinatesY = getRandomNumberFloat(139.70000, 139.80000, 5);
  const PROMO_TYPE = ['palace', 'flat', 'house', 'bungalow'];
  const CHECK_TIME = ['12:00', '13:00', '14:00'];
  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  function arrayShuffle (arr) {
    const newArr = [...arr].sort(() => Math.random() - 0.5);
    newArr.length = getRandomNumber(1, newArr.length);
    return newArr;
  };

  function makeGalleryArray (start, end) {
    let counter = 1 ;
    const gallery = new Array(getRandomNumber(start, end)).fill('').map(() => `http://o0.github.io/assets/images/tokyo/hotel${counter++}.jpg`);
    return gallery;
  }

  const promoObject = {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`
    },
    offer: {
      title: 'Ravenholm',
      address: `${coordinatesX}, ${coordinatesY}`,
      price: getRandomNumber(1000, 5000),
      type: PROMO_TYPE[getRandomNumber(0, PROMO_TYPE.length - 1)],
      rooms: getRandomNumber(1, 15),
      guests: getRandomNumber(1, 4),
      checkin: CHECK_TIME[getRandomNumber(0, CHECK_TIME.length - 1)],
      features: arrayShuffle(FEATURES),
      description: 'Small`n`cozy place to rest.',
      photos: makeGalleryArray(1, 30),
    },
    location: {
      x: coordinatesX,
      y: coordinatesY,
    },
  }
  return promoObject;
}

function generateBunchPromos () {
  const promos = new Array(10).fill('').map(() => generatePromo());
  return promos;
}

/* eslint-enable */
