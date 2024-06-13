import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {InicioComponent} from "./reservistas/components/inicio/inicio.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {filter} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoadingService} from "./services/loading.service";
import {LoadingComponent} from "./shared/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicioComponent, NavbarComponent, FooterComponent, NgIf, AsyncPipe, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sistema_reservas_frontend';
  showLayout = false;

  private currentUrl!: string;

  constructor(private router: Router, protected loadingService: LoadingService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = (event as NavigationEnd).urlAfterRedirects;
      this.showLayout = !this.currentUrl.includes('/login');
    });
  }

}
