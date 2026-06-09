import { useTableData } from "@/hooks/useTableData";
import { Ingreso } from "@/app/(sistema)/servicio-tecnico/types/servicios/Ingreso";
import { parse, isValid, isWithinInterval } from "date-fns";

const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "dd-MM-yyyy";

const filterFn = (data: Ingreso[], values: Record<string, string>) => {
  return data.filter((i) => {
    const matchSearch =
      !values.search ||
      i.equipo.toLowerCase().includes(values.search.toLowerCase()) ||
      i.serie.toLowerCase().includes(values.search.toLowerCase()) ||
      i.observacion.toLowerCase().includes(values.search.toLowerCase());

    let matchFecha = true;
    if (values.fechaDesde || values.fechaHasta) {
      const dateIngreso = parse(
        i.fechaRegistrada,
        DATE_FORMAT_DATA,
        new Date(),
      );
      const dateDesde = values.fechaDesde
        ? parse(values.fechaDesde, DATE_FORMAT_INPUT, new Date())
        : null;
      const dateHasta = values.fechaHasta
        ? parse(values.fechaHasta, DATE_FORMAT_INPUT, new Date())
        : null;

      if (isValid(dateIngreso)) {
        if (
          dateDesde &&
          isValid(dateDesde) &&
          dateHasta &&
          isValid(dateHasta)
        ) {
          matchFecha = isWithinInterval(dateIngreso, {
            start: dateDesde,
            end: dateHasta,
          });
        } else if (dateDesde && isValid(dateDesde)) {
          matchFecha = dateIngreso >= dateDesde;
        } else if (dateHasta && isValid(dateHasta)) {
          matchFecha = dateIngreso <= dateHasta;
        }
      }
    }

    return matchSearch && matchFecha;
  });
};

export function useIngresoTable(data: Ingreso[]) {
  return useTableData({
    data,
    filterFn,
    initialFilters: {
      search: "",
      tipoDoc: "todos",
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 4,
  });
}
