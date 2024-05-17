import {UbicacionHabitacionModel} from "../models/ubicacion-habitacion.model";

export interface ICiudad {
  ok: boolean,
  msg: string,
  ciudad: UbicacionHabitacionModel,
  ciudades: UbicacionHabitacionModel[],
}
