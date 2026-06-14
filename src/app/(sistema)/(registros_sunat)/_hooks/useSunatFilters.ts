import { useMemo } from "react"
import { useTableData } from "@/hooks/useTableData"

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

  // Definimos la función de filtrado compatible con useTableData
  const filterFn = useMemo(() => {
    return (items: T[], values: Record<string, string>) => {
      const searchValue = values.searchValue || ""
      const dateFromVal = values.dateFrom || ""
      const dateToVal = values.dateTo || ""

      return items.filter((item) => {
        // 1. Filtrado por rango de fechas (DD/MM/YYYY)
        if (dateField && (dateFromVal || dateToVal)) {
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
            
            if (dateFromVal) {
              const dateFrom = parseDate(dateFromVal)
              if (dateItem < dateFrom) return false
            }
            
            if (dateToVal) {
              const dateTo = parseDate(dateToVal)
              dateTo.setHours(23, 59, 59, 999) // Incluir todo el día final
              if (dateItem > dateTo) return false
            }
          }
        }

        // 2. Filtrado por búsqueda de texto
        if (searchValue.trim() !== "" && searchFields.length > 0) {
          const query = searchValue.toLowerCase()
          const match = searchFields.some((field) => {
            const val = item[field]
            return val ? String(val).toLowerCase().includes(query) : false
          })
          if (!match) return false
        }

        return true
      })
    }
  }, [searchFields, dateField])

  // Delegamos el estado de los filtros y la paginación al hook centralizado useTableData
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
  } = useTableData({
    data,
    filterFn,
    initialFilters: {
      searchValue: "",
      dateFrom: "05/01/2026",
      dateTo: "05/31/2026",
    },
    pageSize: 10,
  })

  return {
    pendingFilters: {
      searchValue: pendingFilters.searchValue || "",
      dateFrom: pendingFilters.dateFrom || "",
      dateTo: pendingFilters.dateTo || "",
    },
    setFilterValue,
    applyFilters,
    resetFilters,
    filteredData,
  }
}
