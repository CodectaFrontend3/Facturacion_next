import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ActionButton } from "@/components/common/ActionButton"
import { ProveedorTabla } from "../types/proovedor"

//Columna

const getProvedorColumns = (): ColumnDef<ProveedorTabla>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "proveedor.ruc", header: "RUC", size: 120 },
  { accessorKey: "proveedor.empresa", header: "Empresa" },
  { accessorKey: "proveedor.direccion", header: "Dirección" },
  { accessorKey: "proveedor.telefono", header: "Teléfono", size: 100 },
  { accessorKey: "proveedor.correo_empresa", header: "Correo", size: 120 },
  { accessorKey: "contacto.nombre", header: "Contacto" },
  {
    id: "acciones",
    header: "Acciones",
    size: 130,
    cell: ({ row }) => {
      const actions = row.original.acciones;
      return (
        <div className="flex items-center gap-1.5">
          
            {actions.includes("edit") && (
                <ActionButton 
                icon={<i className="bi bi-pencil-fill text-white text-sm"></i>} 
                className="w-9 h-9 bg-[#1d52ba] hover:bg-[#164299] flex items-center justify-center rounded-[3px] transition-colors" 
                />
            )}

            {actions.includes("check") && (
                <ActionButton 
                icon={<i className="bi bi-check2 text-white text-xl font-bold"></i>} 
                className="w-9 h-9 bg-[#17a2b8] hover:bg-[#138496] flex items-center justify-center rounded-[3px] transition-colors" 
                />
            )}
        </div>
      )
    }
  }
]

export const getColumnsForTab = (tab: string): ColumnDef<ProveedorTabla>[] => {
    switch (tab) {
        case "provedor":
            return getProvedorColumns()
        default:
            return getProvedorColumns()
    }
}
