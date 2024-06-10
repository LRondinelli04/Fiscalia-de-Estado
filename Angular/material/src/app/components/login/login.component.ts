import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ingresar() {
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if (usuario === 'Lucas' && password === 'admin') {
      // Redireccionar al dashboard
      console.log('Ingresaste');
    } else {
      // Mostr ar un error
      this.error();
    }

  
  }
  error() {
    this._snackBar.open('Usuario o contraseña incorrecta', 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
