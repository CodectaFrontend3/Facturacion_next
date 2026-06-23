import Image from "next/image"
import { type ColumnDef } from "@tanstack/react-table"
import { Check, X, CloudUpload } from "lucide-react"
import { ActionButton } from "@/components/common/ActionButton"
import { type NotaRow, type NotaEnviadaRow } from "@/app/(sistema)/(registros_sunat)/types/notas"
import { DocumentButton } from "@/app/(sistema)/(registros_sunat)/_components/DocumentButton"

export const getNotaCreditoColumns = (): ColumnDef<NotaRow>[] => [
  {
    accessorKey: "item",
    header: "Item",
    size: 80,
    cell: ({ row }) => (
      <span className="font-medium text-[#676A6C]">
        {row.original.item}
      </span>
    ),
  },
  {
    accessorKey: "codigo",
    header: "Código de NC",
    size: 150,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    size: 180,
  },
  {
    accessorKey: "docAsoc",
    header: "Nº de Doc. Asoc.",
    size: 150,
  },
  {
    accessorKey: "rucDni",
    header: "Ruc/DNI",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha Emisión",
    size: 150,
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

export const getNotaDebitoColumns = (): ColumnDef<NotaRow>[] => [
  {
    accessorKey: "item",
    header: "Item",
    size: 80,
    cell: ({ row }) => (
      <span className="font-medium text-[#676A6C]">
        {row.original.item}
      </span>
    ),
  },
  {
    accessorKey: "codigo",
    header: "Código de ND",
    size: 150,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    size: 180,
  },
  {
    accessorKey: "docAsoc",
    header: "Nº de Doc. Asoc.",
    size: 150,
  },
  {
    accessorKey: "rucDni",
    header: "Ruc/DNI",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha Emisión",
    size: 150,
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

export const getEnviadasNotaCreditoColumns = (): ColumnDef<NotaEnviadaRow>[] => [
  {
    accessorKey: "item",
    header: "Item",
    size: 80,
    cell: ({ row }) => (
      <span className="font-medium text-[#676A6C]">
        {row.original.item}
      </span>
    ),
  },
  {
    accessorKey: "codigo",
    header: "Código de NC",
    size: 150,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    size: 180,
  },
  {
    accessorKey: "docAsoc",
    header: "Doc. Asoc.",
    size: 150,
  },
  {
    accessorKey: "rucDni",
    header: "Ruc/DNI",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha Emisión",
    size: 150,
  },
  {
    accessorKey: "fechaEnvio",
    header: "Fecha Envío",
    size: 150,
  },
  {
    id: "sunatStatus",
    header: "Estado",
    size: 100,
    cell: ({ row }) => {
      const status = row.original.sunatStatus
      let icon = null
      let statusClass = ""

      if (status === "enviado") {
        icon = <Check className="w-3.5 h-3.5" strokeWidth={4} />
        statusClass = "bg-[#00c0a3] hover:bg-[#00a88f]!"
      } else {
        icon = <X className="w-3.5 h-3.5 text-white" strokeWidth={4} />
        statusClass = "bg-[#ed5565] hover:bg-[#ec4758]!"
      }

      return (
        <div className="flex justify-center items-center">
          <ActionButton
            icon={icon}
            className={`rounded-full! w-8 h-8! p-0! flex items-center justify-center border-0 text-white ${statusClass}`}
          />
        </div>
      )
    },
  },
  {
    id: "xml",
    header: "XML",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <DocumentButton
          type="xml"
          codigo={row.original.codigo}
          onClick={() => console.log("Descargar XML para nota:", row.original.codigo)}
        />
      </div>
    ),
  },
  {
    id: "cdr",
    header: "CDR",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <DocumentButton
          type="cdr"
          codigo={row.original.codigo}
          onClick={() => console.log("Descargar CDR para nota:", row.original.codigo)}
        />
      </div>
    ),
  },
]

export const getEnviadasNotaDebitoColumns = (): ColumnDef<NotaEnviadaRow>[] => [
  {
    accessorKey: "item",
    header: "Item",
    size: 80,
    cell: ({ row }) => (
      <span className="font-medium text-[#676A6C]">
        {row.original.item}
      </span>
    ),
  },
  {
    accessorKey: "codigo",
    header: "Código de ND",
    size: 150,
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
    size: 180,
  },
  {
    accessorKey: "docAsoc",
    header: "Doc. Asoc.",
    size: 150,
  },
  {
    accessorKey: "rucDni",
    header: "Ruc/DNI",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha Emisión",
    size: 150,
  },
  {
    accessorKey: "fechaEnvio",
    header: "Fecha Envío",
    size: 150,
  },
  {
    id: "sunatStatus",
    header: "Estado",
    size: 100,
    cell: ({ row }) => {
      const status = row.original.sunatStatus
      let icon = null
      let statusClass = ""

      if (status === "enviado") {
        icon = <Check className="w-3.5 h-3.5" strokeWidth={4} />
        statusClass = "bg-[#00c0a3] hover:bg-[#00a88f]!"
      } else {
        icon = <X className="w-3.5 h-3.5 text-white" strokeWidth={4} />
        statusClass = "bg-[#ed5565] hover:bg-[#ec4758]!"
      }

      return (
        <div className="flex justify-center items-center">
          <ActionButton
            icon={icon}
            className={`rounded-full! w-8 h-8! p-0! flex items-center justify-center border-0 text-white ${statusClass}`}
          />
        </div>
      )
    },
  },
  {
    id: "xml",
    header: "XML",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <DocumentButton
          type="xml"
          codigo={row.original.codigo}
          onClick={() => console.log("Descargar XML para nota:", row.original.codigo)}
        />
      </div>
    ),
  },
  {
    id: "cdr",
    header: "CDR",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <DocumentButton
          type="cdr"
          codigo={row.original.codigo}
          onClick={() => console.log("Descargar CDR para nota:", row.original.codigo)}
        />
      </div>
    ),
  },
]
