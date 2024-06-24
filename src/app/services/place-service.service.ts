import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceSearchResult } from '../modelo/PlaceSearchResult';
import { Endereco } from '../modelo/Endereco';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  // URL da API
  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  emitPlaceChange(endereco: Endereco): Observable<PlaceSearchResult> {
    if (endereco.endLatitude === null || endereco.endLongitude === null) {
      throw new Error('Endereco latitude and longitude cannot be null');
    }

    const placeResult: PlaceSearchResult = {
      address: endereco.endRua,
      name: '',
      location: new google.maps.LatLng(endereco.endLatitude, endereco.endLongitude)
    };

    return new Observable(observer => {
      observer.next(placeResult);
      observer.complete();
    });
  }

  sendPlaceToBackend(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${this.url}/caronaPontos`, endereco);
  }
}
