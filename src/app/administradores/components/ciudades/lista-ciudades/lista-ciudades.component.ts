import {Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {UbicacionHabitacionModel} from "../../../../models/ubicacion-habitacion.model";
import {CiudadService} from "../../../../services/ciudad.service";

@Component({
  selector: 'app-lista-ciudades',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './lista-ciudades.component.html',
  styleUrl: './lista-ciudades.component.sass'
})
export class ListaCiudadesComponent {

  ciudades: UbicacionHabitacionModel[] = [];

  constructor( private ciudadService: CiudadService ) {
    this.getCiudades();
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe({
      next: (res) => {
        console.log(res);
        this.ciudades = res.ciudades
      },
      error: (error) => console.log(error)
    })
  }

  async eliminarCiudad(ciudad: UbicacionHabitacionModel) {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Seguro que deseas eliminar la ciudad: ${ciudad.ciudad}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (resultado.isConfirmed) {
      this.ciudadService.eliminarCiudad(ciudad).subscribe({
        next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
        error: (error) => { if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'}); },
        complete: () => this.getCiudades()
      });
    }
  }

}

