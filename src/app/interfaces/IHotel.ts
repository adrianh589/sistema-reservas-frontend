import {HotelModel} from "../models/hotel.model";

export interface IHotel {
  ok: boolean,
  msg: string,
  hotel: HotelModel,
  hoteles: HotelModel[],
}
