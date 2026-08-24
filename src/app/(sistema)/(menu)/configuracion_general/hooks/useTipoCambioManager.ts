"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  createInitialTipoCambioState,
  tipoCambioReducer,
} from "../state/tipo-cambio-reducer";
import type { TipoCambioFormValues } from "../types/tipo-cambio";

export function useTipoCambioManager() {
  const [state, dispatch] = useReducer(
    tipoCambioReducer,
    undefined,
    createInitialTipoCambioState,
  );

  const filteredRecords = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.records;

    return state.records.filter((item) =>
      [
        item.fecha,
        String(item.compra),
        String(item.venta),
        String(item.paralelo),
      ].some((val) => val.toLocaleLowerCase("es").includes(query)),
    );
  }, [state.search, state.records]);

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const setFilterValue = useCallback((name: string, value: string) => {
    dispatch({ type: "SET_FILTER_VALUE", name, value });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const editRecord = useCallback((id: number) => {
    dispatch({ type: "EDIT_RECORD", id });
  }, []);

  const saveRecord = useCallback((id: number, data: TipoCambioFormValues) => {
    dispatch({ type: "SAVE_RECORD", id, data });
  }, []);

  const clearEdit = useCallback(() => {
    dispatch({ type: "CLEAR_EDIT" });
  }, []);

  return {
    isOpen: state.isOpen,
    records: state.records,
    filteredRecords,
    chartData: state.chartData,
    stats: state.stats,
    fechaDesde: state.fechaDesde,
    fechaHasta: state.fechaHasta,
    search: state.search,
    editingRecord: state.editingRecord,
    openModal,
    handleOpenChange,
    setFilterValue,
    setSearch,
    editRecord,
    saveRecord,
    clearEdit,
  };
}

export type TipoCambioManager = ReturnType<typeof useTipoCambioManager>;
