import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent {
  displayedColumns: string[] = [
    'usuario',
    'nombre',
    'apellido',
    'sexo',
    'acciones',
  ];

  listUsuario: Usuario[] = [];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.listUsuario = this.usuarioService.getUsuario();
    this.dataSource = new MatTableDataSource(this.listUsuario);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Sort
  @ViewChild(MatSort) sort!: MatSort;

  // Metodo eliminar - llamando al servicio de usuario
  eliminarUsuario(id: number) {
    this.usuarioService.deleteUsuario(id);
    this.cargarUsuarios();

    // Mensaje de eliminacion
    this._snackBar.open('El usuario fue eliminado correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
