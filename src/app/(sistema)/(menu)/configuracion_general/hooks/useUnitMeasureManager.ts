"use client";

import { useCallback, useMemo, useReducer } from "react";

import { createInitialUnitMeasureState, unitMeasureReducer } from "../state/unit-measure-reducer";
import type { UnitMeasureFormValues } from "../types/unit-measure";

export function useUnitMeasureManager() {
  const [state, dispatch] = useReducer(
    unitMeasureReducer,
    undefined,
    createInitialUnitMeasureState,
  );

  const filteredUnits = useMemo(() => {
    const query = state.search.trim().toLocaleLowerCase("es");
    if (!query) return state.units;
    return state.units.filter((unit) =>
      [unit.simbolo, unit.medida, unit.unidad].some((value) =>
        value.toLocaleLowerCase("es").includes(query),
      ),
    );
  }, [state.search, state.units]);

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({ type: "SET_SEARCH", search });
  }, []);

  const saveUnit = useCallback((data: UnitMeasureFormValues) => {
    dispatch({ type: "SAVE", data });
  }, []);

  const editUnit = useCallback((id: number) => {
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
    filteredUnits,
    editingUnit: state.editingUnit,
    openModal,
    handleOpenChange,
    setSearch,
    saveUnit,
    editUnit,
    clearForm,
    toggleStatus,
  };
}

export type UnitMeasureManager = ReturnType<typeof useUnitMeasureManager>;
