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
import { Motorista } from '../../../modelo/Motorista';
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
  motorista: Motorista | undefined;

  constructor(private veiculoService: VeiculoService, private motoristaService: MotoristaService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.carregarVeiculos();
    this.carregarEstatisticasDoMotorista();
  }

  carregarVeiculos() {
    this.veiculoService.getVeiculosDoUsuario().subscribe(
      (data: Veiculo[]) => {
        this.veiculos = data;
      },
      (error: any) => {
        console.error('Erro ao carregar veículos:', error);
        // Handle error, show message or log as needed
      }
    );
  }

  carregarEstatisticasDoMotorista() {
    this.motoristaService.getEstatisticasDeMotorista().subscribe(
      (data: Motorista) => {
        this.motorista = data;
        console.log('Estatísticas do motorista carregadas:', this.motorista);
      },
      (error: any) => {
        console.error('Erro ao carregar estatísticas do motorista:', error);
        // Handle error, show message or log as needed
      }
    );
  }

  desabilitarVeiculo(veiculo: Veiculo): void {
    this.confirmationService.confirm({
      message: 'Deseja desabilitar esse veículo?',
      header: 'Confirmar ação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const jsonMotVei = {
          veiculo: veiculo,
          motorista: this.motorista ? this.motorista : new Motorista() // Assuming you don't need to include motorista in this operation
        };

        this.veiculoService.alterarVisibilidadeDoVeiculo(jsonMotVei).subscribe(
          (response: any) => {
            console.log(`Veículo com id ${veiculo.veiId} desabilitado com sucesso`, response);
            this.veiculos = this.veiculos.filter(v => v.veiId !== veiculo.veiId);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo desabilitado com sucesso', life: 3000 });
            this.carregarVeiculos();
          },
          (error: any) => {
            console.error(`Erro ao desabilitar veículo com ID ${veiculo.veiId}`, error);
            this.messageService.add({ severity: 'warn', summary: 'Erro', detail: 'Veículo desabilitado com sucesso', life: 3000 });
            this.carregarVeiculos();
          }
        );
      },
      reject: () => {
        // Optionally handle rejection or do nothing
      }
    });
  }

}
