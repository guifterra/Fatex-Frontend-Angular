import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  GoogleMap,
  MapDirectionsService,
} from '@angular/google-maps';
import { Carona } from '../../modelo/Carona';// Adjust path as per your project structure
import { CaronaService } from '../../services/CAR_CARONAS/carona.service';// Adjust path as per your project structure
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PassageiroService } from '../../services/PAS_PASSAGEIROS/passageiro.service';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { JsonPasCar } from '../../modelo/JsonPasCar';
import { Passageiro } from '../../modelo/Passageiro';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-visualizar-caronas',
  templateUrl: './visualizar-caronas.component.html',
  styleUrls: ['./visualizar-caronas.component.css'],
  standalone: true,
  imports: [GoogleMapsModule, CommonModule, DialogModule, ButtonModule, ToastModule],
  providers: [MessageService]
})

export class VisualizarCaronasComponent implements OnInit {

  @ViewChild(GoogleMap) map!: GoogleMap;

  center: google.maps.LatLngLiteral = {
    lat: -22.78594308939862,
    lng: -45.18143080306932,
  };

  options: google.maps.MapOptions = {
    mapTypeControl: false,
    clickableIcons: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
  };

  caronas: Carona[] = [];
  displayDialog: boolean = false;
  selectedCarona: Carona | null = null;
  passageiro: Passageiro | null = null; // To hold the current passageiro

  constructor(
    private caronaService: CaronaService,
    private geolocationService: GeolocationService,
    private passageiroService: PassageiroService,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('Initializing VisualizarCaronasComponent');

    this.passageiroService.getEstatisticasDePassageiro().subscribe(
      (passageiro: Passageiro) => {
        console.log('Current passageiro:', passageiro);
        this.passageiro = passageiro;
        
        // Fetch caronas after getting the current passageiro
      },
      error => {
        console.error('Error fetching passageiro:', error);
        // Handle error appropriately
      }
    );

    this.caronaService.getListaDeCaronasFornecidas().subscribe(
      (caronas: Carona[]) => {
        console.log('Received caronas:', caronas);
        this.caronas = caronas;
        // Call updateMarkers() after fetching caronas
        this.updateMarkers();
      },
      error => {
        console.error('Error fetching caronas:', error);
        // Handle error appropriately
      }
    );

    this.geolocationService.getCurrentPosition().subscribe(
      (position: GeolocationPosition) => {
        console.log('Current position:', position);
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      error => {
        console.error('Error getting current position:', error);
        // Handle geolocation error, fallback to default location
      }
    );
  }

  onMapReady(map: GoogleMap) {
    // Update markers when map is ready
    this.updateMarkers();
  }

  updateMarkers() {
    if (!this.map) {
      console.warn('Map not initialized yet. Cannot update markers.');
      return;
    }

    // Clear existing markers
    this.map.googleMap?.data.forEach(feature => {
      this.map.googleMap?.data.remove(feature);
    });

    // Add new markers for each carona
    this.caronas.forEach(carona => {
      const markerOptions = this.carMarkerOptions(carona);
      console.log('Adding marker for carona:', carona, 'with options:', markerOptions);

      // Delay adding markers until map is ready
      setTimeout(() => {
        new google.maps.Marker({
          ...markerOptions,
          map: this.map.googleMap!,
          animation: google.maps.Animation.DROP,
        }).addListener('click', () => this.onCaronaMarkerClick(carona));
      }, 1000); // Adjust delay as needed
    });

    console.log('Markers updated successfully');
  }

  carMarkerOptions(carona: Carona): google.maps.MarkerOptions {
    if (carona && carona.carPartida && carona.carPartida.endLatitude !== null && carona.carPartida.endLongitude !== null) {
      return {
        position: {
          lat: carona.carPartida.endLatitude,
          lng: carona.carPartida.endLongitude
        },
      };
    } else {
      console.warn(`Invalid latitude or longitude for carona ${carona.carId}`);
      return {
        position: { lat: 0, lng: 0 },
      };
    }
  }

  onCaronaMarkerClick(carona: Carona) {
    console.log('Clicked carona marker:', carona);
    this.selectedCarona = carona;
    this.displayDialog = true;
  }

  onCloseDialog() {
    this.displayDialog = false;
    this.selectedCarona = null;
  }

  ingressarNaCarona(carona: Carona) {
    if (this.passageiro) {
      const obj: JsonPasCar = {
        passageiro: this.passageiro,
        carona: carona
      };
      this.caronaService.entrarNaCarona(obj).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Ingressou na carona com sucesso!' });
          this.onCloseDialog();
          console.log('Ingresso na carona realizado com sucesso!', response);
          // Optionally, refresh carona list or update UI
        },
        error => {
          this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Ingressou na carona com sucesso!' });
          this.onCloseDialog();
          console.error('Erro ao ingressar na carona:', error);
          // Handle error appropriately, e.g., display error message to the user
        }
      );
    } else {
      console.error('Nenhum passageiro logado.');
      this.onCloseDialog();
      // Handle case where no passageiro is logged in
    }
  }
}