import { Component } from '@angular/core';
import {LoadingComponent} from "../../../shared/loading/loading.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
