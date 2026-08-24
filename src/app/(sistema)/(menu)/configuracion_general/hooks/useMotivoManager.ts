"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  createInitialMotivoState,
  motivoReducer,
} from "../state/motivo-reducer";
import type { MotivoFormValues } from "../types/motivo";

export function useMotivoManager() {
  const [state, dispatch] = useReducer(
    motivoReducer,
    undefined,
    createInitialMotivoState,
  );

  const filteredMotivos = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.motivos;

    return state.motivos.filter((motivo) =>
      [motivo.nombre, motivo.tipo].some((value) =>
        value.toLocaleLowerCase("es").includes(query),
      ),
    );
  }, [state.search, state.motivos]);

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const saveMotivo = useCallback((data: MotivoFormValues) => {
    dispatch({ type: "SAVE", data });
  }, []);

  const editMotivo = useCallback((id: number) => {
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
    filteredMotivos,
    editingMotivo: state.editingMotivo,
    openModal,
    handleOpenChange,
    setSearch,
    saveMotivo,
    editMotivo,
    clearForm,
    toggleStatus,
  };
}

export type MotivoManager = ReturnType<typeof useMotivoManager>;
