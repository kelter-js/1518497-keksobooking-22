import {switchNodeContent, wipeNode} from './service.js';

const IMAGE_WIDTH = 45;
const IMAGE_HEIGHT = 40;
const IMAGE_DESCRIPTION = 'Фотография жилья';
const MIN_GUEST_SELECTOR = 1;
const MAX_GUEST_SELECTOR = 4;
const GUEST_WORD_SET = {
  one: 'гостя',
  few: 'гостей',
};

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
  const imageElement = document.createElement('img');
  imageElement.classList.add('popup__photo');
  imageElement.src = src;
  imageElement.width = IMAGE_WIDTH;
  imageElement.height = IMAGE_HEIGHT;
  imageElement.alt = IMAGE_DESCRIPTION;
  return imageElement;
}

function insertPhotos (templateNode, promoObjectPhotos) {
  wipeNode(templateNode);
  promoObjectPhotos.map((item) => templateNode.append(createPhoto(item)));
}

function describeRooms (amountOfRooms) {
  if(!AMOUNT_OF_ROOMS_DESCRIPTION[amountOfRooms]) return `${amountOfRooms} комнат`
  return AMOUNT_OF_ROOMS_DESCRIPTION[amountOfRooms];
}

function pluralSelector ({one, few, many}, selector) {
  if (selector === MIN_GUEST_SELECTOR) {
    return one;
  }
  if (selector <= MAX_GUEST_SELECTOR) {
    return few || many;
  }
}

function insertPromo (promo) {
  const offer = promo.offer;
  const author = promo.author;

  const cardTemplate = document.querySelector('#card').content;
  const templateInner = cardTemplate.querySelector('.popup').cloneNode(true);
  const templateTitle = templateInner.querySelector('.popup__title');
  const templateAddress = templateInner.querySelector('.popup__text--address');
  const templatePrice = templateInner.querySelector('.popup__text--price');
  const templateType = templateInner.querySelector('.popup__type');
  const templateCapacity = templateInner.querySelector('.popup__text--capacity');
  const templateTime = templateInner.querySelector('.popup__text--time');
  const templateFeatures = templateInner.querySelector('.popup__features');
  const templateDescription = templateInner.querySelector('.popup__description');
  const templatePhotos = templateInner.querySelector('.popup__photos');
  const templateAvatar = templateInner.querySelector('.popup__avatar');


  switchNodeContent(offer.title, templateTitle);
  switchNodeContent(offer.address, templateAddress);
  switchNodeContent(offer.price, templatePrice, `${offer.price} ₽/ночь`);
  switchNodeContent(offer.type, templateType, PROMO_TYPE[offer.type]);
  switchNodeContent(offer.rooms && offer.guests, templateCapacity, `${describeRooms(offer.rooms)} для ${offer.guests} ${pluralSelector(GUEST_WORD_SET, offer.guests)}`);
  switchNodeContent(offer.checkin && offer.checkout, templateTime, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  featuresEnabler(templateFeatures, featuresChecker(templateFeatures, offer.features));
  switchNodeContent(offer.description, templateDescription);
  insertPhotos(templatePhotos, offer.photos);
  switchNodeContent(author.avatar, templateAvatar, author.avatar, 'src');

  return templateInner;
}

export {insertPromo};
