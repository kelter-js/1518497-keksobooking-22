import {setNodeProperty, setElementProperties, pluralSelector, wipeNode, setNodeContent} from './service.js';

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
const AMOUNT_OF_ROOMS = document.querySelector('#room_number');
const GUESTS_AMOUNT_ELEMENT = document.querySelector('#capacity');
const AMOUNT_OF_GUESTS = [...GUESTS_AMOUNT_ELEMENT.querySelectorAll('option')];
const CHECKOUT_TIME_FIELDSET = document.querySelector('.ad-form__element--time');
const PROMO_HEADER_ELEMENT = document.querySelector('#title');

const MIN_PROMO_HEADER_LENGTH = 30;
const MAX_PROMO_HEADER_LENGTH = 100;
const ENABLE_PROPERTY = true;
const PRICE_ELEMENT_TYPE = 'number';
const MAX_PRICE_BY_NIGHT =  1000000;
const FIRST_GUESTS_OPTION = [AMOUNT_OF_GUESTS[2]];
const SECOND_GUESTS_OPTION = [1, 2].map(item => AMOUNT_OF_GUESTS[item]);
const THIRD_GUESTS_OPTION = [0, 1, 2].map(item => AMOUNT_OF_GUESTS[item]);
const FOURTH_GUESTS_OPTION = [AMOUNT_OF_GUESTS[3]];
const SYNC_GROUP_OPTIONS = [FIRST_GUESTS_OPTION, SECOND_GUESTS_OPTION, THIRD_GUESTS_OPTION, FOURTH_GUESTS_OPTION];

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

function onElementInput () {
  elementValiditySetter(this, '');
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

function getCurrentPrice () {
  return TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex];
}

function onChangeType (element) {
  return () => {
    const currentPrice = getCurrentPrice();
    setElementProperties(element, ['placeholder', 'min'], [currentPrice, currentPrice])
  }
}

function onChangeCheckTime (firstDependent, secondDependent) {
  return (evt) => {
    const index = evt.target.selectedIndex;
    setNodeProperty(firstDependent, 'selectedIndex', index);
    setNodeProperty(secondDependent, 'selectedIndex', index);
  }
}

function onChangeSyncGroupElements (mainGroup, syncGroup, options) {
  return () => {
    wipeNode(syncGroup);
    setNodeContent(syncGroup, options[mainGroup.selectedIndex]);
  }
}

setNodeProperty(PROMO_HEADER_ELEMENT, 'required', ENABLE_PROPERTY);
setElementProperties(PRICE_BY_NIGHT, ['placeholder', 'min', 'required', 'type', 'max'], [getCurrentPrice(), getCurrentPrice(), ENABLE_PROPERTY, PRICE_ELEMENT_TYPE, MAX_PRICE_BY_NIGHT]);
onChangeSyncGroupElements(AMOUNT_OF_ROOMS, GUESTS_AMOUNT_ELEMENT, SYNC_GROUP_OPTIONS)();

PROMO_HEADER_ELEMENT.addEventListener('change', onElementChange(PROMO_HEADER_MESSAGE_WORDSET, MIN_PROMO_HEADER_LENGTH, MAX_PROMO_HEADER_LENGTH));
PROMO_HEADER_ELEMENT.addEventListener('input', onElementInput);
PRICE_BY_NIGHT.addEventListener('change', onElementChange(PROMO_PRICE_MESSAGE_WORDSET, TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex], MAX_PRICE_BY_NIGHT));
PRICE_BY_NIGHT.addEventListener('input', onElementInput);
CHECKOUT_TIME_FIELDSET.addEventListener('change', onChangeCheckTime(CHECKOUT_TIME, CHECKIN_TIME));
TYPE_SELECT_ELEMENT.addEventListener('change', onChangeType(PRICE_BY_NIGHT));
AMOUNT_OF_ROOMS.addEventListener('change', onChangeSyncGroupElements(AMOUNT_OF_ROOMS, GUESTS_AMOUNT_ELEMENT, SYNC_GROUP_OPTIONS));

export {onChangeSyncGroupElements, AMOUNT_OF_ROOMS, GUESTS_AMOUNT_ELEMENT, SYNC_GROUP_OPTIONS}
