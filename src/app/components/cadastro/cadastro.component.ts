import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';

interface TipoDeConta {
  name: string;
  code: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    InputMaskModule,
    PasswordModule,
    DialogModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    ToastModule,
    TooltipModule,
    DropdownModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  providers: [MessageService],
})
export class CadastroComponent implements OnInit {
  value: string | undefined;

  // Objeto do tipo cliente
  usuario = new Usuario();

  // Contrutor para Serviço e MessageService
  constructor(
    private servico: UsuarioService,
    private messageService: MessageService
  ) {}

  formGroup!: FormGroup;

  tipoDeConta: TipoDeConta[] | undefined;

  tipoDeContaSelecionado: string | undefined;

  ngOnInit() {
    this.tipoDeConta = [
      { name: 'Passageiro', code: 'PASSAGEIRO' },
      { name: 'Motorista', code: 'MOTORISTA' },
    ];

    this.tipoDeContaSelecionado = ''; // Initialize to an empty string

  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  onTipoDeContaChange(selectedValue: string) {
    this.usuario.usuTipo = selectedValue as 'PASSAGEIRO' | 'MOTORISTA';
  }

  cadastrar(): void {
    console.log(this.usuario);
    this.servico.cadastrar(this.usuario).subscribe(
      (retorno) => {
        // Limpar formulario
        this.usuario = new Usuario();
        // Mensagem de sucesso
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso no cadastro',
          detail:
            'Seu cadastro foi realizado com sucesso! Você já pode realizar seu login.',
          life: 3000,
        });
      },
      (error) => {
        // Tratamento de erro
        console.error('Ocorreu um erro ao cadastrar o cliente:', error);
        // Exibir alerta ao usuário
        this.messageService.add({
          severity: 'warn',
          summary: 'Erro inesperado',
          detail: 'Ocorreu um erro inesperado! Tente novamente mais tarde.',
          life: 3000,
        });
      }
    );
  }
}
