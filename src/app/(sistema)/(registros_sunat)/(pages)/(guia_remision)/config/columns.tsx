import Image from "next/image"
import { type ColumnDef } from "@tanstack/react-table"
import { CloudUpload } from "lucide-react"
import { ActionButton } from "@/components/common/ActionButton"

export interface GuiaRow {
  id: string | number
  item: number
  codigo: string
  rucDni?: string
  cliente?: string
  fechaEmision?: string
  fechaEntrega?: string
  tipoTransporte?: string
  sunatStatus: "enviado" | "pendiente" | "error"
}

export const getGuiasColumns = (): ColumnDef<GuiaRow>[] => [
  {
    accessorKey: "item",
    header: "ID",
    size: 80,
    cell: ({ row }) => (
      <span className="font-medium text-[#676A6C]">
        {row.original.item}
      </span>
    ),
  },
  {
    accessorKey: "codigo",
    header: "Código de Guía",
    size: 160,
  },
  {
    accessorKey: "rucDni",
    header: "RUC | DNI",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha de emisión",
    size: 150,
  },
  {
    accessorKey: "fechaEntrega",
    header: "Fecha de entrega",
    size: 150,
  },
  {
    accessorKey: "tipoTransporte",
    header: "Tipo Transporte",
    size: 160,
  },
  {
    id: "sunatStatus",
    header: () => (
      <div className="flex items-center justify-center gap-1">
        <Image
          src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/sunat.png"
          alt="sunat"
          width={15}
          height={15}
          unoptimized
        />
        <span className="font-extrabold text-[#0073c1] tracking-tighter text-[11px]">SUNAT</span>
      </div>
    ),
    size: 120,
    cell: () => {
      return (
        <div className="flex justify-center items-center">
          <ActionButton
            icon={<CloudUpload className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />}
            className="rounded-full! w-8 h-8! p-0! flex items-center justify-center border-0 text-white bg-[#1c84c6] hover:bg-[#1a7bb9]!"
          />
        </div>
      )
    },
  },
]

export const getEnviadasGuiasColumns = (): ColumnDef<GuiaRow>[] => [
  {
    accessorKey: "item",
    header: "ID",
    size: 80,
    cell: ({ row }) => (
      <span className="font-medium text-[#676A6C]">
        {row.original.item}
      </span>
    ),
  },
  {
    accessorKey: "codigo",
    header: "Código",
    size: 150,
  },
  {
    accessorKey: "rucDni",
    header: "RUC | DNI",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha emision",
    size: 150,
  },
  {
    accessorKey: "fechaEntrega",
    header: "Fecha entrega",
    size: 150,
  },
  {
    accessorKey: "tipoTransporte",
    header: "Tipo Transporte",
    size: 160,
  },
  {
    id: "xml",
    header: "XML",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => console.log("Descargar XML para guía:", row.original.codigo)}
          className="flex flex-col items-center justify-between w-7 h-9 border border-[#b2d0ec] bg-white rounded-[2px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer p-0.5 overflow-hidden"
        >
          <div className="flex-1 flex items-center justify-center">
            <i className="fa fa-file-text-o text-blue-400 text-[13px]" />
          </div>
          <div className="bg-[#1c84c6] w-full text-[8px] font-bold text-white text-center py-0.5 uppercase tracking-tighter">
            XML
          </div>
        </button>
      </div>
    ),
  },
  {
    id: "cdr",
    header: "CDR",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => console.log("Descargar CDR para guía:", row.original.codigo)}
          className="flex flex-col items-center justify-between w-7 h-9 border border-gray-300 bg-white rounded-[2px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer p-0.5 overflow-hidden"
        >
          <div className="flex-1 flex items-center justify-center">
            <i className="fa fa-file-text-o text-gray-400 text-[13px]" />
          </div>
          <div className="bg-[#7f7f7f] w-full text-[8px] font-bold text-white text-center py-0.5 uppercase tracking-tighter">
            CDR
          </div>
        </button>
      </div>
    ),
  },
  {
    id: "acciones",
    header: "Acciones",
    size: 100,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => console.log("Descargar PDF para guía:", row.original.codigo)}
          className="flex flex-col items-center justify-between w-7 h-9 border border-[#f5b8b8] bg-white rounded-[2px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer p-0.5 overflow-hidden"
        >
          <div className="flex-1 flex items-center justify-center">
            <i className="fa fa-file-pdf-o text-red-500 text-[13px]" />
          </div>
          <div className="bg-[#d9534f] w-full text-[8px] font-bold text-white text-center py-0.5 uppercase tracking-tighter">
            PDF
          </div>
        </button>
      </div>
    ),
  },
]
