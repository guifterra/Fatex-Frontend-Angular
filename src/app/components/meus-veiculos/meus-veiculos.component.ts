import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from './tabela/tabela.component';
import { Veiculo } from '../../modelo/Veiculo';
import { VeiculoService } from '../../services/VEI_VEICULOS/veiculo.service';
import { MessageService } from 'primeng/api';
import { JsonMotVei } from '../../modelo/JsonMotVei';
import { Modelo } from '../../modelo/Modelo';
import { ModeloService } from '../../services/MOD_MODELOS/modelo.service';
import { Marca } from '../../modelo/Marca';
import { MarcaService } from '../../services/MAR_MARCAS/marca.service';
import { Modelo } from '../../modelo/Modelo';
import { ModeloService } from '../../services/MOD_MODELOS/modelo.service';
import { Marca } from '../../modelo/Marca';
import { MarcaService } from '../../services/MAR_MARCAS/marca.service';
import { Motorista } from '../../modelo/Motorista';
import { MotoristaService } from '../../services/MOT_MOTORISTAS/motorista.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-meus-veiculos',
  standalone: true,
  imports: [TabelaComponent, ToastModule, ButtonModule, InputTextModule, DialogModule, CommonModule, TooltipModule, FormsModule, DropdownModule],
  imports: [TabelaComponent, ToastModule, ButtonModule, InputTextModule, DialogModule, CommonModule, TooltipModule, FormsModule, DropdownModule],
  templateUrl: './meus-veiculos.component.html',
  styleUrl: './meus-veiculos.component.css',
  providers: [MessageService],
})
export class MeusVeiculosComponent implements OnInit {

  veiculo = new Veiculo();
  marcas: Marca[] = [];
  modelos: Modelo[] = [];

  jsonMotVei: JsonMotVei = new JsonMotVei();
  marcas: Marca[] = [];
  modelos: Modelo[] = [];

  jsonMotVei: JsonMotVei = new JsonMotVei();

  constructor(
    private veiculoService: VeiculoService,
    private motoristaService: MotoristaService,
    private messageService: MessageService,
    private marcaService: MarcaService,
    private modeloService: ModeloService
  ) {}

  ngOnInit() {
    this.marcaService.getMarcas().subscribe((data: Marca[]) => {
      this.marcas = data;
    });

    this.modeloService.getModelos().subscribe((data: Modelo[]) => {
      this.modelos = data;
    });
  }
    private marcaService: MarcaService,
    private modeloService: ModeloService
  ) {}

  ngOnInit() {
    this.marcaService.getMarcas().subscribe((data: Marca[]) => {
      this.marcas = data;
    });

    this.modeloService.getModelos().subscribe((data: Modelo[]) => {
      this.modelos = data;
    });
  }

  cadastrarVeiculo(): void {
    console.log(this.veiculo);

    this.jsonMotVei.veiculo = this.veiculo;

    this.motoristaService.getEstatisticasDeMotorista().subscribe(
      (motorista) => {
        this.jsonMotVei.motorista = motorista ?? new Motorista();

        this.veiculoService.cadastrarVeiculo(this.jsonMotVei).subscribe(
          (retorno) => {
            // Limpar formulario
            this.veiculo = new Veiculo();
            this.jsonMotVei = new JsonMotVei();
            // Mensagem de sucesso
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso no cadastro',
              detail: 'Seu cadastro de veículo foi realizado com sucesso!',
              life: 3000,
            });

            // Depois trocar pela emissao de um evento para tabela recargar o metodo de puxar os veiculos
            // Depois trocar pela emissao de um evento para tabela recargar o metodo de puxar os veiculos
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          (error) => {
            // Tratamento de erro
            console.error('Ocorreu um erro ao cadastrar o veículo:', error);
            // Exibir alerta ao usuário
            this.messageService.add({
              severity: 'warn',
              summary: 'Erro inesperado',
              detail: 'Ocorreu um erro inesperado! Tente novamente mais tarde.',
              life: 3000,
            });
          }
        );
      },
      (error) => {
        console.error('Erro ao obter estatísticas do motorista:', error);
        this.messageService.add({
          severity: 'warn',
          summary: 'Erro ao obter motorista',
          detail: 'Não foi possível obter as estatísticas do motorista. Tente novamente mais tarde.',
          life: 3000,
        });
      }
    );
  }
}


