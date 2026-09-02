export interface Subfamilia {
  id: number;
  descripcion: string;
  ubicacion: string;
  activo: boolean;
}

export interface Familia {
  id: number;
  codigo: string;
  descripcion: string;
  ubicacion: string;
  subfamiliasCount: number;
  subfamilias: Subfamilia[];
  activo: boolean;
}

export interface FamiliaFormValues {
  descripcion: string;
  ubicacion: string;
}
