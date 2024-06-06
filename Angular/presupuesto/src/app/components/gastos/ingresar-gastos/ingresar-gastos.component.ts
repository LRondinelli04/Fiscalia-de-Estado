import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gastos',
  templateUrl: './ingresar-gastos.component.html',
  styleUrls: ['./ingresar-gastos.component.css'],
})
export class IngresarGastosComponent {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textIncorrecto: string;

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = 'Nombre de gasto o cantidad incorrecta';
  }

  ngOnInit(): void {}

  agregarGasto() {
    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'La cantidad ingresada es mayor al restante';
      return;
    }

    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
    } else {
      //Creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad,
      };
      //Enviamos el objeto a los suscriptores via subject
      this._presupuestoService.agregarGasto(GASTO);
      //Reseteamos el formulario

      this.formularioIncorrecto = false;
      // Aquí se debe agregar el gasto
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
