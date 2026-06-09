"use client"

import { VentasTabTemplate } from "../components/VentasTabTemplate"
import { useCotizacionFilters } from "../cotizacion/hooks/useCotizacionFilters"

const COMPROBANTE_OPTIONS = [
  { label: "Comprobantes", value: "Comprobantes" },
  { label: "Factura", value: "Factura" },
  { label: "Boleta", value: "Boleta" },
  { label: "Nota de Venta", value: "Nota de Venta" },
]

const ESTADO_OPTIONS = [
  { label: "Estados", value: "Estados" },
  { label: "Activa", value: "Activa" },
  { label: "Por vencer", value: "Por vencer" },
  { label: "Vencida", value: "Vencida" },
]

export default function RenovacionPage() {
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset } =
    useCotizacionFilters("renovacion")

  return (
    <VentasTabTemplate
      activeTab="renovacion"
      data={data}
      filters={filters}
      isLoading={isLoading}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onReset={handleReset}
      filterSelectConfig={{
        name: "comprobante",
        options: COMPROBANTE_OPTIONS,
      }}
      filterEstadoConfig={{
        name: "estado",
        options: ESTADO_OPTIONS,
      }}
    />
  )
}