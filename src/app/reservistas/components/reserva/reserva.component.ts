import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyPipe, JsonPipe, NgClass} from "@angular/common";
import {HabitacionModel} from "../../../models/habitacion.model";
import {HabitacionService} from "../../../services/habitacion.service";
import { Router} from "@angular/router";
import Swal from "sweetalert2";
import {TipoDocumentoService} from "../../../services/tipo-documento.service";
import {TipoDocumentoModel} from "../../../models/TipoDocumentoModel";
import {ReservaService} from "../../../services/reserva.service";
import {ReservaModel} from "../../../models/reserva.model";
import {AdultAgeValidatorDirective} from "../../../validators/adult-age-validator.directive";

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    NgClass,
    JsonPipe,
    ReactiveFormsModule,
    AdultAgeValidatorDirective
  ],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss'
})
export class ReservaComponent implements OnInit, OnDestroy {

  habitacion!: HabitacionModel; // Habitacion seleccionada por el usuario
  huespedesFormularios: number[] = []; // Array ficticio para saber cuantos huespedes hay
  tiposDocumento: TipoDocumentoModel[] = [];
  totalHuespedes: number | undefined = 0;

  // Formulario de la reserva
  public reservaForm = this.fb.group({
    reservista: this.fb.group({
      nombres: [null, [Validators.required]],
      fecha_nacimiento: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      tipo_documento_id: [null, [Validators.required]],
      numero_documento: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      correo: [null, [Validators.required, Validators.email]],
      telefono_contacto: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
    }),
    huespedes: this.fb.array([]),
    contacto_emergencia: this.fb.group({ // El contacto de emergencia siempre es el mismo
      nombres: [null, [Validators.required]],
      telefono_contacto: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    }),
    fecha_inicio_reserva: ['', [Validators.required]],
    fecha_fin_reserva: ['', [Validators.required]],
    cantidad_personas: ['', [Validators.required]]
  });

  constructor(private habitacionService: HabitacionService,
              private router: Router,
              private fb: FormBuilder,
              private tipoDocumentoService: TipoDocumentoService,
              private reservaService: ReservaService
  ) {

    /**
     * Si hay habitación elegida, mantenemos al usuario en la pantalla, de lo contrario no
     */
    this.habitacion = this.getHabitacion()!;
    if (this.habitacion && (this.habitacion.huespedes ?? 0) > 0) {
      this.manejarHabitacionSeleccionada(this.habitacion);
    } else {
      this.router.navigateByUrl('reservistas/buscar');
    }
  }

  /**
   * Método que según la habitación seleccionada mantiene al usuario en la pantalla
   * @param habitacionElegida La habitación seleccionada por el usuario
   * @private
   */
  private manejarHabitacionSeleccionada(habitacionElegida: HabitacionModel) {
    this.totalHuespedes = habitacionElegida.huespedes;
    this.huespedesCards();
    this.setFechaInicioReserva(habitacionElegida.fechaInicioReserva);
    this.setFechaFinReserva(habitacionElegida.fechaFinReserva);
    this.setCantidadPersonas( this.totalHuespedes! );
  }

  /**
   * Método para saber la cantidad de personas, si es 1 no habrán huespedes, lo que indica que el reservista
   * reservará solo
   */
  setCantidadPersonas(cantidadHuespedes: string | number){
    this.reservaForm.controls.cantidad_personas.setValue(cantidadHuespedes.toString());
  }

  /**
   * Metodo que agrega la fecha de inicio de reserva como parte del formulario a enviar
   * @param fechaInicioReserva Recibe la fecha de inicio de la reserva que el usuario seleccionó en la pantalla de busqueda de hoteles
   * @private
   */
  private setFechaInicioReserva(fechaInicioReserva?: Date | string) {
    if (fechaInicioReserva) {
      const fechaInicioReservaString = new Date(fechaInicioReserva).toISOString();
      this.reservaForm.controls.fecha_inicio_reserva.setValue(fechaInicioReservaString);
    } else {
      console.log('No se ha proporcionado un fecha de inicio de reserva');
    }
  }

