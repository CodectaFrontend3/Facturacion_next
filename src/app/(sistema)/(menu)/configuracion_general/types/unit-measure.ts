export interface UnitMeasure {
  id: number;
  simbolo: string;
  medida: string;
  unidad: string;
  activo: boolean;
}

export interface UnitMeasureFormValues {
  simbolo: string;
  medida: string;
  unidad: string;
}
