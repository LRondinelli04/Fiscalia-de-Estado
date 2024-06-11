import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Remove the duplicate implementation of eliminarUsuario function
  listUsuario: Usuario[] = [
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

  constructor() {}

  getUsuario(){
    // Retorna una copia del listado de usuarios
    return this.listUsuario.slice();
  }

  // Eliminar Usario
  deleteUsuario(index: number) {
    // El metodo splice elimina un elemento de un array 
    // El primer elemento identifica el indice del elemento a eliminar 
    // El segundo elememto indica cuantos elementos se eliminaran a partir del indice indicado
    this.listUsuario.splice(index, 1);
  }

  // Agregar Usuario
  agregarUsuario(usuario: Usuario) {
    // El metodo unshift agrega un elemento al inicio de un array
    this.listUsuario.unshift(usuario);
  }
}
