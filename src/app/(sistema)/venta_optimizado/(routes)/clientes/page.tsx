// (routes)/clientes/page.tsx
"use client"

import { useState, useMemo } from "react"

import { VentasListLayout } from "../../_components/ventas/VentasListLayout"
import { FilterBar } from "../../_components/shared/FilterBar"
import { ClienteModal } from "../../_components/clientes/ClienteModal"

import { useVentasContext } from "../../VentasContext"
import { useVentasFilters } from "../../_hooks/ventas/useVentasFilters"
import { useVentasList } from "../../_hooks/ventas/useVentasList"
import { useVentasSummary } from "../../_hooks/ventas/useVentasSummary"

import { getClienteColumns } from "../../_config/columns/clientes.columns"
import { SUMMARY_CARDS } from "../../_config/summaryCards"
import { format } from "../../_utils/format"

const TIPO_DOC_OPTIONS = [
  { label: "Todos los Tipos", value: "todos" },
  { label: "DNI", value: "DNI" },
  { label: "RUC", value: "RUC" },
  { label: "Pasaporte", value: "Pasaporte" },
]

export default function ClientesPage() {
  const { cotizaciones, cotizacionesManuales, notasVenta, clientes, renovaciones, isLoading } =
    useVentasContext()

  const { filters, handleFilterChange, handleSearch, resetFilters } = useVentasFilters()
  const clientesFiltrados = useVentasList(clientes, filters)

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

  const tabCounts = {
    cotizaciones: cotizaciones.length,
    cotizacionesManuales: cotizacionesManuales.length,
    notasVenta: notasVenta.length,
    clientes: clientes.length,
    renovaciones: renovaciones.length,
  }

  const [modalOpen, setModalOpen] = useState(false)

  if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Cargando datos...</div>

  return (
    <>
      <VentasListLayout
        activeTab="clientes"
        summaryCards={summaryCards}
        tableColumns={getClienteColumns()}
        tableData={clientesFiltrados}
        tabCounts={tabCounts}
        onAddClick={() => setModalOpen(true)}
        filterBar={
          <FilterBar filters={filters} onFilterChange={handleFilterChange} onSearchSubmit={handleSearch}
            onReset={resetFilters} selectConfig={{ name: "tipoDocumento", options: TIPO_DOC_OPTIONS }} showDateRange={false} />
        }
      />
      <ClienteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
