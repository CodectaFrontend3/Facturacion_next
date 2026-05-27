<<<<<<< HEAD
import { VentasTabTemplate } from "../components/VentasTabTemplate"

export default function NotaVentaPage() {
  return <VentasTabTemplate activeTab="nota-venta" />
=======
"use client"

import { useRouter } from "next/navigation"
import { VentasTabTemplate } from "../components/VentasTabTemplate"
import { useCotizacionFilters } from "../cotizacion/hooks/useCotizacionFilters"

export default function NotaVentaPage() {
  const router = useRouter()
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset } = useCotizacionFilters("nota-venta")

  return (
    <VentasTabTemplate 
      activeTab="nota-venta" 
      data={data}
      filters={filters}
      isLoading={isLoading}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onReset={handleReset}
      onAddClick={() => router.push("/ventas/nota_venta/crear")}
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
>>>>>>> origin/rodrigo
}
