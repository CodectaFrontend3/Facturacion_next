export interface FacturacionRow {
  id: string | number
  item: number
  codigo: string
  rucDni: string
  cliente: string
  fechaCreacion: string
  sunatStatus: "enviado" | "pendiente" | "error"
}

export interface FacturacionData {
  facturas: FacturacionRow[]
  enviados_facturas: FacturacionRow[]
  factura_manual: FacturacionRow[]
  enviados_manual: FacturacionRow[]
  detracciones: FacturacionRow[]
}

export interface FacturacionFilters {
  searchValue: string
  dateFrom: string
  dateTo: string
  entriesCount: string
}

export interface TabConfig {
  key: string
  label: string
  color: string
  href: string
}

export interface CardConfig {
  key: string
  iconClass: string
  label: string
  ringColorClass: string
  metaLabel: string
}
