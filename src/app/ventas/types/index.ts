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

export interface CotizacionRow {
  id: string | number
  numero: string
  rucDni: string
  cliente: string
  emision: string
  forma: string
  importeT: string
  acciones: string[]
  compartir: string[]
}
