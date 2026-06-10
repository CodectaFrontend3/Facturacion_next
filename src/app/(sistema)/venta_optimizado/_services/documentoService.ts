// src/app/(sistema)/ventas/_services/documentoService.ts

import { 
  CotizacionDetalle, 
  CotizacionManualDetalle, 
  NotaVentaDetalle 
} from '../_domain/types/documento.types';

// Importación de los Mocks JSON Temporales
import cotizacionesMock from '../data/cotizaciones-mock.json';
import cotizacionesManualesMock from '../data/cotizaciones-manuales-mock.json';
import notasVentaMock from '../data/notas-venta-mock.json';

// Casteo de datos crudos a interfaces estrictas del Dominio
const listaCotizaciones = cotizacionesMock as CotizacionDetalle[];
const listaCotizacionesManuales = cotizacionesManualesMock as CotizacionManualDetalle[];
const listaNotasVenta = notasVentaMock as NotaVentaDetalle[];

/**
 * SERVICIO MAESTRO DE DOCUMENTOS DE VENTA
 * Abstrae los orígenes de datos locales simulando respuestas asíncronas de base de datos.
 */
export const documentoService = {
  /**
   * Retorna todas las Cotizaciones Tradicionales.
   */
  getCotizaciones: async (): Promise<CotizacionDetalle[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(listaCotizaciones), 400));
  },

  /**
   * Retorna todas las Cotizaciones Manuales.
   */
  getCotizacionesManuales: async (): Promise<CotizacionManualDetalle[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(listaCotizacionesManuales), 400));
  },

  /**
   * Retorna todas las Notas de Venta.
   */
  getNotasVenta: async (): Promise<NotaVentaDetalle[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(listaNotasVenta), 400));
  },

  /**
   * MÉTODO DE CONSOLIDACIÓN: Obtiene un listado unificado de cotizaciones
   * tradicionales y manuales que contengan flujos de renovación activos.
   */
  getRenovaciones: async (): Promise<(CotizacionDetalle | CotizacionManualDetalle)[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtramos ambos catálogos para extraer solo los documentos que requieren seguimiento temporal
        const cotizacionesConRenovacion = listaCotizaciones.filter(
          (c) => c.renovacion && c.renovacion.isActive
        );
        const manualesConRenovacion = listaCotizacionesManuales.filter(
          (m) => m.renovacion && m.renovacion.isActive
        );

        resolve([...cotizacionesConRenovacion, ...manualesConRenovacion]);
      }, 500);
    });
  }
};