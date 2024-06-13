import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  // Variables
  private MyAppUrl: string = environment.endpoint;
  private MyApiUrl: string = 'api/Mascota/';

  constructor(private http: HttpClient) {}

  // Devuelve un arreglo de Mascotas
  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.MyAppUrl}${this.MyApiUrl}`);
  }

  // Devuelve 1 solo objeto de Mascota
  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.MyAppUrl}${this.MyApiUrl}${id}`);
  }
}
