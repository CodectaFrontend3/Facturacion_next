import { CotizacionDetail, CotizacionManualDetail } from "./cotizacion.types"
import { VentaBaseRow } from "./documento.types"

// Lo que envías al servidor para activar o guardar una renovación
export interface RenovacionCreateInput {
  documentoOrigenId: string | number
  tipoOrigen: "estandar" | "manual"
  fechaRenovacion: string
}

// Lo que alimenta tu plantilla de detalles de renovación
export interface RenovacionDetail {
  id: string | number
  vencimiento: string
  diasRestantes: number
  estado: "Activo" | "Vencido" | "Próximos a vencer"
  comprobanteEmitido?: string | null
  // Acceso completo a los datos del documento origen para pintarlos en la plantilla
  documentoOrigen: CotizacionDetail | CotizacionManualDetail
}

// Fila de la tabla de renovación.
// Extiende VentaBaseRow y hace REQUERIDOS los campos que en la base son opcionales,
// porque toda fila que aparece aquí proviene de un documento con renovacion.isActive === true.
export interface RenovacionRow extends VentaBaseRow {
  vencimientoDisplay: string   // Columna: Vencimiento (formateada DD-MM-YYYY)
  dias: string                 // Columna: Días (ej: "Faltan 5 días", "3 días vencido", "Vence hoy")
}