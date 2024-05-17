import { Component } from '@angular/core';
import {HabitacionModel} from "../../../../models/habitacion.model";
import {FormsModule} from "@angular/forms";
import {HabitacionService} from "../../../../services/habitacion.service";
import Swal from "sweetalert2";
import {CurrencyPipe, NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-lista-habitaciones',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './lista-habitaciones.component.html',
  styleUrl: './lista-habitaciones.component.sass'
})
export class ListaHabitacionesComponent {
  habitaciones: HabitacionModel[] = [];

  constructor(
    private habitacionService: HabitacionService,
  ) {
    this.getHabitaciones();
  }

  getHabitaciones() {
    this.habitacionService.getHabitaciones().subscribe({
      next: (res) => {
        console.log(res);
        this.habitaciones = res.habitaciones
      },
      error: (error) => console.log(error)
    })
  };

  async eliminarHabitacion(habitacion: HabitacionModel) {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Seguro que deseas eliminar el hotel: ${habitacion.Hotel!.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (resultado.isConfirmed) {
      this.habitacionService.eliminarHabitacion(habitacion).subscribe({
        next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
        error: (error) => {
          if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'});
        },
        complete: () => this.getHabitaciones()
      });
    }
  }
}
