import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HabitacionService } from '../../../services/habitacion.service';
import { HabitacionModel } from '../../../models/habitacion.model';
import { CurrencyPipe, NgClass } from '@angular/common';
import {CiudadService} from "../../../services/ciudad.service";
import {UbicacionHabitacionModel} from "../../../models/ubicacion-habitacion.model";
import Swal from "sweetalert2";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-busqueda-hoteles',
  templateUrl: './busqueda-hoteles.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    NgClass,
    RouterLink
  ],
  styleUrls: ['./busqueda-hoteles.component.sass']
})
export class BusquedaHotelesComponent {
  busquedaForm: FormGroup;
  habitacionesDisponibles: HabitacionModel[] = [];
  fechaHoy: string;
  ciudades: UbicacionHabitacionModel[] = [];

  constructor(
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private ciudadService: CiudadService,
    private router: Router
  ) {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    this.fechaHoy = `${anio}-${mes}-${dia}`;

    this.busquedaForm = this.fb.group({
      fechaEntrada: [
        null, [
          Validators.required,
          this.maxDateValidator()
        ]
      ],
      fechaSalida: [null, Validators.required],
      cantidadPersonas: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      ciudad: [null]
    });

    this.getCiudades();
  }

  maxDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const fechaSalida = this.busquedaForm?.get('fechaSalida')?.value;
      return fechaSalida && control.value > fechaSalida
        ? { maxDate: true }
        : null;
    };
  }

  getHabitacionesDisponibles() {
    const { fechaEntrada, fechaSalida, ciudad } = this.busquedaForm.value;
    this.habitacionService.getHabitacionesDisponibles(fechaEntrada, fechaSalida, ciudad === 'null' ? null : ciudad).subscribe({
      next: (res) => {
        if (res.habitacionesDisponibles.length === 0) {
          Swal.fire('Sin resultados', `
          <h3>Sr. Usuario: </h3>
          No hay habitaciónes con los criterios de búsqueda proporcionados o:
          <ul>
            <li>No hay habitaciones creadas/habilitadas u hoteles habilitados por parte de la administración.</li>
            <li>Las habitaciónes ya están reservadas en ese rango de fechas</li>
            <li>No hay reservas por el filtro de ciudad colocado</li>
          </ul>
          `, 'warning');
        } else {
          this.habitacionesDisponibles = res.habitacionesDisponibles
        }
      }
    });
  }

  getCiudades(){
    this.ciudadService.getCiudades().subscribe({
      next: (res) => (this.ciudades = res.ciudades)
    })
  }

  get fc() {
    return this.busquedaForm.controls;
  }

  seleccionarHabitacion(habitacion: HabitacionModel){
    const cantidadHuespedes = +this.busquedaForm.get('cantidadPersonas')?.value;
    const fechaInicioReserva = this.busquedaForm.get('fechaEntrada')?.value;
    const fechaFinReserva = this.busquedaForm.get('fechaSalida')?.value;
    this.habitacionService.setHabitacionSeleccionada(habitacion, cantidadHuespedes, fechaInicioReserva, fechaFinReserva);
    this.router.navigateByUrl('/reservistas/reserva');
  }
}
