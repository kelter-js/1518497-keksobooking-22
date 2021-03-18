import {generatedPromos} from './get-data.js';
import {createMarkersOnMap, map, removeMarkers, createdMarkers} from './map.js';
import {onFailToLoad} from './error.js';

const FILTER = {
  FORM_ELEMENT: document.querySelector('.map__filters'),
  BY_TYPE: document.querySelector('#housing-type'),
  BY_PRICE: document.querySelector('#housing-price'),
  BY_ROOMS: document.querySelector('#housing-rooms'),
  BY_GUESTS: document.querySelector('#housing-guests'),
  BY_FEATURES: document.querySelector('#housing-features'),
  LOW_PRICE_BY_NIGHT: 10000,
  HIGH_PRICE_BY_NIGHT: 50000,
};

const FILTER_PRICE_OPTIONS = {
  any: () => true,
  low: (price) => price <= FILTER.LOW_PRICE_BY_NIGHT,
  middle: (price) => price >= FILTER.LOW_PRICE_BY_NIGHT && price <= FILTER.HIGH_PRICE_BY_NIGHT,
  high: (price) => price >= FILTER.HIGH_PRICE_BY_NIGHT,
};

function filterByPluralOptions (propertyName, option) {
  return ({offer}) => (offer[propertyName] == option || option === 'any');
}

function filterByPrice (price) {
  return ({offer}) => FILTER_PRICE_OPTIONS[price](offer.price);
}

function getCheckedFeatures (node) {
  return [...node.querySelectorAll('input[type="checkbox"]:checked')].map((item) => item.value);
}

function clearMap (map, markers) {
  removeMarkers(markers);
  map.closePopup();
}

function filterByField (loadedData) {
  return async () => {
    const promo = await loadedData;
    clearMap(map, createdMarkers);
    createMarkersOnMap(map, applyFilters(promo) ,onFailToLoad);
  }
}

function filterByFeature (selectedFeatures) {
  return ({offer}) => selectedFeatures.every((selectedFeature) => offer.features.includes(selectedFeature));
}

function applyFilters (promos) {
  const type = FILTER.BY_TYPE.value;
  const price = FILTER.BY_PRICE.value;
  const rooms = FILTER.BY_ROOMS.value;
  const guests = FILTER.BY_GUESTS.value;
  const features = getCheckedFeatures(FILTER.BY_FEATURES);

  const filteredPromos = promos
    .filter(filterByPluralOptions('type', type))
    .filter(filterByPrice(price))
    .filter(filterByPluralOptions('rooms', rooms))
    .filter(filterByPluralOptions('guests', guests))
    .filter(filterByFeature(features));
  return Promise.resolve(filteredPromos);
}


FILTER.FORM_ELEMENT.addEventListener('change', filterByField(generatedPromos));

export {getCheckedFeatures}
