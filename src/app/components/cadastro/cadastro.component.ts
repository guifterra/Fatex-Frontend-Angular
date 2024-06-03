import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
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
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, Validators } from '@angular/forms';

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
    DividerModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
  providers: [MessageService],
})
export class CadastroComponent implements OnInit {
  formGroup!: FormGroup;
  tipoDeConta: TipoDeConta[] = [
    { name: 'Passageiro', code: 'PASSAGEIRO' },
    { name: 'Motorista', code: 'MOTORISTA' },
  ];

  usuario = new Usuario();

  constructor(
    private formBuilder: FormBuilder,
    private servico: UsuarioService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      usuEmail: ['', [Validators.required, Validators.email]],
      usuNome: ['', Validators.required],
      usuCpf: ['', Validators.required],
      usuSenha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', Validators.required],
      tipoDeConta: ['', Validators.required],
    });
  }

  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  cadastrar(): void {
    if (this.formGroup.valid) {
      // If form is valid, proceed with registration
      this.usuario = this.formGroup.value;
      this.usuario.usuTipo = this.formGroup.get('tipoDeConta')?.value;
      this.usuario.usuCpf = this.formGroup.value.usuCpf.replace(/[\.-]/g, '');
      this.servico.cadastrar(this.usuario).subscribe(
        (retorno) => {
          this.formGroup.reset(); // Reset form on successful registration
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso no cadastro',
            detail:
              'Seu cadastro foi realizado com sucesso! Você já pode realizar seu login.',
            life: 3000,
          });
        },
        (error) => {
          console.error('Ocorreu um erro ao cadastrar o cliente:', error);
          this.messageService.add({
            severity: 'warn',
            summary: 'Erro inesperado',
            detail:
              'Ocorreu um erro inesperado! Tente novamente mais tarde.',
            life: 3000,
          });
        }
      );
    } else {
      // If form is invalid, mark all fields as touched to display errors
      this.formGroup.markAllAsTouched();
    }
  }
}
