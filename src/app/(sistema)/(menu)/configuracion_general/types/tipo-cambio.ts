export interface TipoCambio {
  id: number;
  fecha: string;
  compra: number;
  venta: number;
  paralelo: number;
}

export interface TipoCambioStatItem {
  fecha: string;
  valor: number;
}

export interface TipoCambioStats {
  minimo: TipoCambioStatItem;
  maximo: TipoCambioStatItem;
}

export interface TipoCambioFormValues {
  compra: number;
  venta: number;
  paralelo: number;
}

export interface TipoCambioChartPoint {
  date: string;
  valor: number;
}
