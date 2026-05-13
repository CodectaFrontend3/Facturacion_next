"use client"

import { useMemo } from "react"

import { FilterBar } from "./FilterBar"
import { TabsNav } from "./TabsNav"


import { DataTable } from "@/components/shared/DataTable"
import { SummarySection } from "./SummarySection"

import { TabKey } from "../types"
import { TABS, getSummaryCards } from "../config/constants"
import { getColumns } from "../config/columns"

import { ActionButton } from "@/components/common/ActionButton"
import { Plus, Copy, Download, ChevronDown } from "lucide-react"

import { useCotizacionFilters } from "../hooks/useCotizacionFilters"

interface VentasTabTemplateProps {
  activeTab: TabKey
}

export function VentasTabTemplate({ activeTab }: VentasTabTemplateProps) {
  const {
    filters,
    data: tableData,
    isLoading,
    handleFilterChange,
    handleSearch
  } = useCotizacionFilters(activeTab)

  const summaryIcons = {
    cotizacion: <i className="bi bi-file-earmark-text text-[55px] text-black leading-none" />,
    cotizacionManual: <i className="bi bi-file-earmark-text text-[55px] text-black leading-none" />,
    notaVenta: <i className="bi bi-file-earmark text-[55px] text-black leading-none" />,
    clientes: <i className="bi bi-person text-[55px] text-black leading-none" />,
    renovacion: <i className="bi bi-arrow-repeat text-[55px] text-black leading-none font-bold" />,
  }

    const baseSummaryCards = useMemo(() => getSummaryCards(summaryIcons), [])
  const columns = useMemo(() => getColumns(activeTab), [activeTab])

  // Calcular el total de la tabla actual dinámicamente (para la tabla principal)
  const totalAmount = useMemo(() => {
    const sum = tableData.reduce((acc, row) => {
      const importeStr = row.importeT || "0";
      const numericString = importeStr.replace(/[^0-9.-]+/g, "")
      const value = parseFloat(numericString)
      return acc + (isNaN(value) ? 0 : value)
    }, 0)
    return `S/ ${sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }, [tableData])

  const summaryCards = useMemo(() => baseSummaryCards, [baseSummaryCards])

  return (
    <div className={`flex flex-col h-[calc(100vh-65px)] bg-[#f5f5f5] overflow-y-auto overflow-x-hidden tab-${activeTab}`}>
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
            table-layout: fixed !important;
            width: 100% !important;
          }
          /* Asegurar que el texto largo en cualquier columna baje a la siguiente línea */
          .fixed-table td {
            white-space: normal !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          /* Ajuste exclusivo del buscador para Cotización y Cotización Manual sin tocar DataFilters */
          .tab-cotizacion .py-4 > div:nth-child(2),
          .tab-cotizacion-manual .py-4 > div:nth-child(2) {
            flex: 0 0 200px !important;
          }
          .tab-cotizacion .py-4 > div:nth-child(3),
          .tab-cotizacion-manual .py-4 > div:nth-child(3) {
            flex: 1 !important;
          }
        `}</style>

        {/* RESUMEN */}
        <SummarySection summaryCards={summaryCards} />

        {/* SECCIÓN 2: TABLA Y FILTROS */}
        <section className="bg-white rounded-md border border-gray-200 shadow-sm mt-4 p-5">
          <div className="w-full">
            {/* Cabecera: Pestañas + Acciones */}
            <div className="flex items-end justify-between border-b border-gray-200">
              <div className="flex items-center">
                <TabsNav tabs={TABS} />
              </div>

              <div className="flex items-center gap-2 pb-2 pr-4">
                <ActionButton
                  icon={<Plus className="w-4 h-4" strokeWidth={4} />}
                  href={'#'}
                />

                <ActionButton
                  icon={<Copy className="w-4 h-4" strokeWidth={3} />}
                  label="Duplicar cotización"
                  onClick={() => console.log('Duplicar')}
                />

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
                onFilterChange={handleFilterChange}
                onSearchSubmit={handleSearch}
                isLoading={isLoading}
                activeTab={activeTab}
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
    </div>
  )
}
