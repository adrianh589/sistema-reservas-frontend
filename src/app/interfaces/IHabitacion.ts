import {HabitacionModel} from "../models/habitacion.model";

export interface IHabitacion {
  ok: boolean,
  msg: string,
  habitacion: HabitacionModel,
  habitaciones: HabitacionModel[],
  habitacionesDisponibles: HabitacionModel[],
  Hotele: HabitacionModel,
  TipoHabitacion: HabitacionModel
}
