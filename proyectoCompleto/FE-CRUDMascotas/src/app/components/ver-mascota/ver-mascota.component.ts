import { Component } from '@angular/core';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css'],
})
export class VerMascotaComponent {
  constructor(private _mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.obtenerMascota();
  }

  obtenerMascota() {
    this._mascotaService.getMascota(1).subscribe((data) => {
      console.log(data);
    });
  }
}
