import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {IHabitacion} from "../interfaces/IHabitacion";
import {HabitacionModel} from "../models/habitacion.model";
import {AuthService} from "./auth.service";

const base_url = `${environment.base_url}/api/habitaciones`;

/**
 * Servicio para la gestión de habitaciones
 */

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private habitacionSeleccionada: HabitacionModel | null = null;

  constructor(private http: HttpClient,
              private authService: AuthService) {  }

  getHabitacion(id: number){
    return this.http.get<IHabitacion>(`${base_url}/${id}`, {headers: this.authService.headers});
  }

  getHabitaciones(){
    return this.http.get<IHabitacion>(base_url, {headers: this.authService.headers});
  }

  crearHabitacion(habitacion: HabitacionModel){
    return this.http.post<IHabitacion>(base_url, habitacion, {headers: this.authService.headers});
  }

  editarHabitacion(habitacion: HabitacionModel, id: number){
    return this.http.put<IHabitacion>(`${base_url}/${id}`, habitacion, {headers: this.authService.headers});
  }

  eliminarHabitacion(habitacion: HabitacionModel){
    return this.http.delete<IHabitacion>(`${base_url}/${habitacion.id}`, {headers: this.authService.headers});
  }

  getHabitacionesDisponibles(fechaEntrada: any, fechaSalida: any, ciudad: any){
    return this.http.post<IHabitacion>(`${base_url}/reservas/disponibles`, {headers: this.authService.headers, fechaEntrada, fechaSalida, ciudad});
  }

  /**
   * Acciones para la seleccion de habitación
   */
  getHabitacionSeleccionada(): HabitacionModel | null {
    return this.habitacionSeleccionada;
  }

  setHabitacionSeleccionada(habitacion: HabitacionModel, cantidadHuespedes: number, fechaInicioReserva: Date, fechaSalidaReserva: Date): void {
    this.habitacionSeleccionada = habitacion;
    this.habitacionSeleccionada.huespedes = cantidadHuespedes;
    this.habitacionSeleccionada.fechaInicioReserva = fechaInicioReserva;
    this.habitacionSeleccionada.fechaFinReserva = fechaSalidaReserva;
  }

  limpiarHabitacionSeleccionada(): void {
    this.habitacionSeleccionada = null;
  }
}
