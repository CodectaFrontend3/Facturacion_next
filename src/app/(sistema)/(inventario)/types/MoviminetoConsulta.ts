export interface ComprasProduco {
  id: number;
  numero_documento: string;
  proveedor: string;
  ruc: string;
  numero_documento_provedor: string;
  subtotal: number;
  igv: number;
  total: number;
}

export interface VentasProducto {
  id: number;
  tipo: "Factura" | "Boleta";
  numero_documento: string;
  proveedor: string;
  ruc: string;
  numero_documento_provedor: string;
  subtotal: number;
  igv: number;
  total: number;
}
