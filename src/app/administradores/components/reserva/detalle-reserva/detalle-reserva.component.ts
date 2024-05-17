import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ReservaModel} from "../../../../models/reserva.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaService} from "../../../../services/reserva.service";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-detalle-reserva',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './detalle-reserva.component.html',
  styleUrl: './detalle-reserva.component.sass'
})
export class DetalleReservaComponent {
  id!: string | null | undefined;
  reserva!: ReservaModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService
  ) {
    // Obtener parametro id
    this.id = this.route.snapshot.paramMap.get('id');

    // Si no hay id, redirige
    if (!this.id) {
      this.router.navigate(['/administradores/reservas']);
    }

    // Llamar la api para obtener los datos de la reserva seleccionada
    this.getReserva(+this.id!);
  }

  getReserva(id: number){
    this.reservaService.getReserva(id).subscribe({
      next: (res) => {
        console.log(res);
        this.reserva = res.reserva;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
