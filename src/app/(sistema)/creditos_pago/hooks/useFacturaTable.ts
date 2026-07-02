import { useTableData } from "@/hooks/useTableData";
import { parse, isValid, isWithinInterval } from "date-fns";
import { Factura } from "../types/Factura";
import { useMemo } from "react";

/**
 * CONFIGURACION DE FORMATOS DE FECHA
 * - INPUT: Como vienen las fechas desde los filtros (dd/mm/yyyy)
 * - DATA: Como estan guardadas las fechas en el JSON/Base de datos (dd-mm-yyyy)
 */
const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "dd-MM-yyyy";

/**
 * FUNCION DE FILTRADO (PURA)
 * Se agregó la lógica para el input global de búsqueda (Paso 1)
 */
const filterFn = (data: Factura[], values: Record<string, string>) => {
  return data.filter((c) => {
    // 1. INPUT BUSCADOR GLOBAL (Busca por cliente, estado o forma de pago)
    let matchSearch = true;
    if (values.search) {
      const searchLower = values.search.toLowerCase();
      matchSearch =
        c.forma_pago?.toLowerCase().includes(searchLower) ||
        c.cliente?.toLowerCase().includes(searchLower) ||
        c.estado?.toLowerCase().includes(searchLower);
    }

    // 2. Selector de cliente (Combobox)
    const matchCliente =
      !values.cliente ||
      values.cliente === "todos" ||
      c.cliente === values.cliente;

    // 3. Selector de tipo de pago
    const matchTipoPago =
      !values.tipoPago ||
      values.tipoPago === "todos" ||
      c.forma_pago === values.tipoPago;

    // 4. Rango de Fechas (Desde - Hasta)
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

    // Retorna verdadero si cumple con los filtros de la barra superior
    return matchSearch && matchCliente && matchTipoPago && matchFecha;
  });
};

export function useFacturaTable(data: Factura[]) {
  // Inicializamos useTableData con los campos correspondientes
  const tableState = useTableData({
    data,
    filterFn,
    initialFilters: {
      search: "",
      cliente: "todos",
      tipoPago: "todos",
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 8,
  });

  // Segmentamos la data filtrada combinando: Estado de Pago X Tipo de Factura
  const {
    filteredDataSinPagoManual,
    filteredDataSinPagoAutomatica,
    filteredDataPagadoManual,
    filteredDataPagadoAutomatica,
  } = useMemo(() => {
    // 1. Primero filtramos por el estado base (Sin Pagar vs Pagados)
    // Nota: Dejo la validación doble ("Sin Pagar" o "No Pagado") por si acaso varían los strings en tu JSON
    const sinPagoBase = tableState.filteredData.filter(
      (f) => f.estado === "No Pagado",
    );
    const pagadoBase = tableState.filteredData.filter(
      (f) => f.estado === "Pagado",
    );

    // 2. Ahora subdividimos "Sin Pago" en Manuales y Automáticas
    const sinPagoManual = sinPagoBase.filter(
      (f) => f.tipo_factura === "Manual",
    );
    const sinPagoAutomatica = sinPagoBase.filter(
      (f) => f.tipo_factura === "Automatica",
    );

    // 3. Y dividimos "Pagado" en Manuales y Automáticas
    const pagadoManual = pagadoBase.filter((f) => f.tipo_factura === "Manual");
    const pagadoAutomatica = pagadoBase.filter(
      (f) => f.tipo_factura === "Automatica",
    );

    return {
      filteredDataSinPagoManual: sinPagoManual,
      filteredDataSinPagoAutomatica: sinPagoAutomatica,
      filteredDataPagadoManual: pagadoManual,
      filteredDataPagadoAutomatica: pagadoAutomatica,
    };
  }, [tableState.filteredData]); // Dependencia del resultado de los filtros globales

  // Retornamos el estado completo junto con todas las listas segmentadas listas para usar
  return {
    ...tableState,
    filteredDataSinPagoManual,
    filteredDataSinPagoAutomatica,
    filteredDataPagadoManual,
    filteredDataPagadoAutomatica,
  };
}
