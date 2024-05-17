import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IReserva} from "../interfaces/IReserva";
import {ReservaModel} from "../models/reserva.model";
import {AuthService} from "./auth.service";
import {HabitacionModel} from "../models/habitacion.model";

const base_url = `${environment.base_url}/api/reservas`;

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getReservas(){
    return this.http.get<IReserva>(base_url, {headers: this.authService.headers});
  }

  getReserva(id: number){
    return this.http.get<IReserva>(`${base_url}/${id}`, {headers: this.authService.headers});
  }

  postReserva(reserva: ReservaModel, habitacion: HabitacionModel){
    return this.http.post<IReserva>(`${base_url}`, {headers: this.authService.headers, reserva, habitacion});
  }

}
