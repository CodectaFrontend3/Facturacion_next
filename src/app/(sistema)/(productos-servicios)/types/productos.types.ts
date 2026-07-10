export type ProductoEstado = "Activo" | "Inactivo"

export interface Producto {
  id: string
  codigo: string
  nombre: string
  marca: string
  unidad: string
  estado: ProductoEstado
  precioNacional: number
  stock: number
  fichaTecnicaUrl?: string | null
  fechaRegistro: string

  // New optional properties from product form
  codOrig?: string
  descripcion?: string
  peso?: number
  pesoUnidad?: string
  familia?: string
  subFamilia?: string
  stockMin?: number
  stockMax?: number
  desc1?: number
  desc2?: number
  descMax?: number
  origen?: string
  utilidad?: number
  garantia?: string
  afectacion?: string
  imagen?: string
  detalle?: string
}