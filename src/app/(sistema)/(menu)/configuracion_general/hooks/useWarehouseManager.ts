"use client";

import { useCallback, useReducer } from "react";

import { warehouseResponsibleOptions } from "../data/warehouses";
import type { WarehouseFormValues } from "../schemas/warehouse.schema";
import {
  createInitialWarehouseState,
  warehouseManagerReducer,
} from "../state/warehouse-reducer";
import type { Warehouse } from "../types/warehouse";

export function useWarehouseManager() {
  const [state, dispatch] = useReducer(
    warehouseManagerReducer,
    undefined,
    createInitialWarehouseState,
  );

  const openModal = useCallback(() => {
    dispatch({ type: "OPEN_MODAL" });
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    dispatch({ type: "SET_OPEN", open });
  }, []);

  const openCreate = useCallback(() => {
    dispatch({
      type: "OPEN_FORM",
      mode: "create",
      warehouse: undefined,
    });
  }, []);

  const openEdit = useCallback((warehouse: Warehouse) => {
    dispatch({
      type: "OPEN_FORM",
      mode: "edit",
      warehouse,
    });
  }, []);

  const openView = useCallback((warehouse: Warehouse) => {
    dispatch({
      type: "OPEN_FORM",
      mode: "view",
      warehouse,
    });
  }, []);

  const goToList = useCallback(() => {
    dispatch({ type: "GO_TO_LIST" });
  }, []);

  const setActiveTab = useCallback((tab: string) => {
    dispatch({ type: "SET_TAB", tab });
  }, []);

  const saveWarehouse = useCallback((values: WarehouseFormValues) => {
    const responsable =
      warehouseResponsibleOptions.find(
        ({ value }) => value === values.responsableId,
      )?.label ?? "";

    dispatch({
      type: "SAVE_WAREHOUSE",
      data: values,
      responsable,
    });
  }, []);

  const toggleWarehouseStatus = useCallback((warehouseId: number) => {
    dispatch({ type: "TOGGLE_STATUS", warehouseId });
  }, []);

  return {
    isOpen: state.isOpen,
    view: state.view,
    mode: state.mode,
    activeTab: state.activeTab,
    warehouses: state.warehouses,
    selectedWarehouse: state.selectedWarehouse,
    openModal,
    handleOpenChange,
    openCreate,
    openEdit,
    openView,
    goToList,
    setActiveTab,
    saveWarehouse,
    toggleWarehouseStatus,
  };
}

export type WarehouseManager = ReturnType<typeof useWarehouseManager>;
