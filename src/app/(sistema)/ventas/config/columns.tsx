import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { CotizacionRow, ClienteRow } from "../types"
import { ActionButton } from "@/components/common/ActionButton"

// COLUMNAS PARA COTIZACIÓN
const getCotizacionColumns = (): ColumnDef<CotizacionRow>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  {
    accessorKey: "numero",
    header: "N°", size: 100,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        {row.original.numero}
        <button className="text-gray-400 border border-gray-300 rounded-[2px] w-3.5 h-3.5 flex items-center justify-center hover:bg-gray-100 text-[9px] leading-none pb-0.5">+</button>
      </div>
    )
  },
  { accessorKey: "rucDni", header: "RUC-DNI", size: 120 },
  { accessorKey: "cliente", header: "Cliente" },
  { accessorKey: "emision", header: "Emisión", size: 100 },
  { accessorKey: "forma", header: "Forma", size: 100 },
  { accessorKey: "importeT", header: "Importe T.", size: 120 },
  {
    id: "acciones",
    header: "Acciones",
    size: 130,
    cell: ({ row }) => {
      const actions = row.original.acciones;
      return (
        <div className="flex items-center gap-1.5">
          {actions.includes("eye") && (
            <ActionButton icon={<i className="bi bi-eye"></i>} className=" w-9 h-9 rounded-[3px]" />
          )}
          {actions.includes("clock") && (
            <ActionButton icon={<i className="bi bi-clock"></i>} className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-[3px]" />
          )}
          {actions.includes("check") && (
            <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
          )}
        </div>
      )
    }
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 130,
    cell: ({ row }) => {
      const compartir = row.original.compartir;
      return (
        <div className="flex items-center gap-1.5">
          {compartir.includes("envelope") && (
            <ActionButton icon={<i className="bi bi-envelope"></i>} className="w-9 h-9 bg-[#6c757d] hover:bg-[#5a6268] rounded-[3px]" />
          )}
          {compartir.includes("whatsapp") && (
            <ActionButton icon={<i className="bi bi-whatsapp"></i>} className="w-9 h-9 bg-[#28a745] hover:bg-[#218838] rounded-[3px]" />
          )}
        </div>
      )
    }
  }
]

// COLUMNAS PARA COTIZACIÓN MANUAL
const getCotizacionManualColumns = (): ColumnDef<CotizacionRow>[] => getCotizacionColumns()

// COLUMNAS PARA NOTA DE VENTA
const getNotaVentaColumns = (): ColumnDef<CotizacionRow>[] => getCotizacionColumns()

// COLUMNAS PARA CLIENTES
const getClienteColumns = (): ColumnDef<ClienteRow>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "tipoDoc", header: "Tipo Doc.", size: 100 },
  { accessorKey: "nroDoc", header: "Nº Doc.", size: 120 },
  { accessorKey: "correo", header: "Correo" },
  { accessorKey: "celular", header: "Celular", size: 100 },
  { accessorKey: "fechaRegistro", header: "Fecha de Registro", size: 130 },
  {
    id: "acciones",
    header: "Ver",
    size: 50,
    cell: ({ row }) => {
      return (
        <ActionButton icon={<i className="bi bi-eye"></i>} className="w-9 h-9 rounded-[3px]" />
      )
    }
  }
]

// COLUMNAS PARA RENOVACIÓN
const getRenovacionColumns = (): ColumnDef<CotizacionRow>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  {
    accessorKey: "numero",
    header: "N°", size: 100,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        {row.original.numero}
        <button className="text-gray-400 border border-gray-300 rounded-[2px] w-3.5 h-3.5 flex items-center justify-center hover:bg-gray-100 text-[9px] leading-none pb-0.5">+</button>
      </div>
    )
  },
  { accessorKey: "rucDni", header: "RUC-DNI", size: 120 },
  { accessorKey: "cliente", header: "Cliente" },
  { accessorKey: "emision", header: "Emisión", size: 100 },
  // TODO: Agregar columnas específicas de renovación: vencimiento, días restantes
  { accessorKey: "forma", header: "Forma", size: 100 },
  { accessorKey: "importeT", header: "Importe T.", size: 120 },
  {
    id: "acciones",
    header: "Acciones",
    size: 130,
    cell: ({ row }) => {
      const actions = row.original.acciones;
      return (
        <div className="flex items-center gap-1.5">
          {actions.includes("eye") && (
            <ActionButton icon={<i className="bi bi-eye"></i>} className=" w-9 h-9 rounded-[3px]" />
          )}
          {actions.includes("clock") && (
            <ActionButton icon={<i className="bi bi-clock"></i>} className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-[3px]" />
          )}
          {actions.includes("check") && (
            <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
          )}
        </div>
      )
    }
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 130,
    cell: ({ row }) => {
      const compartir = row.original.compartir;
      return (
        <div className="flex items-center gap-1.5">
          {compartir.includes("envelope") && (
            <ActionButton icon={<i className="bi bi-envelope"></i>} className="w-9 h-9 bg-[#6c757d] hover:bg-[#5a6268] rounded-[3px]" />
          )}
          {compartir.includes("whatsapp") && (
            <ActionButton icon={<i className="bi bi-whatsapp"></i>} className="w-9 h-9 bg-[#28a745] hover:bg-[#218838] rounded-[3px]" />
          )}
        </div>
      )
    }
  }
]

/**
 * Función genérica que retorna las columnas según la pestaña activa
 */
export const getColumnsForTab = (tab: string): ColumnDef<any>[] => {
  switch (tab) {
    case "cotizacion":
      return getCotizacionColumns()
    case "cotizacion-manual":
      return getCotizacionManualColumns()
    case "nota-venta":
      return getNotaVentaColumns()
    case "clientes":
      return getClienteColumns()
    case "renovacion":
      return getRenovacionColumns()
    default:
      return []
  }
}

// Mantener getColumns() para compatibilidad con código existente
export const getColumns = (): ColumnDef<CotizacionRow>[] => getCotizacionColumns()
