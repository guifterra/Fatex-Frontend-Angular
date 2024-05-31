import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonUsuEnd } from '../../modelo/JsonUsuEnd';
import { Endereco } from '../../modelo/Endereco';
import { Usuario } from '../../modelo/Usuario';
import { UsuarioService } from '../USU_USUARIO/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  // URL da API
  private url:string = 'http://localhost:8080';
  currentUser: Usuario | null = new Usuario();

  constructor( private http:HttpClient, private userService: UsuarioService ) { }

  cadastrarEndereco( obj:JsonUsuEnd ):Observable<Endereco>{
    return this.http.post<Endereco>(`${this.url}/cadastroEndereco`, obj);
  }

  getEnderecosDoUsuario(): Observable<Endereco[]> {
    const currentUser = this.userService.getCurrentUser();
    if(currentUser){
      return this.http.post<Endereco[]>(`${this.url}/listaDeEnderecos`, currentUser);
    } else {
      // Trate o caso em que não há usuário atualmente logado
      // Por exemplo, você pode retornar um Observable vazio ou lançar um erro
      return new Observable<Endereco[]>(observer => observer.complete());
    }
  }
}
