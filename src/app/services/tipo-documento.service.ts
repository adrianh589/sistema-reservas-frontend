import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {ITipoDocumento} from "../interfaces/ITipoDocumento";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

const base_url = `${environment.base_url}/api/tipos-documento`;

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  getTiposDocumento(){
    return this.http.get<ITipoDocumento>(base_url, {headers: this.authService.headers});
  }

}
