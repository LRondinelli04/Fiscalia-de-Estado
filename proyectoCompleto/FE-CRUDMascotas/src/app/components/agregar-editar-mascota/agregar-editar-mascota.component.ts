import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css'],
})
export class AgregarEditarMascotaComponent {
  // Variables
  loading: boolean = false;
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required], // Validators.required es para que el campo sea obligatorio
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });

    // Obtengo el id de la mascota y lo transformo en un INT
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number) {
    this._mascotaService.getMascota(id).subscribe((data) => {
      // Seteo los valores del formulario con los datos de la mascota para poder editarlos
      this.form.setValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso,
      });
    });
  }

  agregarEditarMascota() {
    // Guardo los datos del formulario en la variable mascota
    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      raza: this.form.get('raza')?.value,
      color: this.form.get('color')?.value,
      edad: this.form.get('edad')?.value,
      peso: this.form.get('peso')?.value,
    };

    if (this.id != 0) {
      mascota.id = this.id; // le asigno el id a la mascota para poder editarla
      this.editarMascota(this.id, mascota);
    } else {
      this.agregarMascota(mascota);
    }
  }

  editarMascota(id: number, mascota: Mascota) {
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe(
      () => {
        this.loading = false;
        this.mensajeExito('editada');
        this.router.navigate(['/listadoMascotas']);
      },
      (error) => {
        this.loading = false;
        this._snackBar.open('Error al editar la mascota', '', {
          duration: 1500,
        });
      }
    );
  }

  agregarMascota(mascota: Mascota) {
    // Enviamos objeto al backend
    this._mascotaService.addMascota(mascota).subscribe(
      (data) => {
        // Mostramos mensaje de confirmación
        this.mensajeExito('registrada');
        this.router.navigate(['/listadoMascotas']);
      },
      (error) => {
        this._snackBar.open('Error al agregar la mascota', '', {
          duration: 1500,
        });
      }
    );
  }
  // Mensaje de exito
  mensajeExito(texto: string) {
    this._snackBar.open(`La Mascota fue ${texto} con exito`, '', {
      duration: 1500,
    });
  }
}
