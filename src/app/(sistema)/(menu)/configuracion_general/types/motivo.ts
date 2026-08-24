export interface Motivo {
  id: number;
  nombre: string;
  tipo: string;
  activo: boolean;
}

export interface MotivoFormValues {
  nombre: string;
  tipo: string;
}
