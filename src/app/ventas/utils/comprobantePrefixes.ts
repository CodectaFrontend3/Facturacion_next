/** Valores que significan "sin filtrar por comprobante" */
export const COMPROBANTE_TODOS_VALUES = ["Todos los comprobantes", "Comprobantes"] as const

/** Prefijos de número por tipo de comprobante y pestaña de ventas */
export const COMPROBANTE_PREFIX_BY_TAB: Record<string, Record<string, string>> = {
  cotizacion: {
    Factura: "COTF",
    Boleta: "COTB",
    "Nota de Venta": "COTV",
  },
  "cotizacion-manual": {
    Factura: "CMF",
    Boleta: "CMB",
    "Nota de Venta": "CMV",
  },
  renovacion: {
    Factura: "CMF",
    Boleta: "CMB",
    "Nota de Venta": "CMV",
  },
}

export function rowMatchesComprobante(
  numero: string,
  comprobanteLabel: string,
  tab: string
): boolean {
  const prefixes = COMPROBANTE_PREFIX_BY_TAB[tab]
  if (!prefixes) return true

  const prefix = prefixes[comprobanteLabel.trim()]
  if (!prefix) return false

  return numero.trim().toUpperCase().startsWith(prefix)
}
