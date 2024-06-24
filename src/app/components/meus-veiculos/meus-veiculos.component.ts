import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TabelaComponent } from './tabela/tabela.component';
import { Veiculo } from '../../modelo/Veiculo';
import { VeiculoService } from '../../services/VEI_VEICULOS/veiculo.service';
import { MessageService } from 'primeng/api';
import { JsonMotVei } from '../../modelo/JsonMotVei';
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
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-meus-veiculos',
  standalone: true,
  imports: [TabelaComponent, ToastModule, ButtonModule, InputTextModule, DialogModule, CommonModule, TooltipModule, FormsModule, DropdownModule, InputMaskModule],
  templateUrl: './meus-veiculos.component.html',
  styleUrl: './meus-veiculos.component.css',
  providers: [MessageService],
})
export class MeusVeiculosComponent implements OnInit {
  @Output() veiculoAdded: EventEmitter<void> = new EventEmitter<void>();

  veiculo = new Veiculo();
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

  ngOnInit(): void {
    this.marcaService.getMarcas().subscribe((data: Marca[]) => {
      this.marcas = data;
    });

    this.modeloService.getModelos().subscribe((data: Modelo[]) => {
      this.modelos = data;
    });
  }

  cadastrarVeiculo(): void {
    this.jsonMotVei.veiculo = this.veiculo;

    console.log(this.veiculo)

    this.motoristaService.getEstatisticasDeMotorista().subscribe(
      (motorista: Motorista) => {
        this.jsonMotVei.motorista = motorista ?? new Motorista();

        this.veiculoService.cadastrarVeiculo(this.jsonMotVei).subscribe(
          (retorno: any) => {
            this.veiculoAdded.emit(); // Emit event to notify parent component (assuming TabelaComponent is parent)
            this.veiculo = new Veiculo(); // Clear form
            this.jsonMotVei = new JsonMotVei(); // Clear jsonMotVei
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso no cadastro',
              detail: 'Seu cadastro de veículo foi realizado com sucesso!',
              life: 3000,
              
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          (error: any) => {
            console.error('Ocorreu um erro ao cadastrar o veículo:', error);
            this.messageService.add({
              severity: 'warn',
              summary: 'Erro inesperado',
              detail: 'Ocorreu um erro inesperado! Tente novamente mais tarde.',
              life: 3000,
            });
          }
        );
      },
      (error: any) => {
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


