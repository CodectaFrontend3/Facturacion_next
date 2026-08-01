// _context/VentasContext.tsx
"use client"

import { createContext, useContext, ReactNode } from "react"
import { useVentasData, VentasDataState } from "./_hooks/ventas/useVentasData"

const VentasContext = createContext<VentasDataState | null>(null)
const VentasBasePathContext = createContext("/ventas")

/**
 * Proveedor que carga todos los datos UNA SOLA VEZ.
 * Colócalo en el layout que envuelve las routes de venta_optimizado.
 * Así cambiar entre tabs (cotizacion → clientes → renovacion) es instantáneo.
 */
export function VentasProvider({
  children,
  basePath = "/ventas",
}: {
  children: ReactNode
  basePath?: string
}) {
  const data = useVentasData()
  return (
    <VentasBasePathContext.Provider value={basePath}>
      <VentasContext.Provider value={data}>{children}</VentasContext.Provider>
    </VentasBasePathContext.Provider>
  )
}

/**
 * Hook de consumo. Lanza error si se usa fuera del VentasProvider.
 */
export function useVentasContext(): VentasDataState {
  const ctx = useContext(VentasContext)
  if (!ctx) {
    throw new Error("useVentasContext debe usarse dentro de <VentasProvider>")
  }
  return ctx
}

export function useVentasBasePath(): string {
  return useContext(VentasBasePathContext)
}
