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

PRICE_BY_NIGHT.placeholder = TYPE_PRICES[TYPE_SELECT_ELEMENT.selectedIndex];
PRICE_BY_NIGHT.min = PRICE_BY_NIGHT.placeholder;

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

CHECKOUT_TIME_FIELDSET.addEventListener('change', onChangeCheckTime);
TYPE_SELECT_ELEMENT.addEventListener('change', onChangeType);



