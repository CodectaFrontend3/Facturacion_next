import {
  initialChartData,
  initialTipoCambios,
  initialTipoCambioStats,
} from "../data/tipo-cambio";
import type {
  TipoCambio,
  TipoCambioChartPoint,
  TipoCambioFormValues,
  TipoCambioStats,
} from "../types/tipo-cambio";

export interface TipoCambioState {
  isOpen: boolean;
  records: TipoCambio[];
  chartData: TipoCambioChartPoint[];
  stats: TipoCambioStats;
  fechaDesde: string;
  fechaHasta: string;
  search: string;
  editingRecord?: TipoCambio;
}

export type TipoCambioAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_FILTER_VALUE"; name: string; value: string }
  | { type: "SET_SEARCH"; search: string }
  | { type: "EDIT_RECORD"; id: number }
  | { type: "SAVE_RECORD"; id: number; data: TipoCambioFormValues }
  | { type: "CLEAR_EDIT" };

export function createInitialTipoCambioState(): TipoCambioState {
  return {
    isOpen: false,
    records: initialTipoCambios,
    chartData: initialChartData,
    stats: initialTipoCambioStats,
    fechaDesde: "01/08/2026",
    fechaHasta: "31/08/2026",
    search: "",
    editingRecord: undefined,
  };
}

export function tipoCambioReducer(
  state: TipoCambioState,
  action: TipoCambioAction,
): TipoCambioState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        editingRecord: undefined,
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : {
            ...state,
            isOpen: false,
            editingRecord: undefined,
          };

    case "SET_FILTER_VALUE":
      if (action.name === "fechaDesde") {
        return { ...state, fechaDesde: action.value };
      }
      if (action.name === "fechaHasta") {
        return { ...state, fechaHasta: action.value };
      }
      return state;

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "EDIT_RECORD":
      return {
        ...state,
        editingRecord: state.records.find((r) => r.id === action.id),
      };

    case "SAVE_RECORD": {
      const updatedRecords = state.records.map((r) =>
        r.id === action.id
          ? {
              ...r,
              compra: Number(action.data.compra),
              venta: Number(action.data.venta),
              paralelo: Number(action.data.paralelo),
            }
          : r,
      );

      return {
        ...state,
        records: updatedRecords,
        editingRecord: undefined,
      };
    }

    case "CLEAR_EDIT":
      return { ...state, editingRecord: undefined };

    default:
      return state;
  }
}
