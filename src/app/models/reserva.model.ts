import {HabitacionModel} from "./habitacion.model";
import {ReservistaModel} from "./reservista.model";
import {ContactoEmergenciaModel} from "./contacto-emergencia.model";

export class ReservaModel {
  constructor(
    public id: number,
    public id_reservista: number,
    public id_habitacion: number,
    public id_contacto_emergencia: number,
    public fecha_inicio_reserva: Date,
    public fecha_fin_reserva: Date,
    public cantidad_personas: number,
    public total_pagado: number,
    public habilitado: boolean,
    public fecha_creacion: Date,
    public fecha_modificacion: Date,
    public reserva: ReservaModel[],
    public reservas: ReservaModel[],
    public Habitacion: HabitacionModel,
    public Reservistum: ReservistaModel,
    public ContactoEmergencium: ContactoEmergenciaModel,
  ) {
  }
}
