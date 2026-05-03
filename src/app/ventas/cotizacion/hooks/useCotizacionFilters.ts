import { useState, useEffect } from "react"
import { CotizacionRow } from "../types"
import { fetchCotizaciones } from "../services/cotizacionService"

interface DateRange {
  start: Date | null
  end: Date | null
}

export function useCotizacionFilters(activeTab: string) {
  // Estados de los filtros
  const [searchValue, setSearchValue] = useState("")
  const [comprobante, setComprobante] = useState("Todos los comprobantes")
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null })

  // Estado de los datos y carga
  const [data, setData] = useState<CotizacionRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Disparar la búsqueda
  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const result = await fetchCotizaciones({
        tab: activeTab,
        search: searchValue,
        comprobante,
        dateRange,
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
    // Valores
    searchValue,
    comprobante,
    dateRange,
    data,
    isLoading,
    
    // Setters
    setSearchValue,
    setComprobante,
    setDateRange,
    
    // Acciones
    handleSearch,
  }
}
