export type RowData = {
  id: string
  articleId: string
  cantidad: number
  isDctoActive: boolean
  detalle: string
  precioManual?: number
}

export type VentaTotals = {
  subtotal: number
  igv: number
  total: number
}

export type RenovacionState = {
  isActive: boolean
  fechaRenovacion: string
}
