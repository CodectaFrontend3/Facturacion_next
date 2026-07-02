export interface Factura {
  id: number;
  item: string;
  estado: "No Pagado" | "Pagado";
  numero_factura: string;
  cliente: string;
  fecha_emision: string;
  monto_total: number;
  numero_cuotas: number;
  saldo: number;
  fecha_vencimiento: string;
  observaciones: string;
  forma_pago: "Contado" | "Crédito";
  tipo_factura: "Manual" | "Automatica"; // Es para el filtrado (posiblemente sea diferente y se tenga que cambiar)
}
