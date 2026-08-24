import type {
  Familia,
  Subfamilia,
} from "@/app/(sistema)/(menu)/configuracion_general/types/familia";

export interface FamiliaDetailState {
  familia: Familia;
  isEditingFamilia: boolean;
  editingFamiliaForm: {
    descripcion: string;
    ubicacion: string;
    activo: boolean;
  };
  isAddSubfamiliaOpen: boolean;
  editingSubfamiliaId?: number;
  editingSubfamiliaForm?: {
    descripcion: string;
    ubicacion: string;
  };
  search: string;
  pageSize: number;
}

export type FamiliaDetailAction =
  | { type: "START_EDIT_FAMILIA" }
  | { type: "CANCEL_EDIT_FAMILIA" }
  | { type: "SET_FAMILIA_FORM"; field: string; value: string | boolean }
  | { type: "SAVE_FAMILIA" }
  | { type: "TOGGLE_FAMILIA_STATUS" }
  | { type: "OPEN_ADD_SUBFAMILIA" }
  | { type: "CLOSE_ADD_SUBFAMILIA" }
  | { type: "ADD_SUBFAMILIA"; descripcion: string }
  | { type: "START_EDIT_SUBFAMILIA"; subfamilia: Subfamilia }
  | { type: "CANCEL_EDIT_SUBFAMILIA" }
  | { type: "SET_EDIT_SUBFAMILIA_DESC"; descripcion: string }
  | { type: "SAVE_EDIT_SUBFAMILIA" }
  | { type: "TOGGLE_SUBFAMILIA_STATUS"; id: number }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SET_PAGE_SIZE"; pageSize: number };
