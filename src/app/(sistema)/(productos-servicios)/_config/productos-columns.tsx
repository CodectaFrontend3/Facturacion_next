import { ColumnDef } from "@tanstack/react-table"
import { Producto } from "../types/productos.types"
import { ActionButton } from "@/components/common/ActionButton"

export const getProductosColumns = (
  onView: (producto: Producto) => void,
  onEdit: (producto: Producto) => void,
  onDeactivate: (id: string) => void,
  onViewFichaTecnica: (producto: Producto) => void
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
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <ActionButton
            icon={<i className="bi bi-file-earmark-pdf text-[14px]" />}
            className="w-7 h-7 bg-[#ed5565] hover:bg-[#da4f5d] text-white rounded-[4px] flex items-center justify-center cursor-pointer shadow-none hover:shadow-none border-none p-0"
            onClick={() => onViewFichaTecnica(row.original)}
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
      const isActive = row.original.estado === "Activo"

      return (
        <div className="flex justify-center">
          <ActionButton
            icon={<i className={`bi ${isActive ? "bi-check" : "bi-x"} text-[14px]`} />}
            className={`w-6 h-6 rounded-full ${isActive ? "bg-[#0070f3]" : "bg-[#ed5565]"} text-white flex items-center justify-center shadow-none hover:shadow-none border-none p-0`}
            label={row.original.estado}
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
          label: "Ver",
          onClick: () => onView(row.original),
        },
        {
          label: "Editar",
          onClick: () => onEdit(row.original),
        },
        ...(row.original.estado === "Activo"
          ? [{ label: "Desactivar", onClick: () => onDeactivate(row.original.id) }]
          : []),
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
