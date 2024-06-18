import { Component } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
