import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;

  public setMap(host: HTMLElement) {
    this.map = L.map(host, {
      center: L.latLng({lat: environment.mapCenter[0], lng: environment.mapCenter[1]}),
      zoom: 5,
      minZoom: 2,
      maxZoom: 17,
      maxBounds: new L.LatLngBounds({lat: -90, lng: -180}, {lat: 90, lng: 180})
    });

    this.map.zoomControl.setPosition('bottomright');
    this.addTileLayers();
  }

  private addTileLayers() {
    const tile = L.tileLayer(environment.tileUrl)
      .addTo(this.map);
  }
  
  private addTrack() {
    pathCoords = connectTheDots(window.geojson);
    var pathLine = L.polyline(pathCoords).addTo(map)
  }
}