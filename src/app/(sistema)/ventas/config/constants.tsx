import { ReactNode } from "react"
import { Tab, SummaryCard } from "../types"
import cotizacionData from "../data/cotizacion.json"
import notaVentaData from "../data/nota_venta.json"
import clientesData from "../data/cliente.json"

type SummarySourceRow = {
  tab?: string
  renovacion?: { isActive: boolean }
  importeT?: string
  emision?: string
  fechaRegistro?: string
}

export const TABS: Tab[] = [
  { key: "cotizacion", label: "Cotización", count: 0, color: "#008000", activeColor: "#008000", href: "/ventas/cotizacion" },
  { key: "cotizacion-manual", label: "Cotización Manual", count: 0, color: "#ffa500", activeColor: "#ffa500", href: "/ventas/cotizacion_manual" },
  { key: "nota-venta", label: "Nota de Venta", count: 0, color: "#ff0000", activeColor: "#ff0000", href: "/ventas/nota_venta" },
  { key: "clientes", label: "Clientes", count: 0, color: "#0000ff", activeColor: "#0000ff", href: "/ventas/clientes" },
  { key: "renovacion", label: "Renovación", count: 0, color: "#808080", activeColor: "#808080", href: "/ventas/renovacion" },
]

function calculateTotal(data: SummarySourceRow[]) {
  const sum = data.reduce((acc, row) => {
    const numericString = String(row.importeT || "0").replace(/[^0-9.-]+/g, "")
    const value = parseFloat(numericString)
    return acc + (isNaN(value) ? 0 : value)
  }, 0)

  return `S/ ${sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function filterByCurrentMonth(data: SummarySourceRow[]) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return data.filter((row) => {
    const dateStr = row.emision || row.fechaRegistro
    if (!dateStr) return false

    const parts = dateStr.split(/[-/]/)
    if (parts.length !== 3) return false

    const [, month, year] = parts
    return parseInt(month) - 1 === currentMonth && parseInt(year) === currentYear
  })
}

export const getSummaryCards = (icons: Record<string, ReactNode>): SummaryCard[] => {
  const currentCotizacion = filterByCurrentMonth(cotizacionData.filter((r) => r.tab === "cotizacion"))
  const currentCotizacionManual = filterByCurrentMonth(cotizacionData.filter((r) => r.tab === "cotizacion-manual"))
  const currentRenovacion = filterByCurrentMonth(cotizacionData.filter((r) => r.renovacion?.isActive === true))
  const currentNotaVenta = filterByCurrentMonth(notaVentaData)
  const currentClientes = filterByCurrentMonth(clientesData)

  return [
    {
      label: "Cotización",
      documents: currentCotizacion.length,
      amount: calculateTotal(currentCotizacion),
      borderColorClass: "border-[#008000]",
      amountColorClass: "text-[#008000]",
      icon: icons.cotizacion,
    },
    {
      label: "Cotización Manual",
      documents: currentCotizacionManual.length,
      amount: calculateTotal(currentCotizacionManual),
      borderColorClass: "border-[#ffa500]",
      amountColorClass: "text-[#ffa500]",
      icon: icons.cotizacionManual,
    },
    {
      label: "Nota de Venta",
      documents: currentNotaVenta.length,
      amount: calculateTotal(currentNotaVenta),
      borderColorClass: "border-[#ff0000]",
      amountColorClass: "text-[#ff0000]",
      icon: icons.notaVenta,
    },
    {
      label: "Clientes",
      documents: currentClientes.length,
      amount: "0",
      borderColorClass: "border-[#0000ff]",
      amountColorClass: "text-[#0000ff]",
      icon: icons.clientes,
    },
    {
      label: "Renovación",
      documents: currentRenovacion.length,
      amount: calculateTotal(currentRenovacion),
      borderColorClass: "border-[#808080]",
      amountColorClass: "text-[#808080]",
      icon: icons.renovacion,
    },
  ]
}