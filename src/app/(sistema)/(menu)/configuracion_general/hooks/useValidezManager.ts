"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  createInitialValidezState,
  validezReducer,
} from "../state/validez-reducer";
import type { ValidezFormValues } from "../types/validez";

export function useValidezManager() {
  const [state, dispatch] = useReducer(
    validezReducer,
    undefined,
    createInitialValidezState,
  );

  const filteredValideces = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.valideces;

    return state.valideces.filter((item) =>
      item.descripcion.toLocaleLowerCase("es").includes(query),
    );
  }, [state.search, state.valideces]);

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const saveValidez = useCallback((data: ValidezFormValues) => {
    dispatch({ type: "SAVE", data });
  }, []);

  const editValidez = useCallback((id: number) => {
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
    filteredValideces,
    editingValidez: state.editingValidez,
    openModal,
    handleOpenChange,
    setSearch,
    saveValidez,
    editValidez,
    clearForm,
    toggleStatus,
  };
}

export type ValidezManager = ReturnType<typeof useValidezManager>;
