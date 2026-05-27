"use client"

import { useRouter } from "next/navigation"
import { VentasTabTemplate } from "../components/VentasTabTemplate"
import { useCotizacionFilters } from "../cotizacion/hooks/useCotizacionFilters"
import { clientesOptions } from "../utils/clientesOptions"

export default function NotaVentaPage() {
  const router = useRouter()
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset } =
    useCotizacionFilters("nota-venta")

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
      filterClienteConfig={{
        name: "clienteId",
        items: clientesOptions,
        placeholder: "Seleccionar Cliente",
      }}
    />
  )
}
