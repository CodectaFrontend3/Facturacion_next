import Image from "next/image"
import { type ColumnDef } from "@tanstack/react-table"
import { type FacturacionRow } from "@/app/(sistema)/(registros_sunat)/types/facturacion"
import { Check, Clock, X } from "lucide-react"
import { ActionButton } from "@/components/common/ActionButton"

// Columnas para la pestaña principal de Boletas (Activas/Pendientes)
export const getBoletasColumns = (): ColumnDef<FacturacionRow>[] => [
  {
    accessorKey: "item",
    header: "Item",
    size: 80,
    cell: ({ row }) => <span className="font-medium text-[#676A6C]">{row.original.item}</span>,
  },
  {
    accessorKey: "codigo",
    header: "Código de Boleta",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "rucDni",
    header: "Nº de Documento",
    size: 150,
  },
  {
    accessorKey: "fechaCreacion",
    header: "Fecha de Creación",
    size: 180,
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
        />
        <span className="font-extrabold text-[#0073c1] tracking-tighter text-[11px]">SUNAT</span>
      </div>
    ),
    size: 120,
    cell: ({ row }) => {
      const status = row.original.sunatStatus
      
      let icon = null
      let statusClass = ""

      if (status === "enviado") {
        icon = <Check className="w-4 h-4 text-white" strokeWidth={3} />
        statusClass = "bg-[#1ab394] hover:bg-[#18a689]! border-[#1ab394]"
      } else if (status === "pendiente") {
        icon = <Clock className="w-4 h-4 text-white" strokeWidth={3} />
        statusClass = "bg-[#f8ac59] hover:bg-[#f7a54a]! border-[#f8ac59]"
      } else if (status === "error") {
        icon = <X className="w-4 h-4 text-white" strokeWidth={3} />
        statusClass = "bg-[#ed5565] hover:bg-[#ec4758]! border-[#ed5565]"
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
]

// Columnas específicas para la sección de Enviadas de Boletas
export const getEnviadasBoletasColumns = (): ColumnDef<FacturacionRow>[] => [
  {
    accessorKey: "item",
    header: "Item",
    size: 70,
    cell: ({ row }) => <span className="font-medium text-[#676A6C]">{row.original.item}</span>,
  },
  {
    accessorKey: "codigo",
    header: "Código",
    size: 150,
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "rucDni",
    header: "Nº Doc",
    size: 150,
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha de emisión",
    size: 150,
    cell: ({ row }) => <span>{row.original.fechaEmision || row.original.fechaCreacion}</span>,
  },
  {
    accessorKey: "precioTotal",
    header: "Precio Total",
    size: 120,
    cell: ({ row }) => {
      const precio = row.original.precioTotal
      return <span>{precio !== undefined ? (typeof precio === "number" ? `S/ ${precio.toFixed(2)}` : precio) : "S/ 0.00"}</span>
    },
  },
  {
    id: "sunat",
    header: () => (
      <div className="flex items-center justify-center gap-1">
        <Image
          src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/sunat.png"
          alt="sunat"
          width={15}
          height={15}
        />
        <span className="font-extrabold text-[#0073c1] tracking-tighter text-[11px]">SUNAT</span>
      </div>
    ),
    size: 100,
    cell: () => (
      <div className="flex justify-center items-center">
        {/* Círculo de verificación cyan/teal para boletas enviadas */}
        <ActionButton
          icon={<Check className="w-3.5 h-3.5" strokeWidth={4} />}
          className={`rounded-full! w-8 h-8! p-0! flex items-center justify-center border-0 text-white bg-[#00c0a3]`}
        />
      </div>
    ),
  },
  {
    id: "xml",
    header: "XML",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <button
          onClick={() => console.log("Descargar XML para boleta:", row.original.codigo)}
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
          onClick={() => console.log("Descargar CDR para boleta:", row.original.codigo)}
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
]
