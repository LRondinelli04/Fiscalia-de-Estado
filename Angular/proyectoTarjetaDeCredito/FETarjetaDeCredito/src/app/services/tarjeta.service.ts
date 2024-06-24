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
  // Obtener todas las tarjetas
  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  // Eliminar una tarjeta
  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  // Guardar una tarjeta
  saveTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }
}
