import { Tab, SummaryCard } from "../types"
import { ReactNode } from "react"

export const TABS: Tab[] = [
  { key: "cotizacion",        label: "Cotización",        count: 0, color: "#008000", activeColor: "#008000", href: "/ventas/cotizacion" },
  { key: "cotizacion-manual", label: "Cotización Manual", count: 0, color: "#ffa500", activeColor: "#ffa500", href: "/ventas/cotizacion_manual" },
  { key: "nota-venta",        label: "Nota de Venta",     count: 0, color: "#ff0000", activeColor: "#ff0000", href: "/ventas/nota_venta" },
  { key: "clientes",          label: "Clientes",          count: 0, color: "#0000ff", activeColor: "#0000ff", href: "/ventas/clientes" },
  { key: "renovacion",        label: "Renovación",        count: 0, color: "#808080", activeColor: "#808080", href: "/ventas/renovacion" },
]

/**
 * TODO: IMPLEMENTAR TOTALES DINÁMICOS
 * 
 * Actualmente los valores de 'documents' y 'amount' están hardcodeados.
 * Deben calcularse dinámicamente basados en los datos filtrados de cada tab.
 * 
 * Ejemplo de lógica necesaria:
 * - Para 'documents': tableData.length (cantidad de registros en la pestaña actual)
 * - Para 'amount': tableData.reduce((sum, row) => sum + parseFloat(row.importeT), 0)
 *                   formateado como moneda "S/ X,XXX.XX"
 * 
 * Opciones de implementación:
 * 1. Pasar tableData como parámetro a getSummaryCards()
 * 2. Crear un hook customizado que calcule los totales por tab
 * 3. Mover esta lógica a VentasTabTemplate y pasar summaryCards pre-calculadas
 */
export const getSummaryCards = (icons: Record<string, ReactNode>): SummaryCard[] => [
  {
    label: "Cotización",
    // TODO: Reemplazar con cálculo dinámico: tableData.filter(row => row.tab === 'cotizacion').length
    documents: 0,
    // TODO: Reemplazar con suma dinámica de importes: tableData.filter(row => row.tab === 'cotizacion').reduce(...)
    amount: "S/0.00",
    borderColorClass: "border-[#008000]",
    amountColorClass: "text-[#008000]",
    icon: icons.cotizacion,
  },
  {
    label: "Cotización Manual",
    // TODO: Reemplazar con cálculo dinámico: tableData.filter(row => row.tab === 'cotizacion-manual').length
    documents: 2,
    // TODO: Reemplazar con suma dinámica de importes
    amount: "S/4,827.95",
    borderColorClass: "border-[#ffa500]",
    amountColorClass: "text-[#ffa500]",
    icon: icons.cotizacionManual,
  },
  {
    label: "Nota de Venta",
    // TODO: Reemplazar con cálculo dinámico
    documents: 0,
    // TODO: Reemplazar con suma dinámica de importes
    amount: "S/0.00",
    borderColorClass: "border-[#ff0000]",
    amountColorClass: "text-[#ff0000]",
    icon: icons.notaVenta,
  },
  {
    label: "Clientes",
    // TODO: Reemplazar con cálculo dinámico: clienteData.length
    documents: 0,
    // Para clientes, el amount podría ser vacío o un contador diferente
    amount: "0",
    borderColorClass: "border-[#0000ff]",
    amountColorClass: "text-[#0000ff]",
    icon: icons.clientes,
  },
]
