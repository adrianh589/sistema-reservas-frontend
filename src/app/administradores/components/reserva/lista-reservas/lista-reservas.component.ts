import {Component, OnInit} from '@angular/core';
import {ReservaModel} from "../../../../models/reserva.model";
import {DatePipe, NgClass} from "@angular/common";
import {ReservaService} from "../../../../services/reserva.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.sass'
})
export class ListaReservasComponent implements OnInit{
  reservas: ReservaModel[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas() {
    this.reservaService.getReservas().subscribe({
      next: (res) => {
        console.log(res);
        this.reservas = res.reservas
      },
      error: (error) => console.log(error)
    })
  }

}
