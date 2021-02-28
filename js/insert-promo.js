import {switchNodeContent, wipeNode} from './service.js';

const IMAGE_WIDTH = 45;
const IMAGE_HEIGHT = 40;
const IMAGE_DESCRIPTION = 'Фотография жилья';

const PROMO_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const AMOUNT_OF_ROOMS_DESCRIPTION = {
  1: '1 комната',
  2: '2 комнаты',
  3: '3 комнаты',
  4: '4 комнаты',
}

const CARD_TEMPLATE = document.querySelector('#card').content;
const TEMPLATE_INNER = CARD_TEMPLATE.querySelector('.popup').cloneNode(true);
const TEMPLATE_TITLE = TEMPLATE_INNER.querySelector('.popup__title');
const TEMPLATE_ADDRESS = TEMPLATE_INNER.querySelector('.popup__text--address');
const TEMPLATE_PRICE = TEMPLATE_INNER.querySelector('.popup__text--price');
const TEMPLATE_TYPE = TEMPLATE_INNER.querySelector('.popup__type');
const TEMPLATE_CAPACITY = TEMPLATE_INNER.querySelector('.popup__text--capacity');
const TEMPLATE_TIME = TEMPLATE_INNER.querySelector('.popup__text--time');
const TEMPLATE_FEATURES = TEMPLATE_INNER.querySelector('.popup__features');
const TEMPLATE_DESCRIPTION = TEMPLATE_INNER.querySelector('.popup__description');
const TEMPLATE_PHOTOS = TEMPLATE_INNER.querySelector('.popup__photos');
const TEMPLATE_AVATAR = TEMPLATE_INNER.querySelector('.popup__avatar');
const DESTINATION = document.querySelector('.map__canvas');

function generateFeaturesClasses (promoObjectFeatures) {
  return promoObjectFeatures.map((item) => `.popup__feature--${item}`);
}

function featuresChecker (templateNode, promoObjectFeatures) {
  return [...templateNode.querySelectorAll(`${generateFeaturesClasses(promoObjectFeatures)}`)];
}

function featuresEnabler (templateNode, elements) {
  wipeNode(templateNode);
  templateNode.append(...elements);
}

function createPhoto (src) {
  const IMAGE_ELEMENT = document.createElement('img');
  IMAGE_ELEMENT.classList.add('popup__photo');
  IMAGE_ELEMENT.src = src;
  IMAGE_ELEMENT.width = IMAGE_WIDTH;
  IMAGE_ELEMENT.height = IMAGE_HEIGHT;
  IMAGE_ELEMENT.alt = IMAGE_DESCRIPTION;
  return IMAGE_ELEMENT;
}

function insertPhotos (templateNode, promoObjectPhotos) {
  wipeNode(templateNode);
  promoObjectPhotos.map((item) => templateNode.append(createPhoto(item)));
}

function describeRooms (amountOfRooms) {
  if(!AMOUNT_OF_ROOMS_DESCRIPTION[amountOfRooms]) return `${amountOfRooms} комнат`
  return AMOUNT_OF_ROOMS_DESCRIPTION[amountOfRooms];
}

function describeGuests (amountOfGuests) {
  return amountOfGuests === 1 ? `гостя` : `гостей`;
}

function insertPromo (promo) {
  const offer = promo.offer;
  const author = promo.author;

  switchNodeContent(offer.title, TEMPLATE_TITLE);
  switchNodeContent(offer.address, TEMPLATE_ADDRESS);
  switchNodeContent(offer.price, TEMPLATE_PRICE, `${offer.price} ₽/ночь`);
  switchNodeContent(offer.type, TEMPLATE_TYPE, PROMO_TYPE[offer.type]);
  switchNodeContent(offer.rooms && offer.guests, TEMPLATE_CAPACITY, `${describeRooms(offer.rooms)} для ${offer.guests} ${describeGuests(offer.guests)}`);
  switchNodeContent(offer.checkin && offer.checkout, TEMPLATE_TIME, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  featuresEnabler(TEMPLATE_FEATURES, featuresChecker(TEMPLATE_FEATURES, offer.features));
  switchNodeContent(offer.description, TEMPLATE_DESCRIPTION);
  insertPhotos(TEMPLATE_PHOTOS, offer.photos);
  switchNodeContent(author.avatar, TEMPLATE_AVATAR, author.avatar, 'src');

  DESTINATION.append(TEMPLATE_INNER);
}

export {insertPromo};
