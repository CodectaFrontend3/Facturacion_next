import type { DocumentDetailEmpresa } from "@/app/(sistema)/ventas/_domain/legacy/document-detail.types"

/** Datos de empresa para vista de detalle (nota de venta). Configurar en .env.local */
export function getDocumentDetailEmpresa(): DocumentDetailEmpresa {
  return {
    nombre: process.env.NEXT_PUBLIC_EMPRESA_NOMBRE ?? "DEMO",
    ruc: process.env.NEXT_PUBLIC_EMPRESA_RUC ?? "20522045773",
    telefono: process.env.NEXT_PUBLIC_EMPRESA_TELEFONO ?? "0133333333333333",
    movil: process.env.NEXT_PUBLIC_EMPRESA_MOVIL ?? "970102509",
    correo: process.env.NEXT_PUBLIC_EMPRESA_CORREO ?? "",
    direccion: process.env.NEXT_PUBLIC_EMPRESA_DIRECCION ?? "Johan strauss 388 - Lima - Lima - Peru",
  }
}

export function getDocumentDetailLogoUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_EMPRESA_LOGO_URL?.trim()
  return url || "http://jypsac.dyndns.org:190/facturacion_20522045773/public/img/logos/logooooooooooo.png"
}
