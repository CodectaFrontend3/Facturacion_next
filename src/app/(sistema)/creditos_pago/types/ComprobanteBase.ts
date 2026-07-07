export type TipoComprobante = "Factura" | "Boleta" | "NotaVenta";
export type EstadoPago = "Sin Pagar" | "Pagado";
export type FormaPago = "Contado" | "Crédito";
export type ModoEmision = "Manual" | "Automatica";

// Lo que comparten absolutamente todos
export interface ComprobanteBase {
  id: number;
  cliente: string;
  fecha_emision: string;
  monto_total: number;
  saldo: number;
  fecha_vencimiento: string;
  fecha_cancelado: string;
  estado: EstadoPago;
  tipo_emision: ModoEmision; // Simplificamos tipo_factura, tipo_boleta, etc. en uno solo
}