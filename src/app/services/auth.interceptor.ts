import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import Swal from "sweetalert2";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

/**
 * Interceptor que manejará las solicitudes entrantes con la finalidad de centralizar la lógica de verificación del token
 * @param req Parametros que se enviarán como petición al servidor
 * @param next La request o respuesta del servidor
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const authReq = req.clone({
    headers: req.headers.set('x-token', authService.token)
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) { // Si el error es 401 significa que es unhautorized
        Swal.fire('Error', 'Su sesión ha caducado, inicie sesión nuevamente', 'warning');
        authService.cerrarSesion();
        router.navigate(['administradores/login']);
      }
      return throwError(error);
    })
  );
};
