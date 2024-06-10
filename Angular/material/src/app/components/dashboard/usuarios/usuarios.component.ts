import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const listUsuario: Usuario[] = [
  {
    usuario: 'Lucas',
    nombre: 'Lucas',
    apellido: 'Rondinelli',
    sexo: 'Masculino',
  },
  {
    usuario: 'Juan',
    nombre: 'Juan',
    apellido: 'Perez',
    sexo: 'Masculino',
  },
  {
    usuario: 'Maria',
    nombre: 'Maria',
    apellido: 'Gonzalez',
    sexo: 'Femenino',
  },
  {
    usuario: 'Ana',
    nombre: 'Ana',
    apellido: 'Rodriguez',
    sexo: 'Femenino',
  },
  {
    usuario: 'Pedro',
    nombre: 'Pedro',
    apellido: 'Gomez',
    sexo: 'Masculino',
  },
  {
    usuario: 'Jose',
    nombre: 'Jose',
    apellido: 'Martinez',
    sexo: 'Masculino',
  },
  {
    usuario: 'Marta',
    nombre: 'Marta',
    apellido: 'Lopez',
    sexo: 'Femenino',
  },
  {
    usuario: 'Carla',
    nombre: 'Carla',
    apellido: 'Fernandez',
    sexo: 'Femenino',
  },
  {
    usuario: 'Jorge',
    nombre: 'Jorge',
    apellido: 'Diaz',
    sexo: 'Masculino',
  },
  {
    usuario: 'Fernando',
    nombre: 'Fernando',
    apellido: 'Alvarez',
    sexo: 'Masculino',
  },
  {
    usuario: 'Luisa',
    nombre: 'Luisa',
    apellido: 'Torres',
    sexo: 'Femenino',
  },
  {
    usuario: 'Raul',
    nombre: 'Raul',
    apellido: 'Gimenez',
    sexo: 'Masculino',
  },
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'sexo', 'acciones'];
  dataSource = listUsuario;
}
