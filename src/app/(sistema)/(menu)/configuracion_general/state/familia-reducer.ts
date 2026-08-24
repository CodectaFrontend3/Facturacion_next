import { initialFamilias } from "../data/familias";
import type { Familia, FamiliaFormValues } from "../types/familia";

export interface FamiliaState {
  isOpen: boolean;
  familias: Familia[];
  search: string;
  editingFamilia?: Familia;
}

export type FamiliaAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SAVE"; data: FamiliaFormValues }
  | { type: "EDIT"; id: number }
  | { type: "CLEAR_FORM" }
  | { type: "TOGGLE_STATUS"; id: number };

export function createInitialFamiliaState(): FamiliaState {
  return {
    isOpen: false,
    familias: initialFamilias,
    search: "",
    editingFamilia: undefined,
  };
}

export function familiaReducer(
  state: FamiliaState,
  action: FamiliaAction,
): FamiliaState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        search: "",
        editingFamilia: undefined,
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : {
            ...state,
            isOpen: false,
            search: "",
            editingFamilia: undefined,
          };

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "SAVE": {
      const data = {
        descripcion: action.data.descripcion.trim(),
        ubicacion: action.data.ubicacion.trim(),
      };

      if (state.editingFamilia) {
        return {
          ...state,
          familias: state.familias.map((item) =>
            item.id === state.editingFamilia?.id
              ? { ...item, ...data }
              : item,
          ),
          editingFamilia: undefined,
        };
      }

      const nextId =
        Math.max(0, ...state.familias.map(({ id }) => id)) + 1;
      const codigo = String(nextId).padStart(3, "0");

      return {
        ...state,
        familias: [
          ...state.familias,
          {
            id: nextId,
            codigo,
            ...data,
            subfamiliasCount: 0,
            subfamilias: [],
            activo: true,
          },
        ],
      };
    }

    case "EDIT":
      return {
        ...state,
        editingFamilia: state.familias.find((item) => item.id === action.id),
      };

    case "CLEAR_FORM":
      return { ...state, editingFamilia: undefined };

    case "TOGGLE_STATUS":
      return {
        ...state,
        familias: state.familias.map((item) =>
          item.id === action.id ? { ...item, activo: !item.activo } : item,
        ),
      };

    default:
      return state;
  }
}
