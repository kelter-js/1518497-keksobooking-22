import {PROMO_ELEMENT, FILTER_ELEMENT, PROMO_FIELDSET_ELEMENTS, FILTER_SELECT_ELEMENTS} from './page-disabler.js';
import {deleteClassFromNode, setElementsProperty, setNodeProperty} from './service.js';

const ENABLE_CONDITION = true;
const DISABLE_CONDITION = false;
const ADDRESS_ELEMENT = document.querySelector('#address');

function onMapLoad ({lat, lng}) {
  return () => {
    deleteClassFromNode(PROMO_ELEMENT, 'ad-form--disabled');
    deleteClassFromNode(FILTER_ELEMENT, 'map__filters--disabled');
    setElementsProperty(PROMO_FIELDSET_ELEMENTS, 'disabled', DISABLE_CONDITION);
    setElementsProperty(FILTER_SELECT_ELEMENTS, 'disabled', DISABLE_CONDITION);
    setNodeProperty(ADDRESS_ELEMENT, 'value', `${lat}, ${lng}`);
    setNodeProperty(ADDRESS_ELEMENT, 'readOnly', ENABLE_CONDITION);
  }
}


export {onMapLoad, ADDRESS_ELEMENT}
