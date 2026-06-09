import {DocumentoBase, VentaBaseRow} from "./documento.types"
import {ClienteFormData} from "./cliente.types" //

export interface NotaVentaCreateInput extends DocumentoBase {
  clienteId: string | number
  vendedorId?: string | number
}

export interface NotaVentaDetail extends NotaVentaCreateInput {
  id: string | number
  numero: string            // Ej: "NV-0001"
  fechaEmision: string
  total: number             // Las notas de venta a veces solo guardan total directo
  cliente: ClienteFormData  //
}

export interface NotaVentaRow extends VentaBaseRow {} //
