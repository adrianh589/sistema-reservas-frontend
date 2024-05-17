import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type accionType = 'agregar' | 'editar' | null;

/**
 * Servicio para gestión de redirecciones
 */

@Injectable({
  providedIn: 'root'
})
export class RedireccionService {

  constructor(private router: Router) { }

  /**
   * Valida los parámetros de la ruta y redirige a una página específica en caso de que los parámetros no cumplan con ciertas condiciones.
   * @param accion Una cadena de texto que representa la acción tomada en la ruta (por ejemplo, 'agregar' o 'editar').
   * @param id Una cadena de texto que representa el ID de algún elemento de la ruta (puede ser opcional).
   * @param paginaRedireccion La ruta a la página a la que se redirigirá en caso de que los parámetros de la ruta no cumplan con las condiciones necesarias.
   * @returns Un valor booleano que indica si los parámetros de la ruta son válidos (true) o no (false).
   */
  validarParametrosRutaYRedirigir(accion: accionType, id: string | null, paginaRedireccion: string): boolean {
    if (accion === null || !['agregar', 'editar'].includes(accion) || (accion === 'editar' && !id)) {
      this.redirigirAPagina(paginaRedireccion);
      return false;
    }
    return true;
  }

  /**
   * Redirige a una página específica utilizando el enrutador de Angular.
   * @param pagina La ruta de la página a la que se desea redirigir.
   */
  redirigirAPagina(pagina: string): void {
    this.router.navigate([pagina]);
  }
}
