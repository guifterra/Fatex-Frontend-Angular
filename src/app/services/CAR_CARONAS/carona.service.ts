import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carona } from '../../modelo/Carona';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../USU_USUARIO/usuario.service';
import { JsonPasCar } from '../../modelo/JsonPasCar';

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

  atualizarCarona( obj:Carona ):Observable<Carona> {
    return this.http.put<Carona>(`${this.url}/atualizarCarona`, obj);
  }

  // Para passageiros
  entrarNaCarona( obj:JsonPasCar ):void {
    this.http.post<Carona>(`${this.url}/entrarNaCarona`, obj);
  }

  // sairDaCarona( obj:JsonPasCar ):void {
  //   this.http.delete(`${this.url}/sairDaCarona`, obj);
  // }

  // Para a tela de todas as caronas solicitadas
  getListaDeCaronasSolicitadas():Observable<Carona[]> {
    return this.http.get<Carona[]>(`${this.url}/listaDeCaronasSolicitadas`);
  }

  // Para a tela de todas as caronas fornecidas
  getListaDeCaronasFornecidas():Observable<Carona[]> {
    return this.http.get<Carona[]>(`${this.url}/listaDeCaronasFornecidas`);
  }
}
