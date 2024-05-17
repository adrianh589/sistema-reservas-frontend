import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {accionType, RedireccionService} from "../../../../services/redireccion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HotelModel} from "../../../../models/hotel.model";
import Swal from "sweetalert2";
import {TipoHabitacionService} from "../../../../services/tipo-habitacion.service";

@Component({
  selector: 'app-detalle-tipo-habitacion',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './detalle-tipo-habitacion.component.html',
  styleUrl: './detalle-tipo-habitacion.component.scss'
})
export class DetalleTipoHabitacionComponent implements OnInit{
  tipoHabitacionForm: FormGroup = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  });
  id!: string | null | undefined;
  accion: accionType = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoHabitacionService: TipoHabitacionService,
    private redireccionService: RedireccionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // Obtener parametros accion y id
    this.accion = this.route.snapshot.paramMap.get('accion') as accionType;
    this.id = this.route.snapshot.paramMap.get('id');

    // Verificar que sea una accion válida, en caso de que NO haya un id y la accion sea editar, redireccionamos a la página de gestión
    if (!this.redireccionService.validarParametrosRutaYRedirigir(this.accion, this.id, '/administradores/tipos-habitaciones')) {return;}

    if (this.accion === 'editar') {
      this.initForm();
    } else {
      console.log('Acción no válida');
    }
  }

  private initForm(): void {
    this.tipoHabitacionService.getTipoHabitacion(+this.id!).subscribe({
      next: (res) => {
        console.log(res);
        this.tipoHabitacionForm.get('nombre')?.setValue(res.tipoHabitacion.nombre);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  guardarTipoHabitacion() {
    this.tipoHabitacionForm.markAllAsTouched();
    if (this.tipoHabitacionForm.valid) {
      const tipoHabitacion: HotelModel = this.tipoHabitacionForm.value;
      if (this.accion === 'agregar') {
        this.tipoHabitacionService.crearTipoHabitacion(tipoHabitacion).subscribe({
          next: (res) => { Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}); },
          error: (error) => { if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'}); },
          complete: () => this.router.navigate(['/administradores', 'tipos-habitacion'])
        });
      }else if (this.accion === 'editar') {
        this.tipoHabitacionService.editarTipoHabitacion(tipoHabitacion, +this.id!).subscribe({
          next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
          error: (error) => {if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'});},
          complete: () => this.router.navigate(['/administradores', 'tipos-habitacion'])
        });
      }
    }
  }
}
