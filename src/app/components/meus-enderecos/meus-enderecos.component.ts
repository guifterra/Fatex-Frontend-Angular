import { Component } from '@angular/core';
import { TabelaComponent } from './tabela/tabela.component';

@Component({
  selector: 'app-meus-enderecos',
  standalone: true,
  imports: [TabelaComponent],
  templateUrl: './meus-enderecos.component.html',
  styleUrl: './meus-enderecos.component.css'
})
export class MeusEnderecosComponent {

}
