import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../../modelo/Modelo';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  // URL da API
  private url:string = 'http://localhost:8080';

  constructor( private http:HttpClient ) { }

  getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.url}/listaDeModelos`);
  }
}
