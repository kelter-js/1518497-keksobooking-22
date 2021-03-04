import {setNodeProperty, setElementProperties} from './service.js';

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
const CHECKOUT_TIME_FIELDSET = document.querySelector('.ad-form__element--time');
const PROMO_HEADER_ELEMENT = document.querySelector('#title');

const MIN_PROMO_HEADER_LENGTH = 30;
const MAX_PROMO_HEADER_LENGTH = 100;
const CONDITION_REQUIRED_PROPERTY = true;
const PRICE_ELEMENT_TYPE = 'number';
const MAX_PRICE_BY_NIGHT =  1000000;

setNodeProperty(PROMO_HEADER_ELEMENT, 'required', CONDITION_REQUIRED_PROPERTY);
setNodeProperty(PRICE_BY_NIGHT, 'placeholder', TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex]);
setElementProperties(PRICE_BY_NIGHT, ['placeholder', 'min', 'required', 'type', 'max'], [TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex], PRICE_BY_NIGHT.placeholder, CONDITION_REQUIRED_PROPERTY, PRICE_ELEMENT_TYPE, MAX_PRICE_BY_NIGHT]);


function onHeaderBlur (min, max) {
  return () => {
    const elementValueLength = PROMO_HEADER_ELEMENT.value.length;
    if(elementValueLength < min) {
      PROMO_HEADER_ELEMENT.setCustomValidity(`Заголовок объявления не может быть меньше, чем ${MIN_PROMO_HEADER_LENGTH}. Сейчас введено ${elementValueLength} символов.`);
    } else if (elementValueLength > max) {
      PROMO_HEADER_ELEMENT.setCustomValidity(`Заголовок объявления не может быть больше, чем ${MAX_PROMO_HEADER_LENGTH}. Сейчас введено ${elementValueLength} символов.`);
    } else {
      PROMO_HEADER_ELEMENT.setCustomValidity('');
    }
    PROMO_HEADER_ELEMENT.reportValidity();
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

PROMO_HEADER_ELEMENT.addEventListener('blur', onHeaderBlur(MIN_PROMO_HEADER_LENGTH, MAX_PROMO_HEADER_LENGTH));
PROMO_HEADER_ELEMENT.addEventListener('input', onElementInput);
CHECKOUT_TIME_FIELDSET.addEventListener('change', onChangeCheckTime);
TYPE_SELECT_ELEMENT.addEventListener('change', onChangeType);



