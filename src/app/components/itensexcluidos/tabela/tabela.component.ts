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
import { Endereco } from '../../../modelo/Endereco';
import { EnderecoService } from '../../../services/END_ENDERECOS/endereco.service';
import { Usuario } from '../../../modelo/Usuario';
import { UsuarioService } from '../../../services/USU_USUARIO/usuario.service';

@Component({
  selector: 'app-tabela-4',
  standalone: true,
  imports: [TableModule, SidebarModule, ButtonModule, ToastModule, ConfirmDialogModule, RippleModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnInit {

  veiculos: Veiculo[] = [];
  selectedVeiculos: Veiculo[] = [];
  motorista: Motorista | undefined;

  enderecos: Endereco[] = [];
  SelectedEnderecos: Endereco[] = [];
  usuario: Usuario | undefined | null;

  constructor(private veiculoService: VeiculoService, private motoristaService: MotoristaService, private messageService: MessageService, private confirmationService: ConfirmationService, private enderecoService: EnderecoService, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.carregarVeiculos();
    this.carregarEstatisticasDoMotorista();
    this.carregarEnderecos();
    this.carregarUsuario();
  }

  carregarVeiculos() {
    this.veiculoService.getVeiculosExcluidosDoUsuario().subscribe(
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

  carregarEnderecos(){
    this.enderecoService.getEnderecosExcluidosDoUsuario().subscribe((data: Endereco[]) => {
      console.log("teste: " + data[0]);
      this.enderecos = data;
    });
  }

  carregarUsuario(){
    if(!((this.usuarioService.getCurrentUser()) == null))
      this.usuario = this.usuarioService.getCurrentUser(); // Obter dados do usuário do Local Storage
    else
      this.usuario = new Usuario();
  }

  ativarVeiculo(veiculo: Veiculo): void {
    this.confirmationService.confirm({
      message: 'Deseja ativar novamente esse veículo?',
      header: 'Confirmar ação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const jsonMotVei = {
          veiculo: veiculo,
          motorista: this.motorista ? this.motorista : new Motorista() // Assuming you don't need to include motorista in this operation
        };

        this.veiculoService.alterarVisibilidadeDoVeiculo(jsonMotVei).subscribe(
          (response: any) => {
            console.log(`Veículo com id ${veiculo.veiId} ativado com sucesso`, response);
            this.veiculos = this.veiculos.filter(v => v.veiId !== veiculo.veiId);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo ativado com sucesso', life: 3000 });
            this.carregarVeiculos();
          },
          (error: any) => {
            console.error(`Erro ao reativar veículo com ID ${veiculo.veiId}`, error);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo ativado com sucesso', life: 3000 });
            this.carregarVeiculos();
          }
        );
      },
      reject: () => {
        // Optionally handle rejection or do nothing
      }
    });
  }

  ativarEndereco(endereco: Endereco): void {
    this.confirmationService.confirm({
      message: 'Deseja ativar novamente esse endereço?',
      header: 'Confirmar ação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const jsonUsuEnd = {
          endereco: endereco,
          usuario: this.usuario ? this.usuario : new Usuario() // Assuming you don't need to include motorista in this operation
        };

        this.enderecoService.alterarVisibilidadeDoMeuEndereco(jsonUsuEnd).subscribe(
          (response: any) => {
            console.log(`Endereco com id ${endereco.endId} ativado com sucesso`, response);
            this.enderecos = this.enderecos.filter(e => e.endId !== endereco.endId);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereco ativado com sucesso', life: 3000 });
            this.carregarEnderecos();
          },
          (error: any) => {
            console.error(`Erro ao desabilitar veículo com ID ${endereco.endId}`, error);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereco ativado com sucesso', life: 3000 });
            this.carregarEnderecos();
          }
        );
      },
      reject: () => {
        // Optionally handle rejection or do nothing
      }
    });
  }

}

