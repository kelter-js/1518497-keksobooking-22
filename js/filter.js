import {generatedPromos} from './get-data.js';
import {createMarkersOnMap, map, removeMarkers, createdMarkers} from './map.js';
import {onFailToLoad} from './error.js';

const FILTER_BY_TYPE_ELEMENT = document.querySelector('#housing-type');
const FILTER_BY_PRICE_ELEMENT = document.querySelector('#housing-price');
const FILTER_BY_ROOMS_ELEMENT = document.querySelector('#housing-rooms');
const FILTER_BY_GUESTS_ELEMENT = document.querySelector('#housing-guests');
const FILTER_BY_FEATURES_ELEMENT = document.querySelector('#housing-features');
const FILTER_FORM_ELEMENT = document.querySelector('.map__filters');

const FILTER_MIDDLE_PRICE_BY_NIGHT = 10000;
const FILTER_HIGH_PRICE_BY_NIGHT = 50000;

const FILTER_MIN_ROOMS = 1;
const FILTER_MID_ROOMS = 2;
const FILTER_MAX_ROOMS = 3;

const FILTER_MIN_GUESTS = 0;
const FILTER_MID_GUESTS = 1;
const FILTER_MAX_GUESTS = 2;

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

function filterByPrice (price) {
  return ({offer}) => {
    switch (price) {
      case 'low':
        return offer.price <= FILTER_MIDDLE_PRICE_BY_NIGHT;
      case 'middle':
        return offer.price >= FILTER_MIDDLE_PRICE_BY_NIGHT && offer.price <= FILTER_HIGH_PRICE_BY_NIGHT;
      case 'high':
        return offer.price >= FILTER_HIGH_PRICE_BY_NIGHT;
      default:
        return true;
    }
  }
}

function filterByRoom (rooms) {
  return ({offer}) => {
    switch (rooms) {
      case '1':
        return offer.rooms === FILTER_MIN_ROOMS;
      case '2':
        return offer.rooms === FILTER_MID_ROOMS;
      case '3':
        return offer.rooms === FILTER_MAX_ROOMS;
      default:
        return true;
    }
  }
}

function filterByGuests (guests) {
  return ({offer}) => {
    switch (guests) {
      case '0':
        return (!offer.guests || (offer.guests === FILTER_MIN_GUESTS));
      case '1':
        return offer.guests === FILTER_MID_GUESTS;
      case '2':
        return offer.guests === FILTER_MAX_GUESTS;
      default:
        return true;
    }
  }
}

function filterByType (type) {
  return ({offer}) => {
    return (type == 'any') ? true : offer.type === type;
  }
}

function filterByFeature (selectedFeatures) {
  return ({offer}) => {
    if (selectedFeatures.length == 0) {
      return true;
    }
    if (offer.features.length == 0) {
      return false;
    }
    return selectedFeatures.every((selectedFeature) => offer.features.includes(selectedFeature));
  }
}

function applyFilters (promos) {
  const type = FILTER_BY_TYPE_ELEMENT.value;
  const price = FILTER_BY_PRICE_ELEMENT.value;
  const rooms = FILTER_BY_ROOMS_ELEMENT.value;
  const guests = FILTER_BY_GUESTS_ELEMENT.value;
  const features = getCheckedFeatures(FILTER_BY_FEATURES_ELEMENT);

  const filteredPromos = promos
    .filter(filterByType(type))
    .filter(filterByPrice(price))
    .filter(filterByRoom(rooms))
    .filter(filterByGuests(guests))
    .filter(filterByFeature(features));
  return Promise.resolve(filteredPromos);
}


FILTER_FORM_ELEMENT.addEventListener('change', filterByField(generatedPromos));

export {getCheckedFeatures}
