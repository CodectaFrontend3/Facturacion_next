"use client";

import { useMemo } from "react";
import { useTableData } from "@/hooks/useTableData";
import { parse, isValid, isWithinInterval } from "date-fns";
import { ComprobanteBase, TipoComprobante } from "../types/ComprobanteBase";

const DATE_FORMAT_INPUT = "dd/MM/yyyy";
const DATE_FORMAT_DATA = "dd-MM-yyyy";

/**
 * FUNCION DE FILTRADO
 * Esta funcion decide que filas se quedan y cuales se van basandose en los filtros.
 */
const filterFn = (data: ComprobanteBase[], values: Record<string, string>) => {
  return data.filter((c) => {
    const dataExt = c as any;

    // --- FUNCIÓN AUXILIAR ---
    // Limpia acentos y minúsculas para comparaciones seguras ("Crédito" === "credito")
    const cleanString = (str: string) =>
      str
        ? str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        : "";

    // 1. Buscador de texto global (Input de texto libre)
    let matchSearch = true;
    if (values.search) {
      const searchLower = values.search.toLowerCase();
      const numDoc =
        dataExt.numero_factura ||
        dataExt.numero_boleta ||
        dataExt.n_nota_venta ||
        "";

      matchSearch =
        (c.cliente && c.cliente.toLowerCase().includes(searchLower)) ||
        (c.estado && c.estado.toLowerCase().includes(searchLower)) ||
        (c.forma_pago && c.forma_pago.toLowerCase().includes(searchLower)) ||
        numDoc.toLowerCase().includes(searchLower);
    }

    // 2. Selector de Tipo de Documento / Comprobante
    const matchTipoDoc =
      !values.tipoDoc ||
      values.tipoDoc === "todos" ||
      dataExt.tipo === values.tipoDoc ||
      dataExt.tipo_comprobante === values.tipoDoc;

    // 3. RECONECTADO: Selector de Cliente específico (Dropdown de Clientes)
    const matchCliente =
      !values.cliente ||
      values.cliente === "todos" ||
      c.cliente === values.cliente;

    // 4. Selector de Estado de Pago (Pagado / Sin Pagar)
    const matchEstado =
      !values.estado || values.estado === "todos" || c.estado === values.estado;

    // 5. Selector de Forma de Pago (Contado / Crédito)
    const filterForma = values.formaPago || values.tipoPago; // Soporta ambos nombres por si acaso

    const matchFormaPago =
      !filterForma ||
      filterForma === "todos" ||
      (c.forma_pago
        ? cleanString(c.forma_pago) === cleanString(filterForma)
        : false);

    // 6. Rango de Fechas (Desde - Hasta)
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

    // Ahora evaluamos las 6 condiciones juntas
    return (
      matchSearch &&
      matchTipoDoc &&
      matchCliente &&
      matchEstado &&
      matchFormaPago &&
      matchFecha
    );
  });
};

interface UseComprobanteParams {
  data: ComprobanteBase[];
  tipo: TipoComprobante;
}

export function useComprobanteTable({ data, tipo }: UseComprobanteParams) {
  const tableState = useTableData({
    data,
    filterFn: filterFn, // <--- Ahora pasamos directamente la función pura
    initialFilters: {
      search: "",
      tipoDoc: tipo, // <--- Seteamos por defecto el tipo que viene por parámetro
      estado: "todos", // <--- Corregido para que coincida con values.estado
      formaPago: "todos", // <--- Corregido para que coincida con values.formaPago
      fechaDesde: "",
      fechaHasta: "",
    },
    pageSize: 8,
  });

  // Segmentamos los datos filtrados en cuatro categorías
  const segmentatedData = useMemo(() => {
    const sinPagoBase = tableState.filteredData.filter(
      (f) => f.estado === "Sin Pagar",
    );
    const pagadoBase = tableState.filteredData.filter(
      (f) => f.estado === "Pagado",
    );

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

  // --- SE MANTIENEN TUS OPCIONES INTACTAS ---
  const clientesOptions = useMemo(() => {
    const unicos = Array.from(
      new Set(data.map((b) => b.cliente).filter(Boolean)),
    );
    return [
      { value: "todos", label: "Todos los clientes" },
      ...unicos.map((c) => ({ value: c, label: c })),
    ];
  }, [data]);

  const estadosOptions = useMemo(() => {
    const unicos = Array.from(
      new Set(data.map((b) => b.estado).filter(Boolean)),
    );
    return [
      { value: "todos", label: "Todos los estados" },
      ...unicos.map((e) => ({ value: e, label: e })),
    ];
  }, [data]);

  const formasDePagoOptions = [
    { value: "todos", label: "Todas las formas de pago" },
    { value: "Contado", label: "Contado" },
    { value: "Crédito", label: "Crédito" },
  ];

  return {
    ...tableState,
    ...segmentatedData,
    clientesOptions,
    estadosOptions,
    formasDePagoOptions,
  };
}
