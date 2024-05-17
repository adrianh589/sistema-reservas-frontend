import {HabitacionModel} from "../models/habitacion.model";
import {ReservistaModel} from "../models/reservista.model";
import {ContactoEmergenciaModel} from "../models/contacto-emergencia.model";
import {ReservaModel} from "../models/reserva.model";

export interface IReserva {
  ok: boolean;
  msg: string;
  reserva: ReservaModel;
  reservas: ReservaModel[];
  Habitacione: HabitacionModel;
  Reservistum: ReservistaModel;
  ContactoEmergencium: ContactoEmergenciaModel;
}
