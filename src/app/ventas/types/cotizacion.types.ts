import { DocumentoBase , VentaBaseRow, RenovacionState} from "./documento.types"
import { ClienteFormData } from "./cliente.types" 


// ==========================================
// A. ENTRADAS PARA CREACIÓN (Formularios)
// ==========================================
export interface CotizacionCreateInput extends DocumentoBase {
  clienteId: string | number // Vinculado a un cliente existente
  validezDias: number
}

export interface CotizacionManualCreateInput extends DocumentoBase {
  clienteId: string | number
  validezDias: number
  // Campos extra específicos de la manual si los necesitas
}


// ==========================================
// B. VISTAS DE DETALLES (Plantilla de lectura)
// ==========================================
export interface CotizacionDetail extends CotizacionCreateInput {
  id: string | number        // Asignado por BD
  numero: string            // Ej: "COT-0001"
  fechaEmision: string      // Asignado por BD
  subtotal: number
  igv: number
  total: number
  cliente: ClienteFormData  // Objeto completo resuelto para la plantilla
  estado: "Pendiente" | "Aceptada" | "Rechazada" | "Facturada"
  diasRestantes?: number    // Atributo dinámico calculado por el servidor si tiene renovación activa
}

export interface CotizacionManualDetail extends CotizacionManualCreateInput {
  id: string | number
  numero: string            // Ej: "COTM-0001"
  fechaEmision: string
  subtotal: number
  igv: number
  total: number
  cliente: ClienteFormData  //
  diasRestantes?: number    // Atributo dinámico calculado por el servidor si tiene renovación activa
}


export interface CotizacionRow extends VentaBaseRow {} //
export interface CotizacionManualRow extends VentaBaseRow {} //
