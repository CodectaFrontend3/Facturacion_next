import { ReactNode } from "react"

export type TabKey = "cotizacion" | "cotizacion-manual" | "nota-venta" | "clientes" | "renovacion"

export interface Tab {
  key: TabKey
  label: string
  count: number
  color: string
  activeColor: string
  href: string
}

export interface SummaryCard {
  label: string
  documents: number | string
  amount: string
  borderColorClass: string
  amountColorClass: string
  icon: ReactNode
}

// --- RE-EXPORTACIONES LIMPIAS Y CENTRALIZADAS ---
export type { 
  RowData, 
  VentaTotals, 
  RenovacionState, 
  DocumentoBase,
  VentaBaseRow
} from "./documento.types"

export type { 
  CotizacionRow, CotizacionManualRow, 
  CotizacionCreateInput, CotizacionManualCreateInput, 
  CotizacionDetail, CotizacionManualDetail
} from "./cotizacion.types" //

export type { 
  ClienteFormData, 
  ClienteRow 
} from "./cliente.types" //

export type {
  NotaVentaCreateInput,
  NotaVentaDetail,
  NotaVentaRow
} from "./nota_venta.types" //