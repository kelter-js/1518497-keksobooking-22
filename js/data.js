import {getRandomNumber, getRandomNumberFloat, shuffleArray, cutArrayByRandomNumber, getRandomArrayElement} from './service.js';

const PROMO_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Small`n`cozy place to rest',
  'Clean and bright, free meals twice a day',
  'We sanitarize space after each our guest, its safe. Also building is isolated from city, so you can throw a party, if you wish to',
  'We allow to settle our guests only if they are without any pets, no smoking or even loud music',
];
const TITLES = [
  'Ravenholm',
  'Edoras',
  'New Vegas',
  'Tristram',
];

const MIN_PRICE = 1000;
const MAX_PRICE = 5000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 15;
const MIN_GUESTS = 1;
const MAX_GUESTS = 4;
const MIN_GALLERY_LENGTH = 1;
const MAX_GALLERY_LENGTH = 30;
const MIN_CHECKING_TIME = 12;
const MAX_CHECKING_TIME = 14;
const MIN_RANGE_USER_AVATAR = 1;
const MAX_RANGE_USER_AVATAR = 8;
const COORDINATE_X_MIN = 35.65;
const COORDINATE_X_MAX = 35.7;
const COORDINATE_Y_MIN = 139.7;
const COORDINATE_Y_MAX = 139.8;
const COORDINATES_DIGITALS_AMOUNT = 5;
const ARRAY_ELEMENTS_AMOUNT = 10;

function makeGalleryArray (start, end) {
  return new Array(getRandomNumber(start, end)).fill('').map((item, index) => `http://o0.github.io/assets/images/tokyo/hotel${++index}.jpg`);
}

function generatePromo () {
  const coordinatesX = getRandomNumberFloat(COORDINATE_X_MIN, COORDINATE_X_MAX, COORDINATES_DIGITALS_AMOUNT);
  const coordinatesY = getRandomNumberFloat(COORDINATE_Y_MIN, COORDINATE_Y_MAX, COORDINATES_DIGITALS_AMOUNT);

  const promoObject = {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(MIN_RANGE_USER_AVATAR, MAX_RANGE_USER_AVATAR)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${coordinatesX}, ${coordinatesY}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(PROMO_TYPE),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: `${getRandomNumber(MIN_CHECKING_TIME, MAX_CHECKING_TIME)}:00`,
      features: cutArrayByRandomNumber(shuffleArray(FEATURES)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: makeGalleryArray(MIN_GALLERY_LENGTH, MAX_GALLERY_LENGTH),
    },
    location: {
      x: coordinatesX,
      y: coordinatesY,
    },
  }

  return promoObject;
}

function generateBunchPromos () {
  return [...Array(ARRAY_ELEMENTS_AMOUNT)].map(() => generatePromo());
}

export {generatePromo, generateBunchPromos};
