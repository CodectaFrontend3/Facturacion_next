import { useState, useMemo } from "react"

export interface SunatFilterState {
  searchValue: string
  dateFrom: string
  dateTo: string
}

interface UseSunatFiltersProps<T> {
  data: T[]
  searchFields?: (keyof T)[]
  dateField?: keyof T
}

export function useSunatFilters<T>({
  data,
  searchFields = [],
  dateField,
}: UseSunatFiltersProps<T>) {
  // Estado para los filtros pendientes en la UI
  const [pendingFilters, setPendingFilters] = useState<SunatFilterState>({
    searchValue: "",
    dateFrom: "05/01/2026",
    dateTo: "05/31/2026",
  })

  // Estado para los filtros aplicados al hacer clic en "Buscar"
  const [appliedFilters, setAppliedFilters] = useState<SunatFilterState>({ ...pendingFilters })

  const setFilterValue = (name: string, value: string) => {
    setPendingFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    setAppliedFilters({ ...pendingFilters })
  }

  const resetFilters = () => {
    const defaultFilters = {
      searchValue: "",
      dateFrom: "05/01/2026",
      dateTo: "05/31/2026",
    }
    setPendingFilters(defaultFilters)
    setAppliedFilters(defaultFilters)
  }

  // Filtrado de los datos locales de manera reactiva y eficiente
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Filtrado por rango de fechas (DD/MM/YYYY)
      if (dateField && (appliedFilters.dateFrom || appliedFilters.dateTo)) {
        const itemDateVal = item[dateField]
        if (itemDateVal) {
          const itemDateStr = String(itemDateVal)

          const parseDate = (dStr: string) => {
            const parts = dStr.split("/")
            if (parts.length === 3) {
              // DD/MM/YYYY -> Date (mes es 0-indexed)
              return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
            }
            return new Date(dStr)
          }

          const dateItem = parseDate(itemDateStr)
          
          if (appliedFilters.dateFrom) {
            const dateFrom = parseDate(appliedFilters.dateFrom)
            if (dateItem < dateFrom) return false
          }
          
          if (appliedFilters.dateTo) {
            const dateTo = parseDate(appliedFilters.dateTo)
            dateTo.setHours(23, 59, 59, 999) // Incluir todo el día final
            if (dateItem > dateTo) return false
          }
        }
      }

      // 2. Filtrado por búsqueda de texto
      if (appliedFilters.searchValue.trim() !== "" && searchFields.length > 0) {
        const query = appliedFilters.searchValue.toLowerCase()
        const match = searchFields.some((field) => {
          const val = item[field]
          return val ? String(val).toLowerCase().includes(query) : false
        })
        if (!match) return false
      }

      return true
    })
  }, [data, appliedFilters, searchFields, dateField])

  return {
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    filteredData,
  }
}
