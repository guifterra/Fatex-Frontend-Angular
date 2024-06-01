import { Component } from '@angular/core';
import { TabelaComponent } from './tabela/tabela.component';

@Component({
  selector: 'app-meus-veiculos',
  standalone: true,
  imports: [TabelaComponent],
  templateUrl: './meus-veiculos.component.html',
  styleUrl: './meus-veiculos.component.css'
})
export class MeusVeiculosComponent {

}
