import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required], // Validators.required es para que el campo sea obligatorio
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarMascota() {
    // Guardo los datos del formulario en la variable mascota
    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      raza: this.form.get('raza')?.value,
      color: this.form.get('color')?.value,
      edad: this.form.get('edad')?.value,
      peso: this.form.get('peso')?.value,
    };

    // Enviamos objeto al backend
    this._mascotaService.addMascota(mascota).subscribe((data) => {
      // Mostramos mensaje de confirmación
      this.mensajeExito();
      this.router.navigate(['/listadoMascotas']);
    });
  }

  // Mensaje de exito
  mensajeExito() {
    this._snackBar.open('La mascota fue registrada correctamente', '', {
      duration: 1500,
    });
  }
}
