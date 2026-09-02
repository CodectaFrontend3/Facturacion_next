"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  createInitialFamiliaState,
  familiaReducer,
} from "../state/familia-reducer";
import type { FamiliaFormValues } from "../types/familia";

export function useFamiliaManager() {
  const [state, dispatch] = useReducer(
    familiaReducer,
    undefined,
    createInitialFamiliaState,
  );

  const filteredFamilias = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.familias;

    return state.familias.filter((item) =>
      [item.codigo, item.descripcion, item.ubicacion].some((val) =>
        val.toLocaleLowerCase("es").includes(query),
      ),
    );
  }, [state.search, state.familias]);

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const saveFamilia = useCallback((data: FamiliaFormValues) => {
    dispatch({ type: "SAVE", data });
  }, []);

  const editFamilia = useCallback((id: number) => {
    dispatch({ type: "EDIT", id });
  }, []);

  const clearForm = useCallback(() => {
    dispatch({ type: "CLEAR_FORM" });
  }, []);

  const toggleStatus = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_STATUS", id });
  }, []);

  return {
    isOpen: state.isOpen,
    search: state.search,
    filteredFamilias,
    editingFamilia: state.editingFamilia,
    openModal,
    handleOpenChange,
    setSearch,
    saveFamilia,
    editFamilia,
    clearForm,
    toggleStatus,
  };
}

export type FamiliaManager = ReturnType<typeof useFamiliaManager>;
