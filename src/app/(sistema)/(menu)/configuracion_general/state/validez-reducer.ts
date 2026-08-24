import { initialValideces } from "../data/validez";
import type { Validez, ValidezFormValues } from "../types/validez";

export interface ValidezState {
  isOpen: boolean;
  valideces: Validez[];
  search: string;
  editingValidez?: Validez;
}

export type ValidezAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SAVE"; data: ValidezFormValues }
  | { type: "EDIT"; id: number }
  | { type: "CLEAR_FORM" }
  | { type: "TOGGLE_STATUS"; id: number };

export function createInitialValidezState(): ValidezState {
  return {
    isOpen: false,
    valideces: initialValideces,
    search: "",
    editingValidez: undefined,
  };
}

export function validezReducer(
  state: ValidezState,
  action: ValidezAction,
): ValidezState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        search: "",
        editingValidez: undefined,
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : {
            ...state,
            isOpen: false,
            search: "",
            editingValidez: undefined,
          };

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "SAVE": {
      const data = {
        descripcion: action.data.descripcion.trim(),
      };

      if (state.editingValidez) {
        return {
          ...state,
          valideces: state.valideces.map((item) =>
            item.id === state.editingValidez?.id
              ? { ...item, ...data }
              : item,
          ),
          editingValidez: undefined,
        };
      }

      const nextId =
        Math.max(0, ...state.valideces.map(({ id }) => id)) + 1;

      return {
        ...state,
        valideces: [
          ...state.valideces,
          {
            id: nextId,
            ...data,
            activo: true,
          },
        ],
      };
    }

    case "EDIT":
      return {
        ...state,
        editingValidez: state.valideces.find((item) => item.id === action.id),
      };

    case "CLEAR_FORM":
      return { ...state, editingValidez: undefined };

    case "TOGGLE_STATUS":
      return {
        ...state,
        valideces: state.valideces.map((item) =>
          item.id === action.id ? { ...item, activo: !item.activo } : item,
        ),
      };

    default:
      return state;
  }
}
