/* eslint-disable */
import {onMapLoad, ADDRESS_ELEMENT} from './page-enabler.js';
import {setNodeProperty} from './service.js';
import {generateBunchPromos} from './data.js';
import {insertPromo} from './insert-promo.js';

const generatedPromos = generateBunchPromos();

const TOKYO_LATITUDE = 35.6894;
const TOKYO_LANGITUDE = 139.692;
const TOKYO_CENTER_LATITUDE = 35.65631;
const TOKYO_CENTER_LANGITUDE = 139.75671;
const MAP_INSTANT_ZOOM = 10;

const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});
const PIN_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function onPinMove (evt) {
  let lat = evt.target.getLatLng().lat.toFixed(5);
  let lng = evt.target.getLatLng().lng.toFixed(5);
  setNodeProperty(ADDRESS_ELEMENT, 'value', `${lat}, ${lng}`);
}

const map = L.map('map-canvas')
.on('load', onMapLoad(TOKYO_CENTER_LATITUDE, TOKYO_CENTER_LANGITUDE))
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LANGITUDE,
  }, MAP_INSTANT_ZOOM);

const marker = L.marker(
  {
    lat: TOKYO_CENTER_LATITUDE,
    lng: TOKYO_CENTER_LANGITUDE,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

marker.addTo(map);

marker.on('move', onPinMove);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

generatedPromos.forEach(({author, offer, location}) => {
  const marker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon: PIN_ICON,
    },
  );

  marker
    .addTo(map)
    .bindPopup(insertPromo({author, offer}));
});

export {map}

/* eslint-enable */
