import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceSearchResult } from '../modelo/PlaceSearchResult';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  // URL da API
  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  emitPlaceChange(place: PlaceSearchResult): Observable<PlaceSearchResult> {
    return new Observable(observer => {
      observer.next(place);
      observer.complete();
    });
  }

  sendPlaceToBackend(place: PlaceSearchResult): Observable<PlaceSearchResult> {
    return this.http.post<PlaceSearchResult>(`${this.url}/caronaPontos`, place);
  }
}
