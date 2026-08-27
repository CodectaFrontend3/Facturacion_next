import { initialUsuarios } from "../data/usuarios";
import type {
  ActiveTab,
  Usuario,
  UsuarioFilterState,
  UsuarioFormValues,
} from "../types/usuario";

export interface UsuarioState {
  activeTab: ActiveTab;
  usuarios: Usuario[];
  filters: UsuarioFilterState;
  appliedFilters: UsuarioFilterState;
  isModalOpen: boolean;
  editingUsuario?: Usuario;
  viewingUsuario?: Usuario;
  isPasswordModalOpen: boolean;
  passwordUsuario?: Usuario;
}

export type UsuarioAction =
  | { type: "SET_ACTIVE_TAB"; tab: ActiveTab }
  | { type: "SET_FILTER"; field: keyof UsuarioFilterState; value: string }
  | { type: "APPLY_FILTERS" }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_NEW_MODAL" }
  | { type: "OPEN_EDIT_MODAL"; usuario: Usuario }
  | { type: "OPEN_VIEW_MODAL"; usuario: Usuario }
  | { type: "CLOSE_MODAL" }
  | { type: "SAVE_USUARIO"; data: UsuarioFormValues }
  | { type: "TOGGLE_STATUS"; id: string }
  | { type: "OPEN_PASSWORD_MODAL"; usuario: Usuario }
  | { type: "CLOSE_PASSWORD_MODAL" }
  | {
      type: "CHANGE_PASSWORD";
      userId: string;
      password: string;
      sendEmail: boolean;
    };

export function createInitialUsuarioState(): UsuarioState {
  const initialFilters: UsuarioFilterState = {
    fechaDesde: "01/08/2026",
    fechaHasta: "31/08/2026",
    search: "",
    rol: "todos",
  };

  return {
    activeTab: "usuarios",
    usuarios: initialUsuarios,
    filters: initialFilters,
    appliedFilters: initialFilters,
    isModalOpen: false,
    editingUsuario: undefined,
    viewingUsuario: undefined,
    isPasswordModalOpen: false,
    passwordUsuario: undefined,
  };
}

export function usuarioReducer(
  state: UsuarioState,
  action: UsuarioAction,
): UsuarioState {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.tab };

    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.field]: action.value,
        },
      };

    case "APPLY_FILTERS":
      return {
        ...state,
        appliedFilters: { ...state.filters },
      };

    case "RESET_FILTERS": {
      const resetFilters: UsuarioFilterState = {
        fechaDesde: "",
        fechaHasta: "",
        search: "",
        rol: "todos",
      };
      return {
        ...state,
        filters: resetFilters,
        appliedFilters: resetFilters,
      };
    }

    case "OPEN_NEW_MODAL":
      return {
        ...state,
        isModalOpen: true,
        editingUsuario: undefined,
        viewingUsuario: undefined,
      };

    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        isModalOpen: true,
        editingUsuario: action.usuario,
        viewingUsuario: undefined,
      };

    case "OPEN_VIEW_MODAL":
      return {
        ...state,
        isModalOpen: true,
        viewingUsuario: action.usuario,
        editingUsuario: undefined,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        editingUsuario: undefined,
        viewingUsuario: undefined,
      };

    case "SAVE_USUARIO": {
      if (state.editingUsuario) {
        return {
          ...state,
          isModalOpen: false,
          editingUsuario: undefined,
          usuarios: state.usuarios.map((u) =>
            u.id === state.editingUsuario?.id
              ? {
                  ...u,
                  ...action.data,
                }
              : u,
          ),
        };
      }

      const newId = String(Date.now());
      const newUsuario: Usuario = {
        id: newId,
        ...action.data,
        activo: true,
        fechaCreacion: new Date().toLocaleDateString("es-PE"),
      };

      return {
        ...state,
        isModalOpen: false,
        usuarios: [newUsuario, ...state.usuarios],
      };
    }

    case "TOGGLE_STATUS":
      return {
        ...state,
        usuarios: state.usuarios.map((u) =>
          u.id === action.id ? { ...u, activo: !u.activo } : u,
        ),
      };

    case "OPEN_PASSWORD_MODAL":
      return {
        ...state,
        isPasswordModalOpen: true,
        passwordUsuario: action.usuario,
      };

    case "CLOSE_PASSWORD_MODAL":
      return {
        ...state,
        isPasswordModalOpen: false,
        passwordUsuario: undefined,
      };

    case "CHANGE_PASSWORD":
      return {
        ...state,
        isPasswordModalOpen: false,
        passwordUsuario: undefined,
      };

    default:
      return state;
  }
}
