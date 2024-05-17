import {TipoHabitacionModel} from "../models/tipo-habitacion.model";

export interface ITipoHabitacion {
  ok: boolean,
  msg: string,
  tipoHabitacion: TipoHabitacionModel,
  tiposHabitaciones: TipoHabitacionModel[],
}
