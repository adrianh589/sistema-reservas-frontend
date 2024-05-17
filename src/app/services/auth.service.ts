import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AdministradorModel} from "../models/administrador.model";
import {tap} from "rxjs";
import {Auth} from "../interfaces/auth";
import {Router} from "@angular/router";

const base_url = `${environment.base_url}/api/auth`;

/**
 * Clase para la gestión de authenticacióñ
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return new HttpHeaders({
      'x-token': this.token
    });
  }

  guardarLocalSorage(token: string) {
    localStorage.setItem('token', token);
  }

  iniciarSesion(administrador: AdministradorModel) {
    return this.http.post<Auth>(base_url, administrador).pipe(
      tap((res: Auth) => this.guardarLocalSorage(res.token))
    );
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/administradores', 'login']);
  }

  validarToken(){
    return this.http.get<Auth>(`${base_url}/renew`, { headers: this.headers }).pipe(
      tap((res: Auth) => this.guardarLocalSorage(res.token))
    );
  }

}
