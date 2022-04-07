// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
