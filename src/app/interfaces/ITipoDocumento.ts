import {TipoDocumentoModel} from "../models/TipoDocumentoModel";

export interface ITipoDocumento {
  ok: boolean;
  msg: string;
  tiposDocumento: TipoDocumentoModel[];
}
