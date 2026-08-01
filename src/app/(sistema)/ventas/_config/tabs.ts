// _config/tabs.ts

export interface TabConfig {
  key: string
  label: string
  color: string
  activeColor: string
  href: string
  /** Clave que mapea a VentasDataState para mostrar el count de registros */
  dataKey: "cotizaciones" | "cotizacionesManuales" | "notasVenta" | "clientes" | "renovaciones"
}

export const TABS: TabConfig[] = [
  {
    key: "cotizacion",
    label: "Cotización",
    color: "#008000",
    activeColor: "#008000",
    href: "/cotizacion",
    dataKey: "cotizaciones",
  },
  {
    key: "cotizacion_manual",
    label: "Cotización Manual",
    color: "#ffa500",
    activeColor: "#ffa500",
    href: "/cotizacion_manual",
    dataKey: "cotizacionesManuales",
  },
  {
    key: "nota_venta",
    label: "Nota de Venta",
    color: "#ff0000",
    activeColor: "#ff0000",
    href: "/nota_venta",
    dataKey: "notasVenta",
  },
  {
    key: "clientes",
    label: "Clientes",
    color: "#0000ff",
    activeColor: "#0000ff",
    href: "/clientes",
    dataKey: "clientes",
  },
  {
    key: "renovacion",
    label: "Renovación",
    color: "#808080",
    activeColor: "#808080",
    href: "/renovacion",
    dataKey: "renovaciones",
  },
]
