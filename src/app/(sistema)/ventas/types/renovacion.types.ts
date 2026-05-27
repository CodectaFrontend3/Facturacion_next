export interface RenovacionFormData {
  id?: string | number
  numero: string
  rucDni: string
  cliente: string
  emision: string
  vencimiento: string
  diasRestantes: string
  forma: string
  importeT: string
  comprobante?: string
  estado?: "Activo" | "Vencido" | "Proximos a vencer"
}

export interface RenovacionRow {
  id: string | number
  numero: string
  rucDni: string
  cliente: string
  emision: string
  vencimiento: string
  dias: string
  forma: string
  importeT: string
  acciones: string[]
  compartir: string[]
}
