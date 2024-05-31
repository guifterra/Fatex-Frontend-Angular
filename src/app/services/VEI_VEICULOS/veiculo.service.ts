import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MotoristaVeiculo } from '../../modelo/MotoristaVeiculo';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../USU_USUARIO/usuario.service';
import { Veiculo } from '../../modelo/Veiculo';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  // URL da API
  private url:string = 'http://localhost:8080';

  currentUser: Usuario | null = new Usuario();

  constructor( private http:HttpClient, private userService: UsuarioService ) { }

  cadastrarVeiculo( obj:MotoristaVeiculo ):Observable<Veiculo>{
    return this.http.post<Veiculo>(`${this.url}/cadastroVeiculo`, obj);
  }

  getVeiculosDoUsuario(): Observable<Veiculo[]> {
    const currentUser = this.userService.getCurrentUser();
    if(currentUser){
      return this.http.post<Veiculo[]>(`${this.url}/listaDeVeiculos`, currentUser);
    } else {
      // Trate o caso em que não há usuário atualmente logado
      // Por exemplo, você pode retornar um Observable vazio ou lançar um erro
      return new Observable<Veiculo[]>(observer => observer.complete());
    }
  }
}
