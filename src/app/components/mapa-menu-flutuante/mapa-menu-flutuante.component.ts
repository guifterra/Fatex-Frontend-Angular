import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceSearchResult } from '../../modelo/PlaceSearchResult';
import { PlaceService } from '../../services/place-service.service';
import { Carona } from '../../modelo/Carona';
import { JsonUsuEnd } from '../../modelo/JsonUsuEnd';
import { Veiculo } from '../../modelo/Veiculo';
import { Motorista } from '../../modelo/Motorista';
import { MotoristaVeiculo } from '../../modelo/MotoristaVeiculo';
import { MotoristaService } from '../../services/MOT_MOTORISTAS/motorista.service';
import { VeiculoService } from '../../services/VEI_VEICULOS/veiculo.service';
import { EnderecoService } from '../../services/END_ENDERECOS/endereco.service';
import { Dialog, DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CaronaService } from '../../services/CAR_CARONAS/carona.service';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { Usuario } from '../../modelo/Usuario';
import { Endereco } from '../../modelo/Endereco'; // Ensure Endereco is imported

@Component({
  selector: 'app-mapa-menu-flutuante',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, GoogleMapsModule, DialogModule, InputNumberModule],
  templateUrl: './mapa-menu-flutuante.component.html',
  styleUrls: ['./mapa-menu-flutuante.component.css']
})
export class MapaMenuFlutuanteComponent implements OnInit, AfterViewInit {

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fatecInput') fatecInput!: ElementRef<HTMLInputElement>;

  @Output() placeChanged: EventEmitter<PlaceSearchResult> = new EventEmitter<PlaceSearchResult>();
  @Output() swapLocations = new EventEmitter<void>();
  @Output() caronaCreated: EventEmitter<Carona> = new EventEmitter<Carona>();

  displayDialog: boolean = false;
  autocomplete!: google.maps.places.Autocomplete;

  userAddress: string = '';
  fatecAddress: string = 'FATEC Guaratinguetá - Prof. João Mod - Avenida Professor João Rodrigues - Jardim Esperanca, Guaratinguetá - SP, Brasil';

  userInputResult: PlaceSearchResult | null = null;
  fatecResult: PlaceSearchResult = {
    address: this.fatecAddress,
    name: 'FATEC Guaratinguetá - Prof. João Mod',
    location: new google.maps.LatLng(-22.78594308939862, -45.18143080306932),
  };

  carData: Date | null = null;
  carHora: string = '';
  carValorDoacao: number = 1;
  carVagas: number = 1;

  currentMotorista: Motorista | null = null; // Hold the currently logged-in Motorista

  constructor(
    private ngZone: NgZone,
    private placeService: PlaceService,
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private caronaService: CaronaService,
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService // Inject UsuarioService for current user
  ) {}

  ngOnInit(): void {
    // Fetch the current logged-in user's Motorista details
    const currentUser = this.usuarioService.getCurrentUser();
    if (currentUser) {
      this.motoristaService.getMotoristaById(currentUser.usuId).subscribe(
        (motorista) => {
          this.currentMotorista = motorista;
          console.log('Current Motorista:', this.currentMotorista);
        },
        (error) => {
          console.error('Error fetching Motorista:', error);
        }
      );
    } else {
      console.warn('No current user logged in.');
    }
  }

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
      componentRestrictions: { country: 'br' },
      fields: ['address_components', 'geometry', 'name'],
      strictBounds: false,
    };

    this.autocomplete = new google.maps.places.Autocomplete(this.userInput.nativeElement, options);

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete.getPlace();

        if (place.geometry) {
          const placeResult: PlaceSearchResult = {
            address: this.userInput.nativeElement.value,
            name: place.name || '',
            location: place.geometry.location || undefined,
          };

          this.userAddress = placeResult.address;
          console.log('User Input Location:', placeResult);
          this.placeService.emitPlaceChange(placeResult);
          this.placeChanged.emit(placeResult);
        } else {
          console.warn('No geometry found for the selected place.');
        }
      });
    });
  }

  onSwapLocations(event: Event) {
    event.preventDefault();
    this.swapLocations.emit();

    const tempAddress = this.userAddress;
    this.userAddress = this.fatecAddress;
    this.fatecAddress = tempAddress;

    if (this.userInput.nativeElement.disabled) {
      this.userInput.nativeElement.classList.remove('bg-black-alpha-10');
      this.fatecInput.nativeElement.classList.add('bg-black-alpha-10');
    } else {
      this.userInput.nativeElement.classList.add('bg-black-alpha-10');
      this.fatecInput.nativeElement.classList.remove('bg-black-alpha-10');
    }

    this.userInput.nativeElement.disabled = !this.userInput.nativeElement.disabled;
    this.fatecInput.nativeElement.disabled = !this.fatecInput.nativeElement.disabled;
  }

  onSolicitarCarona() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  onCaronaCreated() {
    if (!this.currentMotorista) {
      console.error('Current Motorista not available.');
      return;
    }

    const motoristaVeiculo = new MotoristaVeiculo();
    motoristaVeiculo.motorista = this.currentMotorista;

    const userInputResult: PlaceSearchResult = this.userInputResult || {
      address: this.userAddress,
      name: '',
      location: undefined,
    };

    const fatecResult: PlaceSearchResult = this.fatecResult;

    const userLocation = userInputResult.location ? {
      lat: userInputResult.location.lat(),
      lng: userInputResult.location.lng()
    } : { lat: 0, lng: 0 };

    const fatecLocation = fatecResult.location ? {
      lat: fatecResult.location.lat(),
      lng: fatecResult.location.lng()
    } : { lat: -22.78594308939862, lng: -45.18143080306932 };

    // Prepare Endereco objects for carPartida and carChegada
    const carPartida: Endereco = {
      endId: 0,
      endRua: userInputResult.address,
      endLatitude: userLocation.lat,
      endLongitude: userLocation.lng,
      endBairro: '',
      endCidade: '',
      endNumero: 0,
    };

    const carChegada: Endereco = {
      endId: 0,
      endRua: fatecResult.address,
      endLatitude: fatecLocation.lat,
      endLongitude: fatecLocation.lng,
      endBairro: '',
      endCidade: '',
      endNumero: 0,
    };

    // Create Carona object with saved Endereco objects
    const carona: Carona = {
      carId: 0,
      carData: this.carData,
      carHora: this.carHora,
      carPartida: carPartida,
      carChegada: carChegada,
      carValorDoacao: this.carValorDoacao,
      carStatus: 'Agendada',
      motoristaVeiculo: motoristaVeiculo,
      carVagas: this.carVagas,
      carValorMinimo: 0,
    };

    // Call caronaService to create carona
    this.caronaService.cadastrarCarona(carona).subscribe(
      (response) => {
        console.log('Carona cadastrada:', response);
        this.caronaCreated.emit(response);
        // Handle success response as needed
      },
      (error) => {
        console.error('Erro ao cadastrar carona:', error);
        // Handle error as needed
      }
    );

    this.hideDialog();
  }

  isFormValid(): boolean {
    return !!this.userAddress && !!this.carData && !!this.carHora && this.carVagas >= 1 && this.carValorDoacao >= 1;
  }
}