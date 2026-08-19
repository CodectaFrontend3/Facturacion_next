import { initialWarehouses } from "../data/warehouses";
import type {
  Warehouse,
  WarehouseFormMode,
  WarehouseFormValues,
  WarehouseModalView,
} from "../types/warehouse";

export interface WarehouseManagerState {
  isOpen: boolean;
  view: WarehouseModalView;
  mode: WarehouseFormMode;
  activeTab: string;
  warehouses: Warehouse[];
  selectedWarehouse?: Warehouse;
}

export type WarehouseManagerAction =
  | { type: "OPEN_MODAL" }
  | { type: "SET_OPEN"; open: boolean }
  | {
      type: "OPEN_FORM";
      mode: WarehouseFormMode;
      warehouse?: Warehouse;
    }
  | { type: "GO_TO_LIST" }
  | { type: "SET_TAB"; tab: string }
  | {
      type: "SAVE_WAREHOUSE";
      data: WarehouseFormValues;
      responsable: string;
    }
  | { type: "TOGGLE_STATUS"; warehouseId: number };

export function cloneSunatConfig(
  sunat: WarehouseFormValues["sunat"],
): WarehouseFormValues["sunat"] {
  return Object.fromEntries(
    Object.entries(sunat).map(([key, value]) => [key, { ...value }]),
  ) as WarehouseFormValues["sunat"];
}

export function warehouseToForm(warehouse: Warehouse): WarehouseFormValues {
  return {
    nombre: warehouse.nombre,
    abreviatura: warehouse.abreviatura,
    direccion: warehouse.direccion,
    responsableId: warehouse.responsableId,
    codigoUbigeo: warehouse.codigoUbigeo,
    descripcion: warehouse.descripcion,
    codigoSunat: warehouse.codigoSunat,
    sunat: cloneSunatConfig(warehouse.sunat),
  };
}

export function createInitialWarehouseState(): WarehouseManagerState {
  return {
    isOpen: false,
    view: "list",
    mode: "create",
    activeTab: "general",
    warehouses: initialWarehouses,
    selectedWarehouse: undefined,
  };
}

export function warehouseManagerReducer(
  state: WarehouseManagerState,
  action: WarehouseManagerAction,
): WarehouseManagerState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isOpen: true,
        view: "list",
      };

    case "SET_OPEN":
      return action.open
        ? { ...state, isOpen: true }
        : { ...state, isOpen: false, view: "list", selectedWarehouse: undefined };

    case "OPEN_FORM":
      return {
        ...state,
        view: "form",
        mode: action.mode,
        selectedWarehouse: action.warehouse,
        activeTab: "general",
      };

    case "GO_TO_LIST":
      return {
        ...state,
        view: "list",
        selectedWarehouse: undefined,
      };

    case "SET_TAB":
      return {
        ...state,
        activeTab: action.tab,
      };

    case "SAVE_WAREHOUSE": {
      if (state.mode === "edit" && state.selectedWarehouse) {
        return {
          ...state,
          warehouses: state.warehouses.map((warehouse) =>
            warehouse.id === state.selectedWarehouse?.id
              ? {
                  ...warehouse,
                  ...action.data,
                  responsable: action.responsable,
                }
              : warehouse,
          ),
          view: "list",
          selectedWarehouse: undefined,
        };
      }

      const nextId =
        Math.max(0, ...state.warehouses.map(({ id }) => id)) + 1;

      return {
        ...state,
        warehouses: [
          ...state.warehouses,
          {
            id: nextId,
            ...action.data,
            responsable: action.responsable,
            activo: true,
          },
        ],
        view: "list",
        selectedWarehouse: undefined,
      };
    }

    case "TOGGLE_STATUS":
      return {
        ...state,
        warehouses: state.warehouses.map((warehouse) =>
          warehouse.id === action.warehouseId
            ? { ...warehouse, activo: !warehouse.activo }
            : warehouse,
        ),
      };

    default:
      return state;
  }
}
