import { ColumnDef } from "@tanstack/react-table"
import { Producto } from "../types/productos.types"
import { ActionButton } from "@/components/common/ActionButton"

export const getProductosColumns = (
  onEdit: (producto: Producto) => void,
  onToggleEstado: (id: string, currentEstado: "Activo" | "Inactivo") => void
): ColumnDef<Producto>[] => [
  {
    accessorKey: "codigo",
    header: "Código",
    size: 110,
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "marca",
    header: "Marca",
    size: 120,
  },
  {
    accessorKey: "unidad",
    header: "Unidad",
    size: 100,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    size: 100,
    cell: ({ row }) => {
      const estado = row.original.estado
      let badgeColor = ""
      switch (estado) {
        case "Activo":
          badgeColor = "bg-[#18a689] text-white"
          break
        case "Inactivo":
          badgeColor = "bg-[#f8ac59] text-white"
          break
      }
      return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[3px] uppercase ${badgeColor}`}>
          {estado}
        </span>
      )
    },
  },
  {
    accessorKey: "precioNacional",
    header: "Precio Nacional (1/4)",
    size: 150,
    cell: ({ row }) => `S/ ${row.original.precioNacional.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    size: 80,
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
        },
        {
          label: row.original.estado === "Activo" ? "Desactivar" : "Activar",
          onClick: () => onToggleEstado(row.original.id, row.original.estado),
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
