export class ReservistaModel {
  constructor(public id: number,
              public nombres: string,
              public correo: string,
              public fecha_nacimiento: Date,
              public genero: 'M' | 'F',
              public tipo_documento_id: number,
              public numero_documento: string,
              public telefono_contacto: string,
              public fecha_creacion: Date,
              public fecha_modificacion: Date,) {
  }

}
