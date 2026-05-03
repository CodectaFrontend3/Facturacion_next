"use client"

import { DataTable } from "@/components/shared/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"
import { FilterSelect } from "@/components/DataFilters/FilterSelect"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import {
    EyeIcon,
    FileTextIcon,
    FilePenLineIcon,
    FileCheckIcon,
    UsersIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
    DownloadIcon,
} from "lucide-react"

import { Cliente } from "./_types/cliente"
import { useClientesTable } from "./_hooks/useClientesTable"
import mockData from "./_data/clientes.json"

// Datos de ejemplo
const data: Cliente[] = mockData

/**
 * DEFINICION DE COLUMNAS
 * Aqui configuras que campos mostrar y como se ven.
 * accessorKey: El nombre del campo en tu JSON.
 * header: El titulo que sale arriba en la tabla.
 */
const columns: ColumnDef<Cliente>[] = [
    { accessorKey: "id", header: "ID", size: 60 },
    { accessorKey: "nombre", header: "Nombre" },
    { accessorKey: "tipoDoc", header: "Tipo Doc.", size: 100 },
    { accessorKey: "numDoc", header: "N° Doc.", size: 120 },
    { accessorKey: "correo", header: "Correo" },
    { accessorKey: "celular", header: "Celular", size: 100 },
    { accessorKey: "fechaRegistro", header: "Fecha de Registro", size: 150 },
    {
        id: "actions",
        header: "Ver",
        size: 60,
        cell: ({ row }) => (
            <Button
                size="icon-sm"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                onClick={() => alert(`Visualizando cliente: ${row.original.nombre}`)}
            >
                <EyeIcon className="size-4" />
            </Button>
        ),
    },
]

// Configuracion de tarjetas superiores
const summaryCards = [
    { icon: FileTextIcon, label: "Cotizacion", count: "0 Documentos", amount: "S/ 0.00", borderColor: "border-green-500", textColor: "text-green-600", iconColor: "text-green-600", bgColor: "bg-green-50" },
    { icon: FilePenLineIcon, label: "Cotizacion Manual", count: "0 Documentos", amount: "S/ 0.00", borderColor: "border-amber-500", textColor: "text-amber-600", iconColor: "text-amber-600", bgColor: "bg-amber-50" },
    { icon: FileCheckIcon, label: "Nota de Venta", count: "0 Documentos", amount: "S/ 0.00", borderColor: "border-green-500", textColor: "text-green-600", iconColor: "text-green-600", bgColor: "bg-green-50" },
    { icon: UsersIcon, label: "Clientes", count: "0 Clientes", amount: null, borderColor: "border-blue-600", textColor: "text-blue-600", iconColor: "text-blue-600", bgColor: "bg-blue-50" },
]

// Configuracion de pestañas (Tabs)
const tabs = [
    { label: "Cotizacion", count: 0 },
    { label: "Cotizacion Manual", count: 0 },
    { label: "Nota de Venta", count: 0 },
    { label: "Clientes", count: 0, active: true },
    { label: "Renovacion", count: 0 },
]

// Opciones para el selector de tipo de documento
const tipoDocOptions = [
    { label: "Todos los Documentos", value: "todos" },
    { label: "DNI", value: "DNI" },
    { label: "RUC", value: "RUC" },
]

export default function EjemploDataTablePage() {
    /**
     * USO DEL HOOK CEREBRO
     * Extraemos todo lo necesario para que la pagina funcione:
     * - filteredData: Los datos ya filtrados y listos para la tabla.
     * - pendingFilters: Lo que el usuario esta escribiendo pero aun no ha dado "Buscar".
     * - applyFilters: La funcion que se dispara al dar clic en "Buscar".
     * - setFilterValue: Funcion para actualizar un filtro (ej: cuando escribes).
     */
    const { filteredData, totalCount, pendingFilters, setFilterValue, applyFilters, resetFilters, pageIndex, setPageIndex } =
        useClientesTable(data)

    return (
        <div className="bg-white min-h-full p-6 space-y-8">
            {/* Cabecera con tarjetas circulares */}
            <div className="flex items-center justify-center gap-4">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronLeftIcon className="size-6" />
                    <ChevronLeftIcon className="size-6 -ml-3" />
                </button>

                <div className="flex items-start gap-12">
                    {summaryCards.map((card) => {
                        const Icon = card.icon
                        return (
                            <div key={card.label} className="flex flex-col items-center gap-2">
                                <div className={`w-24 h-24 rounded-full border-3 ${card.borderColor} ${card.bgColor} flex items-center justify-center`}>
                                    <Icon className={`size-10 ${card.iconColor}`} />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">{card.label}</span>
                                <span className="text-xs text-gray-500">{card.count}</span>
                                {card.amount && <span className={`text-sm font-bold ${card.textColor}`}>{card.amount}</span>}
                            </div>
                        )
                    })}
                </div>

                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRightIcon className="size-6" />
                    <ChevronRightIcon className="size-6 -ml-3" />
                </button>
            </div>

            <div className="space-y-0">
                {/* TABS Y BOTONES DE ACCION */}
                <div className="flex items-center justify-between border-b border-gray-200">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button key={tab.label} className={`px-4 py-2.5 text-sm font-medium relative ${tab.active ? "text-gray-900 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-700"}`}>
                                <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold mr-1.5 ${tab.active ? "bg-gray-800 text-white" : "bg-orange-500 text-white"}`}>
                                    {tab.label === "Clientes" ? totalCount : tab.count}
                                </span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 pb-1">
                        <Button size="icon-sm" className="bg-gray-700 hover:bg-gray-800 text-white rounded-none"><PlusIcon className="size-4" /></Button>
                        <Button size="icon-sm" className="bg-gray-700 hover:bg-gray-800 text-white rounded-none"><DownloadIcon className="size-4" /></Button>
                    </div>
                </div>

                {/**
                 * COMPONENTE DE FILTROS
                 * Los envolvemos en <DataFilters>.
                 * Cada filtro interno debe estar conectado a 'pendingFilters' y 'setFilterValue'.
                 */}
                <DataFilters onSearch={applyFilters} onReset={resetFilters}>
                    <FilterDateRange
                        nameFrom="fechaDesde"
                        nameTo="fechaHasta"
                        valueFrom={pendingFilters.fechaDesde}
                        valueTo={pendingFilters.fechaHasta}
                        onChange={setFilterValue}
                    />
                    <FilterSelect
                        name="tipoDoc"
                        value={pendingFilters.tipoDoc}
                        onChange={setFilterValue}
                        options={tipoDocOptions}
                    />
                    <FilterSearch
                        name="search"
                        value={pendingFilters.search}
                        onChange={setFilterValue}
                    />
                </DataFilters>

                {/**
                 * LA TABLA (DataTable)
                 * Le pasamos las columnas que definimos arriba y los datos YA filtrados.
                 * Tambien conectamos la paginacion para que el hook controle el cambio de pagina.
                 */}
                <DataTable
                    columns={columns}
                    data={filteredData}
                    showSelection={true}
                    isLoading={false}
                    pageIndex={pageIndex}
                    onPageChange={setPageIndex}
                />
            </div>
        </div>
    )
}
