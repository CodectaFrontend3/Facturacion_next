"use client"

import { VentasTabTemplate } from "../components/VentasTabTemplate"
import { useCotizacionFilters } from "../cotizacion/hooks/useCotizacionFilters"

export default function CotizacionManualPage() {
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset } = useCotizacionFilters("cotizacion-manual")

  return (
    <VentasTabTemplate 
      activeTab="cotizacion-manual" 
      data={data}
      filters={filters}
      isLoading={isLoading}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onReset={handleReset}
      filterSelectConfig={{
        name: "comprobante",
        options: [
          { label: "Todos los comprobantes", value: "Todos los comprobantes" },
          { label: "Factura", value: "Factura" },
          { label: "Boleta", value: "Boleta" },
          { label: "Nota de Venta", value: "Nota de Venta" }
        ]
      }}
    />
  )
}
