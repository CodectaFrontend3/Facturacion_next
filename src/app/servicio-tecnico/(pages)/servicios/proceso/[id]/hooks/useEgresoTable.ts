import { Egreso } from "@/app/servicio-tecnico/types/servicios/Egreso";

export function useEgresoTable(data: Egreso[]) {
  return {
    data,
  };
}
