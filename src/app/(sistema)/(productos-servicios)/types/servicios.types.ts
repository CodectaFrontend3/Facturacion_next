export type ServicioEstado = "Activo" | "Anulado"

export interface Servicio {
  id: string
  codigoServicio: string
  codigoOriginal: string
  nombre: string
  descripcion: string
  familia: string
  subfamilia: string
  marca: string
  descuento: number
  precioVentaPen: number
  precioVentaUsd: number
  utilidad: number
  fechaRegistro: string
  afectacion: string
  estado: ServicioEstado
  fichaTecnicaUrl?: string | null
  imagenUrl?: string | null
}