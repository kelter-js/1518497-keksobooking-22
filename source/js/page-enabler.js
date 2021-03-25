import {
  PROMO_ELEMENT,
  FILTER_ELEMENT,
  PROMO_FIELDSET_ELEMENTS,
  FILTER_SELECT_ELEMENTS,
  PROMO_ELEMENT_DISABLE_CLASS,
  FILTER_ELEMENT_DISABLE_CLASS
} from './page-disabler.js';

import {
  deleteClassFromNode,
  setElementsProperty,
  setNodeProperty
} from './service.js';

const ENABLE_CONDITION = true;
const DISABLE_CONDITION = false;
const ADDRESS_ELEMENT = document.querySelector('#address');

function setCurrentAddress (inputElement, {lat, lng}) {
  setNodeProperty(inputElement, 'value', `${lat}, ${lng}`);
}

function onMapLoad ({lat, lng}) {
  return () => {
    deleteClassFromNode(PROMO_ELEMENT, PROMO_ELEMENT_DISABLE_CLASS);
    deleteClassFromNode(FILTER_ELEMENT, FILTER_ELEMENT_DISABLE_CLASS);
    setElementsProperty(PROMO_FIELDSET_ELEMENTS, 'disabled', DISABLE_CONDITION);
    setElementsProperty(FILTER_SELECT_ELEMENTS, 'disabled', DISABLE_CONDITION);
    setCurrentAddress(ADDRESS_ELEMENT, {lat, lng});
    setNodeProperty(ADDRESS_ELEMENT, 'readOnly', ENABLE_CONDITION);
  }
}


export {
  onMapLoad,
  ADDRESS_ELEMENT,
  setCurrentAddress
}
