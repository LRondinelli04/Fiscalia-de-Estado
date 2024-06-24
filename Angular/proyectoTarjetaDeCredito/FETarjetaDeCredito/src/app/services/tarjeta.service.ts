import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  // Variables
  private myAppUrl = 'https://localhost:7184/';
  private myApiUrl = 'api/tarjeta/';

  constructor(private http: HttpClient) {}

  // Metodos
  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
}
