import { useTableData } from "@/hooks/useTableData";
import { Cotizacion } from "@/types/servicio-tecnico/cotizacion/Cotizacion";
import { parse, isValid, isWithinInterval } from "date-fns";

/**
 * CONFIGURACION DE FORMATOS DE FECHA
 * - INPUT: Como vienen las fechas desde los filtros (dd/mm/yyyy)
 * - DATA: Como estan guardadas las fechas en el JSON/Base de datos (dd-mm-yyyy)
 */
const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "dd-MM-yyyy";

/**
 * FUNCION DE FILTRADO
 * Esta funcion decide que filas se quedan y cuales se van basandose en los filtros.
 * Se mantiene afuera del hook para que sea "pura" y no gaste memoria innecesaria.
 */
const filterFn = (data: Cotizacion[], values: Record<string, string>) => {
  return data.filter((c) => {
    // 1. Buscador de texto (Nombre, Documento o Correo)
    const matchSearch =
      !values.search ||
      c.numero.toLowerCase().includes(values.search.toLowerCase()) ||
      c.ruc_dni.includes(values.search) ||
      c.cliente.toLowerCase().includes(values.search.toLowerCase());

    // 2. Selector de Tipo de Documento
    const matchTipoDoc =
      !values.tipoDoc ||
      values.tipoDoc === "todos" ||
      c.tipo_comprobante === values.tipoDoc;

    // 3. Rango de Fechas (Desde - Hasta)
    let matchFecha = true;
    if (values.fechaDesde || values.fechaHasta) {
      const dateC = parse(c.fecha_emision, DATE_FORMAT_DATA, new Date());
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
          // Si tengo ambas fechas, verifico que este en medio
          matchFecha = isWithinInterval(dateC, {
            start: dateDesde,
            end: dateHasta,
          });
        } else if (dateDesde && isValid(dateDesde)) {
          // Si solo tengo DESDE, que sea mayor o igual
          matchFecha = dateC >= dateDesde;
        } else if (dateHasta && isValid(dateHasta)) {
          // Si solo tengo HASTA, que sea menor o igual
          matchFecha = dateC <= dateHasta;
        }
      }
    }

    // Si cumple las 3 condiciones, el cliente aparece en la tabla
    return matchSearch && matchTipoDoc && matchFecha;
  });
};

/**
 * HOOK PERSONALIZADO: useCotizacionTable
 * Es el "cerebro" que conecta los datos con la tabla y los filtros.
 * Solo tienes que pasarle la lista de datos y el se encarga de:
 * - Filtrar
 * - Paginar
 * - Mantener el estado de lo que escribes en los filtros
 */
export function useCotizacionTable(data: Cotizacion[]) {
  return useTableData({
    data,
    filterFn,
    initialFilters: {
      search: "",
      tipoDoc: "todos",
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 3, // Cuantos elementos ver por pagina
  });
}
