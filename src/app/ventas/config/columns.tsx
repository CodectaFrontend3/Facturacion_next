import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { CotizacionRow } from "../types"

export const getColumns = (): ColumnDef<CotizacionRow>[] => [
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
  { accessorKey: "forma", header: "Forma", size: 80 },
  { accessorKey: "importeT", header: "Importe T.", size: 120 },
  {
    id: "acciones",
    header: "Acciones",
    size: 180,
    cell: ({ row }) => {
      const actions = row.original.acciones;
      return (
        <div className="flex items-center gap-1.5">
          {actions.includes("eye") && (
            <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#1538A0] text-white rounded-[3px] hover:bg-[#0f2d8a]"><i className="bi bi-eye"></i></button>
          )}
          {actions.includes("clock") && (
            <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#f6a041] text-white rounded-[3px] hover:bg-[#e08b33]"><i className="bi bi-clock"></i></button>
          )}
          {actions.includes("check") && (
            <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#20c997] text-white rounded-[3px] hover:bg-[#1ba87e]"><i className="bi bi-check-circle"></i></button>
          )}
        </div>
      )
    }
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 180,
    cell: ({ row }) => {
      const compartir = row.original.compartir;
      return (
        <div className="flex items-center gap-1.5">
          {compartir.includes("envelope") && (
            <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#6c757d] text-white rounded-[3px] hover:bg-[#5a6268]"><i className="bi bi-envelope"></i></button>
          )}
          {compartir.includes("whatsapp") && (
            <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#28a745] text-white rounded-[3px] hover:bg-[#218838]"><i className="bi bi-whatsapp"></i></button>
          )}
        </div>
      )
    }
  }
]
