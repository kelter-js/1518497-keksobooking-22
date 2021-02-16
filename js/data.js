import {getRandomNumber, getRandomNumberFloat, shuffleArray, cutArrayByRandomNumber, makeGalleryArray, getRandomArrayElement} from './service.js';

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
const coordinateXMin = 35.65;
const coordinateXMax = 35.7;
const coordinateYMin = 139.7;
const coordinateYMax = 139.8;
const coordinatesDigitalsAmount = 5;

function generatePromo () {
  const coordinatesX = getRandomNumberFloat(coordinateXMin, coordinateXMax, coordinatesDigitalsAmount);
  const coordinatesY = getRandomNumberFloat(coordinateYMin, coordinateYMax, coordinatesDigitalsAmount);

  const promoObject = {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(MIN_VALUE, USER_AVATAR_MAX_RANGE)}.png`,
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

export {generatePromo, generateBunchPromos};
