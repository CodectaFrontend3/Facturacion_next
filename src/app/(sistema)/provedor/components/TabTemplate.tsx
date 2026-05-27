"use client"

import { useMemo } from "react"

import { TabsNav } from "../components/TabsNav"

import { DataTable } from "@/components/shared/DataTable"

import { ProveedorTabla } from "../types/proovedor"
import { getColumnsForTab } from "../components/Columns"
import { FilterBar } from "../components/Filterbar"

import { ActionButton } from "@/components/common/ActionButton"
import { Plus, Download, History } from "lucide-react"


// interfaz
interface TabTemplateProps {
    activeTab: string,
    tabs: any[],
    tableData: any[],
    isLoading: boolean,
    filters: any,
    onFilterChange: (name: string, value: string) => void,
    onSearch: () => void,
    onReset: () => void,
    onAddClick?: () => void,
    filterSelectConfig?: {
        name: string,
        options: { label: string; value: string }[]
    }
}

export function TabTemplate({
    activeTab,
    tabs,
    tableData,
    isLoading,
    filters,
    onFilterChange,
    onSearch,
    onReset,
    onAddClick,
    filterSelectConfig
}: TabTemplateProps) {
    const updatedTabs = useMemo(() => {
        if (!tabs) return [];
        return tabs.map(tab => {
            if (tab.key === activeTab) {
                return {
                    ...tab,
                    count: tableData.length
                };
            }
            return tab;
        });
    }, [tabs, activeTab, tableData])

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

                {/* SECCIÓN 2: TABLA Y FILTROS */}

                <section className="bg-white rounded-md border border-gray-200  shadow-sm mt-4 p-5">
                    <div className="w-full">
                        {/* Cabecera: Pestañas + Acciones */}
                        <div className="flex items-end justify-between border-b border-gray-200">
                        <div className="flex items-center">
                            <TabsNav tabs={updatedTabs}/>
                        </div>
            
                        <div className="flex items-center gap-2 pb-2 pr-4">
                            <ActionButton
                            icon={<Plus className="w-4 h-4" strokeWidth={4} />}
                            href={onAddClick ? undefined : '#'}
                            onClick={onAddClick}
                            />
            
                            <ActionButton
                            icon={<Download className="w-4 h-4" strokeWidth={2.5} />}
                            onClick={() => console.log('Exportar')}
                            />
                        </div>
                        </div>
            
                        {/* Cuerpo: Filtros y Tabla */}
                        <div className="border-x border-b border-gray-200 bg-white p-4 space-y-4 rounded-b-sm">
                        
                        {/* Buscador */}
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
                            columns={getColumnsForTab(activeTab)}
                            data={tableData}
                            pageSize={10}
                            showSelection={true}
                            showPagination={true}
                            />
                        </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
