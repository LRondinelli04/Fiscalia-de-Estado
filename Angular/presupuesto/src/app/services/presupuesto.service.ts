import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  presupuesto: number;
  restante: number;
  private gasto$ = new Subject<any>(); //Subject es un tipo de observable que permite enviar datos a otros componentes

  constructor() {
    this.presupuesto = 0;
    this.restante = 0;
  }

  //Agregar gasto
  agregarGasto(gasto: any) {
    this.restante = this.restante - gasto.cantidad;
    this.gasto$.next(gasto);
  }

  //Obtener gasto
  getGasto(): Observable<any> {
    return this.gasto$.asObservable();
  }
}
