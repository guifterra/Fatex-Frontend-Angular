import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapMarker, GoogleMap } from '@angular/google-maps';
import { MapaMenuFlutuanteComponent } from '../mapa-menu-flutuante/mapa-menu-flutuante.component';
import { PlaceSearchResult } from '../../modelo/PlaceSearchResult';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, MapaMenuFlutuanteComponent, CommonModule]
})
export class MapaComponent implements OnInit {

  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapMarker) marker!: MapMarker;

  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeControl: false,
    clickableIcons: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral | google.maps.LatLng = { lat: 0, lng: 0 }; // Initialize with a default value
  fatecMarkerPosition: google.maps.LatLngLiteral = { lat: -22.78594308939862, lng: -45.18143080306932, };

  fatecMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: -22.78594308939862,
        lng: -45.18143080306932,       
      };
    });
  }

  onPlaceChanged(place: PlaceSearchResult) {
    if (place.location) {
      this.center = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };

      this.markerPosition = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };

      // Center the map and move the marker
      this.map.googleMap?.setCenter(this.center);
      this.marker.position = this.markerPosition;
      this.marker.options = {
        visible: true,
      };
    }
  }
}
