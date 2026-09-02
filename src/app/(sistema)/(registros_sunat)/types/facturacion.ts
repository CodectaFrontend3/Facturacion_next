export interface FacturaRow {
  id: string | number
  item: number
  codigo: string
  rucDni?: string
  cliente?: string
  fechaCreacion?: string
  fechaEmision?: string
  precioTotal?: string | number
  sunatStatus: "enviado" | "pendiente" | "error"
}

export interface FacturaEnviadaRow extends FacturaRow {
  // iguales
}

export interface DetraccionRow {
  id: string | number
  item: number
  codigo: string
  tipoDoc?: string
  fechaEmision?: string
  montoTotal?: string | number
  montoDetraccion?: string | number
  sunatStatus: "enviado" | "pendiente" | "error"
}
