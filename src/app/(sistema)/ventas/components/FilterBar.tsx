"use client"

import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSelect } from "@/components/DataFilters/FilterSelect"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"
import { CboData, CboItem } from "@/components/common/CboData"
import { VentasFilters } from "./VentasTabTemplate"

interface FilterBarProps {
  filters: VentasFilters
  onFilterChange: (name: string, value: string) => void
  onSearchSubmit: (filters: VentasFilters) => void
  onReset: () => void
  isLoading?: boolean
  selectConfig?: {
    name: string
    options: { label: string; value: string }[]
  }
  estadoSelectConfig?: {
    name: string
    options: { label: string; value: string }[]
  }
  showDateRange?: boolean
  clienteFilter?: {
    name: string
    items: CboItem[]
    placeholder?: string
  }
}

export function FilterBar({
  filters,
  onFilterChange,
  onSearchSubmit,
  onReset,
  isLoading,
  selectConfig,
  estadoSelectConfig,
  showDateRange = true,
  clienteFilter,
}: FilterBarProps) {
  return (
    <DataFilters onSearch={() => onSearchSubmit(filters)} onReset={onReset}>
      {showDateRange && (
        <FilterDateRange
          nameFrom="dateFrom"
          nameTo="dateTo"
          valueFrom={filters.dateFrom}
          valueTo={filters.dateTo}
          onChange={onFilterChange}
        />
      )}
      {clienteFilter ? (
        <CboData
          items={clienteFilter.items}
          value={filters[clienteFilter.name] ?? ""}
          onChange={(value) => onFilterChange(clienteFilter.name, value)}
          placeholder={clienteFilter.placeholder ?? "Seleccionar Cliente"}
          className="w-full"
        />
      ) : (
        selectConfig && (
          <FilterSelect
            name={selectConfig.name}
            value={filters[selectConfig.name] ?? selectConfig.options[0]?.value ?? ""}
            onChange={onFilterChange}
            options={selectConfig.options}
          />
        )
      )}
      {estadoSelectConfig && (
        <FilterSelect
          name={estadoSelectConfig.name}
          value={filters[estadoSelectConfig.name] ?? estadoSelectConfig.options[0]?.value ?? ""}
          onChange={onFilterChange}
          options={estadoSelectConfig.options}
        />
      )}
      <FilterSearch
        name="searchValue"
        value={filters.searchValue}
        onChange={onFilterChange}
        placeholder="Buscar:"
      />
    </DataFilters>
  )
}