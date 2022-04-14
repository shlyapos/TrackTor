import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { TrackCoord } from 'src/app/shared/models/trackCoord';
import * as L from 'leaflet';


const MY_GEOLOCATION_POPUP = 'Мое местоположение';
const START_TRACK_POPUP = 'Начало маршрута';
const FINISH_TRACK_POPUP = 'Конец маршрута';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: L.Map;
  private myGeolocation: L.Marker | null = null;
  private zoomControlPosition: L.ControlPosition = 'bottomright';
  private trackColor = 'red';
  private currentTrack: L.Polyline | null = null;
  private currentTrackMarkers: L.LayerGroup | null = null;
  private myGeolactionIcon: L.Icon = new L.Icon({
    iconUrl: environment.blueIconMarker,
    shadowUrl: environment.shadowUrlMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [0, 0]
  });
  private markerIcon: L.Icon = new L.Icon({
    iconUrl: environment.redIconMarker,
    shadowUrl: environment.shadowUrlMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [0, 0]
  });


  public initMap(host: HTMLElement) {
    // инициализация карты
    this.map = L.map(host, {
      center: L.latLng({lat: environment.mapCenter[0], lng: environment.mapCenter[1]}),
      zoom: environment.mapZoom,
      minZoom: environment.mapMinZoom,
      maxZoom: environment.mapMaxZoom,
      maxBounds: new L.LatLngBounds({lat: -90, lng: -180}, {lat: 90, lng: 180})
    });

    // установка позиции кнопок для зума карты
    this.map.zoomControl.setPosition(this.zoomControlPosition);

    // загружаем тайл карты
    L.tileLayer(environment.googleTileUrl).addTo(this.map);

    // определение текущей позиции
    const successMyGeolocation = (geolocation: GeolocationPosition) => { 
      const { latitude, longitude } = geolocation.coords;
  
      this.myGeolocation = L.marker([latitude, longitude], {icon : this.myGeolactionIcon})
        .addTo(this.map)
        .bindPopup(MY_GEOLOCATION_POPUP); 
               
      this.map.flyTo(this.myGeolocation.getLatLng());
    };

    const errorMyGeolocation = (message: any) => { 
      console.log(message);     
    };

    navigator.geolocation.getCurrentPosition(successMyGeolocation.bind(this), errorMyGeolocation.bind(this), {
      // высокая точность
      enableHighAccuracy: true
    })
  }

  public updateMap(trackCoords: TrackCoord[]) {
    this.updateMapTrack(trackCoords);

    if (this.currentTrack) {
      const boundsTrack = L.latLngBounds(trackCoords);
      this.map.flyToBounds(boundsTrack);
    } else if (this.myGeolocation) {
      this.map.flyTo(this.myGeolocation.getLatLng());
    } else {
      this.map.flyTo({lat: environment.mapCenter[0], lng: environment.mapCenter[1]});
    }
  }

  private updateMapTrack(trackCoords: TrackCoord[]) {
    if (this.currentTrack) {
      this.map.removeLayer(this.currentTrack);
    }

    if (this.currentTrackMarkers) {
      this.map.removeLayer(this.currentTrackMarkers);
    }

    if (trackCoords.length) {
      this.currentTrack = L.polyline(trackCoords, {
        color: this.trackColor,
        dashArray: '10',
      }).addTo(this.map); 
  
      this.currentTrackMarkers = L.layerGroup();
  
      L.marker([trackCoords[0].lat, trackCoords[0].lng], {icon : this.markerIcon})
        .addTo(this.currentTrackMarkers)
        .bindPopup(START_TRACK_POPUP);

      L.marker([trackCoords[trackCoords.length - 1].lat, trackCoords[trackCoords.length - 1].lng], {icon : this.markerIcon})
        .addTo(this.currentTrackMarkers)
        .bindPopup(FINISH_TRACK_POPUP);
  
      this.currentTrackMarkers.addTo(this.map);
    } else {
      this.currentTrack = null;
    }
  }
}