import { initialFamilias } from "@/app/(sistema)/(menu)/configuracion_general/data/familias";
import type {
  Familia,
  Subfamilia,
} from "@/app/(sistema)/(menu)/configuracion_general/types/familia";
import type {
  FamiliaDetailAction,
  FamiliaDetailState,
} from "../types/familia-detail";

export function createInitialFamiliaDetailState(id: number): FamiliaDetailState {
  const found =
    initialFamilias.find((f: Familia) => f.id === id) || initialFamilias[0];

  return {
    familia: found,
    isEditingFamilia: false,
    editingFamiliaForm: {
      descripcion: found.descripcion,
      ubicacion: found.ubicacion,
      activo: found.activo,
    },
    isAddSubfamiliaOpen: false,
    editingSubfamiliaId: undefined,
    editingSubfamiliaForm: undefined,
    search: "",
    pageSize: 25,
  };
}

export function familiaDetailReducer(
  state: FamiliaDetailState,
  action: FamiliaDetailAction,
): FamiliaDetailState {
  switch (action.type) {
    case "START_EDIT_FAMILIA":
      return {
        ...state,
        isEditingFamilia: true,
        editingFamiliaForm: {
          descripcion: state.familia.descripcion,
          ubicacion: state.familia.ubicacion,
          activo: state.familia.activo,
        },
      };

    case "CANCEL_EDIT_FAMILIA":
      return {
        ...state,
        isEditingFamilia: false,
      };

    case "SET_FAMILIA_FORM":
      return {
        ...state,
        editingFamiliaForm: {
          ...state.editingFamiliaForm,
          [action.field]: action.value,
        },
      };

    case "SAVE_FAMILIA":
      return {
        ...state,
        isEditingFamilia: false,
        familia: {
          ...state.familia,
          descripcion: state.editingFamiliaForm.descripcion.trim(),
          ubicacion: state.editingFamiliaForm.ubicacion.trim(),
          activo: state.editingFamiliaForm.activo,
        },
      };

    case "TOGGLE_FAMILIA_STATUS": {
      const nextActivo = !state.familia.activo;
      return {
        ...state,
        familia: {
          ...state.familia,
          activo: nextActivo,
        },
        editingFamiliaForm: {
          ...state.editingFamiliaForm,
          activo: nextActivo,
        },
      };
    }

    case "OPEN_ADD_SUBFAMILIA":
      return { ...state, isAddSubfamiliaOpen: true };

    case "CLOSE_ADD_SUBFAMILIA":
      return { ...state, isAddSubfamiliaOpen: false };

    case "ADD_SUBFAMILIA": {
      const nextId =
        Math.max(0, ...state.familia.subfamilias.map((s: Subfamilia) => s.id)) + 1;
      const nextUbicacion = `${state.familia.ubicacion}${nextId}`;
      const newSubfamilia: Subfamilia = {
        id: nextId,
        descripcion: action.descripcion.trim().toUpperCase(),
        ubicacion: nextUbicacion,
        activo: true,
      };

      const updatedSubfamilias = [...state.familia.subfamilias, newSubfamilia];

      return {
        ...state,
        isAddSubfamiliaOpen: false,
        familia: {
          ...state.familia,
          subfamiliasCount: updatedSubfamilias.length,
          subfamilias: updatedSubfamilias,
        },
      };
    }

    case "START_EDIT_SUBFAMILIA":
      return {
        ...state,
        editingSubfamiliaId: action.subfamilia.id,
        editingSubfamiliaForm: {
          descripcion: action.subfamilia.descripcion,
          ubicacion: action.subfamilia.ubicacion,
        },
      };

    case "CANCEL_EDIT_SUBFAMILIA":
      return {
        ...state,
        editingSubfamiliaId: undefined,
        editingSubfamiliaForm: undefined,
      };

    case "SET_EDIT_SUBFAMILIA_DESC":
      return {
        ...state,
        editingSubfamiliaForm: state.editingSubfamiliaForm
          ? {
              ...state.editingSubfamiliaForm,
              descripcion: action.descripcion,
            }
          : undefined,
      };

    case "SAVE_EDIT_SUBFAMILIA": {
      if (!state.editingSubfamiliaId || !state.editingSubfamiliaForm) {
        return state;
      }

      const updatedSubfamilias = state.familia.subfamilias.map((item: Subfamilia) =>
        item.id === state.editingSubfamiliaId
          ? {
              ...item,
              descripcion: state.editingSubfamiliaForm!.descripcion.trim().toUpperCase(),
            }
          : item,
      );

      return {
        ...state,
        editingSubfamiliaId: undefined,
        editingSubfamiliaForm: undefined,
        familia: {
          ...state.familia,
          subfamilias: updatedSubfamilias,
        },
      };
    }

    case "TOGGLE_SUBFAMILIA_STATUS": {
      const updatedSubfamilias = state.familia.subfamilias.map((item: Subfamilia) =>
        item.id === action.id ? { ...item, activo: !item.activo } : item,
      );

      return {
        ...state,
        familia: {
          ...state.familia,
          subfamilias: updatedSubfamilias,
        },
      };
    }

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.pageSize };

    default:
      return state;
  }
}
