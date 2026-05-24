import { CotizacionDetail, CotizacionManualDetail } from "./cotizacion.types"
import {VentaBaseRow} from "./documento.types" // Reutilizamos la base común para filas de documentos de venta

// Lo que envías al servidor para activar o guardar una renovación
export interface RenovacionCreateInput {
  documentoOrigenId: string | number // ID de la cotización que expira
  tipoOrigen: "estandar" | "manual"
  fechaRenovacion: string           // La fecha límite elegida
}

// Lo que alimenta tu plantilla de detalles de renovación
export interface RenovacionDetail {
  id: string | number //
  vencimiento: string //
  diasRestantes: number
  estado: "Activo" | "Vencido" | "Próximos a vencer" //
  comprobanteEmitido?: string | null // Si ya se convirtió en factura/boleta
  
  // ¡La clave! Tienes acceso total a los datos originales para pintarlos en la plantilla
  documentoOrigen: CotizacionDetail | CotizacionManualDetail 
}

export interface RenovacionRow extends VentaBaseRow {
  vencimiento: string       // Columna: Vencimiento
  dias: string              // Columna: Días (ej: "Faltan 5 días", "Venció hace 2 días")
}