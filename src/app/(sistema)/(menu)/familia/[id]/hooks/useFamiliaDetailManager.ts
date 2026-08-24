"use client";

import { useCallback, useMemo, useReducer } from "react";

import type { Subfamilia } from "@/app/(sistema)/(menu)/configuracion_general/types/familia";
import {
  createInitialFamiliaDetailState,
  familiaDetailReducer,
} from "../state/familia-detail-reducer";

export function useFamiliaDetailManager(familiaId: number) {
  const [state, dispatch] = useReducer(
    familiaDetailReducer,
    familiaId,
    createInitialFamiliaDetailState,
  );

  const filteredSubfamilias = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.familia.subfamilias;

    return state.familia.subfamilias.filter((item: Subfamilia) =>
      [item.descripcion, item.ubicacion].some((val) =>
        val.toLocaleLowerCase("es").includes(query),
      ),
    );
  }, [state.search, state.familia.subfamilias]);

  const startEditFamilia = useCallback(() => {
    dispatch({ type: "START_EDIT_FAMILIA" });
  }, []);

  const cancelEditFamilia = useCallback(() => {
    dispatch({ type: "CANCEL_EDIT_FAMILIA" });
  }, []);

  const setFamiliaForm = useCallback(
    (field: string, value: string | boolean) => {
      dispatch({ type: "SET_FAMILIA_FORM", field, value });
    },
    [],
  );

  const saveFamilia = useCallback(() => {
    dispatch({ type: "SAVE_FAMILIA" });
  }, []);

  const toggleFamiliaStatus = useCallback(() => {
    dispatch({ type: "TOGGLE_FAMILIA_STATUS" });
  }, []);

  const openAddSubfamilia = useCallback(() => {
    dispatch({ type: "OPEN_ADD_SUBFAMILIA" });
  }, []);

  const closeAddSubfamilia = useCallback(() => {
    dispatch({ type: "CLOSE_ADD_SUBFAMILIA" });
  }, []);

  const addSubfamilia = useCallback((descripcion: string) => {
    dispatch({ type: "ADD_SUBFAMILIA", descripcion });
  }, []);

  const startEditSubfamilia = useCallback((subfamilia: Subfamilia) => {
    dispatch({ type: "START_EDIT_SUBFAMILIA", subfamilia });
  }, []);

  const cancelEditSubfamilia = useCallback(() => {
    dispatch({ type: "CANCEL_EDIT_SUBFAMILIA" });
  }, []);

  const setEditSubfamiliaDesc = useCallback((descripcion: string) => {
    dispatch({ type: "SET_EDIT_SUBFAMILIA_DESC", descripcion });
  }, []);

  const saveEditSubfamilia = useCallback(() => {
    dispatch({ type: "SAVE_EDIT_SUBFAMILIA" });
  }, []);

  const toggleSubfamiliaStatus = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_SUBFAMILIA_STATUS", id });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    dispatch({ type: "SET_PAGE_SIZE", pageSize });
  }, []);

  return {
    familia: state.familia,
    isEditingFamilia: state.isEditingFamilia,
    editingFamiliaForm: state.editingFamiliaForm,
    isAddSubfamiliaOpen: state.isAddSubfamiliaOpen,
    editingSubfamiliaId: state.editingSubfamiliaId,
    editingSubfamiliaForm: state.editingSubfamiliaForm,
    search: state.search,
    pageSize: state.pageSize,
    filteredSubfamilias,
    startEditFamilia,
    cancelEditFamilia,
    setFamiliaForm,
    saveFamilia,
    toggleFamiliaStatus,
    openAddSubfamilia,
    closeAddSubfamilia,
    addSubfamilia,
    startEditSubfamilia,
    cancelEditSubfamilia,
    setEditSubfamiliaDesc,
    saveEditSubfamilia,
    toggleSubfamiliaStatus,
    setSearch,
    setPageSize,
  };
}

export type FamiliaDetailManager = ReturnType<typeof useFamiliaDetailManager>;
