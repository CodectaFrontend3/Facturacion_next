import { initialRoles } from "../data/roles";
import type { Rol, RolFormValues } from "../types/usuario";

export interface RolState {
  roles: Rol[];
  isModalOpen: boolean;
  editingRol?: Rol;
  viewingRol?: Rol;
}

export type RolAction =
  | { type: "OPEN_NEW_MODAL" }
  | { type: "OPEN_EDIT_MODAL"; rol: Rol }
  | { type: "OPEN_VIEW_MODAL"; rol: Rol }
  | { type: "CLOSE_MODAL" }
  | { type: "SAVE_ROL"; data: RolFormValues }
  | { type: "TOGGLE_STATUS"; id: string };

export function createInitialRolState(): RolState {
  return {
    roles: initialRoles,
    isModalOpen: false,
    editingRol: undefined,
    viewingRol: undefined,
  };
}

export function rolReducer(state: RolState, action: RolAction): RolState {
  switch (action.type) {
    case "OPEN_NEW_MODAL":
      return {
        ...state,
        isModalOpen: true,
        editingRol: undefined,
        viewingRol: undefined,
      };

    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        isModalOpen: true,
        editingRol: action.rol,
        viewingRol: undefined,
      };

    case "OPEN_VIEW_MODAL":
      return {
        ...state,
        isModalOpen: true,
        viewingRol: action.rol,
        editingRol: undefined,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        editingRol: undefined,
        viewingRol: undefined,
      };

    case "SAVE_ROL": {
      if (state.editingRol) {
        return {
          ...state,
          isModalOpen: false,
          editingRol: undefined,
          roles: state.roles.map((r) =>
            r.id === state.editingRol?.id
              ? {
                  ...r,
                  nombre: action.data.nombre.trim(),
                  descripcion: action.data.descripcion.trim(),
                }
              : r,
          ),
        };
      }

      const newId = String(Date.now());
      const newRol: Rol = {
        id: newId,
        nombre: action.data.nombre.trim(),
        descripcion: action.data.descripcion.trim(),
        usuariosAsignados: 0,
        activo: true,
      };

      return {
        ...state,
        isModalOpen: false,
        roles: [...state.roles, newRol],
      };
    }

    case "TOGGLE_STATUS":
      return {
        ...state,
        roles: state.roles.map((r) =>
          r.id === action.id ? { ...r, activo: !r.activo } : r,
        ),
      };

    default:
      return state;
  }
}
