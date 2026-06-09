export type MonedaTipo = "SOLES" | "DOLARES";

export type TipoComprobante = "SIN_COMPROBANTE" | "FACTURA" | "BOLETA";

export type KardexEntradaMotivo =
  | "INVENTARIO INICIAL"
  | "COMPRAS LOCALES"
  | "COMPRAS INTERNACIONALES";

export type KardexEstadoTipo = "ACTIVO" | "ANULADO" | "CIRCULACION";

// Productos que entran al inventario por una compra, o por un ajuste de inventario, etc.
export interface KardexProductoDetalle {
  id: string;
  nombre: string;
  unidad: string;
  cantidad: number;
  precio: number;
  total: number;
}

// Cada vez que entra un producto al inventario, se genera un registro de KardexEntrada
export interface KardexEntradaRow {
  id: string;
  codigo: string;
  motivo: KardexEntradaMotivo;
  proveedor: string;
  moneda: MonedaTipo;
  numero_remision: string | null;
  numero_factura: string | null;
  fecha_subida: string;
  productos?: KardexProductoDetalle[];
  total: number;
  estado: KardexEstadoTipo;
}
