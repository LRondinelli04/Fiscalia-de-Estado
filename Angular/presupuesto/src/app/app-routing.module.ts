import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarPresupuestoComponent } from './components/ingresar-presupuesto/ingresar-presupuesto.component';
import { GastosComponent } from './components/gastos/gastos.component';

const routes: Routes = [
  { path: '', redirectTo: '/ingresarPresupuesto', pathMatch: 'full' }, // Redirecciona a la ruta ingresarPresupuesto si la ruta es vacía
  { path: 'ingresarPresupuesto', component: IngresarPresupuestoComponent }, // Ruta para ingresar el presupuesto
  { path: 'gastos', component: GastosComponent }, // Ruta para ingresar los gastos
  { path: '**', redirectTo: 'ingresarPresupuesto', pathMatch: 'full' }, // Redirecciona a la ruta ingresarPresupuesto si la ruta no existe o es errónea
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
