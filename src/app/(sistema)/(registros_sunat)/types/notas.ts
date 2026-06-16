export interface NotaRow {
  id: string | number
  item: number
  codigo: string
  tipo?: string
  docAsoc?: string
  rucDni?: string
  cliente?: string
  fechaEmision?: string
  sunatStatus: "enviado" | "pendiente" | "error"
}

export interface NotaEnviadaRow extends NotaRow {
  fechaEnvio?: string
}
