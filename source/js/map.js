/* global L*/

import {
  onMapLoad,
  ADDRESS_ELEMENT
} from './page-enabler.js';

import {setNodeProperty} from './service.js';
import {generatedPromos} from './get-data.js';
import {insertPromo} from './insert-promo.js';
import {onFailToLoad} from './error.js';

const TOKYO_LOCATION = {
  lat: 35.6894,
  lng: 139.692,
};

const TOKYO_CENTER_LOCATION = {
  lat: 35.65631,
  lng: 139.75671,
};

const MAP_INSTANT_ZOOM = 10;
const MAIN_ICON_SIZES = [42, 42];
const MAIN_ICON_ANCHOR_COORDINATES = [21, 42];
const ICON_SIZES = [32, 32];
const ICON_ANCHOR_COORDINATES = [16, 32];
const DECIMAL_DIGITS = 5;

const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_ICON_SIZES,
  iconAnchor: MAIN_ICON_ANCHOR_COORDINATES,
});

const PIN_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: ICON_SIZES,
  iconAnchor: ICON_ANCHOR_COORDINATES,
});

const onPinMove = (evt) => {
  const {lat: coordinatesX, lng: coordinatesY} = evt.target.getLatLng();
  setNodeProperty(ADDRESS_ELEMENT, 'value', `${coordinatesX.toFixed(DECIMAL_DIGITS)}, ${coordinatesY.toFixed(DECIMAL_DIGITS)}`);
}

const setMarkerCoordinates = (marker, {lat, lng}) => marker.setLatLng({lat, lng});

const createMap = () => {
  return L.map('map-canvas')
    .on('load', onMapLoad(TOKYO_CENTER_LOCATION))
    .setView(TOKYO_LOCATION, MAP_INSTANT_ZOOM);
}

const map = createMap();

const marker = L.marker(
  TOKYO_CENTER_LOCATION,
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

marker.addTo(map);

marker.on('move', onPinMove);

const createdMarkers = L.layerGroup().addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const createMarkersOnMap = async (promo) => {
  promo.forEach(({author, offer, location}) => {
    const marker = L.marker(
      location,
      {
        icon: PIN_ICON,
      },
    );

    marker
      .addTo(createdMarkers)
      .bindPopup(insertPromo({author, offer}));
  });
}

const clearMap = () => {
  createdMarkers.clearLayers();
  map.closePopup();
}

generatedPromos.then((promo) => createMarkersOnMap(promo)).catch(onFailToLoad);

export {
  setMarkerCoordinates,
  marker,
  TOKYO_CENTER_LOCATION,
  createMarkersOnMap,
  clearMap
}

