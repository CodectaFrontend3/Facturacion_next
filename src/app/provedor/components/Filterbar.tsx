"use client"

import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"

interface FilterBarProps {
    filters: any
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
            <FilterSearch
                name="searchValue"
                value={filters.searchValue}
                onChange={onFilterChange}
                placeholder="Buscar..."
            />
        </DataFilters>
    )
}