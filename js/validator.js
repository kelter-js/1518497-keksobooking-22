import {setNodeProperty, setElementProperties, pluralSelector, deleteNode} from './service.js';

const TYPE_PRICES = [
  0,
  1000,
  5000,
  10000,
];

const TYPE_SELECT_ELEMENT = document.querySelector('#type');
const PRICE_BY_NIGHT = document.querySelector('#price');
const CHECKIN_TIME = document.querySelector('#timein');
const CHECKOUT_TIME = document.querySelector('#timeout');
const AMOUNT_OF_ROOMS_ELEMENT = document.querySelector('#room_number');
const AMOUNT_OF_GUESTS_ELEMENT = [...document.querySelectorAll('#capacity > option')];

const CHECKOUT_TIME_FIELDSET = document.querySelector('.ad-form__element--time');
const PROMO_HEADER_ELEMENT = document.querySelector('#title');

const MIN_PROMO_HEADER_LENGTH = 30;
const MAX_PROMO_HEADER_LENGTH = 100;
const ENABLE_PROPERTY = true;
const PRICE_ELEMENT_TYPE = 'number';
const MAX_PRICE_BY_NIGHT =  1000000;
const FIRST_GUESTS_GROUP = [2];
const SECOND_GUESTS_GROUP = [1, 2];
const THIRD_GUESTS_GROUP = [0, 1, 2];
const FOURTH_GUESTS_GROUP = [3];
const SYNC_GROUP_OPTIONS = [filterGuestsList.bind(null, AMOUNT_OF_GUESTS_ELEMENT, FIRST_GUESTS_GROUP), filterGuestsList.bind(null, AMOUNT_OF_GUESTS_ELEMENT, SECOND_GUESTS_GROUP), filterGuestsList.bind(null, AMOUNT_OF_GUESTS_ELEMENT, THIRD_GUESTS_GROUP),  filterGuestsList.bind(null, AMOUNT_OF_GUESTS_ELEMENT, FOURTH_GUESTS_GROUP)];

const PROMO_HEADER_MESSAGE_WORDSET = {
  one: `Заголовок объявления не может быть меньше, чем ${MIN_PROMO_HEADER_LENGTH}.`,
  few: `Заголовок объявления не может быть больше, чем ${MAX_PROMO_HEADER_LENGTH}.`,
  many: '',
};

const PROMO_PRICE_MESSAGE_WORDSET = {
  one: `Цена за ночь не может быть меньше, чем ${TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex]}.`,
  few: `Цена за ночь не может быть больше, чем ${MAX_PRICE_BY_NIGHT}.`,
  many: '',
};

function elementValiditySetter (element, validityMessage) {
  element.setCustomValidity(validityMessage);
  element.reportValidity();
}

function onElementChange (wordset, min, max) {
  return (evt) => {
    const target = evt.currentTarget;
    const condition = target.type === PRICE_ELEMENT_TYPE;
    const elementValue = condition ? target.value : target.value.length;
    const validityMessage = pluralSelector(wordset, elementValue, min, max, elementValue < min, elementValue > max);
    elementValiditySetter(target, validityMessage);
  }
}

function onElementInput () {
  this.setCustomValidity('');
  this.reportValidity();
}

function onChangeType () {
  PRICE_BY_NIGHT.placeholder = TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex];
  PRICE_BY_NIGHT.min = PRICE_BY_NIGHT.placeholder;
}

function onChangeCheckTime (evt) {
  switch (evt.target) {
    case CHECKIN_TIME:
      CHECKOUT_TIME.selectedIndex = CHECKIN_TIME.selectedIndex;
      break;
    case CHECKOUT_TIME:
      CHECKIN_TIME.selectedIndex = CHECKOUT_TIME.selectedIndex;
  }
}

function filterGuestsList (guests, guestPlaces) {
  guests.map((item, index) => {
    if(!guestPlaces.includes(index)) {
      deleteNode(item);
    }
  })
}

function enableGuests (guests) {
  const currentGuests = document.querySelector('#capacity');
  guests.map((item) => currentGuests.append(item));
}

function onChangeSyncGroupElements (mainGroup, syncGroup) {
  return () => {
    enableGuests(syncGroup);
    SYNC_GROUP_OPTIONS[mainGroup.selectedIndex]();
  }
}

setNodeProperty(PROMO_HEADER_ELEMENT, 'required', ENABLE_PROPERTY);
setElementProperties(PRICE_BY_NIGHT, ['placeholder', 'min', 'required', 'type', 'max'], [TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex], TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex], ENABLE_PROPERTY, PRICE_ELEMENT_TYPE, MAX_PRICE_BY_NIGHT]);
onChangeSyncGroupElements(AMOUNT_OF_ROOMS_ELEMENT, AMOUNT_OF_GUESTS_ELEMENT)();

PROMO_HEADER_ELEMENT.addEventListener('change', onElementChange(PROMO_HEADER_MESSAGE_WORDSET, MIN_PROMO_HEADER_LENGTH, MAX_PROMO_HEADER_LENGTH));
PROMO_HEADER_ELEMENT.addEventListener('input', onElementInput);
PRICE_BY_NIGHT.addEventListener('change', onElementChange(PROMO_PRICE_MESSAGE_WORDSET, TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex], MAX_PRICE_BY_NIGHT));
PRICE_BY_NIGHT.addEventListener('input', onElementInput);
CHECKOUT_TIME_FIELDSET.addEventListener('change', onChangeCheckTime);
TYPE_SELECT_ELEMENT.addEventListener('change', onChangeType);
AMOUNT_OF_ROOMS_ELEMENT.addEventListener('change', onChangeSyncGroupElements(AMOUNT_OF_ROOMS_ELEMENT, AMOUNT_OF_GUESTS_ELEMENT))
