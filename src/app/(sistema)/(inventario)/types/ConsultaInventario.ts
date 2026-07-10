type TipoCompra = "Factura" | "Boleta" | "Nota de Crédito" | "Nota de Débito";

export interface ConsultaCompra {
  id: number;
  nombre: String;
  cantidad: number;
  precio_nacional: number;
  precio_extranjero: number;
}

export interface ConsultaVenta {
  id: number;
  tipo: TipoCompra;
  nombre: String;
  cantidad: number;
  precio_nacional: number;
  precio_extranjero: number;
}
