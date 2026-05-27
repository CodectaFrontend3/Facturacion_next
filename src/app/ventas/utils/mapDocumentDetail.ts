import type {
  DocumentDetailBanco,
  DocumentDetailData,
  DocumentDetailItem,
  DocumentDetailMandatario,
} from "@/app/ventas/types/document-detail.types"
import {
  getDocumentDetailEmpresa,
  getDocumentDetailLogoUrl,
} from "@/app/ventas/config/document-detail.config"
import {
  montoSinSimbolo,
  monedaDesdeImporte,
} from "@/app/ventas/utils/document-detail-utils"

const DEFAULT_BANCOS: DocumentDetailBanco[] = [
  { nombre: "Interbank", cuenta: "Cta: 8-012-091-2901005" },
  { nombre: "Scotiabank", cuenta: "Cta: 8-011-20017" },
  { nombre: "BNA Transnetel", cuenta: "Cta: 61-9013410001" },
]

const DEFAULT_MANDATARIO: DocumentDetailMandatario = {
  telefono: "999999999999",
  email: "demo@mi-empresa.com",
  celular: "999-999-9999",
  web: "https://www.demo.com/",
}

type MontoRaw = string | number

export interface VentaDocumentRawProducto {
  id?: string
  codigo?: string
  descripcion?: string
  cantidad?: MontoRaw
  precioUnitario?: MontoRaw
  descuento?: MontoRaw
  subtotal?: MontoRaw
}

/** Fila de listado/mock/API antes de mapear a DocumentDetailData */
export interface VentaDocumentRawRow {
  id?: string | number
  numero?: string
  rucDni?: string
  cliente?: string
  emision?: string
  forma?: string
  importeT?: string
  moneda?: string
  direccion?: string
  nContrato?: string
  vencimiento?: string
  diasRestantes?: string
  dias?: string
  validez?: string
  garantia?: string
  comisionista?: string
  observacion?: string
  observaciones?: string
  total?: MontoRaw
  subtotal?: MontoRaw
  opGravada?: MontoRaw
  opInafecta?: MontoRaw
  opExonerada?: MontoRaw
  igv?: MontoRaw
  productos?: VentaDocumentRawProducto[]
  items?: DocumentDetailItem[]
  bancos?: DocumentDetailBanco[]
  mandatario?: DocumentDetailMandatario
}

export function formatMonto(value: MontoRaw | undefined, fallback = "0.00"): string {
  if (value === undefined || value === null || value === "") return fallback
  if (typeof value === "number") return value.toFixed(2)
  return value
}

function resolveMoneda(row: VentaDocumentRawRow): string {
  const code = row.moneda?.trim().toUpperCase()
  if (code === "PEN" || code === "SOL") return "Soles"
  if (code === "USD" || code === "DOL") return "Dólares"
  if (row.moneda) {
    const lower = row.moneda.toLowerCase()
    if (lower.includes("sol")) return "Soles"
    if (lower.includes("dol") || lower.includes("dólar")) return "Dólares"
    return row.moneda
  }
  return row.importeT?.trim().startsWith("$") ? "Dólares" : "Soles"
}

function mapProductosToItems(productos: VentaDocumentRawProducto[]): DocumentDetailItem[] {
  return productos.map((producto, index) => {
    const precioUnitario = formatMonto(producto.precioUnitario)
    const total = formatMonto(producto.subtotal, precioUnitario)
    const descuentoValor = producto.descuento ?? 0

    return {
      item: String(index + 1),
      codigo: producto.codigo,
      descripcion: producto.descripcion ?? "",
      cantidad: String(producto.cantidad ?? 1),
      descuento: typeof descuentoValor === "number" ? `${descuentoValor}%` : descuentoValor,
      puDescuento: precioUnitario,
      puComision: "0%",
      precioUnitario,
      total,
    }
  })
}

