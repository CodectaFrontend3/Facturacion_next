import Image from "next/image"
import { type ColumnDef } from "@tanstack/react-table"
import { type FacturaRow, type FacturaEnviadaRow, type DetraccionRow } from "@/app/(sistema)/(registros_sunat)/types/facturacion"
import { Check, Clock, X, CloudUpload } from "lucide-react"
import { ActionButton } from "@/components/common/ActionButton"
import { DocumentButton } from "@/app/(sistema)/(registros_sunat)/_components/DocumentButton"

// Columnas para la pestaña principal de Facturación Electrónica (Facturas Activas)
export const getFacturacionColumns = (): ColumnDef<FacturaRow>[] => [
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

// Columnas específicas para la sección de Enviadas (ambas facturaciones)
export const getEnviadasColumns = (): ColumnDef<FacturaEnviadaRow>[] => [
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
          onClick={() => console.log("Descargar XML para:", row.original.codigo)}
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
          onClick={() => console.log("Descargar CDR para:", row.original.codigo)}
        />
      </div>
    ),
  },
]

// Columnas específicas para la sección de Detracciones
export const getDetraccionesColumns = (): ColumnDef<DetraccionRow>[] => [
  {
    accessorKey: "item",
    header: "ID",
    size: 70,
    cell: ({ row }) => <span className="font-medium text-[#676A6C]">{row.original.item}</span>,
  },
  {
    accessorKey: "codigo",
    header: "Nº de Doc",
    size: 150,
  },
  {
    accessorKey: "tipoDoc",
    header: "Tipo",
    size: 120,
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha de Emisión",
    size: 150,
  },
  {
    accessorKey: "montoTotal",
    header: "Monto total",
    size: 180,
  },
  {
    accessorKey: "montoDetraccion",
    header: "Monto Detracción",
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
        />
        <span className="font-extrabold text-[#0073c1] tracking-tighter text-[11px]">SUNAT</span>
      </div>
    ),
    size: 100,
    cell: ({ row }) => {
      const status = row.original.sunatStatus
      if (status === "error") {
        return (
          <div className="flex justify-center items-center">
            <ActionButton
              icon={<X className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
              className="rounded-full! w-8 h-8! p-0! flex items-center justify-center border-0 text-white bg-[#ed5565] hover:bg-[#ec4758]!"
            />
          </div>
        )
      }
      return null
    },
  },
  {
    id: "acciones",
    header: "Acciones",
    size: 160,
    cell: ({ row }) => (
      <div className="flex justify-between items-center px-2">
        <DocumentButton
          type="pdf"
          codigo={row.original.codigo}
          onClick={() => console.log("Descargar PDF para:", row.original.codigo)}
        />
        <DocumentButton
          type="xml"
          codigo={row.original.codigo}
          onClick={() => console.log("Descargar XML para:", row.original.codigo)}
        />
        <DocumentButton
          type="cdr"
          codigo={row.original.codigo}
          onClick={() => console.log("Descargar CDR para:", row.original.codigo)}
        />
      </div>
    ),
  },
]
