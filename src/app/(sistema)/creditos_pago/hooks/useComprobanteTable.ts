"use client";

import { useMemo } from "react";
import { useTableData } from "@/hooks/useTableData";
import { parse, isValid, isWithinInterval } from "date-fns";
import { ComprobanteBase, TipoComprobante } from "../types/ComprobanteBase";

const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "dd-MM-yyyy";

// Tipamos de forma genérica la función de filtrado pura
const createFilterFn = (tipoComprobante: TipoComprobante) => {
  return (data: ComprobanteBase[], values: Record<string, string>) => {
    return data.filter((c) => {
      const dataExt = c as any;

      // INPUT BUSCADOR GLOBAL (Busca por cliente, estado, forma de pago o Nº de documento)
      let matchSearch = true;
      if (values.search) {
        const searchLower = values.search.toLowerCase();

        // Extraemos dinámicamente el número según el tipo para que la barra busque por número también
        const numDoc =
          tipoComprobante === "Factura"
            ? dataExt.numero_factura
            : tipoComprobante === "Boleta"
              ? dataExt.numero_boleta
              : dataExt.n_nota_venta;

        matchSearch =
          c.cliente?.toLowerCase().includes(searchLower) ||
          c.estado?.toLowerCase().includes(searchLower) ||
          (dataExt.forma_pago &&
            dataExt.forma_pago.toLowerCase().includes(searchLower)) ||
          (numDoc && numDoc.toLowerCase().includes(searchLower));
      }

      // Selector de cliente
      const matchCliente =
        !values.cliente ||
        values.cliente === "todos" ||
        c.cliente === values.cliente;

      // Selector de tipo de pago (Solo aplica si el documento tiene forma_pago)
      const matchTipoPago =
        !values.tipoPago ||
        values.tipoPago === "todos" ||
        dataExt.forma_pago === values.tipoPago;

      // D. Rango de Fechas
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

      return matchSearch && matchCliente && matchTipoPago && matchFecha;
    });
  };
};

interface UseComprobanteParams {
  data: ComprobanteBase[];
  tipo: TipoComprobante;
}

export function useComprobanteTable({ data, tipo }: UseComprobanteParams) {
  // Memorizamos la función de filtrado para que no se recree innecesariamente
  const customFilterFn = useMemo(() => createFilterFn(tipo), [tipo]);

  const tableState = useTableData({
    data,
    filterFn: customFilterFn,
    initialFilters: {
      search: "",
      cliente: "todos",
      tipoPago: "todos",
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 8,
  });

  // Segmentamos los datos filtrados en cuatro categorías: Sin Pago Manual, Sin Pago Automática, Pagado Manual y Pagado Automática
  const segmentatedData = useMemo(() => {
    // Si la data ya viene filtrada por el backend (ej: solo trae manuales),
    // estas funciones simplemente devolverán subconjuntos limpios sin romperse.
    const sinPagoBase = tableState.filteredData.filter(
      (f) => f.estado === "Sin Pagar",
    );
    const pagadoBase = tableState.filteredData.filter(
      (f) => f.estado === "Pagado",
    );

    // Identificamos dinámicamente la propiedad del tipo de emisión (tipo_factura, tipo_boleta, etc)
    const getTipoEmision = (f: any) =>
      f.tipo_factura || f.tipo_boleta || f.tipo_nota_venta || f.tipo_emision;

    return {
      filteredDataSinPagoManual: sinPagoBase.filter(
        (f) => getTipoEmision(f) === "Manual",
      ),
      filteredDataSinPagoAutomatica: sinPagoBase.filter(
        (f) => getTipoEmision(f) === "Automatica",
      ),
      filteredDataPagadoManual: pagadoBase.filter(
        (f) => getTipoEmision(f) === "Manual",
      ),
      filteredDataPagadoAutomatica: pagadoBase.filter(
        (f) => getTipoEmision(f) === "Automatica",
      ),
    };
  }, [tableState.filteredData]);

  return {
    ...tableState,
    ...segmentatedData,
  };
}
