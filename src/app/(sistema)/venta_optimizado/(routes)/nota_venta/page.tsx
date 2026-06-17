// (routes)/nota_venta/page.tsx
"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"

import { VentasListLayout } from "../../_components/ventas/VentasListLayout"
import { FilterBar } from "../../_components/shared/FilterBar"

import { useVentasContext } from "../../VentasContext"
import { useVentasFilters } from "../../_hooks/ventas/useVentasFilters"
import { useVentasList } from "../../_hooks/ventas/useVentasList"
import { useVentasSummary } from "../../_hooks/ventas/useVentasSummary"

import { getNotaVentaColumns } from "../../_config/columns/notaVenta.columns"
import { SUMMARY_CARDS } from "../../_config/summaryCards"
import { format } from "../../_utils/format"

const FORMA_PAGO_OPTIONS = [
  { label: "Todos los Documentos", value: "todos" },
  { label: "Contado", value: "Contado" },
  { label: "Crédito", value: "Credito" },
]

export default function NotaVentaPage() {
  const router = useRouter()
  const { cotizaciones, cotizacionesManuales, notasVenta, clientes, renovaciones, isLoading } =
    useVentasContext()

  const { filters, handleFilterChange, handleSearch, resetFilters } = useVentasFilters()
  const notasFiltradas = useVentasList(notasVenta, filters)

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
    () => format.moneda(notasFiltradas.reduce((acc, r) => acc + (r.total ?? 0), 0)),
    [notasFiltradas]
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
      activeTab="notasVenta"
      summaryCards={summaryCards}
      tableColumns={getNotaVentaColumns()}
      tableData={notasFiltradas}
      tabCounts={tabCounts}
      totalAmount={totalAmount}
      onAddClick={() => router.push("/venta_optimizado/nota_venta/crear")}
      filterBar={
        <FilterBar filters={filters} onFilterChange={handleFilterChange} onSearchSubmit={handleSearch}
          onReset={resetFilters} selectConfig={{ name: "tipoDocumento", options: FORMA_PAGO_OPTIONS }} showDateRange />
      }
    />
  )
}
