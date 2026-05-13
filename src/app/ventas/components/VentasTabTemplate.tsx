"use client"

import { useMemo } from "react"

import { FilterBar } from "./FilterBar"
import { TabsNav } from "./TabsNav"

import { DataTable } from "@/components/shared/DataTable"
import { SummarySection } from "./SummarySection"

import { TabKey } from "../types"
import { TABS, getSummaryCards } from "../config/constants"
import { getColumnsForTab } from "../config/columns"

import { ActionButton } from "@/components/common/ActionButton"
import { Plus, Copy, Download, ChevronDown } from "lucide-react"

// Nuevas propiedades que debe recibir la plantilla
interface VentasTabTemplateProps {
  activeTab: TabKey
  data: any[] // Recibe los datos ya cargados
  isLoading: boolean // Recibe el estado de carga
  filters: any // Recibe los filtros actuales
  onFilterChange: (name: string, value: string) => void // Función para actualizar filtros
  onSearch: () => void // Función para ejecutar búsqueda
  onReset: () => void // Función para limpiar filtros
  onAddClick?: () => void // Función para manejar el click en "+"
  filterSelectConfig?: {
    name: string
    options: { label: string; value: string }[]
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
  filterSelectConfig
}: VentasTabTemplateProps) {
  // NOTA: Eliminamos la llamada a useCotizacionFilters() aquí adentro.
  // Ahora la plantilla es completamente agnóstica de dónde vienen los datos.

  const summaryIcons = {
    cotizacion: <i className="bi bi-file-earmark-text text-[55px] text-black leading-none" />,
    cotizacionManual: <i className="bi bi-file-earmark-text text-[55px] text-black leading-none" />,
    notaVenta: <i className="bi bi-file-earmark text-[55px] text-black leading-none" />,
    clientes: <i className="bi bi-person text-[55px] text-black leading-none" />,
  }

  // Calcular dinámicamente los contadores
  const summaryCards = useMemo(() => {
    const cards = getSummaryCards(summaryIcons)
    return cards.map(card => {
      // Si la tarjeta corresponde a la pestaña activa, actualiza su contador
      const isCurrentTab = (activeTab === "clientes" && card.label === "Clientes") ||
                           (activeTab === "cotizacion" && card.label === "Cotización") ||
                           (activeTab === "cotizacion-manual" && card.label === "Cotización Manual") ||
                           (activeTab === "nota-venta" && card.label === "Nota de Venta") ||
                           (activeTab === "renovacion" && card.label === "Renovación")
      
      if (isCurrentTab) {
        return {
          ...card,
          documents: tableData.length
        }
      }
      return card
    })
  }, [tableData, activeTab])

  const dynamicTabs = useMemo(() => {
    return TABS.map(tab => {
      if (tab.key === activeTab) {
        return { ...tab, count: tableData.length }
      }
      return tab
    })
  }, [tableData, activeTab])

  const columns = useMemo(() => getColumnsForTab(activeTab), [activeTab])

  // Calcular el total de la tabla actual dinámicamente
  const totalAmount = useMemo(() => {
    const sum = tableData.reduce((acc, row) => {
      // Protección: Si la fila no tiene importeT (ej. Clientes), no suma nada
      if (!row.importeT) return acc;
      
      // Extrae solo los números y puntos decimales (ej. de "S/ 5,029.48" a "5029.48")
      const numericString = String(row.importeT).replace(/[^0-9.-]+/g, "")
      const value = parseFloat(numericString)
      return acc + (isNaN(value) ? 0 : value)
    }, 0)

    // Formatear como moneda ("S/ X,XXX.XX")
    return `S/ ${sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }, [tableData])

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] bg-[#f5f5f5] overflow-y-auto overflow-x-hidden">
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
                <ActionButton
                  icon={<Plus className="w-4 h-4" strokeWidth={4} />}
                  href={onAddClick ? undefined : '#'}
                  onClick={onAddClick}
                />

                {activeTab !== "clientes" && (
                  <ActionButton
                    icon={<Copy className="w-4 h-4" strokeWidth={3} />}
                    label="Duplicar"
                    onClick={() => console.log('Duplicar')}
                  />
                )}

                <ActionButton
                  icon={
                    <>
                      <Download className="w-4 h-4" strokeWidth={3} />
                      <ChevronDown className="w-2.5 h-2.5" strokeWidth={4} />
                    </>
                  }
                  className="px-3 gap-1"
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
              />

              <div className="bg-white fixed-table custom-checkbox-table">
                <DataTable
                  columns={columns}
                  data={tableData}
                  pageSize={10}
                  showSelection={true}
                  showPagination={true}
                  totals={{
                    total: totalAmount,
                    totalG: totalAmount
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
