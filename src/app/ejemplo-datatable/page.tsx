"use client"

import { DataTable } from "@/components/shared/DataTable"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    EyeIcon,
    FileTextIcon,
    FilePenLineIcon,
    FileCheckIcon,
    UsersIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    RotateCcwIcon,
    PlusIcon,
    DownloadIcon,
    SearchIcon,
} from "lucide-react"

// importamos el tipo e informacion desde archivos externos para que todo este mas limpio
import { Cliente } from "./_types/cliente"
import mockData from "./_data/clientes.json"

/**
 * como usar - Estructura de ejemplo
 * 
 * primero definan sus columnas usando ColumnDef y ponganle el nombre del dato que quieren jalar en accessorKey
 * si necesitan meterle botones o iconos usen la propiedad cell que les deja poner lo que sea como el boton de ver que puse abajo
 * 
 * despues solo llaman al componente DataTable y le pasan sus columnas y su lista de datos 
 * tambien pueden jugar con las opciones como showSelection para los cuadritos o isLoading por si la data demora en llegar
 */
const data: Cliente[] = mockData
// aqui definimos que columnas vamos a mostrar y como se van a ver
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
        // Ejemplo de columna con componente personalizado (Boton)
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

// datos para las tarjetas de arriba - prueba
const summaryCards = [
    {
        icon: FileTextIcon,
        label: "Cotización",
        count: "0 Documentos",
        amount: "S/ 0.00",
        borderColor: "border-green-500",
        textColor: "text-green-600",
        iconColor: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        icon: FilePenLineIcon,
        label: "Cotización Manual",
        count: "0 Documentos",
        amount: "S/ 0.00",
        borderColor: "border-amber-500",
        textColor: "text-amber-600",
        iconColor: "text-amber-600",
        bgColor: "bg-amber-50",
    },
    {
        icon: FileCheckIcon,
        label: "Nota de Venta",
        count: "0 Documentos",
        amount: "S/ 0.00",
        borderColor: "border-green-500",
        textColor: "text-green-600",
        iconColor: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        icon: UsersIcon,
        label: "Clientes",
        count: "0 Clientes",
        amount: null,
        borderColor: "border-blue-600",
        textColor: "text-blue-600",
        iconColor: "text-blue-600",
        bgColor: "bg-blue-50",
    },
]

// info para las pestañas
const tabs = [
    { label: "Cotización", count: 0 },
    { label: "Cotización Manual", count: 0 },
    { label: "Nota de Venta", count: 0 },
    { label: "Clientes", count: 0, active: true },
    { label: "Renovación", count: 0 },
]

export default function EjemploDataTablePage() {
    return (
        <div className="bg-white min-h-full p-6 space-y-8">
            {/* fila de las tarjetas con circulos */}
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
                                {card.amount && (
                                    <span className={`text-sm font-bold ${card.textColor}`}>{card.amount}</span>
                                )}
                            </div>
                        )
                    })}
                </div>

                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronRightIcon className="size-6" />
                    <ChevronRightIcon className="size-6 -ml-3" />
                </button>
            </div>

            {/* todo lo que es la tabla y filtros */}
            <div className="space-y-0">
                <div className="flex items-center justify-between border-b border-gray-200">
                    {/* navegacion de las pestañas */}
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.label}
                                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${tab.active ? "text-gray-900 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold mr-1.5 ${tab.active ? "bg-gray-800 text-white" : "bg-orange-500 text-white"
                                    }`}>
                                    {tab.count}
                                </span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* botones de mas y descargar */}
                    <div className="flex items-center gap-1.5 pb-1">
                        <Button size="icon-sm" className="bg-gray-700 hover:bg-gray-800 text-white rounded-none">
                            <PlusIcon className="size-4" />
                        </Button>
                        <Button size="icon-sm" className="bg-gray-700 hover:bg-gray-800 text-white rounded-none">
                            <DownloadIcon className="size-4" />
                        </Button>
                    </div>
                </div>

                {/* filtros y el buscador azul */}
                <div className="flex items-center gap-3 py-4">
                    <div className="flex items-center gap-0 flex-1 max-w-xs">
                        <input type="text" className="flex-1 h-9 border border-gray-300 px-3 text-sm outline-none rounded-none" readOnly />
                        <button className="h-9 w-9 bg-gray-600 text-white flex items-center justify-center shrink-0">
                            <RotateCcwIcon className="size-4" />
                        </button>
                    </div>

                    <select className="h-9 border border-gray-300 px-3 text-sm text-gray-600 outline-none rounded-none flex-1 max-w-xs" defaultValue="todos" disabled>
                        <option value="todos">Todos los Documentos</option>
                    </select>

                    <div className="flex items-center gap-2 flex-1 max-w-xs">
                        <label className="text-sm text-gray-600 whitespace-nowrap">Buscar:</label>
                        <input type="text" className="flex-1 h-9 border border-gray-300 px-3 text-sm outline-none rounded-none" readOnly />
                    </div>

                    <Button className="bg-blue-900 hover:bg-blue-950 text-white rounded-none h-9 px-6">
                        <SearchIcon className="size-4 mr-1.5" />
                        Buscar
                    </Button>
                </div>

                {/* aca es donde prendemos la tabla */}
                <DataTable
                    columns={columns}
                    data={data}
                    showSelection={true} // Mostrar o no la columna de checkboxes
                    isLoading={false} // Mostrar o no el estado de carga
                />
            </div>
        </div>
    )
}