"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  createInitialMarcaState,
  marcaReducer,
} from "../state/marca-reducer";
import type { MarcaFormValues } from "../types/marca";

export function useMarcaManager() {
  const [state, dispatch] = useReducer(
    marcaReducer,
    undefined,
    createInitialMarcaState,
  );

  const filteredMarcas = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.marcas;

    return state.marcas.filter((marca) =>
      [
        marca.nombre,
        marca.abreviatura ?? "",
        marca.telefono ?? "",
        marca.empresa ?? "",
        marca.descripcion ?? "",
      ].some((value) => value.toLocaleLowerCase("es").includes(query)),
    );
  }, [state.search, state.marcas]);

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const saveMarca = useCallback((data: MarcaFormValues) => {
    dispatch({ type: "SAVE", data });
  }, []);

  const editMarca = useCallback((id: number) => {
    dispatch({ type: "EDIT", id });
  }, []);

  const clearForm = useCallback(() => {
    dispatch({ type: "CLEAR_FORM" });
  }, []);

  const toggleStatus = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_STATUS", id });
  }, []);

  const viewPhoto = useCallback((nombre: string, foto: string) => {
    dispatch({ type: "VIEW_PHOTO", nombre, foto });
  }, []);

  const closePhoto = useCallback(() => {
    dispatch({ type: "CLOSE_PHOTO" });
  }, []);

  return {
    isOpen: state.isOpen,
    search: state.search,
    filteredMarcas,
    editingMarca: state.editingMarca,
    viewingPhoto: state.viewingPhoto,
    openModal,
    handleOpenChange,
    setSearch,
    saveMarca,
    editMarca,
    clearForm,
    toggleStatus,
    viewPhoto,
    closePhoto,
  };
}

export type MarcaManager = ReturnType<typeof useMarcaManager>;
