import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  // Variables
  private MyAppUrl: string = environment.endpoint;
  private MyApiUrl: string = 'api/Mascota/';

  constructor(private http: HttpClient) {}

  getMascotas(): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}`);
  }
}
