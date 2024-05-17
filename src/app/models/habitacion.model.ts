import {HotelModel} from "./hotel.model";
import {TipoHabitacionModel} from "./tipo-habitacion.model";
import {UbicacionHabitacionModel} from "./ubicacion-habitacion.model";

export class HabitacionModel {
  constructor(
    public id: number,
    public id_hotel: number,
    public id_tipo_habitacion: number,
    public id_ubicacion_habitacion: number,
    public valor: number,
    public habilitado: boolean,
    public impuestos: number,
    public numero_habitacion: number,
    public fechaInicioReserva: Date | string,
    public fechaFinReserva: Date | string,
    public Hotel?: HotelModel,
    public TipoHabitacion?: TipoHabitacionModel,
    public UbicacionHabitacion?: UbicacionHabitacionModel,
    public huespedes?: number
  ) {
  }
}
