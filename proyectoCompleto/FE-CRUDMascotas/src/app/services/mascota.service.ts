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

  // Eliminar mascota
  deleteMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.MyAppUrl}${this.MyApiUrl}${id}`);
  }

  // Agregar mascota
  addMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.MyAppUrl}${this.MyApiUrl}`, mascota);
  }
}
