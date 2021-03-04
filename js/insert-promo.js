import {switchNodeContent, wipeNode} from './service.js';

const CARD_TEMPLATE = document.querySelector('#card').content;
const IMAGE_WIDTH = 45;
const IMAGE_HEIGHT = 40;
const IMAGE_DESCRIPTION = 'Фотография жилья';

const MIN_GUESTS_SELECTOR = 1;
const MAX_GUESTS_SELECTOR = 4;
const GUEST_WORD_SET = {
  one: 'гостя',
  few: 'гостей',
  many: 'гостей',
};

const MIN_ROOMS_SELECTOR = 1;
const MIDDLE_ROOMS_SELECTOR = 4;
const ROOM_WORD_SET = {
  one: 'комната',
  few: 'комнаты',
  many: 'комнат',
};

const PROMO_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

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

function pluralSelector ({one, few, many}, selector, minValue, maxValue) {
  if (selector === minValue) {
    return one;
  }
  if (selector <= maxValue) {
    return few;
  }
  return many;
}

function insertPromo (promo) {
  const offer = promo.offer;
  const author = promo.author;
  const templateInner = CARD_TEMPLATE.querySelector('.popup').cloneNode(true);
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
  switchNodeContent(offer.rooms && offer.guests, templateCapacity, `${offer.rooms} ${pluralSelector(ROOM_WORD_SET, offer.rooms, MIN_ROOMS_SELECTOR, MIDDLE_ROOMS_SELECTOR)} для ${offer.guests} ${pluralSelector(GUEST_WORD_SET, offer.guests, MIN_GUESTS_SELECTOR, MAX_GUESTS_SELECTOR)}`);
  switchNodeContent(offer.checkin && offer.checkout, templateTime, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  featuresEnabler(templateFeatures, featuresChecker(templateFeatures, offer.features));
  switchNodeContent(offer.description, templateDescription);
  insertPhotos(templatePhotos, offer.photos);
  switchNodeContent(author.avatar, templateAvatar, author.avatar, 'src');

  return templateInner;
}

export {insertPromo};
