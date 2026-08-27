"use client";

import { useCallback, useMemo, useReducer } from "react";

import { createInitialRolState, rolReducer } from "../state/rol-reducer";
import type { Rol, RolFormValues } from "../types/usuario";

export function useRolManager(searchQuery: string = "", selectedRole: string = "todos") {
  const [state, dispatch] = useReducer(
    rolReducer,
    undefined,
    createInitialRolState,
  );

  const filteredRoles = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase("es");

    return state.roles.filter((rol) => {
      if (selectedRole !== "todos" && rol.nombre !== selectedRole) {
        return false;
      }

      if (query) {
        return (
          rol.nombre.toLocaleLowerCase("es").includes(query) ||
          rol.descripcion.toLocaleLowerCase("es").includes(query)
        );
      }

      return true;
    });
  }, [state.roles, searchQuery, selectedRole]);

  const openNewModal = useCallback(() => {
    dispatch({ type: "OPEN_NEW_MODAL" });
  }, []);

  const openEditModal = useCallback((rol: Rol) => {
    dispatch({ type: "OPEN_EDIT_MODAL", rol });
  }, []);

  const openViewModal = useCallback((rol: Rol) => {
    dispatch({ type: "OPEN_VIEW_MODAL", rol });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const saveRol = useCallback((data: RolFormValues) => {
    dispatch({ type: "SAVE_ROL", data });
  }, []);

  const toggleStatus = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_STATUS", id });
  }, []);

  return {
    roles: state.roles,
    filteredRoles,
    isModalOpen: state.isModalOpen,
    editingRol: state.editingRol,
    viewingRol: state.viewingRol,
    openNewModal,
    openEditModal,
    openViewModal,
    closeModal,
    saveRol,
    toggleStatus,
  };
}

export type RolManager = ReturnType<typeof useRolManager>;
