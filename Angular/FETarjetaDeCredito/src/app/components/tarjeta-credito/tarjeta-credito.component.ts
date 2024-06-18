import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent {
  // Variables
  listTarjetas: any[] = [
    {
      titular: 'Juan Perez',
      numeroTarjeta: '1234 1234 1234 1234',
      fechaExpiracion: '01/23',
      cvv: '123',
    },
    {
      titular: 'Maria Rodriguez',
      numeroTarjeta: '5678 567 5678 5678',
      fechaExpiracion: '01/23',
      cvv: '123',
    },
    {
      titular: 'Pedro Gomez',
      numeroTarjeta: '9876 9876 9876 9876',
      fechaExpiracion: '01/23',
      cvv: '123',
    },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {}

  agregarTarjeta() {
    // Guardo los valores ingresados en el formulario en la constante tarjeta
    const tarjeta: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
    };

    // Agrego la tarjeta a la lista de tarjetas
    this.listTarjetas.push(tarjeta);

    // Reseteo el formulario
    this.form.reset();
  }
}
