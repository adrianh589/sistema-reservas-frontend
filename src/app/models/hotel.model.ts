export class HotelModel {
  constructor(
    public id: number,
    public nombre: string,
    public habilitado: boolean,
    public fechaCreacion: Date,
    public fechaModificacion: Date,
  ) {
  }
}
