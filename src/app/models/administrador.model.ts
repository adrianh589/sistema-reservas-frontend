export class AdministradorModel {

  constructor(
    public username: string,
    public password: string,
    public id?: number,
    public correo?: string,
    public fechaCreacion?: Date,
    public fechaModificacion?: Date
  ) {
  }
}