  /**
   * Metodo que agrega la fecha de fin de reserva como parte del formulario a enviar
   * @param fechaFinReserva Recibe la fecha de fin de la reserva que el usuario seleccionó en la pantalla de busqueda de hoteles
   * @private
   */
  private setFechaFinReserva(fechaFinReserva?: Date | string) {
    if (fechaFinReserva) {
      const fechaFinReservaString = new Date(fechaFinReserva).toISOString();
      this.reservaForm.controls.fecha_fin_reserva.setValue(fechaFinReservaString);
    }
  }

  ngOnInit() {
    this.agregarHuespedesDinamicos();
    this.getTiposDocumento();
  }

  /**
   * Método que agrega los formularios de manera dinámica según la cantidad de huéspedes que el usuario
   * seleccionó en la pantalla de busqueda de hoteles
   */
  agregarHuespedesDinamicos() {
    for (let i = 0; i < this.huespedesFormularios.length; i++) {
      (this.reservaForm.controls.huespedes as FormArray).push(this.fb.group({ // Los huespedes son dinamicos, pueden venir 1, 3, 6 etc...
        nombres: [null, [Validators.required]],
        fecha_nacimiento: [null, [Validators.required]],
        genero: [null, [Validators.required]],
        tipo_documento_id: [null, [Validators.required]],
        numero_documento: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        correo: [null, [Validators.email]], // Este si es opcional por que el correo se le envia es al reservista
        telefono_contacto: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      }))
    }
  }


  ngOnDestroy() {
    // Limpiamos la habitacion seleccionada por parte del usuario en caso de que el componente se destruya
    this.habitacionService.limpiarHabitacionSeleccionada();
  }

  /**
   * Obtener la habitación que el usuario eligió previamente con sus preferencias
   */
  getHabitacion() {
    return this.habitacionService.getHabitacionSeleccionada();
  }

  /**
   * Función que crea un array ficticio con la finalidad de poder tener la longitud y con dicha longitud
   * saber cuantos formularios según el numero de huespedes debe crear.
   */
  huespedesCards() {
    if (this.habitacion!.huespedes) {
      for (let i = 0; i < this.totalHuespedes! - 1; i++) {
        this.huespedesFormularios.push(i);
      }
    } else {
      console.log('No hay huespedes seleccionados');
    }
  }

  /**
   * Función para acceder al formulario de huespedes
   */
  get huespedesForm(): FormArray {
    return this.reservaForm.get('huespedes') as FormArray;
  }

  /**
   * Función para acceder a cada uno de los controles de cada huesped dinámicamente
   * @param index Recibe la posición del huesped que se quiere modificar
   * @param value Recibe el nombre de la propiedad del huesped según el indice el cual se quiere modificar
   */
  controlForm(index: number, value: string): FormControl {
    return this.reservaForm.controls.huespedes.at(index).get(value) as FormControl;
  }

  /**
   * Obtener todos los tipos de documento creados hasta el momento (C.C, T.I., etc.)
   */
  getTiposDocumento() {
    this.tipoDocumentoService.getTiposDocumento().subscribe({
      next: (res) => this.tiposDocumento = res.tiposDocumento
    })
  }

  /**
   * Función para acceder a los controles del formulario
   */
  get fc() {
    return this.reservaForm.controls;
  }

  /**
   * Función para reservar una habitación
   */
  reservarHabitacion() {
    // Si el formulario es válido, se procede con la reserva
    if (this.reservaForm.valid) {
      const reserva: ReservaModel = this.reservaForm.value as unknown as ReservaModel;
      this.reservaService.postReserva(reserva, this.habitacion).subscribe({
        next: (res) => {
          Swal.fire('Exito', res.msg, 'success');
          this.router.navigateByUrl('reservistas/buscar');
        },
        error: (error) => Swal.fire('Error', error.error.msg, 'error'),
      });
    } else { // Si falta algún campo, se le notifica al usuario
      console.log(this.reservaForm.value);
      Swal.fire('Faltan campos por llenar', 'porfavor verifique que todos los campos estén llenos', 'warning');
    }
  }

}
