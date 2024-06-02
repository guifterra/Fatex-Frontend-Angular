import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../../modelo/Endereco';
import { EnderecoService } from '../../../services/END_ENDERECOS/endereco.service';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tabela-2',
  standalone: true,
  imports: [TableModule, SidebarModule, ButtonModule, ],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  enderecos: Endereco[] = [];

  constructor(private enderecoService: EnderecoService) {}

  ngOnInit() {
    this.enderecoService.getEnderecosDoUsuario().subscribe((data: Endereco[]) => {
      console.log("teste: " + data[0]);
      this.enderecos = data;
    });
  }
}
