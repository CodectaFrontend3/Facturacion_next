  import { useState } from "react"

export interface VentasFilters {
  dateFrom: string
  dateTo: string
  searchValue: string
  tipoDocumento: string
  estado: string
  [key: string]: string
}

const INITIAL_FILTERS: VentasFilters = {
  dateFrom: "",
  dateTo: "",
  searchValue: "",
  tipoDocumento: "",
  estado: "",
}

export const useVentasFilters = () => {
  const [filters, setFilters] =
  useState<VentasFilters>(INITIAL_FILTERS)

  const [activeFilters, setActiveFilters] =
    useState<VentasFilters>(INITIAL_FILTERS)


  const handleFilterChange = (
    name: string,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = () => {
    //aqui sera reemplazado por la llamada de servicios
    setActiveFilters(filters)
  }

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS)
    setActiveFilters(INITIAL_FILTERS)
  }

  return {
    filters,
    activeFilters,
    handleFilterChange,
    handleSearch,
    resetFilters,
  }
}