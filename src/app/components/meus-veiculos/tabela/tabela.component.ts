import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../modelo/Veiculo';
import { VeiculoService } from '../../../services/VEI_VEICULOS/veiculo.service';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { JsonMotVei } from '../../../modelo/JsonMotVei';
import { MotoristaService } from '../../../services/MOT_MOTORISTAS/motorista.service';

@Component({
  selector: 'app-tabela-3',
  standalone: true,
  imports: [TableModule, SidebarModule, ButtonModule, ToastModule, ConfirmDialogModule, RippleModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  veiculos: Veiculo[] = [];
  selectedVeiculos: Veiculo[] = [];
  jsonMotVei: JsonMotVei = new JsonMotVei();

  constructor(private veiculoService: VeiculoService, private messageService: MessageService, private confirmationService: ConfirmationService, private motoristaService: MotoristaService) {}

  ngOnInit() {
    this.veiculoService.getVeiculosDoUsuario().subscribe((data: Veiculo[]) => {
      this.veiculos = data;
    });
  }

  desabilitarVeiculo(veiculo: Veiculo): void {
    this.confirmationService.confirm({
      message: 'Deseja deletar esse veículo?',
      header: 'Confirmar ação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.motoristaService.getEstatisticasDeMotorista().subscribe((motorista) =>{
          this.jsonMotVei.motorista = motorista;
        });

        this.jsonMotVei.veiculo = veiculo;

        console.log( "Desabilitando vei: " + this.jsonMotVei );

        this.veiculoService.alterarVisibilidadeDoVeiculo(this.jsonMotVei).subscribe(
          response => {
            console.log(`Veículo com id ${veiculo.veiId} desabilitado com sucesso`, response);
            this.veiculos = this.veiculos.filter(v => v.veiId !== veiculo.veiId);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Veículo deletado com sucesso', life: 3000 });
            this.jsonMotVei = new JsonMotVei();
          },
          error => {
            console.error(`Error disabling vehicle with ID ${veiculo.veiId}`, error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao deletar veículo', life: 3000 });
          }
        );
      }
    });
  }
}
