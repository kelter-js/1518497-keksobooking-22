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

function filterByPluralOptions (propertyName, option) {
  return ({offer}) => (offer[propertyName] === option || option === 'any');
}

function filterByPrice (price) {
  return ({offer}) => FILTER_PRICE_OPTIONS[price](offer.price);
}

function getCheckedFeatures (node) {
  return [...node.querySelectorAll('input[type="checkbox"]:checked')].map((item) => item.value);
}

async function filterByField (loadedData) {
  createMarkersOnMap(applyFilters(await loadedData));
}

function filterByFeature (selectedFeatures) {
  return ({offer}) => selectedFeatures.every((selectedFeature) => offer.features.includes(selectedFeature));
}

function applyFilters (promos) {
  const type = FILTER_ELEMENTS.TYPE.value;
  const price = FILTER_ELEMENTS.PRICE.value;
  const rooms = FILTER_ELEMENTS.ROOMS.value === 'any' ? 'any' : +FILTER_ELEMENTS.ROOMS.value;
  const guests = FILTER_ELEMENTS.GUESTS.value === 'any' ? 'any' : +FILTER_ELEMENTS.GUESTS.value;
  const features = getCheckedFeatures(FILTER_ELEMENTS.FEATURES);

  const filteredPromos = promos
    .filter(filterByPluralOptions('type', type))
    .filter(filterByPrice(price))
    .filter(filterByPluralOptions('rooms', rooms))
    .filter(filterByPluralOptions('guests', guests))
    .filter(filterByFeature(features));
  return filteredPromos;
}

FILTER_ELEMENTS.FORM_ELEMENT.addEventListener('change', clearMap);
FILTER_ELEMENTS.FORM_ELEMENT.addEventListener('change', _.debounce(() => filterByField(generatedPromos), RENDER_DELAY));

export {getCheckedFeatures}
