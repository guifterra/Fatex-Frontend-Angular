import { Component, OnInit } from '@angular/core';
import { Carona } from '../../../modelo/Carona';
import { CaronaService } from '../../../services/CAR_CARONAS/carona.service';
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

  caronas: Carona[] = [];
  sidebarVisible: boolean = false;

  constructor(private caronaService: CaronaService) {}

  ngOnInit() {

    this.caronaService.getHistoricoCaronas().subscribe((data: Carona[]) => {
      console.log(data)
      this.caronas = data;
    });
  }
}
