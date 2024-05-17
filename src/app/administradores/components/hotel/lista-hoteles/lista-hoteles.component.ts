import {Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {HotelModel} from "../../../../models/hotel.model";
import {HotelService} from "../../../../services/hotel.service";
import {RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-ciudades',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './lista-hoteles.component.html',
  styleUrl: './lista-hoteles.component.sass'
})
export class ListaHotelesComponent {

  hoteles: HotelModel[] = [];

  constructor( private hotelService: HotelService ) {
    this.getHoteles();
  }

  getHoteles() {
    this.hotelService.getHoteles().subscribe({
      next: (res) => {
        console.log(res);
        this.hoteles = res.hoteles
      },
      error: (error) => console.log(error)
    })
  }

  async eliminarHotel(hotel: HotelModel) {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Seguro que deseas eliminar el hotel: ${hotel.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (resultado.isConfirmed) {
      this.hotelService.eliminarHotel(hotel).subscribe({
        next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
        error: (error) => { if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'}); },
        complete: () => this.getHoteles()
      });
    }
  }

}

