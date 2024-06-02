import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { TabelaComponent } from './tabela/tabela.component';
import { Endereco } from '../../modelo/Endereco';
import { EnderecoService } from '../../services/END_ENDERECOS/endereco.service';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { Usuario } from '../../modelo/Usuario';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonUsuEnd } from '../../modelo/JsonUsuEnd';

@Component({
  selector: 'app-meus-enderecos',
  standalone: true,
  imports: [TabelaComponent, ToastModule, ButtonModule, InputTextModule, DialogModule, CommonModule, TooltipModule, FormsModule],
  templateUrl: './meus-enderecos.component.html',
  styleUrls: ['./meus-enderecos.component.css'],
  providers: [MessageService],
})
export class MeusEnderecosComponent implements OnInit {

  @ViewChild('autoInput') autoInput!: ElementRef<HTMLInputElement>;

  endereco = new Endereco();
  jsonUsuEnd: JsonUsuEnd = new JsonUsuEnd();
  autocomplete!: google.maps.places.Autocomplete;

  constructor(
    private ngZone: NgZone,
    private userService: UsuarioService,
    private enderecoService: EnderecoService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const options = {
      componentRestrictions: { country: "br" },
      fields: ["address_components", "geometry"],
      strictBounds: false,
    };

    this.autocomplete = new google.maps.places.Autocomplete(this.autoInput.nativeElement, options);

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          this.endereco.endRua = this.getAddressComponent(place, 'route') || '';
          this.endereco.endBairro = this.getAddressComponent(place, 'sublocality_level_1') || '';
          this.endereco.endCidade = this.getAddressComponent(place, 'administrative_area_level_2') || '';
          this.endereco.endNumero = parseInt(this.getAddressComponent(place, 'street_number') || '0', 10);
        }
      });
    });
  }

  getAddressComponent(place: google.maps.places.PlaceResult, type: string): string | undefined {
    const component = place.address_components?.find(c => c.types.includes(type));
    return component?.short_name;
  }

  addEndereco(): void {
    this.jsonUsuEnd.endereco = this.endereco;
    this.jsonUsuEnd.usuario = this.userService.getCurrentUser() ?? new Usuario();

    this.enderecoService.cadastrarEndereco(this.jsonUsuEnd).subscribe(
      (retorno) => {
        this.endereco = new Endereco();
        this.jsonUsuEnd = new JsonUsuEnd();

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso no cadastro',
          detail: 'Seu cadastro de endereço foi realizado com sucesso!',
          life: 3000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Ocorreu um erro ao cadastrar o endereço:', error);
        this.messageService.add({
          severity: 'warn',
          summary: 'Erro inesperado',
          detail: 'Ocorreu um erro inesperado! Tente novamente mais tarde.',
          life: 3000,
        });
      }
    );
  }
}
