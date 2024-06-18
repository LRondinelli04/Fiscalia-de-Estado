import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent {
  // Variables
  listTarjetas: any[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
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
    this.toastr.success(
      'Se registro correctamente la tarjeta',
      'Tarjeta Registrada'
    );

    // Reseteo el formulario
    this.form.reset();
  }

  eliminarTarjeta(index: number) {
    this.listTarjetas.splice(index, 1);
    this.toastr.error(
      'Se elimino correctamente la tarjeta',
      'Tarjeta Eliminada'
    );
  }
}
