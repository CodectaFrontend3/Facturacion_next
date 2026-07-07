import { ColumnDef } from "@tanstack/react-table"
import { Servicio } from "../types/servicios.types"
import { ActionButton } from "@/components/common/ActionButton"

export const getServiciosColumns = (
  onEdit: (servicio: Servicio) => void,
  onToggleEstado: (id: string, currentEstado: "Activo" | "Anulado") => void,
  onDelete: (id: string) => void
): ColumnDef<Servicio>[] => [
  {
    accessorKey: "codigoServicio",
    header: "Código Servicio",
    size: 130,
  },
  {
    accessorKey: "codigoOriginal",
    header: "Código Original",
    size: 130,
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "familia",
    header: "Familia",
    size: 120,
  },
  {
    accessorKey: "precioVentaPen",
    header: "P. Venta (S/)",
    size: 120,
    cell: ({ row }) => `S/ ${row.original.precioVentaPen.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`,
  },
  {
    accessorKey: "precioVentaUsd",
    header: "P. Venta ($)",
    size: 120,
    cell: ({ row }) => `$ ${row.original.precioVentaUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
  },
  {
    accessorKey: "fichaTecnicaUrl",
    header: "Ficha Técnica",
    size: 120,
    cell: () => {
      return (
        <div className="flex justify-center">
          <ActionButton
            icon={<i className="bi bi-file-earmark-pdf text-[14px]" />}
            className="w-7 h-7 bg-[#ed5565] hover:bg-[#da4f5d] text-white rounded-[4px] flex items-center justify-center cursor-pointer shadow-none hover:shadow-none border-none p-0"
            onClick={() => {}}
            label="PDF"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    size: 90,
    cell: ({ row }) => {
      const estado = row.original.estado
      const isActive = estado === "Activo"
      return (
        <div className="flex justify-center">
          <ActionButton
            icon={<i className={`bi ${isActive ? "bi-check" : "bi-x"} text-[14px]`} />}
            className={`w-6 h-6 rounded-full ${isActive ? "bg-[#0070f3]" : "bg-[#ed5565]"} text-white flex items-center justify-center cursor-pointer shadow-none hover:shadow-none border-none p-0`}
            onClick={() => {}}
            label={estado}
          />
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-center">
        <i className="fa fa-sliders text-[14px] text-gray-500" />
      </div>
    ),
    size: 80,
    cell: ({ row }) => {
      const popoverOptions = [
        {
          label: "Editar",
          onClick: () => onEdit(row.original),
        }
      ]

      return (
        <div className="flex justify-center">
          <ActionButton
            icon={<i className="bi bi-three-dots text-[16px] text-gray-500" />}
            isPopover={true}
            popoverOptions={popoverOptions}
            className="bg-transparent hover:bg-gray-100 text-gray-700 hover:shadow-none shadow-none hover:translate-y-0 w-8 h-8 border-none flex items-center justify-center cursor-pointer"
            label="Acciones"
          />
        </div>
      )
    },
  },
]
