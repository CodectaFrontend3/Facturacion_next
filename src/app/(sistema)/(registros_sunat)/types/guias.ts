export interface GuiaRow {
  id: string | number
  item: number
  codigo: string
  rucDni?: string
  cliente?: string
  fechaEmision?: string
  fechaEntrega?: string
  tipoTransporte?: string
  sunatStatus: "enviado" | "pendiente" | "error"
}

export interface GuiaEnviadaRow extends GuiaRow {
  // Iguales
}
