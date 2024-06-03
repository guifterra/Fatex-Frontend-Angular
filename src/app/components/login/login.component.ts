import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule, 
    ButtonModule, 
    CheckboxModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterLink, 
    RouterModule, 
    ToastModule, 
    TooltipModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  erroLogin: string = '';

  constructor(
    private fb: FormBuilder,
    private servico: UsuarioService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuEmail: ['', [Validators.required, Validators.email]],
      usuSenha: ['', Validators.required]
    });
  }

  realizarLogin() {
    if (this.loginForm.valid) {
      this.servico.login(this.loginForm.value).subscribe(
        (usuario: Usuario) => {
          this.servico.setCurrentUser(usuario); // Armazenar dados do usuário no Local Storage
          this.router.navigate(['sistema']);
        },
        (error) => {
          this.erroLogin = error.error; // Exibir mensagem de erro
          this.messageService.add({ severity: 'error', summary: 'Erro no Login', detail: 'Email ou Senha incorretos', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos corretamente', life: 3000 });
    }
  }
}
