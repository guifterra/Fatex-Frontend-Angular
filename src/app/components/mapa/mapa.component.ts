import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [GoogleMapsModule]
})

export class MapaComponent implements OnInit {
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeControl: false,
  };

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }
}
