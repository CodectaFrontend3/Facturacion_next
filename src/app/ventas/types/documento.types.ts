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

// --- NUEVO: Estructura base para los formularios y vistas de detalles ---
export interface DocumentoBase {
  formaPago: "Contado" | "Crédito"
  moneda: "PEN" | "USD"
  observaciones?: string | null
  items: RowData[] // Las filas que maneja VentaItemsTable
  renovacion?: RenovacionState // Si el documento tiene una renovación activa, aquí está su estado
}


// --- NUEVO: Estructura común para filas de tablas de documentos de venta ---
export interface VentaBaseRow {
  id: string | number //
  numero: string //
  rucDni: string //
  cliente: string //
  emision: string //
  forma: string //
  importeT: string //
  acciones: string[] //
  compartir: string[] //
}
