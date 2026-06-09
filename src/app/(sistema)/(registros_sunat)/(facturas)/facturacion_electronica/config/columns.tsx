import Image from "next/image"
import { type ColumnDef } from "@tanstack/react-table"
import { type FacturacionRow } from "@/app/(sistema)/(registros_sunat)/types/facturacion"
import { Check } from "lucide-react"

// Columnas para la pestaña principal de Facturación Electrónica (Facturas Activas)
export const getFacturacionColumns = (): ColumnDef<FacturacionRow>[] => [
  {
    accessorKey: "item",
    header: "Item",
    size: 80,
    cell: ({ row }) => <span className="font-medium text-[#676A6C]">{row.original.item}</span>,
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
      return (
        <>
          {status === "enviado" && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800">
              Enviado
            </span>
          )}
          {status === "pendiente" && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">
              Pendiente
            </span>
          )}
          {status === "error" && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800">
              Error
            </span>
          )}
        </>
      )
    },
  },
]

// Columnas específicas para la sección de Enviadas (ambas facturaciones)
export const getEnviadasColumns = (): ColumnDef<FacturacionRow>[] => [
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
    header: "Fecha de Emisión",
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
        {/* Círculo de verificación cyan/teal idéntico al mockup */}
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00c0a3] text-white">
          <Check className="w-3.5 h-3.5" strokeWidth={4} />
        </span>
      </div>
    ),
  },
  {
    id: "xml",
    header: "XML",
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {/* Botón interactivo de tipo archivo XML (azul) */}
        <button
          onClick={() => console.log("Descargar XML para:", row.original.codigo)}
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
        {/* Botón interactivo de tipo archivo CDR (gris) */}
        <button
          onClick={() => console.log("Descargar CDR para:", row.original.codigo)}
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
