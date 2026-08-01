// _config/empresa.config.ts

export interface EmpresaConfig {
  nombre: string
  ruc: string
  telefono: string
  movil: string
  correo: string
  direccion: string
}

/** Datos de la empresa emisora, usados en el encabezado de Nota de Venta. */
export function getEmpresaConfig(): EmpresaConfig {
  return {
    nombre: process.env.NEXT_PUBLIC_EMPRESA_NOMBRE ?? "DEMO",
    ruc: process.env.NEXT_PUBLIC_EMPRESA_RUC ?? "20522045773",
    telefono: process.env.NEXT_PUBLIC_EMPRESA_TELEFONO ?? "01 333 3333",
    movil: process.env.NEXT_PUBLIC_EMPRESA_MOVIL ?? "970102509",
    correo: process.env.NEXT_PUBLIC_EMPRESA_CORREO ?? "",
    direccion: process.env.NEXT_PUBLIC_EMPRESA_DIRECCION ?? "Johan Strauss 388 - Lima - Lima - Perú",
  }
}

export function getEmpresaLogoUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_EMPRESA_LOGO_URL?.trim() || undefined
}

/** Cuentas bancarias por defecto, mostradas en BancosInfo. */
export interface BancoInfo {
  nombre: string
  cuenta: string
}

export const BANCOS_DEFAULT: BancoInfo[] = [
  { nombre: "Interbank", cuenta: "Cta: 121-3233-232323232" },
  { nombre: "Scotiabank", cuenta: "Cta: 651247856997" },
  { nombre: "BBVA", cuenta: "Cta: 651247856997" },
]
