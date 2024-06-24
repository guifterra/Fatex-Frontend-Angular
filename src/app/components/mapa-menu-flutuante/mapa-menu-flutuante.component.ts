import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlaceSearchResult } from '../../modelo/PlaceSearchResult';
import { PlaceService } from '../../services/place-service.service';
import { Carona } from '../../modelo/Carona';
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
import { Endereco } from '../../modelo/Endereco'; // Ensure Endereco is imported
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-mapa-menu-flutuante',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, GoogleMapsModule, DialogModule, InputNumberModule, DropdownModule, CalendarModule, ToastModule],
  providers: [MessageService],
  templateUrl: './mapa-menu-flutuante.component.html',
  styleUrls: ['./mapa-menu-flutuante.component.css']
})
export class MapaMenuFlutuanteComponent implements OnInit, AfterViewInit {

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fatecInput') fatecInput!: ElementRef<HTMLInputElement>;

  @Output() placeChanged: EventEmitter<Endereco> = new EventEmitter<Endereco>();
  @Output() swapLocations = new EventEmitter<void>();
  @Output() caronaCreated: EventEmitter<Carona> = new EventEmitter<Carona>();

  displayDialog: boolean = false;

  userAddress: string = '';
  fatecAddress: string = 'FATEC Guaratinguetá - Prof. João Mod - Avenida Professor João Rodrigues - Jardim Esperanca, Guaratinguetá - SP, Brasil';

  userInputEndereco: Endereco | null = null;
  fatecEndereco: Endereco = {
    endId: 0,
    endRua: 'FATEC Guaratinguetá - Prof. João Mod',
    endBairro: 'Jardim Esperanca',
    endCidade: 'Guaratinguetá',
    endLatitude: -22.78594308939862,
    endLongitude: -45.18143080306932,
    endNumero: 1501
  };

  carData: Date | null = null;
  carHora: string = '';
  carValorDoacao: number = 1;
  carVagas: number = 1;

  

  currentMotorista: Motorista | null = null; // Hold the currently logged-in Motorista
  motoristaEstatisticas: any = null; // Variable to hold motorista statistics
  selectedVeiculo: Veiculo | null = null; // Variable to hold the selected vehicle
  veiculos: Veiculo[] = []; // List of vehicles
  enderecos: Endereco[] = []; // List of addresses

  minDate: Date | undefined;
  maxDate: Date | undefined;

  constructor(
    private ngZone: NgZone,
    private placeService: PlaceService,
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private caronaService: CaronaService,
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService, // Inject UsuarioService for current user
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getMotoristaEstatisticas();
    this.loadVeiculos();
    this.loadEnderecos(); // Load addresses

    // const today = new Date();
    const nextMonth = new Date();
    // nextMonth.setMonth(today.getMonth() + 1); // Set max date to 1 month from today

    // this.minDate = today;
    this.maxDate = nextMonth;
  }

  ngAfterViewInit() {}

  getMotoristaEstatisticas() {
    this.motoristaService.getEstatisticasDeMotorista().subscribe(
      (motorista) => {
        this.currentMotorista = motorista;
        console.log('Current Motorista statistics:', this.currentMotorista);
      },
      (error) => {
        console.error('Error fetching motorista statistics:', error);
      }
    );
  }
  

  loadVeiculos() {
    this.veiculoService.getVeiculosDoUsuario().subscribe(
      (veiculos) => {
        this.veiculos = veiculos;
        if (veiculos.length > 0) {
          this.selectedVeiculo = veiculos[0]; // Assuming the first vehicle is selected by default
        }
        console.log('Loaded Veiculos:', veiculos);
      },
      (error) => {
        console.error('Error loading vehicles:', error);
      }
    );
  }

  loadEnderecos() {
    this.enderecoService.getEnderecosDoUsuario().subscribe(
      (enderecos) => {
        this.enderecos = enderecos;
        console.log('Loaded Enderecos:', enderecos);
      },
      (error) => {
        console.error('Error loading addresses:', error);
      }
    );
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

  onEnderecoSelected(endereco: Endereco) {
    if (endereco.endLatitude !== null && endereco.endLongitude !== null) {
      this.userInputEndereco = endereco;
      this.userAddress = endereco.endRua;
      console.log('Selected Endereco:', endereco);
      this.placeService.emitPlaceChange(endereco);
      this.placeChanged.emit(endereco);
    } else {
      console.error('Endereco has null latitude or longitude:', endereco);
      // Handle the case when latitude or longitude is null (e.g., show an error message)
    }
  }

  onSolicitarCarona() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  isButtonDisabled(): boolean {
    // Check if any required field is empty or null
    return !this.carData || !this.carHora || !this.carValorDoacao || !this.carVagas;
  }

  onCaronaCreated() {
    if (!this.currentMotorista) {
      console.error('Current Motorista not available.');
      return;
    }

    if (!this.selectedVeiculo) {
      console.error('No vehicle selected.');
      return;
    }

    if (!this.userInputEndereco) {
      console.error('User address is not selected.');
      return;
    }

    const motoristaVeiculo = new MotoristaVeiculo();
    motoristaVeiculo.motorista = this.currentMotorista;
    motoristaVeiculo.veiculo = this.selectedVeiculo;

    const carPartida: Endereco = {
      endId: 0,
      endRua: this.userInputEndereco.endRua,
      endLatitude: this.userInputEndereco.endLatitude,
      endLongitude: this.userInputEndereco.endLongitude,
      endBairro: this.userInputEndereco.endBairro,
      endCidade: this.userInputEndereco.endCidade,
      endNumero: this.userInputEndereco.endNumero,
    };
  
    const carChegada: Endereco = {
      endId: 0,
      endRua: this.fatecEndereco.endRua,
      endLatitude: this.fatecEndereco.endLatitude,
      endLongitude: this.fatecEndereco.endLongitude,
      endBairro: this.fatecEndereco.endBairro,
      endCidade: this.fatecEndereco.endCidade,
      endNumero: this.fatecEndereco.endNumero,
    };

    const novaCarona: Carona = {
      carId: 0,
      carData: this.carData,
      carHora: this.carHora,
      carPartida: carPartida,
      carChegada: carChegada,
      carValorDoacao: this.carValorDoacao,
      carStatus: 'Agendada',
      motoristaVeiculo: motoristaVeiculo,
      carVagas: this.carVagas,
      carValorMinimo: 0
    };

    console.log('Carona data:', JSON.stringify(novaCarona, null, 2));

    this.caronaService.cadastrarCarona(novaCarona).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Carona criada com sucesso!' });
        console.log('Carona created successfully:', response);
        this.caronaCreated.emit(response);
        this.hideDialog();
      },
      (error) => {
        this.messageService.add({ severity: 'danger', summary: 'Erro', detail: 'Erro ao criar a carona' });
        console.error('Error creating Carona:', error);
        if (error.error instanceof SyntaxError) {
          console.error('Syntax error:', error.error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  }
}

