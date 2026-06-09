import { useState, useEffect } from "react"
import { CotizacionRow } from "../types"
import { fetchCotizaciones } from "../services/cotizacionService"

export function useCotizacionFilters(activeTab: string) {
  // Estado de los filtros unificado
  const [filters, setFilters] = useState({
    searchValue: "",
    comprobante: "Todos los comprobantes",
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
  const handleSearch = async () => {
    setIsLoading(true)
    try {
      // Si necesitas convertir las fechas a Date para tu servicio
      const startDate = filters.dateFrom ? new Date(filters.dateFrom.split("/").reverse().join("-")) : null
      const endDate = filters.dateTo ? new Date(filters.dateTo.split("/").reverse().join("-")) : null

      const result = await fetchCotizaciones({
        tab: activeTab,
        search: filters.searchValue,
        comprobante: filters.comprobante,
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
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  return {
    filters,
    data,
    isLoading,
    handleFilterChange,
    handleSearch,
  }
}
