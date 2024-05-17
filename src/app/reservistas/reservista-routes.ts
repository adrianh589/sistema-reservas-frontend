import {InicioComponent} from "./components/inicio/inicio.component";
import {BusquedaHotelesComponent} from "./components/busqueda-hoteles/busqueda-hoteles.component";
import {Routes} from "@angular/router";
import {ReservaComponent} from "./components/reserva/reserva.component";

// rutas para usuarios
export const reservistaRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: InicioComponent},
      {path: 'buscar', component: BusquedaHotelesComponent},
      {path: 'reserva', component: ReservaComponent},
      {path: '**', component: InicioComponent},
    ]
  }
];
