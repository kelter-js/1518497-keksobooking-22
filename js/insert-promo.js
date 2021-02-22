import {deleteNode, fillNodeProperty} from './service.js';

function featuresChecker (templateNode, promoObjectFeatures) {
  const FEATURES_CLASS_ARRAY = [];
  const GENERATED_FEATURES = promoObjectFeatures;
  for(let i=0;i<GENERATED_FEATURES.length;i++) {
    FEATURES_CLASS_ARRAY.push(`popup__feature--${GENERATED_FEATURES[i]}`);
  }
  const FEATURES_ITEMS = templateNode.querySelectorAll('.popup__feature');
  for (let i=0;i<FEATURES_ITEMS.length;i++){
    let currentClasses = FEATURES_ITEMS[i].classList;
    if(!FEATURES_CLASS_ARRAY.includes(currentClasses[1])) {
      FEATURES_ITEMS[i].remove();
    }
  }
}

function createPhoto (src) {
  const PHOTO = document.createElement('img');
  PHOTO.classList.add('popup__photo');
  PHOTO.width = 45;
  PHOTO.height = 40;
  PHOTO.alt = 'Фотография жилья';
  PHOTO.src = src;
  return PHOTO;
}

function insertPhotos (templateNode, promoObjectPhotos) {
  const FIRST_PHOTO = templateNode.querySelector('.popup__photo');
  FIRST_PHOTO.src = promoObjectPhotos[0];
  promoObjectPhotos.shift();
  for(let i=0;i<promoObjectPhotos.length;i++) {
    let currentPhoto = createPhoto(promoObjectPhotos[i]);
    templateNode.append(currentPhoto);
  }
}

function insertPromo (obj) {
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
  const offer = obj.offer;
  const author = obj.author;
  const TYPE = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  }

  offer.title ? fillNodeProperty(TEMPLATE_TITLE, offer.title) : deleteNode(TEMPLATE_TITLE);
  offer.address ? fillNodeProperty(TEMPLATE_ADDRESS, offer.address) : deleteNode(TEMPLATE_ADDRESS);
  offer.price ? fillNodeProperty(TEMPLATE_PRICE, `${offer.price} ₽/ночь`) : deleteNode(TEMPLATE_PRICE);
  offer.type ? fillNodeProperty(TEMPLATE_TYPE, TYPE[offer.type]) : deleteNode(TEMPLATE_TYPE);
  offer.rooms && offer.guests ? fillNodeProperty(TEMPLATE_CAPACITY, `${offer.rooms} комнаты для ${offer.guests} гостей`) : deleteNode(TEMPLATE_CAPACITY);
  offer.checkin && offer.checkout ? fillNodeProperty(TEMPLATE_TIME, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`) : deleteNode(TEMPLATE_TIME);
  featuresChecker(TEMPLATE_FEATURES, offer.features);
  offer.description ? fillNodeProperty(TEMPLATE_DESCRIPTION, offer.description) : deleteNode(TEMPLATE_DESCRIPTION);
  insertPhotos(TEMPLATE_PHOTOS, offer.photos);
  author.avatar ? TEMPLATE_AVATAR.src = author.avatar : deleteNode(TEMPLATE_AVATAR);

  DESTINATION.append(TEMPLATE_INNER);
}

export {insertPromo};
