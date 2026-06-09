export interface FacturacionRow {
  id: string | number
  item: number
  codigo: string
  rucDni?: string
  cliente?: string
  fechaCreacion?: string
  fechaEmision?: string
  precioTotal?: string | number
  tipoDoc?: string
  montoTotal?: string | number
  montoDetraccion?: string | number
  sunatStatus: "enviado" | "pendiente" | "error"
}

export interface FacturacionData {
  facturas: FacturacionRow[]
  enviados_facturas: FacturacionRow[]
  factura_manual: FacturacionRow[]
  enviados_manual: FacturacionRow[]
  detracciones: FacturacionRow[]
}
