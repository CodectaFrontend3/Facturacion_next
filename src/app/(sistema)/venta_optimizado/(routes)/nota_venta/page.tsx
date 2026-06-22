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

export default function NotaVentaPage() {
  const router = useRouter()
  const { cotizaciones, cotizacionesManuales, notasVenta, clientes, renovaciones, isLoading } =
    useVentasContext()

  const { filters, activeFilters, handleFilterChange, handleSearch, resetFilters } = useVentasFilters()
  const notasFiltradas = useVentasList(notasVenta, activeFilters)

  // Opciones del combobox: "Nombre | Documento", igual al diseño original
  const clienteItems = useMemo(
    () => clientes.map((c) => ({
      value: c.id,
      label: `${c.nombre} | ${c.numeroDocumento}`,
    })),
    [clientes]
  )

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
      tableColumns={getNotaVentaColumns({
        onView: (doc) => router.push(`/venta_optimizado/nota_venta/${doc.id}`),
      })}
      tableData={notasFiltradas}
      tabCounts={tabCounts}
      totalAmount={totalAmount}
      onAddClick={() => router.push("/venta_optimizado/nota_venta/crear")}
      filterBar={
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={handleSearch}
          onReset={resetFilters}
          clienteFilter={{ name: "clienteId", items: clienteItems, placeholder: "Seleccionar Cliente" }}
        />
      }
    />
  )
}
