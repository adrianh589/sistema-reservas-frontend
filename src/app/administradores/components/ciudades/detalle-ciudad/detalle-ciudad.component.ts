import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {accionType, RedireccionService} from "../../../../services/redireccion.service";
import Swal from "sweetalert2";
import {CiudadService} from "../../../../services/ciudad.service";
import {UbicacionHabitacionModel} from "../../../../models/ubicacion-habitacion.model";

@Component({
  selector: 'app-detalle-ciudad',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './detalle-ciudad.component.html',
  styleUrl: './detalle-ciudad.component.sass'
})
export class DetalleCiudadComponent implements OnInit {
  ciudadForm: FormGroup = this.fb.group({
    ciudad: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    habilitado: [true]
  });
  id!: string | null | undefined;
  accion: accionType = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ciudadService: CiudadService,
    private redireccionService: RedireccionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    // Obtener parametros accion y id
    this.accion = this.route.snapshot.paramMap.get('accion') as accionType;
    this.id = this.route.snapshot.paramMap.get('id');

    // Verificar que sea una accion válida, en caso de que NO haya un id y la accion sea editar, redireccionamos a la página de gestión
    if (!this.redireccionService.validarParametrosRutaYRedirigir(this.accion, this.id, '/administradores/ciudades')) {
      return
    }

    if (this.accion === 'editar') {
      this.initForm();
    } else {
      console.log('Acción no válida');
    }
  }

  private initForm(): void {
      this.ciudadService.getCiudad(+this.id!).subscribe({
        next: (res) => {
          console.log(res);
          this.ciudadForm.get('ciudad')?.setValue(res.ciudad.ciudad);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  guardarCiudad() {
    this.ciudadForm.markAllAsTouched();
    if (this.ciudadForm.valid) {
      const ciudad: UbicacionHabitacionModel = this.ciudadForm.value;
      if (this.accion === 'agregar') {
        this.ciudadService.crearCiudad(ciudad).subscribe({
          next: (res) => { Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}); },
          error: (error) => { if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'}); },
          complete: () => this.router.navigate(['/administradores', 'ciudades'])
        });
      }else if (this.accion === 'editar') {
        this.ciudadService.editarCiudad(ciudad, +this.id!).subscribe({
          next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
          error: (error) => {if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'});},
          complete: () => this.router.navigate(['/administradores', 'ciudades'])
        });
      }
    }
  }

}
