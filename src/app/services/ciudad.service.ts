import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHotel} from "../interfaces/IHotel";
import {environment} from "../../environments/environment.development";
import {ICiudad} from "../interfaces/ICiudad";
import {UbicacionHabitacionModel} from "../models/ubicacion-habitacion.model";
import {AuthService} from "./auth.service";

const base_url = `${environment.base_url}/api/ciudades`;

/**
 * Servicio para la gestión de ciudades
 */

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient,
              private authService: AuthService) {  }

  getCiudad(id: number){
    return this.http.get<ICiudad>(`${base_url}/${id}`, {headers: this.authService.headers});
  }

  getCiudades(){
    return this.http.get<ICiudad>(base_url, {headers: this.authService.headers});
  }

  crearCiudad(ciudad: UbicacionHabitacionModel){
    return this.http.post<ICiudad>(base_url, ciudad, {headers: this.authService.headers});
  }

  editarCiudad(ciudad: UbicacionHabitacionModel, id: number){
    return this.http.put<ICiudad>(`${base_url}/${id}`, ciudad, {headers: this.authService.headers});
  }

  eliminarCiudad(ciudad: UbicacionHabitacionModel){
    return this.http.delete<IHotel>(`${base_url}/${ciudad.id}`, {headers: this.authService.headers});
  }
}
