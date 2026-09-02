export interface BoletaRow {
  id: string | number
  item: number
  codigo: string
  rucDni?: string
  cliente?: string
  fechaCreacion?: string
  fechaEmision?: string
  sunatStatus: "enviado" | "pendiente" | "error"
}

export interface BoletaEnviadaRow extends BoletaRow {
  precioTotal?: string | number
}
