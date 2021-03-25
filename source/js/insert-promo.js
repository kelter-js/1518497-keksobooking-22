import {
  switchSubNodeContent,
  findSubElement,
  wipeNode,
  pluralSelector,
  deleteNode
} from './service.js';

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
  if(!promoObjectFeatures.length) {
    deleteNode(templateNode);
    return '';
  }
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

function insertPhotos (templateNode, className, promoObjectPhotos) {
  const subElement = findSubElement(templateNode,className);
  wipeNode(subElement);
  promoObjectPhotos.map((item) => subElement.append(createPhoto(item)));
}

function insertPromo (promo) {
  const offer = promo.offer;
  const author = promo.author;

  const templateInner = CARD_TEMPLATE.cloneNode(true);
  const templateFeatures = templateInner.querySelector('.popup__features');


  const roomAmount = pluralSelector(ROOM_WORD_SET, offer.rooms, MIN_ROOMS_SELECTOR, MIDDLE_ROOMS_SELECTOR);
  const guestsAmount = pluralSelector(GUEST_WORD_SET, offer.guests, MIN_GUESTS_SELECTOR, MAX_GUESTS_SELECTOR);

  switchSubNodeContent(offer.title, templateInner, '.popup__title');
  switchSubNodeContent(offer.address, templateInner, '.popup__text--address');
  switchSubNodeContent(offer.price, templateInner, '.popup__text--price', `${offer.price} ₽/ночь`);
  switchSubNodeContent(offer.type, templateInner, '.popup__type', PROMO_TYPE[offer.type]);
  switchSubNodeContent(offer.rooms && offer.guests, templateInner, '.popup__text--capacity', `${offer.rooms} ${roomAmount} для ${offer.guests} ${guestsAmount}`);
  switchSubNodeContent(offer.checkin && offer.checkout, templateInner, '.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  featuresEnabler(templateFeatures, featuresChecker(templateFeatures, offer.features));
  switchSubNodeContent(offer.description, templateInner, '.popup__description');
  insertPhotos(templateInner, '.popup__photos', offer.photos);
  switchSubNodeContent(author.avatar, templateInner, '.popup__avatar', author.avatar, 'src');

  return templateInner;
}

export {insertPromo};
