import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

const listaMascotas: Mascota[] = [
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
export class ListadoMascotasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombre',
    'edad',
    'raza',
    'color',
    'peso',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Mascota>(listaMascotas);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerMascotas() {
    this._mascotaService.getMascotas().subscribe((data) => {
      console.log(data);
    });
  }

  eliminarMascota(id: number) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this._snackBar.open('La mascota fue eliminada correctamente', '', {
        duration: 1500,
      });
    }, 3000);
  }
}
