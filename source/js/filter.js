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

const MAX_PROMOS = 10;

const FILTER_PRICE_OPTIONS = {
  any: () => true,
  low: (price) => price <= FILTER_PRICE.MIN,
  middle: (price) => price >= FILTER_PRICE.MIN && price <= FILTER_PRICE.MAX,
  high: (price) => price >= FILTER_PRICE.MAX,
};

const filterByPluralOptions = (comparedPromo, propertyName, option) => {
  return (comparedPromo[propertyName] === option || option === 'any');
}

const filterByPrice = (comparedPromo, price) => FILTER_PRICE_OPTIONS[price](comparedPromo.price);

const getCheckedFeatures = (node) => [...node.querySelectorAll('input[type="checkbox"]:checked')].map((item) => item.value);

const filterByField = async (loadedData) => createMarkersOnMap(applyFilters(await loadedData));

const filterByFeature = (comparedPromo, selectedFeatures) => {
  return selectedFeatures.every((selectedFeature) => comparedPromo.features.includes(selectedFeature));
}

const filterPromos = (...args) => {
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

const applyFilters = (promos) => {
  const type = FILTER_ELEMENTS.TYPE.value;
  const price = FILTER_ELEMENTS.PRICE.value;
  const rooms = FILTER_ELEMENTS.ROOMS.value === 'any' ? 'any' : +FILTER_ELEMENTS.ROOMS.value;
  const guests = FILTER_ELEMENTS.GUESTS.value === 'any' ? 'any' : +FILTER_ELEMENTS.GUESTS.value;
  const features = getCheckedFeatures(FILTER_ELEMENTS.FEATURES);
  const filter = promos.filter(filterPromos(type, price, rooms, guests, features));
  const filteredPromos = [];
  promos.map((promo) => {
    if (filter.includes(promo)) {
      filteredPromos.push(promo);
      if (filteredPromos.length >= MAX_PROMOS) {
        return filteredPromos;
      }
    }
  })
  return filteredPromos;
}

FILTER_ELEMENTS.FORM_ELEMENT.addEventListener('change', clearMap);
FILTER_ELEMENTS.FORM_ELEMENT.addEventListener('change', _.debounce(() => filterByField(generatedPromos), RENDER_DELAY));

export {getCheckedFeatures}
