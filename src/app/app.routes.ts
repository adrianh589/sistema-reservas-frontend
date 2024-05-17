import { Routes } from '@angular/router';
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {InicioComponent} from "./reservistas/components/inicio/inicio.component";
import {LoginComponent} from "./auth/components/login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'administradores',
    loadChildren: () => import('./administradores/admin-routes').then(m => m.adminRoutes)
  },
  {
    path: 'reservistas',
    loadChildren: () => import('./reservistas/reservista-routes').then(m => m.reservistaRoutes)
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: LoginComponent
  },
];
