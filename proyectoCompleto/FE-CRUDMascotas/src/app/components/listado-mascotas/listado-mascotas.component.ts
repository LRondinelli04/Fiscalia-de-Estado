import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/interfaces/mascota';

const ELEMENT_DATA: Mascota[] = [
  {
    id: 1,
    nombre: 'Perro',
    edad: 1,
    raza: 'Pastor Aleman',
    color: 'dorado',
    peso: 20,
  },
  { id: 2, nombre: 'Gato', edad: 2, raza: 'Siames', color: 'blanco', peso: 10 },
  {
    id: 3,
    nombre: 'Conejo',
    edad: 1,
    raza: 'Cabeza de Leon',
    color: 'gris',
    peso: 5,
  },
  { id: 4, nombre: 'Pez', edad: 1, raza: 'Dorado', color: 'naranja', peso: 1 },
  {
    id: 5,
    nombre: 'Pajaro',
    edad: 1,
    raza: 'Canario',
    color: 'amarillo',
    peso: 0.5,
  },
  { id: 6, nombre: 'Hamster', edad: 1, raza: 'Ruso', color: 'gris', peso: 0.2 },
  {
    id: 7,
    nombre: 'Cerdo',
    edad: 1,
    raza: 'Vietnamita',
    color: 'rosado',
    peso: 50,
  },
  { id: 8, nombre: 'Cabra', edad: 1, raza: 'Enana', color: 'blanco', peso: 30 },
];
@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css'],
})
export class ListadoMascotasComponent {
  displayedColumns: string[] = [
    'demo-nombre',
    'demo-edad',
    'demo-raza',
    'demo-color',
    'demo-peso',
  ];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
