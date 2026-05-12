"use client"

import { useMemo } from "react"
import {
  Plus,
  Copy,
  Download,
  ChevronDown,
} from "lucide-react"

import { FilterBar } from "./FilterBar"
import { TabsNav } from "./TabsNav"


import { DataTable } from "@/components/shared/DataTable"
import { SummarySection } from "./SummarySection"

import { TabKey } from "../types"
import { TABS, getSummaryCards } from "../config/constants"
import { getColumns } from "../config/columns"

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
                <button className="flex items-center justify-center w-8 h-8 rounded bg-[#1a5eb3] text-white hover:bg-[#1a3bb3] transition-colors"><Plus className="w-4 h-4" /></button>
                <button className="flex items-center justify-center w-8 h-8 rounded bg-[#1a5eb3] text-white hover:bg-[#1a3bb3] transition-colors"><Copy className="w-4 h-4" /></button>
                <button className="flex items-center gap-1 px-3 h-8 rounded bg-[#1a5eb3] text-white text-xs font-semibold hover:bg-[#1a3bb3] transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  <ChevronDown className="w-3 h-3" />
                </button>
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
                  footerContent={
                    activeTab !== "clientes" ? (
                      <div className="flex items-center bg-white border border-gray-200 border-t-0 -mt-4 relative z-10">
                        <div className="flex-1"></div>
                        <div 
                          className={`border-l border-gray-200 px-4 font-bold text-gray-700 text-[13px] whitespace-nowrap flex justify-center ${
                            activeTab === "renovacion" ? "w-[100px] flex-col py-1.5" : "w-[180px] flex-row gap-1 py-3"
                          }`}
                        >
                          {activeTab === "renovacion" ? (
                            <>
                              <span>Total:</span>
                              <span>{totalAmount}</span>
                            </>
                          ) : (
                            <span>Total: {totalAmount}</span>
                          )}
                        </div>
                        <div 
                          className={`border-l border-gray-200 px-4 font-bold text-gray-700 text-[13px] whitespace-nowrap flex justify-center ${
                            activeTab === "renovacion" ? "w-[100px] flex-col py-1.5" : "w-[180px] flex-row gap-1 py-3"
                          }`}
                        >
                          {activeTab === "renovacion" ? (
                            <>
                              <span>Total G.:</span>
                              <span>{totalAmount}</span>
                            </>
                          ) : (
                            <span>Total G.: {totalAmount}</span>
                          )}
                        </div>
                      </div>
                    ) : null
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200 text-xs text-gray-400 shrink-0">
        <span>Copyright <a href="#" className="text-[#1538A0] hover:underline font-medium">JyP Periféricos</a> © 2019-2026</span>
        <span className="flex items-center gap-3">
          Visítanos:
          <a href="#" className="text-[#1877F2] hover:opacity-80 transition-opacity text-base"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-[#25D366] hover:opacity-80 transition-opacity text-base"><i className="bi bi-whatsapp"></i></a>
        </span>
      </footer>
    </div>
  )
}
