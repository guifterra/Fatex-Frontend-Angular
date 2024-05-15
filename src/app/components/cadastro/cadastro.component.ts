import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CheckboxModule, FormsModule, ReactiveFormsModule, RouterLink, InputMaskModule, PasswordModule, DialogModule, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  value: string | undefined;

  // Objeto do tipo cliente
  usuario = new Usuario();

  // Contrutor para serviço
  constructor(private servico:UsuarioService){}

  formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            city: new FormControl<string | null>(null)
        });
    }

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    cadastrar(): void {
      this.servico.cadastrar(this.usuario).subscribe(
        retorno => {
          // Limpar formulario
          this.usuario = new Usuario();
          // Mensagem de sucesso
          alert("Cliente cadastrado com sucesso!");
        },
        error => {
          // Tratamento de erro
          console.error("Ocorreu um erro ao cadastrar o cliente:", error);
          // Exibir alerta ao usuário
          alert("Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente mais tarde.");
        }
      );
    }
}
