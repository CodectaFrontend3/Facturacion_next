import { useState, useEffect } from "react"
import { VentasFilters } from "../../components/VentasTabTemplate"
import { ClienteRow } from "../../types/cliente.types"
import { fetchClientes } from "../services/clienteService"

export function useClienteFilters() {
  // Estado de los filtros unificado
  const [filters, setFilters] = useState({
    searchValue: "",
    documento: "Todos los Documentos",
    dateFrom: "",
    dateTo: ""
  })

  // Estado de los datos y carga
  const [data, setData] = useState<ClienteRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Función genérica para actualizar cualquier filtro
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // Disparar la búsqueda
  const handleSearch = async (searchFilters?: VentasFilters) => {
    const current = {
      searchValue: searchFilters?.searchValue ?? filters.searchValue,
      documento: searchFilters?.documento ?? filters.documento,
      dateFrom: searchFilters?.dateFrom ?? filters.dateFrom,
      dateTo: searchFilters?.dateTo ?? filters.dateTo,
    }
    setIsLoading(true)
    try {
      // Convertir fechas (ej. "10/05/2026" -> Date)
      const startDate = current.dateFrom ? new Date(current.dateFrom.split("/").reverse().join("-")) : null
      const endDate = current.dateTo ? new Date(current.dateTo.split("/").reverse().join("-")) : null

      const result = await fetchClientes({
        search: current.searchValue,
        documento: current.documento,
        dateRange: { start: startDate, end: endDate }
      })
      setData(result)
    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  // Función para limpiar filtros
  const handleReset = async () => {
    const defaultFilters = {
      searchValue: "",
      documento: "Todos los Documentos",
      dateFrom: "",
      dateTo: ""
    }
    setFilters(defaultFilters)
    
    // Disparar la búsqueda inmediatamente con los filtros por defecto
    setIsLoading(true)
    try {
      const result = await fetchClientes({
        search: "",
        documento: "Todos los Documentos",
        dateRange: { start: null, end: null }
      })
      setData(result)
    } catch (error) {
      console.error("Error resetting data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Efecto para buscar automáticamente cuando carga el componente o cambia el filtro de búsqueda
  useEffect(() => {
    // Si quisieras que busque mientras escribes, puedes poner el debounce aquí.
    // Por ahora busca al montar o si manejamos el botón buscar.
    handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    filters,
    data,
    isLoading,
    handleFilterChange,
    handleSearch,
    handleReset,
  }
}
