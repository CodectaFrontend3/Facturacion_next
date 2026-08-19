"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  createInitialGarantiaState,
  garantiaManagerReducer,
} from "../state/garantia-reducer";
import type { Garantia, GarantiaFormValues } from "../types/garantia";

export function useGarantiaManager() {
  const [state, dispatch] = useReducer(
    garantiaManagerReducer,
    undefined,
    createInitialGarantiaState,
  );

  const filteredGarantias = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.garantias;

    return state.garantias.filter((item) =>
      item.descripcion.toLocaleLowerCase("es").includes(query),
    );
  }, [state.search, state.garantias]);

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const saveGarantia = useCallback((data: GarantiaFormValues) => {
    dispatch({ type: "SAVE_GARANTIA", data });
  }, []);

  const toggleGarantiaStatus = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_STATUS", id });
  }, []);

  const editGarantia = useCallback((id: number) => {
    dispatch({ type: "EDIT_GARANTIA", id });
  }, []);

  const clearForm = useCallback(() => {
    dispatch({ type: "CLEAR_FORM" });
  }, []);

  return {
    isOpen: state.isOpen,
    search: state.search,
    filteredGarantias,
    editingGarantia: state.editingGarantia,
    openModal,
    handleOpenChange,
    setSearch,
    saveGarantia,
    toggleGarantiaStatus,
    editGarantia,
    clearForm,
  };
}

export type GarantiaManager = ReturnType<typeof useGarantiaManager>;
