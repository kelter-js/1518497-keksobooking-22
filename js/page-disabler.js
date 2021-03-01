import {addClassToNode, setElementsProperty} from './service.js';

const PROMO_ELEMENT = document.querySelector('.ad-form');
const FILTERS_ELEMENT = document.querySelector('.map__filters');
const PROMO_FIELDSET_ELEMENTS = PROMO_ELEMENT.querySelectorAll('fieldset');
const FILTERS_SELECT_ELEMENTS = FILTERS_ELEMENT.querySelectorAll('select');
const DISABLE_CONDITION = true;

function pageDisabler () {
  addClassToNode(PROMO_ELEMENT, 'ad-form--disabled');
  addClassToNode(FILTERS_ELEMENT, 'map__filters--disabled');
  setElementsProperty(PROMO_FIELDSET_ELEMENTS, DISABLE_CONDITION);
  setElementsProperty(FILTERS_SELECT_ELEMENTS, DISABLE_CONDITION);
}

export {pageDisabler};

