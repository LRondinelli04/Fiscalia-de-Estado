import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  sexo: any[] = [
    { value: 'masculino', viewValue: 'Masculino' },
    { value: 'femenino', viewValue: 'Femenino' },
    { value: 'No Identificado', viewValue: 'No especificado' },
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
    });
  }

  ngOnInit() {}

  agregarUsuario() {
    // Validar formulario
    const user: Usuario = {
      usuario: this.form.value.usuario,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      sexo: this.form.value.sexo,
    };

    // Agregar usuario
    this.usuarioService.agregarUsuario(user);

    // Redireccionar a usuarios
    this.router.navigate(['/dashboard/usuarios']);

    // Mostrar mensaje de usuario agregado
    this._snackBar.open('Usuario agregado', '', {
      duration: 3000,
    });
  }

  volver() {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
