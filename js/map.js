const TOKYO_LATITUDE = 35.6894;
const TOKYO_LANGITUDE = 139.692;
const MAP_INSTANT_ZOOM = 10;


const map = L.map('map-canvas')
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LANGITUDE,
  }, MAP_INSTANT_ZOOM);

export {map}
