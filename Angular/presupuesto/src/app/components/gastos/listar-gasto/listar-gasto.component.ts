import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css'],
})
export class ListarGastoComponent {
  // Variables
  subscription: Subscription;
  presupuesto: number;
  restante: number;
  listGastos: any[] = []; //Arreglo de gastos

  constructor(private _presupuestoService: PresupuestoService) {
    //Inicializar variables
    this.presupuesto = 0;
    this.restante = 0;

    //Obtener gasto
    this.subscription = this._presupuestoService
      .getGasto()
      .subscribe((data) => {
        //Agregar gasto al arreglo
        this.listGastos.push(data);
        //Restar al restante el gasto
        this.restante = this.restante - data.cantidad;
      });
  }

  ngOnInit(): void {
    //Obtener presupuesto y restante que se encuentran en el servicio
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

  //Cuando el componente se destruye se debe de cancelar la subscripción
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  colorRestante() {
    // Definir el color del restante
    if (this.presupuesto / 4 > this.restante) {
      //Si el restante es menor al 25% del presupuesto
      return 'alert alert-danger';
    } else if (this.presupuesto / 2 > this.restante) {
      //Si el restante es menor al 50% del presupuesto
      return 'alert alert-warning';
    } else {
      //Si el restante es mayor al 50% del presupuesto
      return 'alert alert-success';
    }
  }
}
