import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Auth} from "../../interfaces/auth";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {

  }

  cerrarSesion(){
    this.authService.cerrarSesion();
  }

  get hayToken(){
    return localStorage.getItem('token');
  }
}
