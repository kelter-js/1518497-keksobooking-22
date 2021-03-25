import {
  addClassToNode,
  setElementsProperty
} from './service.js';

const PROMO_ELEMENT = document.querySelector('.ad-form');
const FILTER_ELEMENT = document.querySelector('.map__filters');
const PROMO_FIELDSET_ELEMENTS = PROMO_ELEMENT.querySelectorAll('fieldset');
const FILTER_SELECT_ELEMENTS = FILTER_ELEMENT.querySelectorAll('select');
const ENABLE_CONDITION = true;
const PROMO_ELEMENT_DISABLE_CLASS = 'ad-form--disabled';
const FILTER_ELEMENT_DISABLE_CLASS = 'map__filters--disabled';

function pageDisabler () {
  addClassToNode(PROMO_ELEMENT, PROMO_ELEMENT_DISABLE_CLASS);
  addClassToNode(FILTER_ELEMENT, FILTER_ELEMENT_DISABLE_CLASS);
  setElementsProperty(PROMO_FIELDSET_ELEMENTS, 'disabled', ENABLE_CONDITION);
  setElementsProperty(FILTER_SELECT_ELEMENTS, 'disabled', ENABLE_CONDITION);
}

pageDisabler();

export {
  pageDisabler,
  PROMO_ELEMENT,
  FILTER_ELEMENT,
  PROMO_FIELDSET_ELEMENTS,
  FILTER_SELECT_ELEMENTS,
  PROMO_ELEMENT_DISABLE_CLASS,
  FILTER_ELEMENT_DISABLE_CLASS
};

