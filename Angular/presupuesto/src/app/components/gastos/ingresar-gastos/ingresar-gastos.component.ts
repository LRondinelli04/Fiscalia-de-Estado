import { Component } from '@angular/core';

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

  constructor() {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = 'Nombre de gasto o cantidad incorrecta';
  }

  ngOnInit(): void {}

  agregarGasto(){
    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
    } else {
      this.formularioIncorrecto = false;
      // Aquí se debe agregar el gasto
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
