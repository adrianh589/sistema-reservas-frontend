import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {IHotel} from "../interfaces/IHotel";
import {HotelModel} from "../models/hotel.model";
import {AuthService} from "./auth.service";

const base_url = `${environment.base_url}/api/hoteles`;

/**
 * Gestión para la gestión de hoteles
 */

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient,
              private authService: AuthService) {  }

  getHotel(id: number){
    return this.http.get<IHotel>(`${base_url}/${id}`, {headers: this.authService.headers});
  }

  getHoteles(){
    return this.http.get<IHotel>(base_url, {headers: this.authService.headers});
  }

  crearHotel(hotel: HotelModel){
    return this.http.post<IHotel>(base_url, hotel, {headers: this.authService.headers});
  }

  editarHotel(hotel: HotelModel, id: number){
    return this.http.put<IHotel>(`${base_url}/${id}`, hotel, {headers: this.authService.headers});
  }

  eliminarHotel(hotel: HotelModel){
    return this.http.delete<IHotel>(`${base_url}/${hotel.id}`, {headers: this.authService.headers});
  }

}
