import { initialMarcas } from "../data/marcas";
import type { Marca, MarcaFormValues } from "../types/marca";

export interface MarcaState {
  isOpen: boolean;
  marcas: Marca[];
  search: string;
  editingMarca?: Marca;
  viewingPhoto?: {
    nombre: string;
    foto: string;
  };
}

export type MarcaAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SAVE"; data: MarcaFormValues }
  | { type: "EDIT"; id: number }
  | { type: "CLEAR_FORM" }
  | { type: "TOGGLE_STATUS"; id: number }
  | { type: "VIEW_PHOTO"; nombre: string; foto: string }
  | { type: "CLOSE_PHOTO" };

export function createInitialMarcaState(): MarcaState {
  return {
    isOpen: false,
    marcas: initialMarcas,
    search: "",
    editingMarca: undefined,
    viewingPhoto: undefined,
  };
}

export function marcaReducer(
  state: MarcaState,
  action: MarcaAction,
): MarcaState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        search: "",
        editingMarca: undefined,
        viewingPhoto: undefined,
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : {
            ...state,
            isOpen: false,
            search: "",
            editingMarca: undefined,
            viewingPhoto: undefined,
          };

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "SAVE": {
      const data = {
        ...action.data,
        nombre: action.data.nombre.trim(),
        abreviatura: action.data.abreviatura?.trim() || "",
        telefono: action.data.telefono?.trim() || "",
        empresa: action.data.empresa?.trim() || "",
        descripcion: action.data.descripcion?.trim() || "Sin descripcion",
        foto: action.data.foto?.trim() || "",
      };

      if (state.editingMarca) {
        return {
          ...state,
          marcas: state.marcas.map((marca) =>
            marca.id === state.editingMarca?.id ? { ...marca, ...data } : marca,
          ),
          editingMarca: undefined,
        };
      }

      const nextId =
        Math.max(0, ...state.marcas.map(({ id }) => id)) + 1;

      return {
        ...state,
        marcas: [
          ...state.marcas,
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
        editingMarca: state.marcas.find((marca) => marca.id === action.id),
      };

    case "CLEAR_FORM":
      return { ...state, editingMarca: undefined };

    case "TOGGLE_STATUS":
      return {
        ...state,
        marcas: state.marcas.map((marca) =>
          marca.id === action.id ? { ...marca, activo: !marca.activo } : marca,
        ),
      };

    case "VIEW_PHOTO":
      return {
        ...state,
        viewingPhoto: {
          nombre: action.nombre,
          foto: action.foto,
        },
      };

    case "CLOSE_PHOTO":
      return {
        ...state,
        viewingPhoto: undefined,
      };

    default:
      return state;
  }
}
