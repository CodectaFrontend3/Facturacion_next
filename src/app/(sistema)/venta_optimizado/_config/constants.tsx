// src/app/(sistema)/ventas/_config/constants.tsx

import { ReactNode } from "react";

export interface TabConfig {
  key: string;
  label: string;
  count: number;
  color: string;
  activeColor: string;
  href: string;
}

export interface SummaryCardConfig {
  label: string;
  borderColorClass: string;
  amountColorClass: string;
  iconKey: string; 
}

/**
 * CONFIGURACIÓN DE TABS (Mantiene los colores estéticos corporativos de V1)
 */
export const TABS: TabConfig[] = [
  { key: "cotizacion",        label: "Cotización",        count: 0, color: "#008000", activeColor: "#008000", href: "/ventas/cotizacion" },
  { key: "cotizacion-manual", label: "Cotización Manual", count: 0, color: "#ffa500", activeColor: "#ffa500", href: "/ventas/cotizacion_manual" },
  { key: "nota-venta",        label: "Nota de Venta",     count: 0, color: "#ff0000", activeColor: "#ff0000", href: "/ventas/nota_venta" },
  { key: "clientes",          label: "Clientes",          count: 0, color: "#0000ff", activeColor: "#0000ff", href: "/ventas/clientes" },
  { key: "renovacion",        label: "Renovación",        count: 0, color: "#808080", activeColor: "#808080", href: "/ventas/renovacion" },
];

/**
 * PLANTILLAS DE TARJETAS INFORMATIVAS DE RESUMEN
 * Los campos dinámicos 'documents' y 'amount' se calcularán en el componente usando un reduce().
 */
export const SUMMARY_CARDS_TEMPLATE: SummaryCardConfig[] = [
  {
    label: "Cotización",
    borderColorClass: "border-[#008000]",
    amountColorClass: "text-[#008000]",
    iconKey: "cotizacion",
  },
  {
    label: "Cotización Manual",
    borderColorClass: "border-[#ffa500]",
    amountColorClass: "text-[#ffa500]",
    iconKey: "cotizacionManual",
  },
  {
    label: "Nota de Venta",
    borderColorClass: "border-[#ff0000]",
    amountColorClass: "text-[#ff0000]",
    iconKey: "notaVenta",
  },
  {
    label: "Clientes",
    borderColorClass: "border-[#0000ff]",
    amountColorClass: "text-[#0000ff]",
    iconKey: "clientes",
  },
  {
    label: "Renovación",
    borderColorClass: "border-[#808080]",
    amountColorClass: "text-[#808080]",
    iconKey: "renovacion",
  },
];