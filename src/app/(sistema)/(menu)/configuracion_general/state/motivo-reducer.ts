import { initialMotivos } from "../data/motivos";
import type { Motivo, MotivoFormValues } from "../types/motivo";

export interface MotivoState {
  isOpen: boolean;
  motivos: Motivo[];
  search: string;
  editingMotivo?: Motivo;
}

export type MotivoAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SAVE"; data: MotivoFormValues }
  | { type: "EDIT"; id: number }
  | { type: "CLEAR_FORM" }
  | { type: "TOGGLE_STATUS"; id: number };

export function createInitialMotivoState(): MotivoState {
  return {
    isOpen: false,
    motivos: initialMotivos,
    search: "",
    editingMotivo: undefined,
  };
}

export function motivoReducer(
  state: MotivoState,
  action: MotivoAction,
): MotivoState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        search: "",
        editingMotivo: undefined,
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : {
            ...state,
            isOpen: false,
            search: "",
            editingMotivo: undefined,
          };

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "SAVE": {
      const data = {
        nombre: action.data.nombre.trim(),
        tipo: action.data.tipo.trim(),
      };

      if (state.editingMotivo) {
        return {
          ...state,
          motivos: state.motivos.map((motivo) =>
            motivo.id === state.editingMotivo?.id
              ? { ...motivo, ...data }
              : motivo,
          ),
          editingMotivo: undefined,
        };
      }

      const nextId =
        Math.max(0, ...state.motivos.map(({ id }) => id)) + 1;

      return {
        ...state,
        motivos: [
          ...state.motivos,
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
        editingMotivo: state.motivos.find((motivo) => motivo.id === action.id),
      };

    case "CLEAR_FORM":
      return { ...state, editingMotivo: undefined };

    case "TOGGLE_STATUS":
      return {
        ...state,
        motivos: state.motivos.map((motivo) =>
          motivo.id === action.id ? { ...motivo, activo: !motivo.activo } : motivo,
        ),
      };

    default:
      return state;
  }
}
