export interface Marca {
  id: number;
  nombre: string;
  abreviatura?: string;
  telefono?: string;
  empresa?: string;
  descripcion?: string;
  foto?: string;
  activo: boolean;
}

export interface MarcaFormValues {
  nombre: string;
  abreviatura?: string;
  telefono?: string;
  empresa?: string;
  descripcion?: string;
  foto?: string;
}
