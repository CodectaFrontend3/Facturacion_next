"use client";

import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { FilterSelect } from "@/components/DataFilters/FilterSelect";
import { Button } from "@/components/ui/button";

import { rolFilterOptions } from "../data/usuarios";
import type { UsuarioFilterState } from "../types/usuario";

interface UsuarioFilterBarProps {
  filters: UsuarioFilterState;
  onFilterChange: (name: string, value: string) => void;
  onSearch: () => void;
}

export function UsuarioFilterBar({
  filters,
  onFilterChange,
  onSearch,
}: UsuarioFilterBarProps) {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-3 p-5 md:grid-cols-12">
      {/* Date Range (Col 1..4) */}
      <div className="md:col-span-4 lg:col-span-3">
        <FilterDateRange
          nameFrom="fechaDesde"
          nameTo="fechaHasta"
          valueFrom={filters.fechaDesde}
          valueTo={filters.fechaHasta}
          onChange={onFilterChange}
        />
      </div>

      {/* Search Input (Col 5..8) */}
      <div className="md:col-span-4 lg:col-span-4">
        <FilterSearch
          name="search"
          placeholder="Buscar:"
          value={filters.search}
          onChange={onFilterChange}
        />
      </div>

      {/* Role Select (Col 9..10) */}
      <div className="md:col-span-2 lg:col-span-3">
        <FilterSelect
          name="rol"
          value={filters.rol}
          options={rolFilterOptions}
          onChange={onFilterChange}
        />
      </div>

      {/* Buscar Button (Col 11..12) */}
      <div className="md:col-span-2 lg:col-span-2">
        <Button
          type="button"
          onClick={onSearch}
          className="h-9 w-full rounded-[2px] bg-[#1d5fbf] text-[13px] font-medium text-white hover:bg-[#154a96]"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
}
