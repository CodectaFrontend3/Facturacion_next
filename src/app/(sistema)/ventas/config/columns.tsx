import { ColumnDef } from "@tanstack/react-table"
import { CotizacionRow, ClienteRow } from "../types"
import { ActionButton } from "@/components/common/ActionButton"

interface NoteColumnOptions {
  getNote?: (rowId: string | number) => string
  onNoteClick?: (rowId: string | number) => void
}

function NotaButton({
  note,
  onClick,
}: {
  note?: string
  onClick?: () => void
}) {
  if (note) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative ml-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[2px] bg-[#0b65d8] text-[12px] font-bold italic leading-none text-white shadow-sm transition-transform hover:-translate-y-0.5"
        aria-label="Editar nota informativa"
      >
        i
        <span className="pointer-events-none absolute left-1/2 top-[26px] z-30 hidden w-[164px] -translate-x-1/2 overflow-hidden rounded-[4px] bg-white text-center not-italic shadow-[0_4px_16px_rgba(0,0,0,0.22)] group-hover:block">
          <span className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 bg-[#2447ff]" />
          <span className="relative block bg-[#2447ff] px-3 py-2 text-[18px] font-normal leading-none text-white">
            Nota Informativa
          </span>
          <span className="block px-3 py-4 text-[16px] font-normal leading-tight text-[#222]">
            {note}
          </span>
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[2px] border border-dashed border-[#9ca3af] bg-white text-[16px] leading-none text-[#6b7280] transition-all hover:-translate-y-0.5 hover:border-[#0b65d8] hover:bg-[#f7fbff] hover:text-[#0b65d8] hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
      aria-label="Agregar nota informativa"
    >
      +
    </button>
  )
}

function CompartirButtons() {
  return (
    <div className="flex items-center gap-1.5">
      <ActionButton
        icon={<i className="bi bi-envelope"></i>}
        label="Enviar por mensajería"
        className="w-9 h-9 bg-[#6c757d] hover:bg-[#5a6268] rounded-[3px]"
      />
      <ActionButton
        icon={<i className="bi bi-whatsapp"></i>}
        label="Enviar por WhatsApp"
        className="w-9 h-9 bg-[#28a745] hover:bg-[#218838] rounded-[3px]"
      />
    </div>
  )
}

// COLUMNAS PARA COTIZACIÃ“N
const getCotizacionColumns = (
  detailBasePath = "/ventas/cotizacion",
  noteOptions: NoteColumnOptions = {}
): ColumnDef<CotizacionRow>[] => [
    { accessorKey: "id", header: "ID", size: 40 },
    {
      accessorKey: "numero",
      header: "N°", size: 145,
      cell: ({ row }) => (
        <div className="flex items-center gap-3 pr-2">
          <span className="break-words">{row.original.numero}</span>
          <NotaButton
            note={noteOptions.getNote?.(row.original.id)}
            onClick={() => noteOptions.onNoteClick?.(row.original.id)}
          />
        </div>
      )
    },
    { accessorKey: "rucDni", header: "RUC-DNI", size: 120 },
    { accessorKey: "cliente", header: "Cliente" },
    { accessorKey: "emision", header: "Emisión", size: 100 },
    { accessorKey: "forma", header: "Forma", size: 100 },
    { accessorKey: "importeT", header: "Importe T.", size: 120 },
    {
      id: "acciones",
      header: "Acciones",
      size: 130,
      cell: ({ row }) => {
        const actions = row.original.acciones;
        return (
          <div className="flex items-center gap-1.5">
            {actions.includes("eye") && (
              <ActionButton
                icon={<i className="bi bi-eye"></i>}
                label="Ver detalle"
                className=" w-9 h-9 rounded-[3px]"
                href={`${detailBasePath}/${row.original.id}`}
              />
            )}
            {actions.includes("clock") && (
              <ActionButton icon={<i className="bi bi-clock"></i>} className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-[3px]" />
            )}
            {actions.includes("check") && (
              <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
            )}
          </div>
        )
      }
    },
    {
      id: "compartir",
      header: "Compartir R.",
      size: 130,
      cell: () => <CompartirButtons />
    }
  ]

// COLUMNAS PARA COTIZACIÃ“N MANUAL
const getCotizacionManualColumns = (noteOptions: NoteColumnOptions = {}): ColumnDef<CotizacionRow>[] => getCotizacionColumns("/ventas/cotizacion_manual", noteOptions)

// COLUMNAS PARA NOTA DE VENTA
const getNotaVentaColumns = (noteOptions: NoteColumnOptions = {}): ColumnDef<CotizacionRow>[] => getCotizacionColumns("/ventas/nota_venta", noteOptions)

// COLUMNAS PARA CLIENTES
const getClienteColumns = (): ColumnDef<ClienteRow>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "tipoDoc", header: "Tipo Doc.", size: 100 },
  { accessorKey: "nroDoc", header: "Nº Doc.", size: 120 },
  { accessorKey: "correo", header: "Correo" },
  { accessorKey: "celular", header: "Celular", size: 100 },
  { accessorKey: "fechaRegistro", header: "Fecha de Registro", size: 130 },
  {
    id: "acciones",
    header: "Ver",
    size: 50,
    cell: () => {
      return (
        <ActionButton
          icon={<i className="bi bi-eye"></i>}
          label="Ver detalle"
          className="w-9 h-9 rounded-[3px]"
        />
      )
    }
  }
]

