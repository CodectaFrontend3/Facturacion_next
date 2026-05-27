"use client"

import { useMemo, useState } from "react"

import { FilterBar } from "./FilterBar"
import { NotaModal } from "./NotaModal"
import { TabsNav } from "./TabsNav"

import { DataTable } from "@/components/shared/DataTable"
import { SummarySection } from "./SummarySection"

import { ClienteRow, CotizacionRow, TabKey } from "../types"
import { TABS, getSummaryCards } from "../config/constants"
import { getColumnsForTab } from "../config/columns"

import { ActionButton } from "@/components/common/ActionButton"
import { Plus, Copy, Download, ChevronDown } from "lucide-react"

type VentasTableRow = CotizacionRow | ClienteRow

export interface VentasFilters {
  searchValue: string
  dateFrom: string
  dateTo: string
  comprobante?: string
  estado?: string
  documento?: string
  [key: string]: string | undefined
}

const cardMatchesActiveTab = (activeTab: TabKey, label: string) => {
  const normalizedLabel = label.toLowerCase()

  return (activeTab === "clientes" && normalizedLabel === "clientes") ||
         (activeTab === "cotizacion" && normalizedLabel === "cotización") ||
         (activeTab === "cotizacion-manual" && normalizedLabel.includes("manual")) ||
         (activeTab === "nota-venta" && normalizedLabel === "nota de venta") ||
         (activeTab === "renovacion" && normalizedLabel.startsWith("renovaci"))
}

// Nuevas propiedades que debe recibir la plantilla
interface VentasTabTemplateProps {
  activeTab: TabKey
  data: VentasTableRow[] // Recibe los datos ya cargados
  isLoading: boolean // Recibe el estado de carga
  filters: VentasFilters // Recibe los filtros actuales
  onFilterChange: (name: string, value: string) => void // Función para actualizar filtros
  onSearch: (filters: VentasFilters) => void // Función para ejecutar búsqueda
  onReset: () => void // Función para limpiar filtros
  onAddClick?: () => void // Función para manejar el click en "+"
  filterSelectConfig?: {
    name: string
    options: { label: string; value: string }[]
  }
  filterEstadoConfig?: {
    name: string
    options: { label: string; value: string }[]
  }
  showFilterDateRange?: boolean
  filterClienteConfig?: {
    name: string
    items: { value: string; label: string }[]
    placeholder?: string
  }
}

