export interface HuespedModel {
  id: number;
  idReserva: number;
  idReservista: number;
  nombres: string;
  fechaNacimiento: Date;
  genero: 'M' | 'F';
  tipoDocumentoId: number;
  numeroDocumento: string;
  email: string;
  telefonoContacto: string;
}
