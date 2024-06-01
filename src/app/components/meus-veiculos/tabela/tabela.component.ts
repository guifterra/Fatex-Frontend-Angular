import { Component, OnInit } from '@angular/core';

import { Veiculo } from '../../../modelo/Veiculo';
import { VeiculoService } from '../../../services/VEI_VEICULOS/veiculo.service';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tabela-3',
  standalone: true,
  imports: [TableModule, SidebarModule, ButtonModule],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  veiculos: Veiculo[] = [];

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {

    this.veiculoService.getVeiculosDoUsuario().subscribe((data: Veiculo[]) => {
      this.veiculos = data;
    });
  }
}