export function VentasTabTemplate({ 
  activeTab, 
  data: tableData, 
  isLoading, 
  filters, 
  onFilterChange, 
  onSearch,
  onReset,
  onAddClick,
  filterSelectConfig,
  filterEstadoConfig,
  showFilterDateRange = true,
  filterClienteConfig,
}: VentasTabTemplateProps) {
  // NOTA: Eliminamos la llamada a useCotizacionFilters() aquí adentro.
  // Ahora la plantilla es completamente agnóstica de dónde vienen los datos.

  const summaryIcons = useMemo(() => ({
    cotizacion: <i className="bi bi-file-earmark-text text-[55px] text-black leading-none" />,
    cotizacionManual: <i className="bi bi-file-earmark-text text-[55px] text-black leading-none" />,
    notaVenta: <i className="bi bi-file-earmark text-[55px] text-black leading-none" />,
    clientes: <i className="bi bi-person text-[55px] text-black leading-none" />,
    renovacion: <i className="bi bi-arrow-repeat text-[55px] text-black leading-none font-bold" />,
  }), [])

  // Calcular dinámicamente los contadores
  const summaryCards = useMemo(() => {
    const cards = getSummaryCards(summaryIcons)
    return cards.map(card => {
      // Si la tarjeta corresponde a la pestaña activa, actualiza su contador
      const isCurrentTab = cardMatchesActiveTab(activeTab, card.label)
      
      if (isCurrentTab) {
        return {
          ...card,
          documents: tableData.length
        }
      }
      return card
    })
  }, [tableData, activeTab, summaryIcons])

  const dynamicTabs = useMemo(() => {
    return TABS.map(tab => {
      if (tab.key === activeTab) {
        return { ...tab, count: tableData.length }
      }
      return tab
    })
  }, [tableData, activeTab])

  const [notes, setNotes] = useState<Record<string, string>>({})
  const [activeNoteRowId, setActiveNoteRowId] = useState<string | number | null>(null)
  const activeNoteKey = activeNoteRowId === null ? "" : `${activeTab}:${activeNoteRowId}`

  const columns = useMemo(() => getColumnsForTab(activeTab, {
    getNote: (rowId) => notes[`${activeTab}:${rowId}`] || "",
    onNoteClick: setActiveNoteRowId,
  }), [activeTab, notes])

  // Calcular el total de la tabla actual dinámicamente (para la tabla principal)
  const totalAmount = useMemo(() => {
    const sum = tableData.reduce((acc, row) => {
      // Protección: Si la fila no tiene importeT (ej. Clientes), no suma nada
      if (!("importeT" in row) || !row.importeT) return acc;
      
      // Extrae solo los números y puntos decimales (ej. de "S/ 5,029.48" a "5029.48")
      const numericString = String(row.importeT).replace(/[^0-9.-]+/g, "")
      const value = parseFloat(numericString)
      return acc + (isNaN(value) ? 0 : value)
    }, 0)
    return `S/ ${sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }, [tableData])

  return (
    <div className={`flex flex-col min-h-screen bg-[#f5f5f5] tab-${activeTab}`}>
      <main className="flex-1 p-4 space-y-4 shrink-0">
        <style>{`
          .custom-checkbox-table [role="checkbox"] svg {
            stroke-width: 4px !important;
            width: 14px !important;
            height: 14px !important;
          }
          .custom-checkbox-table [role="checkbox"] {
            border-radius: 2px !important;
          }
          th {
            background-color: #f5f5f6 !important;
          }
          /* Forzar table-layout fixed para que las columnas respeten sus anchos y el "Cliente" absorba el resto */
          .fixed-table table {
            width: max-content;
            min-width: 100%;
          }
          /* Asegurar que el texto largo en cualquier columna baje a la siguiente línea */
          .fixed-table td {
            white-space: normal !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .tab-renovacion main,
          .tab-renovacion section,
          .tab-renovacion .fixed-table {
            max-width: 100%;
            min-width: 0;
            overflow-x: hidden;
          }
          .tab-renovacion .fixed-table [data-slot="table-container"] {
            max-width: 100%;
            overflow: visible;
          }
          .tab-renovacion .fixed-table table {
            width: 100%;
            min-width: 100%;
            table-layout: fixed;
          }
          .tab-renovacion .fixed-table th,
          .tab-renovacion .fixed-table td {
            padding-left: 10px;
            padding-right: 10px;
          }
          .tab-renovacion .fixed-table th:first-child,
          .tab-renovacion .fixed-table td:first-child {
            padding-left: 9px;
            padding-right: 5px;
          }
        `}</style>

        {/* RESUMEN */}
        <SummarySection summaryCards={summaryCards} />

        {/* SECCIÓN 2: TABLA Y FILTROS */}
        <section className="bg-white rounded-md border border-gray-200  shadow-sm mt-4 p-5">
          <div className="w-full">
            {/* Cabecera: Pestañas + Acciones */}
            <div className="flex items-end justify-between border-b border-gray-200">
              <div className="flex items-center">
                <TabsNav tabs={dynamicTabs} />
              </div>

              <div className="flex items-center gap-2 pb-2 pr-4  ">
                {activeTab !== "renovacion" && (
                  <ActionButton
                    icon={<Plus className="w-4 h-4" strokeWidth={4} />}
                    href={onAddClick ? undefined : '#'}
                    onClick={onAddClick}
                  />
                )}

                {activeTab !== "clientes" && activeTab !== "nota-venta" && activeTab !== "renovacion" && (
                  <ActionButton
                    icon={<Copy className="w-4 h-4" strokeWidth={3} />}
                    label="Duplicar"
                    onClick={() => console.log('Duplicar')}
                  />
                )}

                <ActionButton
                  icon={
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" strokeWidth={2.5} />
                      <ChevronDown className="w-3 h-3" strokeWidth={3} />
                    </div>
                  }
                  className="px-6"
                  isPopover={true}
                  popoverOptions={[
                    { label: "Exportar Excel", onClick: () => console.log('Exportar Excel') },
                    { label: "Exportar PDF", onClick: () => console.log('Exportar PDF') }
                  ]}
                />
              </div>
            </div>

            {/* Cuerpo: Filtros y Tabla */}
            <div className="border-x border-b border-gray-200 bg-white p-4 space-y-4 rounded-b-sm">
              <FilterBar
                filters={filters}
                onFilterChange={onFilterChange}
                onSearchSubmit={onSearch}
                onReset={onReset}
                isLoading={isLoading}
                selectConfig={filterSelectConfig}
                estadoSelectConfig={filterEstadoConfig}
                showDateRange={showFilterDateRange}
                clienteFilter={filterClienteConfig}
              />

              <div className="bg-white fixed-table custom-checkbox-table">
                <DataTable
                  columns={columns}
                  data={tableData}
                  pageSize={10}
                  showSelection={true}
                  showPagination={true}
                  totals={activeTab !== "clientes" ? {
                    total: totalAmount,
                    totalG: totalAmount
                  } : undefined}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <NotaModal
        key={activeNoteKey || "nota-modal"}
        isOpen={activeNoteRowId !== null}
        initialValue={notes[activeNoteKey] || ""}
        onSave={(text) => {
          const value = text.trim()
          setNotes((current) => {
            const next = { ...current }
            if (value) {
              next[activeNoteKey] = value
            } else {
              delete next[activeNoteKey]
            }
            return next
          })
          setActiveNoteRowId(null)
        }}
        onDelete={() => {
          setNotes((current) => {
            const next = { ...current }
            delete next[activeNoteKey]
            return next
          })
          setActiveNoteRowId(null)
        }}
        onCancel={() => setActiveNoteRowId(null)}
      />
    </div>
  )
}
