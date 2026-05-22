export interface CotizacionBaseRow {
  id: string | number
  numero: string
  rucDni: string
  cliente: string
  emision: string
  forma: string
  importeT: string
  acciones: string[]
  compartir: string[]
}

export interface CotizacionRow extends CotizacionBaseRow {}

export interface CotizacionManualRow extends CotizacionBaseRow {}

export interface NotaVentaRow extends CotizacionBaseRow {}

export interface RenovacionRow extends CotizacionBaseRow {
  vencimiento?: string
  dias?: string
}
