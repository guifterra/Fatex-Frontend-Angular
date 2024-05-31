import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorista } from '../../modelo/Motorista';
import { UsuarioService } from '../USU_USUARIO/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  // URL da API
  private url:string = 'http://localhost:8080';

  constructor( private http:HttpClient, private userService: UsuarioService ) { }

  getEstatisticasDeMotorista(): Observable<Motorista> {
    const currentUser = this.userService.getCurrentUser();
    if(currentUser){
      return this.http.post<Motorista>(`${this.url}/estatisticasComoMotorista`, currentUser);
    } else {
      // Trate o caso em que não há usuário atualmente logado
      // Por exemplo, você pode retornar um Observable vazio ou lançar um erro
      return new Observable<Motorista>(observer => observer.complete());
    }
  }
}
