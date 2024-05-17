import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {accionType, RedireccionService} from "../../../../services/redireccion.service";
import Swal from "sweetalert2";
import {HotelService} from "../../../../services/hotel.service";
import {HotelModel} from "../../../../models/hotel.model";

@Component({
  selector: 'app-detalle-ciudad',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './detalle-hotel.component.html',
  styleUrl: './detalle-hotel.component.sass'
})
export class DetalleHotelComponent implements OnInit {
  hotelForm: FormGroup = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    habilitado: [true]
  });
  id!: string | null | undefined;
  accion: accionType = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private redireccionService: RedireccionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // Obtener parametros accion y id
    this.accion = this.route.snapshot.paramMap.get('accion') as accionType;
    this.id = this.route.snapshot.paramMap.get('id');

    // Verificar que sea una accion válida, en caso de que NO haya un id y la accion sea editar, redireccionamos a la página de gestión
    if (!this.redireccionService.validarParametrosRutaYRedirigir(this.accion, this.id, '/administradores/hoteles')) {
      return
    }

    if (this.accion === 'editar') {
      this.initForm();
    } else {
      console.log('Acción no válida');
    }
  }

  private initForm(): void {
      this.hotelService.getHotel(+this.id!).subscribe({
        next: (res) => {
          console.log(res);
          this.hotelForm.get('nombre')?.setValue(res.hotel.nombre);
          this.hotelForm.get('habilitado')?.setValue(res.hotel.habilitado);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  guardarHotel() {
    this.hotelForm.markAllAsTouched();
    if (this.hotelForm.valid) {
      const hotel: HotelModel = this.hotelForm.value;
      if (this.accion === 'agregar') {
        this.hotelService.crearHotel(hotel).subscribe({
          next: (res) => { Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}); },
          error: (error) => { if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'}); },
          complete: () => this.router.navigate(['/administradores', 'hoteles'])
        });
      }else if (this.accion === 'editar') {
        this.hotelService.editarHotel(hotel, +this.id!).subscribe({
          next: (res) => Swal.fire({title: 'Éxito', text: res.msg, icon: 'success'}),
          error: (error) => {if (!error.error.ok) Swal.fire({title: 'Error', text: error.error.msg, icon: 'error'});},
          complete: () => this.router.navigate(['/administradores', 'hoteles'])
        });
      }
    }
  }

}
