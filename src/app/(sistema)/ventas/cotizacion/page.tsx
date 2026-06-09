"use client"

import { useRouter } from "next/navigation"
import { VentasTabTemplate } from "../components/VentasTabTemplate"
import { useCotizacionFilters } from "./hooks/useCotizacionFilters"

export default function CotizacionPage() {
  const router = useRouter()
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset } = useCotizacionFilters("cotizacion")

  return (
    <VentasTabTemplate 
      activeTab="cotizacion" 
      data={data}
      filters={filters}
      isLoading={isLoading}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onReset={handleReset}
      onAddClick={() => router.push("/ventas/cotizacion/crear")}
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