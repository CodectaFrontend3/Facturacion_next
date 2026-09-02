import { initialGarantias } from "../data/garantia";
import type { Garantia, GarantiaFormValues } from "../types/garantia";

export interface GarantiaManagerState {
  isOpen: boolean;
  search: string;
  garantias: Garantia[];
  editingGarantia?: Garantia;
}

export type GarantiaManagerAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SAVE_GARANTIA"; data: GarantiaFormValues }
  | { type: "TOGGLE_STATUS"; id: number }
  | { type: "EDIT_GARANTIA"; id: number }
  | { type: "CLEAR_FORM" };

export function createInitialGarantiaState(): GarantiaManagerState {
  return {
    isOpen: false,
    search: "",
    garantias: initialGarantias,
    editingGarantia: undefined,
  };
}

export function garantiaManagerReducer(
  state: GarantiaManagerState,
  action: GarantiaManagerAction,
): GarantiaManagerState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        search: "",
        editingGarantia: undefined,
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : {
            ...state,
            isOpen: false,
            search: "",
            editingGarantia: undefined,
          };

    case "SET_SEARCH":
      return {
        ...state,
        search: action.search,
      };

    case "SAVE_GARANTIA": {
      if (state.editingGarantia) {
        return {
          ...state,
          garantias: state.garantias.map((item) =>
            item.id === state.editingGarantia?.id
              ? { ...item, ...action.data }
              : item,
          ),
          editingGarantia: undefined,
        };
      }

      const nextId =
        Math.max(0, ...state.garantias.map(({ id }) => id)) + 1;

      return {
        ...state,
        garantias: [
          ...state.garantias,
          {
            id: nextId,
            descripcion: action.data.descripcion,
            activo: true,
          },
        ],
      };
    }

    case "TOGGLE_STATUS":
      return {
        ...state,
        garantias: state.garantias.map((item) =>
          item.id === action.id ? { ...item, activo: !item.activo } : item,
        ),
      };

    case "EDIT_GARANTIA":
      return {
        ...state,
        editingGarantia: state.garantias.find((item) => item.id === action.id),
      };

    case "CLEAR_FORM":
      return {
        ...state,
        editingGarantia: undefined,
      };

    default:
      return state;
  }
}
