import { Component, OnInit } from '@angular/core';
import { HistoricoItems } from '../../../domain/itemDoHistorico';
import { HistoricoService } from '../../../services/historicoService';

import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [TableModule, SidebarModule, ButtonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})

export class TabelaComponent implements OnInit {
  historicos!: HistoricoItems[];
  sidebarVisible: boolean = false;
  
  constructor(private historicoService: HistoricoService) {}

  ngOnInit() {
      this.historicoService.getHistoricosMini().then((data) => {
          this.historicos = data;
      });
  }
}
