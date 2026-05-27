export interface ProductoCotizado {
  item: number;
  codigo: string;
  descripcion: string;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
}

export interface Cotizacion {
  id: number;
  numero: string;
  ruc_dni: string;
  cliente: string;
  direccion: string;
  telefono: string;
  fecha_emision: string;
  fecha_vencimiento: string;
  tipo_comprobante: string;
  forma_pago: string;
  moneda: string;
  validez: string;
  garantia: string;
  items: ProductoCotizado[];
  subtotal: string;
  igv: string;
  importe_total: string;
  total_letras: string;
}
