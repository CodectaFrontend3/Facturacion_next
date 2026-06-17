// (routes)/renovacion/page.tsx
"use client"

import { useMemo } from "react"

import { VentasListLayout } from "../../_components/ventas/VentasListLayout"
import { FilterBar } from "../../_components/shared/FilterBar"

import { useVentasContext } from "../../VentasContext"
import { useVentasFilters } from "../../_hooks/ventas/useVentasFilters"
import { useVentasList } from "../../_hooks/ventas/useVentasList"
import { useVentasSummary } from "../../_hooks/ventas/useVentasSummary"

import { getRenovacionColumns } from "../../_config/columns/renovacion.columns"
import { SUMMARY_CARDS } from "../../_config/summaryCards"
import { format } from "../../_utils/format"

const ALERTA_OPTIONS = [
  { label: "Todos los Estados", value: "todos" },
  { label: "Activo", value: "activo" },
  { label: "Por vencer", value: "por_vencer" },
  { label: "Vencido", value: "vencido" },
]

export default function RenovacionPage() {
  const { cotizaciones, cotizacionesManuales, notasVenta, clientes, renovaciones, isLoading } =
    useVentasContext()

  const { filters, handleFilterChange, handleSearch, resetFilters } = useVentasFilters()
  const renovacionesFiltradas = useVentasList(renovaciones, filters)

  const allDocs = useMemo(
    () => [...cotizaciones, ...cotizacionesManuales, ...notasVenta],
    [cotizaciones, cotizacionesManuales, notasVenta]
  )
  const summary = useVentasSummary(allDocs, clientes, renovaciones)

  const summaryCards = SUMMARY_CARDS.map((card) => {
    const s = summary[card.key as keyof typeof summary]
    return {
      ...card,
      documents: s?.documents ?? 0,
      amount: s && s.amount > 0 ? format.moneda(s.amount) : "S/ 0.00",
    }
  })

  const totalAmount = useMemo(
    () => format.moneda(renovacionesFiltradas.reduce((acc, r) => acc + (r.total ?? 0), 0)),
    [renovacionesFiltradas]
  )

  const tabCounts = {
    cotizaciones: cotizaciones.length,
    cotizacionesManuales: cotizacionesManuales.length,
    notasVenta: notasVenta.length,
    clientes: clientes.length,
    renovaciones: renovaciones.length,
  }

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Cargando datos...</div>

  return (
    <VentasListLayout
      activeTab="renovaciones"
      summaryCards={summaryCards}
      tableColumns={getRenovacionColumns()}
      tableData={renovacionesFiltradas}
      tabCounts={tabCounts}
      totalAmount={totalAmount}
      filterBar={
        <FilterBar filters={filters} onFilterChange={handleFilterChange} onSearchSubmit={handleSearch}
          onReset={resetFilters} selectConfig={{ name: "estado", options: ALERTA_OPTIONS }} showDateRange />
      }
    />
  )
}
