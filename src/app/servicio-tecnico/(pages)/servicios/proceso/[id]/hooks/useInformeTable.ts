import { useTableData } from "@/hooks/useTableData";
import { InformeTecnico } from "@/app/servicio-tecnico/types/servicios/InformeTecnico";
import { parse, isValid, isWithinInterval } from "date-fns";

const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "dd-MM-yyyy";

const filterFn = (data: InformeTecnico[], values: Record<string, string>) => {
  return data.filter((r) => {
    const matchSearch =
      !values.search ||
      r.cliente.toLowerCase().includes(values.search.toLowerCase()) ||
      r.servicio_tecnico.toLowerCase().includes(values.search.toLowerCase()) ||
      r.orden_servicio.toLowerCase().includes(values.search.toLowerCase());

    let matchFecha = true;
    if (values.fechaDesde || values.fechaHasta) {
      const dateC = parse(r.fecha_registrada, DATE_FORMAT_DATA, new Date());
      const dateDesde = values.fechaDesde
        ? parse(values.fechaDesde, DATE_FORMAT_INPUT, new Date())
        : null;
      const dateHasta = values.fechaHasta
        ? parse(values.fechaHasta, DATE_FORMAT_INPUT, new Date())
        : null;

      if (isValid(dateC)) {
        if (
          dateDesde &&
          isValid(dateDesde) &&
          dateHasta &&
          isValid(dateHasta)
        ) {
          matchFecha = isWithinInterval(dateC, {
            start: dateDesde,
            end: dateHasta,
          });
        } else if (dateDesde && isValid(dateDesde)) {
          matchFecha = dateC >= dateDesde;
        } else if (dateHasta && isValid(dateHasta)) {
          matchFecha = dateC <= dateHasta;
        }
      }
    }

    return matchSearch && matchFecha;
  });
};

export function useInformeTable(data: InformeTecnico[]) {
  return useTableData({
    data,
    filterFn,
    initialFilters: {
      search: "",
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 8,
  });
}
