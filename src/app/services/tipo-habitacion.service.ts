import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITipoHabitacion} from "../interfaces/ITipoHabitacion";
import {environment} from "../../environments/environment.development";
import {TipoHabitacionModel} from "../models/tipo-habitacion.model";
import {AuthService} from "./auth.service";

const base_url = `${environment.base_url}/api/tipos-habitaciones`;

@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {

  constructor(private http: HttpClient,
              private authService: AuthService) {  }

  getTipoHabitacion(id: number){
    return this.http.get<ITipoHabitacion>(`${base_url}/${id}`, {headers: this.authService.headers});
  }

  getTiposHabitacion(){
    return this.http.get<ITipoHabitacion>(base_url, {headers: this.authService.headers});
  }

  crearTipoHabitacion(tipoHabitacion: TipoHabitacionModel){
    return this.http.post<ITipoHabitacion>(base_url, tipoHabitacion, {headers: this.authService.headers});
  }

  editarTipoHabitacion(tipoHabitacion: TipoHabitacionModel, id: number){
    return this.http.put<ITipoHabitacion>(`${base_url}/${id}`, tipoHabitacion, {headers: this.authService.headers});
  }

  eliminarTipoHabitacion(tipoHabitacion: TipoHabitacionModel){
    return this.http.delete<ITipoHabitacion>(`${base_url}/${tipoHabitacion.id}`, {headers: this.authService.headers});
  }
}
