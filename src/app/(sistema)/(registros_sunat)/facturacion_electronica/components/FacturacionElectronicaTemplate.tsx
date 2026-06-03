"use client"

import { useState } from "react"
import { useFacturacionFilters } from "../hooks/useFacturacionFilters"
import { TabsNav } from "@/app/(sistema)/ventas/components/TabsNav"
import { CardLayout } from "./CardLayout"
import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"
import { DataTable } from "@/components/shared/DataTable"
import { type TabConfig } from "../types"
import tabsRaw from "../data/tabs.json"
import { getFacturacionColumns } from "../config/columns"
import { ActionButton } from "@/components/common/ActionButton"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const tabConfigs: TabConfig[] = tabsRaw as TabConfig[]

interface FacturacionElectronicaTemplateProps {
  activeTab: "facturas" | "enviados_facturas" | "factura_manual" | "enviados_manual" | "detracciones"
}

export default function FacturacionElectronicaTemplate({
  activeTab,
}: FacturacionElectronicaTemplateProps) {
  const {
    filteredData,
    counts,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useFacturacionFilters(activeTab)

  const [pageSize, setPageSize] = useState(10)
  const tabs = tabConfigs.map((tab) => {
    let count = 0
    if (tab.key === "facturas") count = counts.facturas
    else if (tab.key === "factura_manual") count = counts.facturacionManual
    else if (tab.key === "detracciones") count = counts.detracciones
    return {
      ...tab,
      count,
    }
  })

  const columns = getFacturacionColumns()

  return (
    <div className="flex flex-col w-full font-sans">
      <div className="mb-5">
        <CardLayout counts={counts} />
      </div>

      <section className="bg-white rounded-md border border-gray-200 shadow-sm p-5">
        <div className="w-full">
          <div className="flex items-end justify-between border-b border-gray-200">
            <div className="flex items-center">
              <TabsNav tabs={tabs} />
            </div>
            <div className="pb-1">
              <ActionButton
                icon={
                  <>
                    <i className="fa fa-download size-4 text-[#676a6c]"/>
                    <ChevronDown className="w-2.5 h-2.5 text-[#676a6c]" strokeWidth={4} />
                  </>
                }
                isPopover={true}
                className="bg-white px-3 gap-1 hover:bg-white hover:shadow-md border! border-[#e7eaec]!"
                popoverOptions={[
                  {label: "XML", onClick: () => console.log('Exportar Excel')},
                  {label: "CDR", onClick: () => console.log('Exportar PDF')},
                  {label: "PDF", onClick: () => console.log('Exportar CSV')},
                ]}
              />
            </div>
          </div>

          <div className="border-x border-b border-gray-200 bg-white p-4 space-y-4 rounded-b-sm">
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

            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-sans py-1">
              <span>Ver</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 bg-white outline-none focus:border-[#1ab394] text-xs h-8"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>entradas</span>
            </div>

            <div className="mt-1 border border-gray-200 overflow-hidden rounded-sm">
              <DataTable
                columns={columns}
                data={filteredData}
                pageSize={pageSize}
                showSelection={true}
                showPagination={true}
                isLoading={false}
                pageIndex={pageIndex}
                onPageChange={setPageIndex}
              />
              
              <div className="bg-[#f5f5f6] px-4 py-2 flex justify-end border-t border-gray-200">
                <Button
                  onClick={() => console.log("Enviar a SUNAT")}
                  className="focus:bg-[#18a689] bg-[#1a5eb3] hover:bg-[#1a3bb3]! text-white text-xs font-semibold px-5 py-1.5 rounded transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
