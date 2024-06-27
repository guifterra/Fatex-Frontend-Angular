import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../../services/USU_USUARIO/usuario.service';
import { MotoristaService } from '../../services/MOT_MOTORISTAS/motorista.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  currentUser: Usuario = new Usuario();

  constructor(
    private servico: UsuarioService,
    private motoristaService: MotoristaService,
    private router: Router
  ) {

    if(!((this.servico.getCurrentUser()) == null))
      this.currentUser = this.servico.getCurrentUser() ?? new Usuario(); // Obter dados do usuário do Local Storage
    else
      this.currentUser = new Usuario();
  }

  tornarMeMotorista(){
    
    const result = this.motoristaService.tornarSeMotorista();

    if( result )
    this.router.navigate(['/']);
  }
}
