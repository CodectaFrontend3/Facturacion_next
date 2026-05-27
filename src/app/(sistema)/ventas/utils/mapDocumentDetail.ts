import type {
  DocumentDetailBanco,
  DocumentDetailData,
  DocumentDetailItem,
  DocumentDetailMandatario,
} from "@/app/(sistema)/ventas/types/document-detail.types"
import {
  getDocumentDetailEmpresa,
  getDocumentDetailLogoUrl,
} from "@/app/(sistema)/ventas/config/document-detail.config"
import {
  montoSinSimbolo,
  monedaDesdeImporte,
} from "@/app/(sistema)/ventas/utils/document-detail-utils"

const DEFAULT_BANCOS: DocumentDetailBanco[] = [
  { nombre: "Interbank", cuenta: "Cta: 121-3233-232323232" },
  { nombre: "Scotiabank", cuenta: "Cta: 651247856997" },
  { nombre: "BBVA", cuenta: "Cta: 651247856997" },
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

/**
 * Normaliza un registro crudo del nuevo cotizacion.json al formato
 * que esperan VentaDocumentRawRow y los mappers de detalle.
 */
export function normalizeCotizacionRawRow(raw: any): VentaDocumentRawRow {
  // Normalizar items: detalle → descripcion, agregar item (nro de fila)
  const items: DocumentDetailItem[] = (raw.items ?? []).map((it: any, index: number) => {
    const precioUnitario = formatMonto(it.precioUnitario)
    const total = formatMonto(it.total ?? it.subtotal, precioUnitario)
    const descuentoValor = it.descuentoPorcentaje ?? it.descuento ?? 0
    return {
      item: String(index + 1),
      codigo: it.codigo ?? "",
      descripcion: it.descripcion ?? it.detalle ?? "",
      cantidad: String(it.cantidad ?? 1),
      descuento: `${descuentoValor}%`,
      puDescuento: precioUnitario,
      puComision: "0%",
      precioUnitario,
      total,
    }
  })

  const totales = raw.totales ?? {}

  return {
    id: raw.id,
    numero: raw.numero,
    rucDni: raw.rucDni,
    cliente: raw.clienteNombre ?? raw.cliente ?? "",
    emision: raw.fechaEmision
      ? new Date(raw.fechaEmision).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
      : (raw.emision ?? ""),
    forma: raw.formaPago ?? raw.forma ?? "",
    importeT: totales.total != null
      ? `S/ ${Number(totales.total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : (raw.importeT ?? ""),
    moneda: raw.moneda,
    garantia: raw.garantia,
    observacion: raw.observacion ?? raw.observaciones,
    vencimiento: raw.fechaVencimiento
      ? new Date(raw.fechaVencimiento).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
      : (raw.vencimiento ?? ""),
    dias: raw.validezDias != null ? String(raw.validezDias) : (raw.dias ?? ""),
    validez: raw.validezDias != null ? `${raw.validezDias} DÍAS` : (raw.validez ?? ""),
    // Totales a nivel raíz para que los mappers los encuentren
    total: totales.total ?? raw.total,
    subtotal: totales.subtotal ?? raw.subtotal,
    opGravada: totales.subtotal ?? raw.opGravada,
    opInafecta: totales.opInafecta ?? raw.opInafecta ?? 0,
    opExonerada: totales.opExonerada ?? raw.opExonerada ?? 0,
    igv: totales.igv ?? raw.igv,
    items,
  }
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
