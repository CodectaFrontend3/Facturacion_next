"use client"

import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSelect } from "@/components/DataFilters/FilterSelect"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"

interface FilterBarProps {
  filters: {
    searchValue: string
    comprobante: string
    dateFrom: string
    dateTo: string
  }
  onFilterChange: (name: string, value: string) => void
  onSearchSubmit: () => void
  isLoading?: boolean
}

export function FilterBar({
  filters,
  onFilterChange,
  onSearchSubmit,
  isLoading
}: FilterBarProps) {
  return (
    <DataFilters onSearch={onSearchSubmit} onReset={() => {}}>
      <FilterDateRange
        nameFrom="dateFrom"
        nameTo="dateTo"
        valueFrom={filters.dateFrom}
        valueTo={filters.dateTo}
        onChange={onFilterChange}
      />
      <FilterSelect
        name="comprobante"
        value={filters.comprobante}
        onChange={onFilterChange}
        options={[
          { label: "Todos los comprobantes", value: "Todos los comprobantes" },
          { label: "Factura", value: "Factura" },
          { label: "Boleta", value: "Boleta" },
          { label: "Nota de Venta", value: "Nota de Venta" }
        ]}
      />
      <FilterSearch
        name="searchValue"
        value={filters.searchValue}
        onChange={onFilterChange}
        placeholder="Buscar..."
      />
    </DataFilters>
  )
}
