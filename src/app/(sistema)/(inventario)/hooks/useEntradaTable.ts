import { useTableData } from "@/hooks/useTableData";
import { KardexEntradaRow } from "../types/kardex";
import {
  parse,
  isValid,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";

// Formato de fechas idéntico al del JSON y de los Inputs
const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "dd/MM/yyyy";

// Función de filtrado
const filterFn = (data: KardexEntradaRow[], values: Record<string, string>) => {
  return data.filter((c) => {
    // 1. Buscador de texto (Id, Codigo o Motivo)
    const matchSearch =
      !values.search ||
      String(c.id).toLowerCase().includes(values.search.toLowerCase()) ||
      c.codigo.toLowerCase().includes(values.search.toLowerCase()) ||
      c.motivo.toLowerCase().includes(values.search.toLowerCase());

    // 2. Rango de Fechas (Desde - Hasta)
    let matchFecha = true;

    if (values.fechaDesde || values.fechaHasta) {
      const dateC = parse(c.fecha_subida, DATE_FORMAT_DATA, new Date());

      if (isValid(dateC)) {
        // Normalizamos la fecha del registro al inicio del día
        const normalizedDateC = startOfDay(dateC);

        // Si existe fechaDesde, la parseamos y llevamos al inicio del día (00:00:00)
        const dateDesde =
          values.fechaDesde &&
          isValid(parse(values.fechaDesde, DATE_FORMAT_INPUT, new Date()))
            ? startOfDay(
                parse(values.fechaDesde, DATE_FORMAT_INPUT, new Date()),
              )
            : null;

        // Si existe fechaHasta, la parseamos y llevamos al final del día (23:59:59.999)
        const dateHasta =
          values.fechaHasta &&
          isValid(parse(values.fechaHasta, DATE_FORMAT_INPUT, new Date()))
            ? endOfDay(parse(values.fechaHasta, DATE_FORMAT_INPUT, new Date()))
            : null;

        if (dateDesde && dateHasta) {
          // Si tengo ambas fechas, verifico que esté en medio
          matchFecha = isWithinInterval(normalizedDateC, {
            start: dateDesde,
            end: dateHasta,
          });
        } else if (dateDesde) {
          // Si solo tengo DESDE, que sea mayor o igual
          matchFecha = normalizedDateC >= dateDesde;
        } else if (dateHasta) {
          // Si solo tengo HASTA, que sea menor o igual
          matchFecha = normalizedDateC <= dateHasta;
        }
      } else {
        // Si la fecha del registro no es válida, la excluimos de la búsqueda
        matchFecha = false;
      }
    }

    // Si cumple las 2 condiciones, el elemento aparece en la tabla
    return matchSearch && matchFecha;
  });
};

export function useEntradaTable(data: KardexEntradaRow[]) {
  const table = useTableData({
    data,
    filterFn,
    initialFilters: {
      search: "",
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 12, // Cuantos elementos ver por pagina
  });

  return {
    ...table,
  };
}
