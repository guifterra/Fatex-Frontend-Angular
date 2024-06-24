import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorista } from '../../modelo/Motorista';
import { Usuario } from '../../modelo/Usuario'; // Import Usuario model
import { UsuarioService } from '../USU_USUARIO/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  private url: string = 'http://localhost:8080'; // URL da API

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {}

  // Example method to fetch statistics for the logged-in Motorista
  getEstatisticasDeMotorista(): Observable<Motorista> {
    const currentUser: Usuario | null = this.usuarioService.getCurrentUser();
    if (currentUser) {
      return this.http.post<Motorista>(`${this.url}/estatisticasComoMotorista`, currentUser);
    } else {
      // Handle case where there is no currently logged-in user
      // For example, you can return an empty observable or throw an error
      return new Observable<Motorista>(observer => observer.complete());
    }
  }

  tornarSeMotorista():boolean {
    const currentUser: Usuario | null = this.usuarioService.getCurrentUser();

    if (currentUser) {
      this.http.post(`${this.url}/tornarMeMotorista`, currentUser);
      return true;
    }

    return false;
  }

  avaliarMotorista( obj:Motorista ):void {
    this.http.put(`${this.url}/avaliarMotorista`, obj);
  }
}
