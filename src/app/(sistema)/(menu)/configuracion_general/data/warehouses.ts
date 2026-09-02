import type { CboItem } from "@/components/common/CboData";

import type {
  SunatDocumentKey,
  SunatSeriesField,
  Warehouse,
  WarehouseFormValues,
  WarehouseSunatConfig,
} from "../types/warehouse";

export const warehouseResponsibleOptions = [
  { value: "admin", label: "Administrador Web Administrador Web" },
  { value: "demo", label: "Demo Demo" },
  { value: "login-uno", label: "LOGIN1 UNO" },
  { value: "machin", label: "Machin Susanita" },
  { value: "poto", label: "POTO PSAODAOSDSAD" },
  { value: "leo", label: "Leo Ch" },
] satisfies CboItem[];

export const sunatSeriesFields = [
  { key: "factura", label: "Factura", seriesPlaceholder: "Serie F-" },
  { key: "boleta", label: "Boleta", seriesPlaceholder: "Serie B-" },
  {
    key: "guiaRemision",
    label: "Guía Remisión",
    seriesPlaceholder: "Serie T-",
  },
  {
    key: "facturaManual",
    label: "Factura Manual",
    seriesPlaceholder: "Serie FA-",
  },
  {
    key: "boletaManual",
    label: "Boleta Manual",
    seriesPlaceholder: "Serie BA-",
  },
  {
    key: "guiaRemisionManual",
    label: "Guía Remisión Manual",
    seriesPlaceholder: "Serie TA-",
  },
  {
    key: "notaCreditoFactura",
    label: "Nota Crédito Factura",
    seriesPlaceholder: "Serie FF-",
  },
  {
    key: "notaCreditoBoleta",
    label: "Nota de Crédito Boleta",
    seriesPlaceholder: "Serie BB-",
  },
  {
    key: "notaDebito",
    label: "Nota de Débito",
    seriesPlaceholder: "Serie FD-",
  },
] satisfies SunatSeriesField[];

export function createEmptySunatConfig(): WarehouseSunatConfig {
  return Object.fromEntries(
    sunatSeriesFields.map(({ key }) => [
      key,
      { series: "", correlativo: "" },
    ]),
  ) as WarehouseSunatConfig;
}

const sunatSeriesPrefixes: Record<SunatDocumentKey, string> = {
  factura: "F",
  boleta: "B",
  guiaRemision: "T",
  facturaManual: "FA",
  boletaManual: "BA",
  guiaRemisionManual: "TA",
  notaCreditoFactura: "FF",
  notaCreditoBoleta: "BB",
  notaDebito: "FD",
};

function createFilledSunatConfig(index: number): WarehouseSunatConfig {
  const seriesNumber = String(index + 1).padStart(3, "0");

  return Object.fromEntries(
    sunatSeriesFields.map(({ key }, fieldIndex) => [
      key,
      {
        series: `${sunatSeriesPrefixes[key]}${seriesNumber}`,
        correlativo: String((index + 1) * 1000 + fieldIndex + 1).padStart(
          8,
          "0",
        ),
      },
    ]),
  ) as WarehouseSunatConfig;
}

/** Completa solamente los códigos que el usuario dejó sin indicar. */
export function completeSunatConfig(
  sunat: WarehouseSunatConfig,
  index: number,
): WarehouseSunatConfig {
  const generated = createFilledSunatConfig(index);

  return Object.fromEntries(
    sunatSeriesFields.map(({ key }) => [
      key,
      {
        series: sunat[key].series.trim() || generated[key].series,
        correlativo: sunat[key].correlativo.trim() || generated[key].correlativo,
      },
    ]),
  ) as WarehouseSunatConfig;
}

export function createEmptyWarehouseForm(): WarehouseFormValues {
  return {
    nombre: "",
    abreviatura: "",
    direccion: "",
    responsableId: "",
    codigoUbigeo: "",
    descripcion: "",
    codigoSunat: "",
    sunat: createEmptySunatConfig(),
  };
}

const mockRows = [
  {
    nombre: "2",
    abreviatura: "ALM2",
    direccion: "LIMA - LIMA",
    responsableId: "admin",
    codigoUbigeo: "150101",
    descripcion: "Almacén principal de Lima",
    codigoSunat: "0001",
  },
  {
    nombre: "3",
    abreviatura: "ALM3",
    direccion: "CALLAO - CALLAO",
    responsableId: "demo",
    codigoUbigeo: "070101",
    descripcion: "Almacén de distribución del Callao",
    codigoSunat: "0002",
  },
  {
    nombre: "wqdsadas",
    abreviatura: "SADS",
    direccion: "AREQUIPA - AREQUIPA",
    responsableId: "admin",
    codigoUbigeo: "040101",
    descripcion: "Almacén regional sur",
    codigoSunat: "0003",
  },
  {
    nombre: "adsadsa",
    abreviatura: "ASAS",
    direccion: "CUSCO - CUSCO",
    responsableId: "demo",
    codigoUbigeo: "080101",
    descripcion: "Almacén regional Cusco",
    codigoSunat: "0004",
  },
  {
    nombre: "PRUEBA",
    abreviatura: "SADAS",
    direccion: "TRUJILLO - LA LIBERTAD",
    responsableId: "demo",
    codigoUbigeo: "130101",
    descripcion: "Almacén de pruebas y contingencia",
    codigoSunat: "0005",
  },
] as const;

export const initialWarehouses: Warehouse[] = mockRows.map(
  (row, index) => ({
    id: index + 1,
    ...row,
    responsable:
      warehouseResponsibleOptions.find(
        ({ value }) => value === row.responsableId,
      )?.label ?? "",
    activo: true,
    sunat: createFilledSunatConfig(index),
  }),
);
