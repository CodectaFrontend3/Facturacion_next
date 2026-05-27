import { Tab, SummaryCard } from "../types"
import { ReactNode } from "react"

export const TABS: Tab[] = [
  { key: "cotizacion",        label: "Cotización",        count: 0, color: "#008000", activeColor: "#008000", href: "/ventas/cotizacion" },
  { key: "cotizacion-manual", label: "Cotización Manual", count: 0, color: "#ffa500", activeColor: "#ffa500", href: "/ventas/cotizacion_manual" },
  { key: "nota-venta",        label: "Nota de Venta",     count: 0, color: "#ff0000", activeColor: "#ff0000", href: "/ventas/nota_venta" },
  { key: "clientes",          label: "Clientes",          count: 0, color: "#0000ff", activeColor: "#0000ff", href: "/ventas/clientes" },
  { key: "renovacion",        label: "Renovación",        count: 0, color: "#808080", activeColor: "#808080", href: "/ventas/renovacion" },
]

export const getSummaryCards = (icons: Record<string, ReactNode>): SummaryCard[] => [
  {
    label: "Cotización",
    documents: 0,
    amount: "S/0.00",
    borderColorClass: "border-[#008000]",
    amountColorClass: "text-[#008000]",
    icon: icons.cotizacion,
  },
  {
    label: "Cotización Manual",
    documents: 2,
    amount: "S/4,827.95",
    borderColorClass: "border-[#ffa500]",
    amountColorClass: "text-[#ffa500]",
    icon: icons.cotizacionManual,
  },
  {
    label: "Nota de Venta",
    documents: 0,
    amount: "S/0.00",
    borderColorClass: "border-[#ff0000]",
    amountColorClass: "text-[#ff0000]",
    icon: icons.notaVenta,
  },
  {
    label: "Clientes",
    documents: 0,
    amount: "0",
    borderColorClass: "border-[#0000ff]",
    amountColorClass: "text-[#0000ff]",
    icon: icons.clientes,
  },
]
