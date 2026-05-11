"use client"

import { VentasTabTemplate } from "../components/VentasTabTemplate"
import { useClienteFilters } from "./hooks/useClienteFilters"

export default function ClientesPage() {
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset } = useClienteFilters()

  return (
    <VentasTabTemplate
      activeTab="clientes"
      data={data}
      filters={filters}
      isLoading={isLoading}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onReset={handleReset}
      filterSelectConfig={{
        name: "documento",
        options: [
          { label: "Todos los Documentos", value: "Todos los Documentos" },
          { label: "DNI", value: "DNI" },
          { label: "RUC", value: "RUC" }
        ]
      }}
    />
  )
}
