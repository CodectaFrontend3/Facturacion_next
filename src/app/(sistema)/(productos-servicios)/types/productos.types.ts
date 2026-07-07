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
}