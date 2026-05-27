export type DocumentDetailVariant = "cotizacion" | "nota-venta"

export interface DocumentDetailItem {
  item: string
  codigo?: string
  descripcion: string
  cantidad: string
  descuento?: string
  puDescuento?: string
  puComision?: string
  precioUnitario?: string
  total: string
}

export interface DocumentDetailBanco {
  nombre: string
  cuenta: string
}

export interface DocumentDetailMandatario {
  telefono: string
  email?: string
  celular?: string
  web?: string
}

export interface DocumentDetailEmpresa {
  nombre: string
  ruc: string
  telefono: string
  movil: string
  correo: string
  direccion: string
}

export interface DocumentDetailData {
  numero: string
  documentTitle: string
  rucDni: string
  cliente: string
  direccion?: string
  nContrato?: string
  vencimiento?: string
  diasRestantes?: string
  forma?: string
  emision?: string
  validez?: string
  garantia?: string
  moneda: string
  comisionista?: string
  observacion?: string
  items: DocumentDetailItem[]
  total: string
  subtotal?: string
  opGravada?: string
  opInafecta?: string
  opExonerada?: string
  igv?: string
  bancos?: DocumentDetailBanco[]
  mandatario?: DocumentDetailMandatario
  empresa?: DocumentDetailEmpresa
  logoUrl?: string
}
