"use client"

import { useState } from "react"
import { DataTable } from "@/components/shared/DataTable"
import { SummaryCard } from "@/components/shared/SummaryCard"
import { type SummaryCardSlide } from "@/types/summary-card"
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
    PlusIcon,
    DownloadIcon
} from "lucide-react"

import { Cliente } from "./_types/cliente"
import { useClientesTable } from "./_hooks/useClientesTable"
import mockData from "./_data/clientes.json"
import { CboData } from "@/components/common/CboData"
import { ActionButton } from "@/components/common/ActionButton"

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
            /**
             * EJEMPLO MODO DE USO: ActionButton
             * Reemplaza al Button genérico para acciones de icono.
             * Le pasas el icono, el onClick, y le puedes dar className para ajustar color o tamaño.
             * poner label para la accesibilidad siempre 
             */
            <ActionButton
                icon={<EyeIcon className="size-4" />}
                className="w-8 h-8"
                onClick={() => alert(`Visualizando cliente: ${row.original.nombre}`)}
                label={`Ver cliente ${row.original.nombre}`}
            />
        ),
    },
]

// Configuracion de tarjetas superiores
const cards: SummaryCardSlide[][] = [
    [
        {
            icon: FileTextIcon, label: "Cotizacion", count: "0 Documentos", amount: "S/ 0.00",
            tone: { ring: "border-green-500", icon: "text-green-600", amount: "text-green-600" }
        },
        {
            icon: FilePenLineIcon, label: "Cotizacion Manual", count: "0 Documentos", amount: "S/ 0.00",
            tone: { ring: "border-amber-500", icon: "text-amber-600", amount: "text-amber-600" }
        },
    ],
    [
        {
            icon: FileCheckIcon, label: "Nota de Venta", count: "0 Documentos", amount: "S/ 0.00",
            tone: { ring: "border-red-500", icon: "text-red-600", amount: "text-red-600" }
        },
    ],
    [
        {
            icon: UsersIcon, label: "Clientes", count: "0 Clientes",
            tone: { ring: "border-blue-600", icon: "text-blue-600" }
        },
    ],
    [
        {
            icon: UsersIcon, label: "Clientes", count: "0 Clientes",
            tone: { ring: "border-blue-600", icon: "text-blue-600" },
            meta: { label: "Ultima actualizacion:", value: "hace 2 dias" }
        },
    ],
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

// Opciones para el combo de clientes
const clienteOptions = mockData.map(c => ({
    label: `${c.nombre} | ${c.numDoc}`,
    value: c.id.toString()
}))

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

    // Estado para el ejemplo de formulario
    const [formClienteId, setFormClienteId] = useState("")

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formClienteId) {
            alert("Por favor selecciona un cliente primero.")
            return
        }
        alert(`¡Formulario enviado con éxito!\n\nCliente ID seleccionado: ${formClienteId}`)
    }

    return (
        <div className="bg-white min-h-full p-6 space-y-8">
            {/* Cabecera con tarjetas circulares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((slides, index) => (
                    <SummaryCard key={index} items={slides} size="lg" />
                ))}
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
                        {/** EJEMPLO MODO DE USO: ActionButton en cabeceras o toolbars */}
                        <ActionButton
                            icon={<PlusIcon className="size-4" />}
                            className=" text-white w-8 h-8"
                            label="Nuevo"
                        />
                        <ActionButton
                            icon={<DownloadIcon className="size-4" />}
                            className=" text-white w-8 h-8"
                            label="Descargar"
                        />
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
                    <CboData
                        items={clienteOptions}
                        value={pendingFilters.cliente}
                        onChange={(val) => setFilterValue("cliente", val)}
                        placeholder="Seleccionar Cliente"
                        searchPlaceholder="Searching..."
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

                {/**
                 * EJEMPLO DE FORMULARIO INDEPENDIENTE USANDO CboData
                 * Modo de uso: Funciona como un input controlado clásico.
                 * Solo necesitas pasarle un array de objetos { label, value },
                 * el 'value' actual y la función 'onChange' que actualiza el estado.
                 */}
                <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-bold text-[#171717] mb-4">Ejemplo: Uso de CboData en Formularios</h3>
                    <form onSubmit={handleFormSubmit} className="flex items-end gap-4 max-w-lg">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[#676A6C] mb-1">Selecciona un cliente para enviar:</label>
                            <CboData
                                items={clienteOptions}
                                value={formClienteId}
                                onChange={setFormClienteId}
                                placeholder="Elegir cliente..."
                            />
                        </div>
                        <Button type="submit" className="bg-[#1AB394] hover:bg-[#159a7f] text-white">
                            Enviar Formulario
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
