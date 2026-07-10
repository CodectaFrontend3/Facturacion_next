"use client"

import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"
import { FilterSelect } from "@/components/DataFilters/FilterSelect"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"

interface FilterBarProps {
  pendingFilters: {
    search: string
    estado: string
    fechaDesde: string
    fechaHasta: string
  }
  setFilterValue: (name: string, value: string) => void
  applyFilters: () => void
  resetFilters: () => void
  selectOptions: { label: string; value: string }[]
  selectName?: string
}

export function FilterBar({
  pendingFilters,
  setFilterValue,
  applyFilters,
  resetFilters,
  selectOptions,
  selectName = "estado",
}: FilterBarProps) {
  return (
    <DataFilters onSearch={applyFilters} onReset={resetFilters}>
      <FilterDateRange
        nameFrom="fechaDesde"
        nameTo="fechaHasta"
        valueFrom={pendingFilters.fechaDesde || ""}
        valueTo={pendingFilters.fechaHasta || ""}
        onChange={setFilterValue}
      />
      <FilterSelect
        name={selectName}
        value={pendingFilters.estado || "todos"}
        onChange={setFilterValue}
        options={selectOptions}
      />
      <FilterSearch
        name="search"
        value={pendingFilters.search}
        onChange={setFilterValue}
      />
    </DataFilters>
  )
}
