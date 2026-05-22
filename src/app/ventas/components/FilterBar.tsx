"use client"

import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSelect } from "@/components/DataFilters/FilterSelect"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"

interface FilterBarProps {
  filters: any // Cambiamos a 'any' para soportar filtros dinámicos (comprobante, documento, etc.)
  onFilterChange: (name: string, value: string) => void
  onSearchSubmit: () => void
  onReset: () => void
  isLoading?: boolean
  selectConfig?: {
    name: string
    options: { label: string; value: string }[]
  }
}

export function FilterBar({
  filters,
  onFilterChange,
  onSearchSubmit,
  onReset,
  isLoading,
  selectConfig
}: FilterBarProps) {
  return (
    <DataFilters onSearch={onSearchSubmit} onReset={onReset}>
      <FilterDateRange
        nameFrom="dateFrom"
        nameTo="dateTo"
        valueFrom={filters.dateFrom}
        valueTo={filters.dateTo}
        onChange={onFilterChange}
      />
      {selectConfig && (
        <FilterSelect
          name={selectConfig.name}
          value={filters[selectConfig.name]}
          onChange={onFilterChange}
          options={selectConfig.options}
        />
      )}
      <FilterSearch
        name="searchValue"
        value={filters.searchValue}
        onChange={onFilterChange}
        placeholder="Buscar..."
      />
    </DataFilters>
  )
}
