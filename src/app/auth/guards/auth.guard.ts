import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);

  const localToken = localStorage.getItem('token');

  if (localToken){
    return true;
  }else {
    router.navigateByUrl('/administradores/login');
    return false;
  }

};
