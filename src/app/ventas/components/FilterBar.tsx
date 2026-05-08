"use client"

import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSelect } from "@/components/DataFilters/FilterSelect"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"
import { TabKey } from "../types"

interface FilterBarProps {
  filters: {
    searchValue: string
    comprobante: string
    estado?: string
    dateFrom: string
    dateTo: string
  }
  onFilterChange: (name: string, value: string) => void
  onSearchSubmit: () => void
  isLoading?: boolean
  activeTab?: TabKey
}

export function FilterBar({
  filters,
  onFilterChange,
  onSearchSubmit,
  isLoading,
  activeTab
}: FilterBarProps) {

  let selectOptions = [];
  if (activeTab === "clientes") {
    selectOptions = [
      { label: "Todos los Documentos", value: "Todos los Documentos" },
      { label: "DNI", value: "DNI" },
      { label: "RUC", value: "RUC" }
    ];
  } else if (activeTab === "renovacion") {
    selectOptions = [
      { label: "Comprobantes", value: "Todos los comprobantes" },
      { label: "Factura", value: "Factura" },
      { label: "Boleta", value: "Boleta" },
      { label: "Nota de Venta", value: "Nota de Venta" }
    ];
  } else {
    selectOptions = [
      { label: "Todos los comprobantes", value: "Todos los comprobantes" },
      { label: "Factura", value: "Factura" },
      { label: "Boleta", value: "Boleta" },
      { label: "Nota de Venta", value: "Nota de Venta" }
    ];
  }

  const filterElements = [
    <FilterDateRange
      key="date"
      nameFrom="dateFrom"
      nameTo="dateTo"
      valueFrom={filters.dateFrom}
      valueTo={filters.dateTo}
      onChange={onFilterChange}
    />,
    <FilterSelect
      key="comprobante"
      name="comprobante"
      value={filters.comprobante}
      onChange={onFilterChange}
      options={selectOptions}
    />,
    activeTab === "renovacion" ? (
      <FilterSelect
        key="estado"
        name="estado"
        value={filters.estado || "Estados"}
        onChange={onFilterChange}
        options={[
          { label: "Estados", value: "Estados" },
          { label: "Activa", value: "Activa" },
          { label: "Por vencer", value: "Por vencer" },
          { label: "Vencida", value: "Vencida" }
        ]}
      />
    ) : null,
    <FilterSearch
      key="search"
      name="searchValue"
      value={filters.searchValue}
      onChange={onFilterChange}
      placeholder={activeTab === "cotizacion" || activeTab === "cotizacion-manual" ? "Buscar:" : "Buscar..."}
    />
  ].filter(Boolean);

  return (
    <DataFilters onSearch={onSearchSubmit} onReset={() => { }}>
      {filterElements}
    </DataFilters>
  )
}
