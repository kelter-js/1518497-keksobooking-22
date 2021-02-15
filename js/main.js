/* eslint-disable */
const PROMO_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Small`n`cozy place to rest', 'Clean and bright, free meals twice a day', 'We sanitarize space after each our guest, its safe. Also building is isolated from city, so you can throw a party, if you wish to', 'We allow to settle our guests only if they are without any pets, no smoking or even loud music'];
const TITLES = ['Ravenholm', 'Edoras', 'New Vegas', 'Tristram'];
const MIN_PRICE = 1000;
const MAX_PRICE = 5000;
const MIN_VALUE = 1;
const MAX_ROOMS = 15;
const MAX_GUESTS = 4;
const MAX_GALLERY_LENGTH = 30;
const CHECKING_MIN_TIME = 12;
const CHECKING_MAX_TIME = 14;
const USER_AVATAR_MAX_RANGE = 8;

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

function shuffleArray (array) {
  const newArr = [...array].sort(() => Math.random() - 0.5);
  return newArr;
};

function cutArrayByRandomNumber (array) {
  array.length = getRandomNumber(1, array.length);
  return array;
};

function makeGalleryArray (start, end) {
  return new Array(getRandomNumber(start, end)).fill('').map((item, index) => `http://o0.github.io/assets/images/tokyo/hotel${index+1}.jpg`);
}

function getRandomArrayElement (array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function generatePromo () {
  const coordinatesX = getRandomNumberFloat(35.65, 35.7, 5);
  const coordinatesY = getRandomNumberFloat(139.7, 139.8, 5);

  const promoObject = {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(MIN_VALUE, USER_AVATAR_MAX_RANGE)}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${coordinatesX}, ${coordinatesY}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(PROMO_TYPE),
      rooms: getRandomNumber(MIN_VALUE, MAX_ROOMS),
      guests: getRandomNumber(MIN_VALUE, MAX_GUESTS),
      checkin: `${getRandomNumber(CHECKING_MIN_TIME, CHECKING_MAX_TIME)}:00`,
      features: cutArrayByRandomNumber(shuffleArray(FEATURES)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: makeGalleryArray(MIN_VALUE, MAX_GALLERY_LENGTH),
    },
    location: {
      x: coordinatesX,
      y: coordinatesY,
    },
  }

  return promoObject;
}

function generateBunchPromos () {
  return new Array(10).fill('').map(() => generatePromo());
}

/* eslint-enable */
