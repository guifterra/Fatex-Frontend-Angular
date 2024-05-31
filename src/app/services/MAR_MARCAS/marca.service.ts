import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../../modelo/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  // URL da API
  private url:string = 'http://localhost:8080';

  constructor( private http:HttpClient ) { }

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.url}/listaDeMarcas`);
  }
}
