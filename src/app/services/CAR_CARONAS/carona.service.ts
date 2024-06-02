import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carona } from '../../modelo/Carona';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../USU_USUARIO/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CaronaService {

  // URL da API
  private url:string = 'http://localhost:8080';
  currentUser: Usuario | null = new Usuario();

  constructor( private http:HttpClient, private userService: UsuarioService ) { }

  cadastrarCarona( obj:Carona ):Observable<Carona>{
    return this.http.post<Carona>(`${this.url}/cadastroCarona`, obj);
  }

  getHistoricoCaronas(): Observable<Carona[]> {
    const currentUser = this.userService.getCurrentUser();
    if(currentUser){
      return this.http.post<Carona[]>(`${this.url}/historicoDeCaronas`, currentUser);
    } else {
      // Trate o caso em que não há usuário atualmente logado
      // Por exemplo, você pode retornar um Observable vazio ou lançar um erro
      return new Observable<Carona[]>(observer => observer.complete());
    }
  }
}