// COLUMNAS PARA RENOVACIÃ“N
const getRenovacionColumns = (noteOptions: NoteColumnOptions = {}): ColumnDef<CotizacionRow>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  {
    accessorKey: "numero",
    header: "N°", size: 110,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 pr-2">
        <span className="break-words">{row.original.numero}</span>
        <NotaButton
          note={noteOptions.getNote?.(row.original.id)}
          onClick={() => noteOptions.onNoteClick?.(row.original.id)}
        />
      </div>
    )
  },
  { accessorKey: "rucDni", header: "RUC-DNI", size: 120 },
  { accessorKey: "cliente", header: "Cliente", size: 310 },
  { accessorKey: "emision", header: "Emisión", size: 78 },
  { accessorKey: "vencimiento", header: "Vencimiento", size: 105 },
  { accessorKey: "dias", header: "Dias", size: 78 },
  { accessorKey: "forma", header: "Forma", size: 78 },
  { accessorKey: "importeT", header: "Importe T.", size: 88 },
  {
    id: "acciones",
    header: "Acciones",
    size: 105,
    cell: ({ row }) => {
      const actions = row.original.acciones;
      return (
        <div className="flex items-center gap-1.5">
          {actions.includes("eye") && (
              <ActionButton
                icon={<i className="bi bi-eye"></i>}
                label="Ver detalle"
                className=" w-9 h-9 rounded-[3px]"
                href={`/ventas/${row.original.tab === "cotizacion-manual" ? "cotizacion_manual" : "cotizacion"}/${row.original.id}`}
              />
          )}
          {actions.includes("clock") && (
            <ActionButton icon={<i className="bi bi-clock"></i>} className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-[3px]" />
          )}
          {actions.includes("check") && (
            <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
          )}
        </div>
      )
    }
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 110,
    cell: () => <CompartirButtons />
  }
]

/**
 * FunciÃ³n genÃ©rica que retorna las columnas segÃºn la pestaÃ±a activa
 */
export const getColumnsForTab = (tab: string, noteOptions: NoteColumnOptions = {}): ColumnDef<CotizacionRow | ClienteRow>[] => {
  switch (tab) {
    case "cotizacion":
      return getCotizacionColumns("/ventas/cotizacion", noteOptions) as ColumnDef<CotizacionRow | ClienteRow>[]
    case "cotizacion-manual":
      return getCotizacionManualColumns(noteOptions) as ColumnDef<CotizacionRow | ClienteRow>[]
    case "nota-venta":
      return getNotaVentaColumns(noteOptions) as ColumnDef<CotizacionRow | ClienteRow>[]
    case "clientes":
      return getClienteColumns() as ColumnDef<CotizacionRow | ClienteRow>[]
    case "renovacion":
      return getRenovacionColumns(noteOptions) as ColumnDef<CotizacionRow | ClienteRow>[]
    default:
      return []
  }
}

// Mantener getColumns() para compatibilidad con cÃ³digo existente
export const getColumns = (): ColumnDef<CotizacionRow>[] => getCotizacionColumns()
