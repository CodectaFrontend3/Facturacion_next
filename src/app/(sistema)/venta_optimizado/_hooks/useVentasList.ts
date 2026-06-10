// src/app/(sistema)/ventas/_hooks/useVentasList.ts

import { useState, useEffect, useMemo } from "react";
import { clienteService } from "../_services/clienteService";
import { documentoService } from "../_services/documentoService";
import { ClienteDetalle } from "../_domain/types/cliente.types";
import { 
  CotizacionDetalle, 
  CotizacionManualDetalle, 
  NotaVentaDetalle 
} from "../_domain/types/documento.types";
import { 
  mapCotizacionToFilaLista, 
  mapCotizacionManualToFilaLista, 
  mapNotaVentaToFilaLista, 
  mapToRenovacionFilaLista, 
  mapToClienteFilaLista 
} from "../_domain/mappers";
import { TABS, SUMMARY_CARDS_TEMPLATE } from "../_config/constants";

export const useVentasList = () => {
  // 1. Estados para almacenar los datos crudos del Servicio (Firebase-ready)
  const [activeTab, setActiveTab] = useState<string>("cotizacion");
  const [loading, setLoading] = useState<boolean>(true);
  const [clientes, setClientes] = useState<ClienteDetalle[]>([]);
  const [cotizaciones, setCotizaciones] = useState<CotizacionDetalle[]>([]);
  const [cotizacionesManuales, setCotizacionesManuales] = useState<CotizacionManualDetalle[]>([]);
  const [notasVenta, setNotasVenta] = useState<NotaVentaDetalle[]>([]);
  const [renovaciones, setRenovaciones] = useState<(CotizacionDetalle | CotizacionManualDetalle)[]>([]);

  // Estado para controlar el NoteModal rescatado
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);

  // 2. Carga asíncrona en paralelo de todos los servicios maestros
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [
          resClientes, 
          resCotizaciones, 
          resManuales, 
          resNotas, 
          resRenovaciones
        ] = await Promise.all([
          clienteService.getAll(),
          documentoService.getCotizaciones(),
          documentoService.getCotizacionesManuales(),
          documentoService.getNotasVenta(),
          documentoService.getRenovaciones()
        ]);

        setClientes(resClientes);
        setCotizaciones(resCotizaciones);
        setCotizacionesManuales(resManuales);
        setNotasVenta(resNotas);
        setRenovaciones(resRenovaciones);
      } catch (error) {
        console.error("Error cargando los flujos de ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 3. CÁLCULO DINÁMICO DE CONTADORES PARA LAS PESTAÑAS (TABS)
  const tabsConContadores = useMemo(() => {
    return TABS.map((tab) => {
      let count = 0;
      if (tab.key === "cotizacion") count = cotizaciones.length;
      if (tab.key === "cotizacion-manual") count = cotizacionesManuales.length;
      if (tab.key === "nota-venta") count = notasVenta.length;
      if (tab.key === "clientes") count = clientes.length;
      if (tab.key === "renovacion") count = renovaciones.length;
      return { ...tab, count };
    });
  }, [cotizaciones, cotizacionesManuales, notasVenta, clientes, renovaciones]);

  // 4. TRADUCCIÓN Y MAPEADO EN CALIENTE DE FILAS PARA LA TABLA ACTIVA
  const tableData = useMemo(() => {
    switch (activeTab) {
      case "cotizacion":
        return cotizaciones.map((c) => mapCotizacionToFilaLista(c, clientes, articulosMaster));
      case "cotizacion-manual":
        return cotizacionesManuales.map((m) => mapCotizacionManualToFilaLista(m, clientes));
      case "nota-venta":
        return notasVenta.map((n) => mapNotaVentaToFilaLista(n, clientes));
      case "renovacion":
        return renovaciones.map((r) => mapToRenovacionFilaLista(r, clientes));
      case "clientes":
        return clientes.map((c) => mapToClienteFilaLista(c));
      default:
        return [];
    }
  }, [activeTab, cotizaciones, cotizacionesManuales, notasVenta, renovaciones, clientes]);

  // 5. CÁLCULO DINÁMICO DE LAS TARJETAS DE RESUMEN SUPERIORES (SUMMARY CARDS)
  // Suma importes y cuenta volúmenes cruzando mappers para evitar discrepancias numéricas
  const summaryCardsData = useMemo(() => {
    const calcTotal = (filas: { total: number }[]) => filas.reduce((acc, curr) => acc + curr.total, 0);

    const filaCotizaciones = cotizaciones.map((c) => mapCotizacionToFilaLista(c, clientes));
    const filaManuales = cotizacionesManuales.map((m) => mapCotizacionManualToFilaLista(m, clientes));
    const filaNotas = notasVenta.map((n) => mapNotaVentaToFilaLista(n, clientes));
    const filaRenovaciones = renovaciones.map((r) => mapToRenovacionFilaLista(r, clientes));

    return SUMMARY_CARDS_TEMPLATE.map((card) => {
      let documents = 0;
      let totalAmount = 0;

      if (card.iconKey === "cotizacion") {
        documents = filaCotizaciones.length;
        totalAmount = calcTotal(filaCotizaciones);
      } else if (card.iconKey === "cotizacionManual") {
        documents = filaManuales.length;
        totalAmount = calcTotal(filaManuales);
      } else if (card.iconKey === "notaVenta") {
        documents = filaNotas.length;
        totalAmount = calcTotal(filaNotas);
      } else if (card.iconKey === "renovacion") {
        documents = filaRenovaciones.length;
        totalAmount = calcTotal(filaRenovaciones);
      } else if (card.iconKey === "clientes") {
        documents = clientes.length;
        // Clientes no muestra montos financieros en las tarjetas
        return { ...card, documents, amount: "---" };
      }

      return {
        ...card,
        documents,
        amount: `S/ ${totalAmount.toFixed(2)}`
      };
    });
  }, [cotizaciones, cotizacionesManuales, notasVenta, renovaciones, clientes]);

  // 6. MANEJO INTERACTIVO DE NOTAS INFORMATIVAS (Rescatado de V1)
  const getNoteForId = (id: string) => {
    if (activeTab === "cotizacion") return cotizaciones.find((c) => c.id === id)?.observacion || "";
    if (activeTab === "cotizacion-manual") return cotizacionesManuales.find((m) => m.id === id)?.observacion || "";
    if (activeTab === "nota-venta") return notasVenta.find((n) => n.id === id)?.observacion || "";
    return "";
  };

  const handleNoteClick = (id: string) => {
    setSelectedRowId(id);
    setIsNoteModalOpen(true);
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    tabs: tabsConContadores,
    summaryCards: summaryCardsData,
    tableData,
    noteOptions: {
      getNote: getNoteForId,
      onNoteClick: handleNoteClick,
    },
    modalState: {
      isOpen: isNoteModalOpen,
      setIsOpen: setIsNoteModalOpen,
      rowId: selectedRowId,
      currentNote: selectedRowId ? getNoteForId(selectedRowId) : ""
    }
  };
};