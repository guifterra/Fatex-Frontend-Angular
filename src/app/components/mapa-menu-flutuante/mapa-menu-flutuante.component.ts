import { Component, ElementRef, Input, NgZone, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceSearchResult } from '../../modelo/PlaceSearchResult';

@Component({
  selector: 'app-mapa-menu-flutuante',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, GoogleMapsModule],
  templateUrl: './mapa-menu-flutuante.component.html',
  styleUrls: ['./mapa-menu-flutuante.component.css']
})
export class MapaMenuFlutuanteComponent implements OnInit {

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fatecInput') fatecInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder = '';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();
  @Output() swapLocations = new EventEmitter<void>();

  constructor(private ngZone: NgZone) { }

  autocomplete: google.maps.places.Autocomplete | undefined;
  userAddress: string = '';
  fatecAddress: string = 'FATEC Guaratinguetá - Prof. João Mod - Avenida Professor João Rodrigues - Jardim Esperanca, Guaratinguetá - SP, Brasil';

  userInputResult: PlaceSearchResult | null = null;
  fatecResult: PlaceSearchResult = {
    address: this.fatecAddress,
    name: 'FATEC Guaratinguetá - Prof. João Mod',
    location: new google.maps.LatLng(-22.78594308939862, -45.18143080306932)
  };

  ngOnInit(): void { }

  ngAfterViewInit() {
    const center = { lat: -22.78594308939862, lng: -45.18143080306932 };

    const defaultBounds = {
      north: center.lat + 0.2,
      south: center.lat - 0.2,
      east: center.lng + 0.2,
      west: center.lng - 0.2,
    };

    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: "br" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
    };

    this.autocomplete = new google.maps.places.Autocomplete(this.userInput.nativeElement, options);

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      this.userInputResult = {
        address: this.userInput.nativeElement.value,
        name: place?.name || '',
        location: place?.geometry?.location || undefined,
      };

      this.ngZone.run(() => {
        const userInputResult: PlaceSearchResult = this.userInputResult ?? {
          address: '',
          name: '',
          location: undefined,
        };
      
        console.log("User Input Location:", userInputResult);
        this.placeChanged.emit(userInputResult);
        this.userAddress = this.userInput.nativeElement.value;
      });
    });
  }

  onSwapLocations(event: Event) {
    event.preventDefault();
    this.swapLocations.emit();
    

    // Swap user and FATEC addresses
    const tempAddress = this.userAddress;
    this.userAddress = this.fatecAddress;
    this.fatecAddress = tempAddress;

    // Toggle classes based on disabled state
    if (this.userInput.nativeElement.disabled) {
      this.userInput.nativeElement.classList.remove('bg-black-alpha-10');
      this.fatecInput.nativeElement.classList.add('bg-black-alpha-10');
    } else {
      this.userInput.nativeElement.classList.add('bg-black-alpha-10');
      this.fatecInput.nativeElement.classList.remove('bg-black-alpha-10');
    }

    // Toggle disabled state
    this.userInput.nativeElement.disabled = !this.userInput.nativeElement.disabled;
    this.fatecInput.nativeElement.disabled = !this.fatecInput.nativeElement.disabled;
  }

  onSolicitarCarona() {
    const userInputResult: PlaceSearchResult = this.userInputResult || {
      address: this.userAddress,
      name: '',
      location: undefined,
    };
  
    const fatecResult: PlaceSearchResult = this.fatecResult;
  
    console.log("User Input Location:", userInputResult);
    console.log("FATEC Location:", fatecResult);
    this.placeChanged.emit(userInputResult);
    this.placeChanged.emit(fatecResult);
  }
}
