import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { CotizacionRow, TabKey } from "../types"

export const getColumns = (activeTab: TabKey): ColumnDef<CotizacionRow>[] => {
  if (activeTab === "clientes") {
    return [
      { accessorKey: "id", header: "ID", size: 40 },
      { accessorKey: "nombre", header: "Nombre" },
      { accessorKey: "tipoDoc", header: "Tipo Doc.", size: 100 },
      { accessorKey: "nroDoc", header: "N° Doc.", size: 120 },
      { accessorKey: "correo", header: "Correo", size: 200 },
      { accessorKey: "celular", header: "Celular", size: 100 },
      { accessorKey: "fechaRegistro", header: "Fecha de Registro", size: 140 },
      {
        id: "acciones",
        header: "Ver",
        size: 80,
        cell: ({ row }) => {
          const actions = row.original.acciones || [];
          return (
            <div className="flex items-center gap-1.5">
              {actions.includes("eye") && (
                <button className="flex items-center justify-center w-[26px] h-[26px] bg-[#1538A0] text-white rounded-[3px] hover:bg-[#0f2d8a]"><i className="bi bi-eye"></i></button>
              )}
            </div>
          )
        }
      }
    ]
  }

  if (activeTab === "renovacion") {
    return [
      { accessorKey: "id", header: "ID", size: 40 },
      {
        accessorKey: "numero",
        header: "N°", size: 110,
        cell: ({ row }) => (
          <div className="whitespace-normal break-words">
            {row.original.numero}
          </div>
        )
      },
      { accessorKey: "rucDni", header: "RUC-DNI", size: 120 },
      { accessorKey: "cliente", header: "Cliente" },
      { accessorKey: "emision", header: "Emisión", size: 100 },
      { accessorKey: "vencimiento", header: "Vencimiento", size: 100 },
      { accessorKey: "dias", header: "Dias", size: 80 },
      { accessorKey: "forma", header: "Forma", size: 80 },
      { accessorKey: "importeT", header: "Importe T.", size: 120 },
      {
        id: "acciones",
        header: "Acciones",
        size: 100,
        cell: ({ row }) => {
          const actions = row.original.acciones || [];
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
        size: 100,
        cell: ({ row }) => {
          const compartir = row.original.compartir || [];
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
  }

  return [
    { accessorKey: "id", header: "ID", size: 40 },
    {
      accessorKey: "numero",
      header: "N°", size: 110,
      cell: ({ row }) => (
        <div className="flex items-start gap-1.5 whitespace-normal break-words">
          <span>{row.original.numero}</span>
          {activeTab !== "nota-venta" && (
            <button className="text-gray-400 border border-gray-300 rounded-[2px] min-w-[14px] w-3.5 h-3.5 flex items-center justify-center hover:bg-gray-100 text-[9px] leading-none pb-0.5 shrink-0 mt-0.5">+</button>
          )}
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
        const actions = row.original.acciones || [];
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
        const compartir = row.original.compartir || [];
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
}
