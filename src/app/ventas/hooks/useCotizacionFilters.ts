import { useState, useEffect } from "react"
import { CotizacionRow } from "../types"
import { fetchCotizaciones } from "../services/cotizacionService"

export function useCotizacionFilters(activeTab: string) {
  // Estado de los filtros unificado
  const [filters, setFilters] = useState({
    searchValue: "",
    comprobante: "Todos los comprobantes",
    estado: "Estados",
    dateFrom: "",
    dateTo: ""
  })

  // Estado de los datos y carga
  const [data, setData] = useState<CotizacionRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Función genérica para actualizar cualquier filtro
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // Disparar la búsqueda
  const handleSearch = async (currentFilters = filters) => {
    setIsLoading(true)
    try {
      const startDate = currentFilters.dateFrom ? new Date(currentFilters.dateFrom.split("/").reverse().join("-")) : null
      const endDate = currentFilters.dateTo ? new Date(currentFilters.dateTo.split("/").reverse().join("-")) : null

      const result = await fetchCotizaciones({
        tab: activeTab,
        search: currentFilters.searchValue,
        comprobante: currentFilters.comprobante,
        estado: currentFilters.estado,
        dateRange: { start: startDate, end: endDate },
      })
      setData(result)
    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  // Efecto para buscar automáticamente cuando cambia la pestaña
  useEffect(() => {
    const resetFilters = {
      ...filters,
      comprobante: activeTab === "clientes" ? "Todos los Documentos" : "Todos los comprobantes",
      estado: "Estados",
      searchValue: ""
    };
    setFilters(resetFilters);
    handleSearch(resetFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  // Efecto para buscar automáticamente cuando cambia un Select
  useEffect(() => {
    handleSearch(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.comprobante, filters.estado])

  return {
    filters,
    data,
    isLoading,
    handleFilterChange,
    handleSearch: () => handleSearch(filters),
  }
}
