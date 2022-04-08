export const environment = {
  production: true,

  tileUrl: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
  googleTileUrl: 'http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  
  mapCenter: [63.9373, 92.6550],
  mapZoom: 5,
  mapMinZoom: 2,
  mapMaxZoom: 17,

  shadowUrlMarker: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  redIconMarker: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  blueIconMarker: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
};
