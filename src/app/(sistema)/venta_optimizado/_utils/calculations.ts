// src/app/(sistema)/ventas/_utils/calculations.ts

import { ItemCotizacion, ItemCotizacionManual, ItemNotaVenta } from '../_domain/types/documento.types';
import { ArticuloDetalle } from '../_domain/types/catalogo.types';
import { areIdsEqual } from './idNormalizer'; // <-- ¡Añade esta línea crucial!

// Estructura de salida común para los totales financieros de un documento
export interface TotalesFinancieros {
  subtotal: number;
  igv: number;
  total: number;
}

// Redondea un número de forma segura a 2 decimales comerciales.
export const redondearComercial = (valor: number): number => {
  return Number(Math.round(Number(valor + 'e+2')) + 'e-2');
};

/**
 * 1. CÁLCULO PARA COTIZACIONES TRADICIONALES
 * Aplica descuento (si corresponde) y adiciona el 18% de IGV sobre el precio neto del catálogo.
 * Evita valores negativos y reporta artículos no encontrados.
 */
export const calcularTotalesCotizacion = (
  items: ItemCotizacion[],
  articulosMaster: ArticuloDetalle[]
): TotalesFinancieros => {
  let subtotalNetoAcumulado = 0;

  items.forEach((item) => {
    // AHORA: Búsqueda 100% blindada contra hashes corruptos, nulls o undefined
    const articulo = articulosMaster.find((a) => areIdsEqual(a.id, item.articuloId));
    
    if (articulo) {
      // CAPA DE SEGURIDAD: Evitar que cantidades negativas alteren la matemática
      const cantidadValidada = Math.max(0, item.cantidad);
      let precioUnitario = articulo.precio;

      if (item.cantidad < 0) {
        // -------------------------------------------------------------------------
        // TODO / PENDIENTE: INTEGRACIÓN CON MODAL DE ALERTA (Cantidad Negativa)
        // -------------------------------------------------------------------------
        console.warn(
          `[⚠️ Lógica Comercial] Cantidad negativa detectada en Cotización Ítem ID ${item.id}. Forzando a 0.`
        );
      }

      // Si el gatillo lógico está activo, aplicamos el porcentaje de descuento por defecto del artículo
      if (item.descuentoPorcentajeAplicado && articulo.descuentoPorDefecto > 0) {
        const descuento = precioUnitario * (articulo.descuentoPorDefecto / 100);
        precioUnitario = precioUnitario - descuento;
      }

      const importeItem = precioUnitario * cantidadValidada;
      subtotalNetoAcumulado += importeItem;
    } else {
      // -------------------------------------------------------------------------
      // TODO / PENDIENTE: INTEGRACIÓN CON MODAL DE ALERTA (Artículo No Encontrado)
      // -------------------------------------------------------------------------
      console.error(
        `[❌ Error de Integridad] El articuloId "${item.articuloId}" solicitado en el ítem no existe en catalogos.types.`
      );
    }
  });

  const igvCalculado = subtotalNetoAcumulado * 0.18;
  const totalFinal = subtotalNetoAcumulado + igvCalculado;

  return {
    subtotal: redondearComercial(subtotalNetoAcumulado),
    igv: redondearComercial(igvCalculado),
    total: redondearComercial(totalFinal),
  };
};

/**
 * 2. CÁLCULO PARA COTIZACIONES MANUALES
 * Calcula subtotales a partir de precios netos ingresados directamente en caliente.
 * Adiciona el 18% de IGV sobre el acumulado final.
 */
export const calcularTotalesCotizacionManual = (
  items: ItemCotizacionManual[]
): TotalesFinancieros => {
  let subtotalNetoAcumulado = 0;

  items.forEach((item) => {
    // CAPA DE SEGURIDAD: Forzar que valores negativos se traten como cero
    const cantidadValidada = Math.max(0, item.cantidad);
    const precioValidado = Math.max(0, item.precioAsignado);

    if (item.cantidad < 0 || item.precioAsignado < 0) {
      // -------------------------------------------------------------------------
      // TODO / PENDIENTE: INTEGRACIÓN CON MODAL DE ALERTA (Valores Negativos)
      // -------------------------------------------------------------------------
      console.warn(
        `[⚠️ Lógica Comercial] Se detectaron valores negativos en Cotización Manual Ítem ID ${item.id}. Forzando consistencia a 0.`
      );
    }

    const importeItem = precioValidado * cantidadValidada;
    subtotalNetoAcumulado += importeItem;
  });

  const igvCalculado = subtotalNetoAcumulado * 0.18;
  const totalFinal = subtotalNetoAcumulado + igvCalculado;

  return {
    subtotal: redondearComercial(subtotalNetoAcumulado),
    igv: redondearComercial(igvCalculado),
    total: redondearComercial(totalFinal),
  };
};

/**
 * 3. CÁLCULO PARA NOTAS DE VENTA
 * No aplica impuesto (IGV = 0). El subtotal neto es igual al total final.
 */
export const calcularTotalesNotaVenta = (
  items: ItemNotaVenta[]
): TotalesFinancieros => {
  let totalAcumulado = 0;

  items.forEach((item) => {
    // CAPA DE SEGURIDAD: Evitar que cantidades o precios negativos alteren las Notas de Venta
    const cantidadValidada = Math.max(0, item.cantidad);
    const precioValidado = Math.max(0, item.precioAsignado);

    if (item.cantidad < 0 || item.precioAsignado < 0) {
      // -------------------------------------------------------------------------
      // TODO / PENDIENTE: INTEGRACIÓN CON MODAL DE ALERTA (Valores Negativos)
      // -------------------------------------------------------------------------
      console.warn(
        `[⚠️ Lógica Comercial] Valores negativos detectados en Nota de Venta Ítem ID ${item.id}. Forzando consistencia a 0.`
      );
    }

    const importeItem = precioValidado * cantidadValidada;
    totalAcumulado += importeItem;
  });

  return {
    subtotal: redondearComercial(totalAcumulado),
    igv: 0, // Regla de negocio fija: Las Notas de Venta no registran IGV en tu dominio
    total: redondearComercial(totalAcumulado),
  };
};

/**
 * 4. CÁLCULO DE DÍAS RESTANTES (MÓDULO RENOVACIONES)
 * Resta la fecha de vencimiento configurada con la fecha actual del sistema.
 */
export const calcularDiasRestantes = (fechaRenovacion: string | null): number => {
  if (!fechaRenovacion) return 0;

  const fechaDestino = new Date(fechaRenovacion);
  const fechaActual = new Date();

  // Forzar que ambas fechas se comparen al inicio del día (00:00:00) para evitar desfases por horas
  fechaDestino.setHours(0, 0, 0, 0);
  fechaActual.setHours(0, 0, 0, 0);

  const diferenciaMilisegundos = fechaDestino.getTime() - fechaActual.getTime();
  
  // Transformación matemática de milisegundos a días enteros transcurridos
  return Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
};