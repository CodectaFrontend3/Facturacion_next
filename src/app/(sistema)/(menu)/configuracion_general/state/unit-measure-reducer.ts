import { initialUnitMeasures } from "../data/unit-measures";
import type { UnitMeasure, UnitMeasureFormValues } from "../types/unit-measure";

export interface UnitMeasureState {
  isOpen: boolean;
  units: UnitMeasure[];
  search: string;
  editingUnit?: UnitMeasure;
}

export type UnitMeasureAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "SET_SEARCH"; search: string }
  | { type: "SAVE"; data: UnitMeasureFormValues }
  | { type: "EDIT"; id: number }
  | { type: "CLEAR_FORM" }
  | { type: "TOGGLE_STATUS"; id: number };

export function createInitialUnitMeasureState(): UnitMeasureState {
  return {
    isOpen: false,
    units: initialUnitMeasures,
    search: "",
    editingUnit: undefined,
  };
}

export function unitMeasureReducer(
  state: UnitMeasureState,
  action: UnitMeasureAction,
): UnitMeasureState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        search: "",
        editingUnit: undefined,
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : {
            ...state,
            isOpen: false,
            search: "",
            editingUnit: undefined,
          };

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "SAVE": {
      const data = {
        ...action.data,
        simbolo: action.data.simbolo.toUpperCase(),
      };
      if (state.editingUnit) {
        return {
          ...state,
          units: state.units.map((unit) =>
            unit.id === state.editingUnit?.id ? { ...unit, ...data } : unit,
          ),
          editingUnit: undefined,
        };
      }
      return {
        ...state,
        units: [
          ...state.units,
          {
            id: Math.max(0, ...state.units.map(({ id }) => id)) + 1,
            ...data,
            activo: true,
          },
        ],
      };
    }

    case "EDIT":
      return {
        ...state,
        editingUnit: state.units.find((unit) => unit.id === action.id),
      };

    case "CLEAR_FORM":
      return { ...state, editingUnit: undefined };

    case "TOGGLE_STATUS":
      return {
        ...state,
        units: state.units.map((unit) =>
          unit.id === action.id ? { ...unit, activo: !unit.activo } : unit,
        ),
      };

    default:
      return state;
  }
}
