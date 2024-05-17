import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HotelService} from "../../../../services/hotel.service";
import {TipoHabitacionService} from "../../../../services/tipo-habitacion.service";
import {TipoHabitacionModel} from "../../../../models/tipo-habitacion.model";
import {HotelModel} from "../../../../models/hotel.model";
import {accionType, RedireccionService} from "../../../../services/redireccion.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {HabitacionModel} from "../../../../models/habitacion.model";
import {HabitacionService} from "../../../../services/habitacion.service";
import {lastValueFrom} from "rxjs";
import {CiudadService} from "../../../../services/ciudad.service";
import {UbicacionHabitacionModel} from "../../../../models/ubicacion-habitacion.model";

@Component({
  selector: 'app-detalle-habitacion',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './detalle-habitacion.component.html',
  styleUrl: './detalle-habitacion.component.sass'
})
export class DetalleHabitacionComponent implements OnInit {

  tiposHabitacion: TipoHabitacionModel[] = [];
  hoteles: HotelModel[] = [];
  ciudades: UbicacionHabitacionModel[] = [];
  id!: string | null | undefined;
  accion: accionType = null;
  habitacionForm: FormGroup = this.fb.group({
    id_hotel: [null, Validators.required],
    id_tipo_habitacion: [null, Validators.required],
    id_ubicacion_habitacion: [null],
    valor: [null, Validators.required],
    habilitado: [true],
    impuestos: [null, Validators.required],
    numero_habitacion: [null, Validators.required],
  });

  constructor(
    private hotelService: HotelService,
    private tipoHabitacionService: TipoHabitacionService,
    private redireccionService: RedireccionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private habitacionService: HabitacionService,
    private ciudadService: CiudadService
  ) {

  }

  async ngOnInit() {
    // Obtener parametros accion y id
    this.accion = this.route.snapshot.paramMap.get('accion') as accionType;
    this.id = this.route.snapshot.paramMap.get('id');

    // Verificar que sea una accion válida, en caso de que NO haya un id y la accion sea editar, redireccionamos a la página de gestión
    if (!this.redireccionService.validarParametrosRutaYRedirigir(this.accion, this.id, '/administradores/hoteles')) {
      return;
    }

    this.getHoteles();
    this.getTiposHabitacion();
    this.getCiudades();

    if (this.accion === 'editar') {
      this.initForm();
    } else {
      console.log('Acción no válida');
    }
  }

  getHoteles() {
    return this.hotelService.getHoteles().subscribe({
      next: (res) => {
        console.log(res);
        if (this.accion === 'agregar' && res.hoteles.length === 0) {
          Swal.fire('Alerta', 'Debes crear almenos un hotel antes de crear habitaciónes', 'warning');
          this.router.navigateByUrl('/administradores/hoteles');
        } else {
          this.hoteles = res.hoteles
        }
      },
      error: (error) => console.log(error)
    });
  }

  getTiposHabitacion() {
    this.tipoHabitacionService.getTiposHabitacion().subscribe({
      next: (res) => {
        console.log(res);
        if (this.accion === 'agregar' && res.tiposHabitaciones.length === 0) {
          Swal.fire('Alerta', 'Debes crear almenos un tipo de habitación antes de crear habitaciónes', 'warning');
          this.router.navigateByUrl('/administradores/tipos-habitacion');
        } else {
          this.tiposHabitacion = res.tiposHabitaciones
        }
      },
      error: (error) => console.log(error)
    });
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe({
      next: (res) => {
        console.log(res);
        this.ciudades = res.ciudades
      },
      error: (error) => console.log(error)
    })
  }

  private initForm(): void {
    this.habitacionService.getHabitacion(+this.id!).subscribe({
      next: (res) => {
        console.log(res);
        this.habitacionForm.get('id_hotel')?.setValue(res.habitacion.id_hotel);
        this.habitacionForm.get('id_tipo_habitacion')?.setValue(res.habitacion.id_tipo_habitacion);
        this.habitacionForm.get('valor')?.setValue(res.habitacion.valor);
        this.habitacionForm.get('impuestos')?.setValue(res.habitacion.impuestos);
        this.habitacionForm.get('numero_habitacion')?.setValue(res.habitacion.numero_habitacion);
        this.habitacionForm.get('habilitado')?.setValue(res.habitacion.habilitado);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  guardarHabitacion() {
    this.habitacionForm.markAllAsTouched();
    if (this.habitacionForm.valid) {
      const habitacion: HabitacionModel = this.habitacionForm.value;
      if (this.accion === 'agregar') {
        this.habitacionService.crearHabitacion(habitacion).subscribe({
          next: (res) => {
            Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'});
          },
          error: (error) => {
            if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'});
          },
          complete: () => this.router.navigate(['/administradores', 'habitaciones'])
        });
      } else if (this.accion === 'editar') {
        this.habitacionService.editarHabitacion(habitacion, +this.id!).subscribe({
          next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
          error: (error) => {
            if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'});
          },
          complete: () => this.router.navigate(['/administradores', 'habitaciones'])
        });
      }
    }
  }
}
