import { Tab, SummaryCard } from "../types"
import { ReactNode } from "react"

export const TABS: Tab[] = [
  { key: "cotizacion", label: "Cotización", count: 0, color: "#008000", activeColor: "#008000" },
  { key: "cotizacion-manual", label: "Cotización Manual", count: 0, color: "#ffa500", activeColor: "#ffa500" },
  { key: "nota-venta", label: "Nota de Venta", count: 0, color: "#ff0000", activeColor: "#ff0000" },
  { key: "clientes", label: "Clientes", count: 0, color: "#0000ff", activeColor: "#0000ff" },
  { key: "renovacion", label: "Renovación", count: 0, color: "#808080", activeColor: "#808080" },
]

export const getSummaryCards = (icons: Record<string, ReactNode>): SummaryCard[] => [
  {
    label: "Cotización",
    documents: 0,
    amount: "S/0.00",
    borderColor: "#008000",
    amountColor: "#008000",
    icon: icons.cotizacion,
  },
  {
    label: "Cotización Manual",
    documents: 2,
    amount: "S/4,827.95",
    borderColor: "#ffa500",
    amountColor: "#ffa500",
    icon: icons.cotizacionManual,
  },
  {
    label: "Nota de Venta",
    documents: 0,
    amount: "S/0.00",
    borderColor: "#ff0000",
    amountColor: "#ff0000",
    icon: icons.notaVenta,
  },
  {
    label: "Clientes",
    documents: 0,
    amount: "0",
    borderColor: "#0000ff",
    amountColor: "#0000ff",
    icon: icons.clientes,
  },
]
