import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  GoogleMap,
  MapDirectionsService,
} from '@angular/google-maps';
import { MapaMenuFlutuanteComponent } from '../mapa-menu-flutuante/mapa-menu-flutuante.component';
import { PlaceSearchResult } from '../../modelo/PlaceSearchResult';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, MapaMenuFlutuanteComponent, CommonModule],
})
export class MapaComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;

  directionsResult: google.maps.DirectionsResult | undefined;

  constructor(private directionsService: MapDirectionsService) {}

  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeControl: false,
    clickableIcons: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Initialize with a default value
  fatecMarkerPosition: google.maps.LatLngLiteral = {
    lat: -22.78594308939862,
    lng: -45.18143080306932,
  };

  fatecMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  ngOnInit() {
    this.center = {
      lat: -22.78594308939862,
      lng: -45.18143080306932,
    };
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

      // Center the map
      this.map.googleMap?.setCenter(this.center);

      // Get directions from the new marker position to the fatecMarkerPosition
      this.getDirections(this.markerPosition, this.fatecMarkerPosition);
    }
  }

  getDirections(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral
  ) {
    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService
      .route(request)
      .pipe(map((res) => res.result))
      .subscribe((result) => {
        this.directionsResult = result;
      });
  }

  swapLocations() {
    // Swap markerPosition and fatecMarkerPosition
    const tempPosition = { ...this.markerPosition };
    this.markerPosition = { ...this.fatecMarkerPosition };
    this.fatecMarkerPosition = tempPosition;

    // Get directions from the new positions
    this.getDirections(this.markerPosition, this.fatecMarkerPosition);
  }
}