function buildCotizacionBase(
  row: VentaDocumentRawRow,
  overrides: Partial<DocumentDetailData>
): DocumentDetailData {
  const amount = montoSinSimbolo(row.importeT) || formatMonto(row.total)
  const moneda = resolveMoneda(row)

  return {
    numero: row.numero ?? "",
    documentTitle: "COTIZACIÓN",
    rucDni: row.rucDni ?? "",
    cliente: row.cliente ?? "",
    direccion: row.direccion ?? "-",
    nContrato: row.nContrato ?? "0000000 / 00000",
    vencimiento: row.vencimiento ?? "-",
    diasRestantes: row.diasRestantes ?? row.dias ?? "-",
    forma: row.forma,
    emision: row.emision,
    validez: row.validez ?? "1 DIAS",
    garantia: row.garantia ?? "6 MESES",
    moneda,
    comisionista: row.comisionista ?? "VE001 - Demo - 100%",
    observacion: row.observacion ?? row.observaciones,
    total: formatMonto(row.total, amount),
    subtotal: formatMonto(row.subtotal, amount),
    opGravada: formatMonto(row.opGravada, amount),
    opInafecta: formatMonto(row.opInafecta, "0.00"),
    opExonerada: formatMonto(row.opExonerada, "0.00"),
    igv: formatMonto(row.igv, "0.00"),
    items: row.items ?? [],
    bancos: row.bancos ?? DEFAULT_BANCOS,
    mandatario: row.mandatario ?? DEFAULT_MANDATARIO,
    ...overrides,
  }
}

function resolveCotizacionItems(row: VentaDocumentRawRow, amount: string): DocumentDetailItem[] {
  if (row.items?.length) return row.items
  if (row.productos?.length) return mapProductosToItems(row.productos)

  return [
    {
      item: "1",
      codigo: row.numero,
      descripcion: "Servicio / producto cotizado",
      cantidad: "1",
      descuento: "0%",
      puDescuento: amount,
      puComision: "0%",
      precioUnitario: amount,
      total: amount,
    },
  ]
}

export function mapCotizacionDetail(row: VentaDocumentRawRow): DocumentDetailData {
  const amount = montoSinSimbolo(row.importeT) || formatMonto(row.total)

  return buildCotizacionBase(row, {
    observacion: row.observacion ?? row.observaciones,
    items: resolveCotizacionItems(row, amount),
  })
}

export function mapCotizacionManualDetail(row: VentaDocumentRawRow): DocumentDetailData {
  const amount = montoSinSimbolo(row.importeT)

  return buildCotizacionBase(
    { ...row, moneda: "Soles" },
    {
      observacion: row.observacion ?? row.observaciones ?? "Emitimos la siguiente Cotización a vuestra solicitud",
      items: resolveCotizacionItems(row, amount),
    }
  )
}

export function mapRenovacionDetail(row: VentaDocumentRawRow): DocumentDetailData {
  const amount = montoSinSimbolo(row.importeT)

  return buildCotizacionBase(
    { ...row, moneda: "Soles" },
    {
      documentTitle: "COTIZACIÓN",
      observacion: row.observacion ?? row.observaciones ?? "Emitimos la siguiente Cotización a vuestra solicitud",
      diasRestantes: row.dias ?? "-",
      items: resolveCotizacionItems(row, amount),
      mandatario: {
        telefono: DEFAULT_MANDATARIO.telefono,
        celular: DEFAULT_MANDATARIO.celular,
        web: DEFAULT_MANDATARIO.web,
      },
    }
  )
}

export function mapNotaVentaDetail(row: VentaDocumentRawRow): DocumentDetailData {
  const total = montoSinSimbolo(row.importeT)
  const moneda = monedaDesdeImporte(row.importeT)

  return {
    numero: row.numero ?? "",
    documentTitle: "NOTA DE VENTA",
    rucDni: row.rucDni ?? "",
    cliente: row.cliente ?? "",
    emision: row.emision,
    garantia: row.garantia ?? "6 MESES Mes(es)",
    moneda,
    observacion: row.observacion ?? row.observaciones ?? "Emitimos la siguiente Nota de Venta a vuestra solicitud",
    total,
    items: resolveCotizacionItems(row, total),
    bancos: DEFAULT_BANCOS,
    empresa: getDocumentDetailEmpresa(),
    logoUrl: getDocumentDetailLogoUrl(),
  }
}
