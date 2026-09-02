"use client";

import { useCallback, useMemo, useReducer } from "react";

import {
  createInitialUsuarioState,
  usuarioReducer,
} from "../state/usuario-reducer";
import type {
  ActiveTab,
  ChangePasswordFormValues,
  Usuario,
  UsuarioFilterState,
  UsuarioFormValues,
} from "../types/usuario";

export function useUsuarioManager() {
  const [state, dispatch] = useReducer(
    usuarioReducer,
    undefined,
    createInitialUsuarioState,
  );

  const filteredUsuarios = useMemo(() => {
    const { search, rol } = state.appliedFilters;
    const query = search.trim().toLocaleLowerCase("es");

    return state.usuarios.filter((user) => {
      // Filter by role
      if (rol !== "todos" && user.rol !== rol) {
        return false;
      }

      // Filter by search query across multiple fields
      if (query) {
        const matchesQuery = [
          user.nombresApellidos,
          user.dni,
          user.correo,
          user.celular,
          user.almacen,
          user.rol,
        ].some((val) => val.toLocaleLowerCase("es").includes(query));

        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [state.usuarios, state.appliedFilters]);

  const setActiveTab = useCallback((tab: ActiveTab) => {
    dispatch({ type: "SET_ACTIVE_TAB", tab });
  }, []);

  const setFilter = useCallback((field: string, value: string) => {
    dispatch({
      type: "SET_FILTER",
      field: field as keyof UsuarioFilterState,
      value,
    });
  }, []);

  const applyFilters = useCallback(() => {
    dispatch({ type: "APPLY_FILTERS" });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const openNewModal = useCallback(() => {
    dispatch({ type: "OPEN_NEW_MODAL" });
  }, []);

  const openEditModal = useCallback((usuario: Usuario) => {
    dispatch({ type: "OPEN_EDIT_MODAL", usuario });
  }, []);

  const openViewModal = useCallback((usuario: Usuario) => {
    dispatch({ type: "OPEN_VIEW_MODAL", usuario });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  const saveUsuario = useCallback((data: UsuarioFormValues) => {
    dispatch({ type: "SAVE_USUARIO", data });
  }, []);

  const toggleStatus = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_STATUS", id });
  }, []);

  const openPasswordModal = useCallback((usuario: Usuario) => {
    dispatch({ type: "OPEN_PASSWORD_MODAL", usuario });
  }, []);

  const closePasswordModal = useCallback(() => {
    dispatch({ type: "CLOSE_PASSWORD_MODAL" });
  }, []);

  const changePassword = useCallback(
    (userId: string, data: ChangePasswordFormValues) => {
      dispatch({
        type: "CHANGE_PASSWORD",
        userId,
        password: data.password,
        sendEmail: data.sendEmail,
      });
    },
    [],
  );

  return {
    activeTab: state.activeTab,
    usuarios: state.usuarios,
    filteredUsuarios,
    filters: state.filters,
    isModalOpen: state.isModalOpen,
    editingUsuario: state.editingUsuario,
    viewingUsuario: state.viewingUsuario,
    isPasswordModalOpen: state.isPasswordModalOpen,
    passwordUsuario: state.passwordUsuario,
    setActiveTab,
    setFilter,
    applyFilters,
    resetFilters,
    openNewModal,
    openEditModal,
    openViewModal,
    closeModal,
    saveUsuario,
    toggleStatus,
    openPasswordModal,
    closePasswordModal,
    changePassword,
  };
}

export type UsuarioManager = ReturnType<typeof useUsuarioManager>;
