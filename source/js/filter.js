/* global _:readonly */
import {generatedPromos} from './get-data.js';

import {
  createMarkersOnMap,
  clearMap
} from './map.js';

const RENDER_DELAY = 500;

const FILTER_ELEMENTS = {
  FORM_ELEMENT: document.querySelector('.map__filters'),
  TYPE: document.querySelector('#housing-type'),
  PRICE: document.querySelector('#housing-price'),
  ROOMS: document.querySelector('#housing-rooms'),
  GUESTS: document.querySelector('#housing-guests'),
  FEATURES: document.querySelector('#housing-features'),
};

const FILTER_PRICE = {
  MIN: 10000,
  MAX: 50000,
}

const FILTER_PRICE_OPTIONS = {
  any: () => true,
  low: (price) => price <= FILTER_PRICE.MIN,
  middle: (price) => price >= FILTER_PRICE.MIN && price <= FILTER_PRICE.MAX,
  high: (price) => price >= FILTER_PRICE.MAX,
};

function filterByPluralOptions (comparedPromo, propertyName, option) {
  return (comparedPromo[propertyName] === option || option === 'any');
}

function filterByPrice (comparedPromo, price) {
  return FILTER_PRICE_OPTIONS[price](comparedPromo.price);
}

function getCheckedFeatures (node) {
  return [...node.querySelectorAll('input[type="checkbox"]:checked')].map((item) => item.value);
}

async function filterByField (loadedData) {
  createMarkersOnMap(applyFilters(await loadedData));
}

function filterByFeature (comparedPromo, selectedFeatures) {
  return selectedFeatures.every((selectedFeature) => comparedPromo.features.includes(selectedFeature));
}

function filterPromos (...args) {
  return ({offer}) => {
    return ((filterByPluralOptions(offer, 'type', args[0])) && (
      filterByPrice(offer, args[1])
    ) && (
      filterByPluralOptions(offer, 'rooms', args[2])
    ) && (
      filterByPluralOptions(offer, 'guests', args[3])
    ) && (
      filterByFeature(offer, args[4])
    ))
  }
}

function applyFilters (promos) {
  const type = FILTER_ELEMENTS.TYPE.value;
  const price = FILTER_ELEMENTS.PRICE.value;
  const rooms = FILTER_ELEMENTS.ROOMS.value === 'any' ? 'any' : +FILTER_ELEMENTS.ROOMS.value;
  const guests = FILTER_ELEMENTS.GUESTS.value === 'any' ? 'any' : +FILTER_ELEMENTS.GUESTS.value;
  const features = getCheckedFeatures(FILTER_ELEMENTS.FEATURES);
  return promos.filter(filterPromos(type, price, rooms, guests, features));
}

FILTER_ELEMENTS.FORM_ELEMENT.addEventListener('change', clearMap);
FILTER_ELEMENTS.FORM_ELEMENT.addEventListener('change', _.debounce(() => filterByField(generatedPromos), RENDER_DELAY));

export {getCheckedFeatures}
