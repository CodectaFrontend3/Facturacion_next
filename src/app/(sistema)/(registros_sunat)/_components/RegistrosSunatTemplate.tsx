"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CardLayout } from "./CardLayout"
import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"
import { DataTable } from "@/components/shared/DataTable"
import { DataTablePagination } from "@/components/DataTable/DataTablePagination"
import { ActionButton } from "@/components/common/ActionButton"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { type CardConfig } from "../types/card"
import { type TabConfig } from "../types/tab"
import { useSunatFilters } from "../_hooks/useSunatFilters"
import { showToast } from "@/components/shared/custom-toast"

// Componente local SunatTabsNav que renderiza las pestañas sin números y con un cuadrado de color
interface SunatTabsNavProps {
  tabs: TabConfig[]
}

function SunatTabsNav({ tabs }: SunatTabsNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex items-center">
      {tabs.map((tab) => {
        // Determinamos si la pestaña está activa comparando la ruta actual con el href
        const isActive = pathname === tab.href

        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all relative top-[1px] rounded-none ${
              isActive
                ? "bg-white border-x border-t border-gray-200 text-gray-800"
                : "text-gray-500 border-x border-t border-transparent"
            }`}
          >
            {/* Pequeño cuadrado indicador con el color configurado para la pestaña */}
            <span
              className="w-2.5 h-2.5 shrink-0 block"
              style={{ backgroundColor: tab.color }}
            />
            <span className="text-[13px] font-bold">
              {tab.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

interface RegistrosSunatTemplateProps<TData> {
  tabs: TabConfig[]
  activeTab: string

  cardConfigs: CardConfig[]
  cardCounts: Record<string, number>
  cardPeriodLabel?: string

  columns: ColumnDef<TData>[]
  data: TData[]

  onSend?: (selectedRows: TData[]) => void
  sendButtonLabel?: string
  exportOptions?: { label: string; onClick: () => void }[]

  // Configuración de campos de filtro para el hook
  searchFields?: (keyof TData)[]
  dateField?: keyof TData

  // Nuevas propiedades opcionales para alertas/toasts
  alertMessage?: string
  toastMessage?: string
}

let lastShownToastKey = ""

export function RegistrosSunatTemplate<TData>({
  tabs,
  activeTab,
  cardConfigs,
  cardCounts,
  cardPeriodLabel = "Resumen de Junio del 2026",
  columns,
  data,
  onSend,
  sendButtonLabel = "Enviar",
  exportOptions = [
    { label: "XML", onClick: () => console.log("Exportar XML") },
    { label: "CDR", onClick: () => console.log("Exportar CDR") },
    { label: "PDF", onClick: () => console.log("Exportar PDF") },
  ],
  searchFields = [],
  dateField,
  alertMessage,
  toastMessage,
}: RegistrosSunatTemplateProps<TData>) {
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [selectedRows, setSelectedRows] = useState<TData[]>([])

  const pathname = usePathname()

  useEffect(() => {
    if (toastMessage) {
      const key = `${pathname}-${toastMessage}`
      if (lastShownToastKey !== key) {
        showToast(toastMessage, 3, { duration: 6000 })
        lastShownToastKey = key
      }
    }
  }, [toastMessage, pathname])

  // Consumimos el hook reutilizable para manejar el filtrado
  const {
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    filteredData,
  } = useSunatFilters({
    data,
    searchFields,
    dateField,
  })

  const totalEntries = filteredData.length
  const pageCount = Math.ceil(totalEntries / pageSize)

  return (
    // Removidos bordes redondeados y sombras de los contenedores globales e inputs
    <div className="flex flex-col w-full font-sans [&_input]:rounded-none! [&_select]:rounded-none!">
      {/* Tarjeta roja de advertencia (alerta de soporte) */}
      {alertMessage && (
        <div className="mb-4 bg-[#f8d7da] border border-[#f5c2c7] text-[#842029] text-[13px] font-bold px-4 py-2.5 rounded-none shadow-none">
          {alertMessage}
        </div>
      )}

      {/* Tarjetas de resumen del periodo */}
      <div className="mb-5">
        <CardLayout
          cardConfigs={cardConfigs}
          counts={cardCounts}
          periodLabel={cardPeriodLabel}
        />
      </div>

      {/* Panel principal sin bordes redondeados y sin sombras */}
      <section className="bg-white rounded-none border border-gray-200 shadow-none p-5">
        <div className="w-full">
          {/* Barra de navegación de pestañas personalizada (sin números) */}
          <div className="flex items-end justify-between border-b border-gray-200">
            <div className="flex items-center">
              <SunatTabsNav tabs={tabs} />
            </div>
            <div className="pb-1">
              {/* Botón de exportación corregido: w-auto! para mostrar chevron, redondeado y con animación hover */}
              <ActionButton
                icon={
                  <>
                    <i className="fa fa-download size-4 text-[#676a6c]" />
                    <ChevronDown className="w-2.5 h-2.5 text-[#676a6c]" strokeWidth={4} />
                  </>
                }
                isPopover={true}
                className="bg-white w-auto! px-3 gap-1 hover:bg-white border! border-[#e7eaec]! rounded-[4px]!"
                popoverOptions={exportOptions}
              />
            </div>
          </div>

          {/* Contenedor de filtros y tabla */}
          <div className="border-x border-b border-gray-200 bg-white p-4 space-y-4 rounded-none">
            {/* Panel de Filtros */}
            <div className="border-b border-gray-100 pb-2">
              <DataFilters
                onSearch={applyFilters}
                onReset={resetFilters}
              >
                <FilterDateRange
                  label="Fecha: "
                  nameFrom="dateFrom"
                  nameTo="dateTo"
                  valueFrom={pendingFilters.dateFrom || ""}
                  valueTo={pendingFilters.dateTo || ""}
                  onChange={setFilterValue}
                />
                <FilterSearch
                  name="searchValue"
                  value={pendingFilters.searchValue || ""}
                  onChange={setFilterValue}
                  label="Buscar: "
                  placeholder=""
                />
              </DataFilters>
            </div>

            {/* Selector de cantidad de registros */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-sans py-1">
              <span>Ver</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setPageIndex(0)
                }}
                className="border border-gray-300 rounded-none px-2 py-1 bg-white outline-none focus:border-[#1ab394] text-xs h-8"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>entradas</span>
            </div>

            {/* Tabla de datos y botón Enviar (el botón Enviar conserva sus bordes redondeados) */}
            <div className="mt-1 border border-gray-200 overflow-hidden rounded-none bg-white [&_div.border]:border-0 [&_div.border]:rounded-none">
              <DataTable
                columns={columns}
                data={filteredData}
                pageSize={pageSize}
                showSelection={true}
                showPagination={false}
                isLoading={false}
                pageIndex={pageIndex}
                onPageChange={setPageIndex}
                onRowSelectionChange={setSelectedRows}
              />

              {/* Fila del pie de tabla con botón Enviar (se mantiene redondeado rounded-md) */}
              {onSend && (
                <div className="bg-[#f5f5f6] px-4 py-2 flex justify-end border-t border-gray-200">
                  <ActionButton
                    text={sendButtonLabel}
                    onClick={() => onSend(selectedRows)}
                    disabled={selectedRows.length === 0}
                    className="focus:bg-[#18a689] bg-[#2C1FF3] hover:bg-[#190FCE]! text-white text-xs font-semibold px-5 py-1.5 h-auto! w-auto! rounded-[4px] cursor-pointer shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  />
                </div>
              )}
            </div>

            {/* Paginación externa renderizada por fuera de la tabla */}
            {totalEntries > 0 && (
              <div className="mt-4 pt-1">
                <DataTablePagination
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  dataLength={totalEntries}
                  pageCount={pageCount}
                  canPreviousPage={pageIndex > 0}
                  canNextPage={pageIndex < pageCount - 1}
                  setPageIndex={setPageIndex}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
