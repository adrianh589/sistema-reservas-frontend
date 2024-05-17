export class ContactoEmergenciaModel {
  constructor(
    public id: number,
    public nombres: string,
    public telefono_contacto: string,
    public fechaCreacion: Date,
    public fechaModificacion: Date,
  ) {  }

}
