import { useState, useEffect, useRef, useCallback } from "react"
import { VentasFilters } from "../../components/VentasTabTemplate"
import { CotizacionRow } from "../../types/cotizacion.types"
import { fetchCotizaciones } from "../services/cotizacionService"

export type CotizacionFiltersState = {
  searchValue: string
  comprobante: string
  estado: string
  dateFrom: string
  dateTo: string
  clienteId: string
}

function getDefaultFilters(activeTab: string): CotizacionFiltersState {
  const comprobanteDefault =
    activeTab === "clientes"
      ? "Todos los Documentos"
      : activeTab === "renovacion"
        ? "Comprobantes"
        : "Todos los comprobantes"

  return {
    searchValue: "",
    comprobante: comprobanteDefault,
    estado: "Estados",
    dateFrom: "",
    dateTo: "",
    clienteId: "",
  }
}

function parseFilterDate(value: string): Date | null {
  if (!value.trim()) return null
  const separator = value.includes("/") ? "/" : value.includes("-") ? "-" : null
  if (!separator) return null
  const parts = value.split(separator)
  if (parts.length !== 3) return null
  const [day, month, year] = parts
  const date = new Date(`${year}-${month}-${day}`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function useCotizacionFilters(activeTab: string) {
  const [filters, setFilters] = useState<CotizacionFiltersState>(() =>
    getDefaultFilters(activeTab)
  )
  const [data, setData] = useState<CotizacionRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const filtersRef = useRef(filters)
  filtersRef.current = filters

  const searchRequestIdRef = useRef(0)

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const runSearch = useCallback(
    async (currentFilters: CotizacionFiltersState) => {
      const requestId = ++searchRequestIdRef.current

      setIsLoading(true)
      try {
        const startDate = parseFilterDate(currentFilters.dateFrom)
        const endDate = parseFilterDate(currentFilters.dateTo)

        const result = await fetchCotizaciones({
          tab: activeTab,
          search: currentFilters.searchValue,
          comprobante: currentFilters.comprobante,
          estado: currentFilters.estado,
          clienteId: currentFilters.clienteId || undefined,
          dateRange: { start: startDate, end: endDate },
        })

        if (requestId !== searchRequestIdRef.current) return
        setData(result)
      } catch (error) {
        if (requestId !== searchRequestIdRef.current) return
        console.error("Error fetching data:", error)
        setData([])
      } finally {
        if (requestId === searchRequestIdRef.current) {
          setIsLoading(false)
        }
      }
    },
    [activeTab]
  )

  const handleSearch = useCallback(
    (currentFilters?: VentasFilters) => {
      const filtersToUse: CotizacionFiltersState = {
        ...getDefaultFilters(activeTab),
        ...(currentFilters ?? filtersRef.current),
        searchValue: currentFilters?.searchValue ?? filtersRef.current.searchValue,
        comprobante: currentFilters?.comprobante ?? filtersRef.current.comprobante,
        estado: currentFilters?.estado ?? filtersRef.current.estado,
        dateFrom: currentFilters?.dateFrom ?? filtersRef.current.dateFrom,
        dateTo: currentFilters?.dateTo ?? filtersRef.current.dateTo,
        clienteId: currentFilters?.clienteId ?? filtersRef.current.clienteId,
      }
      return runSearch(filtersToUse)
    },
    [activeTab, runSearch]
  )

  const handleReset = useCallback(async () => {
    const defaultFilters = getDefaultFilters(activeTab)
    setFilters(defaultFilters)
    await runSearch(defaultFilters)
  }, [activeTab, runSearch])

  useEffect(() => {
    const resetFilters = getDefaultFilters(activeTab)
    setFilters(resetFilters)
    runSearch(resetFilters)
  }, [activeTab, runSearch])

  return {
    filters,
    data,
    isLoading,
    handleFilterChange,
    handleSearch,
    handleReset,
  }
}