
import {Routes} from "@angular/router";
import {LoginComponent} from "../auth/components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ListaHotelesComponent} from "./components/hotel/lista-hoteles/lista-hoteles.component";
import {DetalleHotelComponent} from "./components/hotel/detalle-hotel/detalle-hotel.component";
import {ListaHabitacionesComponent} from "./components/habitacion/lista-habitaciones/lista-habitaciones.component";
import {DetalleHabitacionComponent} from "./components/habitacion/detalle-habitacion/detalle-habitacion.component";
import {ListaReservasComponent} from "./components/reserva/lista-reservas/lista-reservas.component";
import {DetalleReservaComponent} from "./components/reserva/detalle-reserva/detalle-reserva.component";
import {InicioComponent} from "../reservistas/components/inicio/inicio.component";
import {
  ListaTiposHabitacionComponent
} from "./components/tipo-habitacion/lista-tipos-habitacion/lista-tipos-habitacion.component";
import {
  DetalleTipoHabitacionComponent
} from "./components/tipo-habitacion/detalle-tipo-habitacion/detalle-tipo-habitacion.component";
import {authGuard} from "../auth/guards/auth.guard";
import {ListaCiudadesComponent} from "./components/ciudades/lista-ciudades/lista-ciudades.component";
import {DetalleCiudadComponent} from "./components/ciudades/detalle-ciudad/detalle-ciudad.component";

// Rutas administradores
export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      // Rutas del administrador
      {path: 'login', component: LoginComponent}, // Página del login
      {path: '', component: DashboardComponent, canActivate: [authGuard]}, // Página de inicio
      {path: 'hoteles', component: ListaHotelesComponent}, // Página gestión hoteles
      {path: 'hoteles/:accion', component: DetalleHotelComponent}, // Página para agregar un hotel
      {path: 'hoteles/:accion/:id', component: DetalleHotelComponent}, // Página para editar un hotel
      {path: 'tipos-habitacion', component: ListaTiposHabitacionComponent}, // Página para gestionar tipos de habitacion
      {path: 'tipos-habitacion/:accion', component: DetalleTipoHabitacionComponent}, // Pagina para agregar un tipo de habitacion
      {path: 'tipos-habitacion/:accion/:id', component: DetalleTipoHabitacionComponent}, // Página para editar un tipo de habitacion
      {path: 'ciudades', component: ListaCiudadesComponent}, // Página para editar una ciudad
      {path: 'ciudades/:accion', component: DetalleCiudadComponent}, // Página para editar una ciudad
      {path: 'ciudades/:accion/:id', component: DetalleCiudadComponent}, // Página para editar una ciudad
      {path: 'habitaciones', component: ListaHabitacionesComponent}, // Página para gestionar habitaciones
      {path: 'habitaciones/:accion', component: DetalleHabitacionComponent}, // Pagina para agregar un hotel
      {path: 'habitaciones/:accion/:id', component: DetalleHabitacionComponent}, // Página para editar un hotel
      {path: 'reservas', component: ListaReservasComponent}, // Listado de reservas
      {path: 'reservas/:id', component: DetalleReservaComponent}, // Ver detalle de reserva
      {path: '**', pathMatch: 'full',component: InicioComponent},
    ]
  }
];
