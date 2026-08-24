import type { UnitMeasure } from "../types/unit-measure";

const rows = [
  ["LP", "Lapicero", "18.00"],
  ["BOL", "Bolsa", "12.00"],
  ["CAJ", "Caja", "12.00"],
  ["CTO", "Ciento", "12.00"],
  ["DOC", "Docena", "12.00"],
  ["FAR", "Fardo", "12.00"],
  ["GLNES", "Galones", "12.00"],
  ["JGO", "Juego", "12.00"],
] as const;

export const initialUnitMeasures: UnitMeasure[] = rows.map(
  ([simbolo, medida, unidad], index) => ({
    id: index + 1,
    simbolo,
    medida,
    unidad,
    activo: true,
  }),
);
