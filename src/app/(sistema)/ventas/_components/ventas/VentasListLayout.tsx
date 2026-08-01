// _components/ventas/VentasListLayout.tsx
"use client"

import { ReactNode } from "react"

import { TabsNav } from "./TabsNav"
import { SummarySection, SummaryCardData } from "./SummarySection"
import { DataTable } from "@/components/shared/DataTable"
import { ActionButton } from "@/components/common/ActionButton"
import { Plus, Copy, Download, ChevronDown } from "lucide-react"
import { TabConfig } from "../../_config/tabs"

type TabDataKey = TabConfig["dataKey"]

interface VentasListLayoutProps<TData> {
  /** Key del módulo activo (para saber qué botones mostrar) */
  activeTab: TabDataKey

  summaryCards: SummaryCardData[]

  tableColumns: any[]
  tableData: TData[]

  filterBar?: ReactNode

  tabCounts?: Partial<Record<TabDataKey, number>>

  /** Suma total de la columna "total" para el pie de tabla */
  totalAmount?: string

  onAddClick?: () => void
}

export function VentasListLayout<TData>({
  activeTab,
  summaryCards,
  tableColumns,
  tableData,
  filterBar,
  tabCounts,
  totalAmount,
  onAddClick,
}: VentasListLayoutProps<TData>) {

  const showAddButton = activeTab !== "renovaciones"
  const showDuplicarButton =
    activeTab !== "clientes" &&
    activeTab !== "notasVenta" &&
    activeTab !== "renovaciones"

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
          .fixed-table table {
            width: max-content;
            min-width: 100%;
          }
          .fixed-table td {
            white-space: normal !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .tab-renovaciones main,
          .tab-renovaciones section {
            max-width: 100%;
            min-width: 0;
          }
          .tab-renovaciones .fixed-table {
            max-width: 100%;
            min-width: 0;
          }
          .tab-renovaciones .fixed-table table {
            width: 100%;
            min-width: 100%;
            table-layout: fixed;
          }
          .tab-renovaciones .fixed-table th,
          .tab-renovaciones .fixed-table td {
            padding-left: 10px;
            padding-right: 10px;
          }
          .tab-renovaciones .fixed-table th:first-child,
          .tab-renovaciones .fixed-table td:first-child {
            padding-left: 9px;
            padding-right: 5px;
          }
        `}</style>

        {/* RESUMEN */}
        <SummarySection summaryCards={summaryCards} />

        {/* TABLA Y FILTROS */}
        <section className="bg-white border border-gray-200 shadow-sm mt-4 p-5">
          <div className="w-full">
            {/* Cabecera: Pestañas + Acciones */}
            <div className="flex items-end justify-between border-b border-gray-200">
              <div className="flex items-center">
                <TabsNav counts={tabCounts} />
              </div>

              <div className="flex items-center gap-2 pb-2 pr-4">
                {showAddButton && (
                  <ActionButton
                    icon={<Plus className="w-4 h-4" strokeWidth={4} />}
                    onClick={onAddClick}
                  />
                )}

                {showDuplicarButton && (
                  <ActionButton
                    icon={<Copy className="w-4 h-4" strokeWidth={3} />}
                    label="Duplicar"
                    onClick={() => console.log("Duplicar")}
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
                    { label: "Exportar Excel", onClick: () => console.log("Exportar Excel") },
                    { label: "Exportar PDF", onClick: () => console.log("Exportar PDF") },
                  ]}
                />
              </div>
            </div>

            {/* Cuerpo: Filtros y Tabla */}
            <div className="border-x border-b border-gray-200 bg-white p-4 space-y-4">
              {filterBar}

              <div className="bg-white fixed-table custom-checkbox-table">
                <DataTable
                  columns={tableColumns}
                  data={tableData}
                  pageSize={10}
                  showSelection={true}
                  showPagination={true}
                  totals={
                    activeTab !== "clientes" && totalAmount
                      ? { total: totalAmount, totalG: totalAmount }
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
