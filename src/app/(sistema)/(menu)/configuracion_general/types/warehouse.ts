export type WarehouseFormMode = "create" | "edit" | "view";
export type WarehouseModalView = "list" | "form";

export type SunatDocumentKey =
  | "factura"
  | "boleta"
  | "guiaRemision"
  | "facturaManual"
  | "boletaManual"
  | "guiaRemisionManual"
  | "notaCreditoFactura"
  | "notaCreditoBoleta"
  | "notaDebito";

export interface SunatDocumentConfig {
  series: string;
  correlativo: string;
}

export type WarehouseSunatConfig = Record<
  SunatDocumentKey,
  SunatDocumentConfig
>;

export interface Warehouse {
  id: number;
  nombre: string;
  abreviatura: string;
  direccion: string;
  responsableId: string;
  responsable: string;
  codigoUbigeo: string;
  descripcion: string;
  codigoSunat: string;
  activo: boolean;
  sunat: WarehouseSunatConfig;
}

export interface WarehouseFormValues {
  nombre: string;
  abreviatura: string;
  direccion: string;
  responsableId: string;
  codigoUbigeo: string;
  descripcion: string;
  codigoSunat: string;
  sunat: WarehouseSunatConfig;
}

export type WarehouseGeneralField = Exclude<
  keyof WarehouseFormValues,
  "sunat"
>;

export interface SunatSeriesField {
  key: SunatDocumentKey;
  label: string;
  seriesPlaceholder: string;
}
