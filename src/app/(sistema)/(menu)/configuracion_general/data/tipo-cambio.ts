import type {
  TipoCambio,
  TipoCambioChartPoint,
  TipoCambioStats,
} from "../types/tipo-cambio";

export const initialTipoCambios: TipoCambio[] = [
  {
    id: 1,
    fecha: "24-08-2026",
    compra: 3.34,
    venta: 3.35,
    paralelo: 3.29,
  },
  {
    id: 2,
    fecha: "18-08-2026",
    compra: 3.36,
    venta: 3.37,
    paralelo: 3.31,
  },
  {
    id: 3,
    fecha: "17-08-2026",
    compra: 3.36,
    venta: 3.37,
    paralelo: 3.31,
  },
  {
    id: 4,
    fecha: "15-08-2026",
    compra: 3.36,
    venta: 3.37,
    paralelo: 3.31,
  },
  {
    id: 5,
    fecha: "12-08-2026",
    compra: 3.36,
    venta: 3.37,
    paralelo: 3.31,
  },
  {
    id: 6,
    fecha: "11-08-2026",
    compra: 3.37,
    venta: 3.39,
    paralelo: 3.32,
  },
  {
    id: 7,
    fecha: "10-08-2026",
    compra: 3.37,
    venta: 3.39,
    paralelo: 3.32,
  },
  {
    id: 8,
    fecha: "08-08-2026",
    compra: 3.37,
    venta: 3.39,
    paralelo: 3.34,
  },
];

export const initialTipoCambioStats: TipoCambioStats = {
  minimo: {
    fecha: "17-02-2026",
    valor: 3.29,
  },
  maximo: {
    fecha: "04-05-2026",
    valor: 12311.95,
  },
};

export const initialChartData: TipoCambioChartPoint[] = [
  { date: "2026-08-05", valor: 3.34 },
  { date: "2026-08-10", valor: 3.33 },
  { date: "2026-08-11", valor: 3.33 },
  { date: "2026-08-12", valor: 3.315 },
  { date: "2026-08-15", valor: 3.315 },
  { date: "2026-08-17", valor: 3.315 },
  { date: "2026-08-18", valor: 3.315 },
  { date: "2026-08-24", valor: 3.29 },
];
