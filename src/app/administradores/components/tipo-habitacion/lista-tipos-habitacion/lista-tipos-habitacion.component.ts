import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {TipoHabitacionService} from "../../../../services/tipo-habitacion.service";
import {TipoHabitacionModel} from "../../../../models/tipo-habitacion.model";

@Component({
  selector: 'app-lista-tipos-habitacion',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './lista-tipos-habitacion.component.html',
  styleUrl: './lista-tipos-habitacion.component.scss'
})
export class ListaTiposHabitacionComponent {

  tiposHabitacion: TipoHabitacionModel[] = [];

  constructor( private tipoHabitacionService: TipoHabitacionService ) {
    this.getTiposHabitacion();
  }

  getTiposHabitacion() {
    this.tipoHabitacionService.getTiposHabitacion().subscribe({
      next: (res) => {
        console.log(res);
        this.tiposHabitacion = res.tiposHabitaciones
      },
      error: (error) => console.log(error)
    })
  }

  async eliminarTipoHabitacion(tipoHabitacion: TipoHabitacionModel) {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Seguro que deseas eliminar el hotel: ${tipoHabitacion.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (resultado.isConfirmed) {
      this.tipoHabitacionService.eliminarTipoHabitacion(tipoHabitacion).subscribe({
        next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
        error: (error) => { if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'}); },
        complete: () => this.getTiposHabitacion()
      });
    }
  }
}
