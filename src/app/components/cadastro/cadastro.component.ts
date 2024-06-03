import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { MessageService } from 'primeng/api';
import { Usuario } from '../../modelo/Usuario';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

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
  styleUrls: ['./cadastro.component.css'],
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
      usuEmail: ['', [Validators.required, Validators.email, Validators.minLength(6), this.emailDomainValidator]],
      usuNome: ['', [Validators.required, Validators.minLength(6)]],
      usuCpf: ['', [Validators.required, this.cpfValidator]],
      usuSenha: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      confSenha: ['', [Validators.required]],
      tipoDeConta: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  // Custom Validators
  emailDomainValidator(control: AbstractControl) {
    const email = control.value;
    if (email && !email.endsWith('@fatec.sp.gov.br')) {
      return { emailDomain: true };
    }
    return null;
  }

  cpfValidator(control: AbstractControl) {
    const cpf = control.value;
    if (cpf && cpf.length !== 14) {
      return { cpfInvalid: true };
    }
    return null;
  }

  passwordStrengthValidator(control: AbstractControl) {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>-_]/.test(password);
    if (!hasNumber || !hasSpecial) {
      return { passwordStrength: true };
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('usuSenha')?.value;
    const confirmPassword = group.get('confSenha')?.value;
    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }

  getErrorMessage(field: string): string {
    const control = this.formGroup.get(field);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo de 6 caracteres';
    }
    if (control?.hasError('emailDomain')) {
      return 'O email deve terminar em @fatec.sp.gov.br';
    }
    if (control?.hasError('cpfInvalid')) {
      return 'O CPF deve ter 14 caracteres';
    }
    if (control?.hasError('passwordStrength')) {
      return 'A senha deve ter pelo menos um número e um caractere especial';
    }
    if (control?.hasError('passwordsNotMatch')) {
      return 'As senhas não são iguais';
    }
    return '';
  }

  cadastrar(): void {
    if (this.formGroup.valid) {
      this.usuario = this.formGroup.value;
      this.usuario.usuTipo = this.formGroup.get('tipoDeConta')?.value;
      this.usuario.usuCpf = this.formGroup.value.usuCpf.replace(/[\.-]/g, '');
      this.servico.cadastrar(this.usuario).subscribe(
        (retorno) => {
          this.formGroup.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso no cadastro',
            detail: 'Seu cadastro foi realizado com sucesso! Você já pode realizar seu login.',
            life: 3000,
          });
        },
        (error) => {
          console.error('Ocorreu um erro ao cadastrar o cliente:', error);
          console.log(this.usuario);
          this.messageService.add({
            severity: 'warn',
            summary: 'Erro inesperado',
            detail: 'Ocorreu um erro inesperado! Tente novamente mais tarde.',
            life: 3000,
          });
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  showDialog() {
    this.visible = true;
  }

  visible: boolean = false;
}
