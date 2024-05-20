import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // URL da API
  private url:string = 'http://localhost:8080';

  constructor( private http:HttpClient ) { }

  cadastrar( obj:Usuario ):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/cadastro`, obj); 
  }
}
