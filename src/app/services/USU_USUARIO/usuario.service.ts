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
  private localStorageKey = 'currentUser';

  constructor( private http:HttpClient ) { }

  cadastrar( obj:Usuario ):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.url}/cadastro`, obj);
  }

  login(obj: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login`, obj);
  }

  setCurrentUser(usuario: Usuario) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(usuario));
  }

  getCurrentUser(): Usuario | null {
    const userJson = localStorage.getItem(this.localStorageKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  logout() {
    localStorage.removeItem(this.localStorageKey);
  }
}
