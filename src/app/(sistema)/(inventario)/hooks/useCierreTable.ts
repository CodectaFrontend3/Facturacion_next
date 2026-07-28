import { useTableData } from "@/hooks/useTableData";
import {
  parse,
  isValid,
  isWithinInterval,
  startOfDay,
  endOfDay,
  getMonth,
  getYear,
} from "date-fns";
import { CierrePeriodo } from "../types/CierrePeriodo";

const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "yyyy-MM-dd";

const filterFn = (data: CierrePeriodo[], values: Record<string, string>) => {
  return data.filter((c) => {
    // 1. Buscador de texto (Id o Codigo)
    const matchSearch =
      !values.search ||
      String(c.id).toLowerCase().includes(values.search.toLowerCase()) ||
      c.codAnexo.toLowerCase().includes(values.search.toLowerCase()) || // Añadido codAnexo por utilidad
      c.nombreArticulo.toLowerCase().includes(values.search.toLowerCase());

    // 2. Rango de Fechas (Desde - Hasta)
    let matchFecha = true;

    if (values.fechaDesde || values.fechaHasta) {
      const dateC = parse(c.fecha_cierre, DATE_FORMAT_DATA, new Date());

      if (isValid(dateC)) {
        const normalizedDateC = startOfDay(dateC);

        const dateDesde =
          values.fechaDesde &&
          isValid(parse(values.fechaDesde, DATE_FORMAT_INPUT, new Date()))
            ? startOfDay(
                parse(values.fechaDesde, DATE_FORMAT_INPUT, new Date()),
              )
            : null;

        const dateHasta =
          values.fechaHasta &&
          isValid(parse(values.fechaHasta, DATE_FORMAT_INPUT, new Date()))
            ? endOfDay(parse(values.fechaHasta, DATE_FORMAT_INPUT, new Date()))
            : null;

        if (dateDesde && dateHasta) {
          matchFecha = isWithinInterval(normalizedDateC, {
            start: dateDesde,
            end: dateHasta,
          });
        } else if (dateDesde) {
          matchFecha = normalizedDateC >= dateDesde;
        } else if (dateHasta) {
          matchFecha = normalizedDateC <= dateHasta;
        }
      } else {
        matchFecha = false;
      }
    }

    return matchSearch && matchFecha;
  });
};

export function useCierreTable(data: CierrePeriodo[]) {
  const table = useTableData({
    data,
    filterFn,
    initialFilters: {
      search: "",
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 12,
  });

  return {
    ...table,
  };
}
