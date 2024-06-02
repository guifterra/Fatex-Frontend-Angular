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

  carMarkerPosition: google.maps.LatLngLiteral = { lat: -22.78594308939862, lng: -45.18143080306932 }; // Initial position

  carMarkerOptions: google.maps.MarkerOptions = {
    position: this.carMarkerPosition,
    icon: {
      url: '../../../assets/fatexCarro.png', // Path to your car icon image
      scaledSize: new google.maps.Size(25, 45), // Adjust the size of the icon
    },
    draggable: false
  };

  ngOnInit() {
    this.center = {
      lat: -22.78594308939862,
      lng: -45.18143080306932,
    };
  }

  onPlaceChanged(place: PlaceSearchResult) {
    if (place.location) {
      // Update the center of the map to the selected place
      this.center = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };
  
      // Update the position of the regular marker to the selected place
      this.markerPosition = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };
  
      // Update the position of the car marker to the selected place
      this.carMarkerPosition = {
        lat: place.location.lat(),
        lng: place.location.lng(),
      };
  
      // Center the map on the car marker's position
      this.map.googleMap?.setCenter(this.carMarkerPosition);
  
      // Update the options for the car marker to reflect its new position
      this.carMarkerOptions = {
        ...this.carMarkerOptions,
        position: this.carMarkerPosition,
      };
  
      // Get directions from the car marker's position to the fatec marker's position
      this.getDirections(this.carMarkerPosition, this.fatecMarkerPosition);
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
