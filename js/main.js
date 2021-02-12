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
  const coordinatesX = getRandomNumberFloat(35.65, 35.7, 5);
  const coordinatesY = getRandomNumberFloat(139.7, 139.8, 5);
  const PROMO_TYPE = ['palace', 'flat', 'house', 'bungalow'];
  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const DESCRIPTIONS = ['Small`n`cozy place to rest', 'Clean and bright, free meals twice a day', 'We sanitarize space after each our guest, its safe. Also building is isolated from city, so you can throw a party, if you wish to', 'We allow to settle our guests only if they are without any pets, no smoking or even loud music'];
  const TITLES = ['Ravenholm', 'Edoras', 'New Vegas', 'Tristram'];
  const minPrice = 1000;
  const maxPrice = 5000;
  const minValue = 1;
  const maxRooms = 15;
  const maxGuests = 4;
  const maxGalleryLength = 30;
  const checkingMinTime = 12;
  const checkingMaxTime = 14;


  function shuffleArray (arr) {
    const newArr = [...arr].sort(() => Math.random() - 0.5);
    newArr.length = getRandomNumber(1, newArr.length);
    return newArr;
  };

  function makeGalleryArray (start, end) {
    return new Array(getRandomNumber(start, end)).fill('').map((item, index) => `http://o0.github.io/assets/images/tokyo/hotel${index+1}.jpg`);
  }

  function getRandomArrayElem (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  }

  const promoObject = {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(1, 8)}.png`
    },
    offer: {
      title: getRandomArrayElem(TITLES),
      address: `${coordinatesX}, ${coordinatesY}`,
      price: getRandomNumber(minPrice, maxPrice),
      type: getRandomArrayElem(PROMO_TYPE),
      rooms: getRandomNumber(minValue, maxRooms),
      guests: getRandomNumber(minValue, maxGuests),
      checkin: `${getRandomNumber(checkingMinTime, checkingMaxTime)}:00`,
      features: shuffleArray(FEATURES),
      description: getRandomArrayElem(DESCRIPTIONS),
      photos: makeGalleryArray(minValue, maxGalleryLength),
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
