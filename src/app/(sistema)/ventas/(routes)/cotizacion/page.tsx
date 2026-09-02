// (routes)/cotizacion/page.tsx
"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"

import { VentasListLayout } from "../../_components/ventas/VentasListLayout"
import { FilterBar } from "../../_components/shared/FilterBar"
import { NotaModal } from "../../_components/shared/NoteModal"

import { useVentasBasePath, useVentasContext } from "../../VentasContext"
import { useVentasFilters } from "../../_hooks/ventas/useVentasFilters"
import { useVentasList } from "../../_hooks/ventas/useVentasList"
import { useVentasSummary } from "../../_hooks/ventas/useVentasSummary"

import { getCotizacionColumns } from "../../_config/columns/cotizacion.columns"
import { SUMMARY_CARDS } from "../../_config/summaryCards"
import { format } from "../../_utils/format"

const COMPROBANTE_OPTIONS = [
  { label: "Todos los comprobantes", value: "todos" },
  { label: "Factura", value: "Factura" },
  { label: "Boleta", value: "Boleta" },
  { label: "Nota de Venta", value: "Nota de Venta" },
]

export default function CotizacionPage() {
  const router = useRouter()
  const basePath = useVentasBasePath()

  // ✅ Datos compartidos del Context — sin recarga al cambiar tab
  const { cotizaciones, cotizacionesManuales, notasVenta, clientes, renovaciones, isLoading } =
    useVentasContext()

  const { filters, activeFilters, handleFilterChange, handleSearch, resetFilters } = useVentasFilters()
  const cotizacionesFiltradas = useVentasList(cotizaciones, activeFilters)

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
    () => format.moneda(cotizacionesFiltradas.reduce((acc, r) => acc + (r.total ?? 0), 0)),
    [cotizacionesFiltradas]
  )

  const tabCounts = {
    cotizaciones: cotizaciones.length,
    cotizacionesManuales: cotizacionesManuales.length,
    notasVenta: notasVenta.length,
    clientes: clientes.length,
    renovaciones: renovaciones.length,
  }

  const [notes, setNotes] = useState<Record<string, string>>({})
  const [noteModal, setNoteModal] = useState<{ open: boolean; rowId: string | number | null }>({
    open: false, rowId: null,
  })

  const columns = getCotizacionColumns({
    getNote: (rowId) => notes[String(rowId)] ?? "",
    onNoteClick: (rowId) => setNoteModal({ open: true, rowId }),
    onView: (doc) => router.push(`${basePath}/cotizacion/${doc.id}`),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Cargando datos...
      </div>
    )
  }

  return (
    <>
      <VentasListLayout
        activeTab="cotizaciones"
        summaryCards={summaryCards}
        tableColumns={columns}
        tableData={cotizacionesFiltradas}
        tabCounts={tabCounts}
        totalAmount={totalAmount}
        onAddClick={() => router.push(`${basePath}/cotizacion/crear`)}
        filterBar={
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearchSubmit={handleSearch}
            onReset={resetFilters}
            selectConfig={{ name: "tipoDocumento", options: COMPROBANTE_OPTIONS }}
            showDateRange={true}
          />
        }
      />
      <NotaModal
        isOpen={noteModal.open}
        initialValue={noteModal.rowId != null ? (notes[String(noteModal.rowId)] ?? "") : ""}
        onSave={(text) => {
          if (noteModal.rowId == null) return
          setNotes((prev) => ({ ...prev, [String(noteModal.rowId)]: text }))
          setNoteModal({ open: false, rowId: null })
        }}
        onDelete={() => {
          if (noteModal.rowId == null) return
          setNotes((prev) => { const n = { ...prev }; delete n[String(noteModal.rowId)]; return n })
          setNoteModal({ open: false, rowId: null })
        }}
        onCancel={() => setNoteModal({ open: false, rowId: null })}
      />
    </>
  )
}
