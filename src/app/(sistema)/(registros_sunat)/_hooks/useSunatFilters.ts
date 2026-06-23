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
    const parseDate = (dStr: string) => {
      const parts = dStr.split(/[/-]/)
      if (parts.length === 3) {
        // DD/MM/YYYY o DD-MM-YYYY -> Date (mes es 0-indexed)
        return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
      }
      return new Date(dStr)
    }

    return (items: T[], values: Record<string, string>) => {
      const searchValue = values.searchValue || ""
      const dateFromVal = values.dateFrom || ""
      const dateToVal = values.dateTo || ""

      const parsedDateFrom = dateFromVal ? parseDate(dateFromVal) : null
      const parsedDateTo = dateToVal ? parseDate(dateToVal) : null
      if (parsedDateTo) {
        parsedDateTo.setHours(23, 59, 59, 999) // Incluir todo el día final
      }

      const query = searchValue.trim().toLowerCase()
      const hasSearchQuery = query !== "" && searchFields.length > 0

      return items.filter((item) => {
        // 1. Filtrado por rango de fechas (DD/MM/YYYY)
        if (dateField && (parsedDateFrom || parsedDateTo)) {
          const itemDateVal = item[dateField] || (item as any)["fechaCreacion"] || (item as any)["fechaEmision"]
          if (itemDateVal) {
            const dateItem = parseDate(String(itemDateVal))
            
            if (parsedDateFrom && dateItem < parsedDateFrom) return false
            if (parsedDateTo && dateItem > parsedDateTo) return false
          }
        }

        // 2. Filtrado por búsqueda de texto
        if (hasSearchQuery) {
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

  // Calculamos dinámicamente el primer y último día del mes actual en formato DD/MM/YYYY
  const { defaultDateFrom, defaultDateTo } = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const lastDayDate = new Date(year, now.getMonth() + 1, 0)
    const lastDay = String(lastDayDate.getDate()).padStart(2, "0")
    return {
      defaultDateFrom: `01/${month}/${year}`,
      defaultDateTo: `${lastDay}/${month}/${year}`
    }
  }, [])

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
      dateFrom: defaultDateFrom,
      dateTo: defaultDateTo,
    },
    initialActiveFilters: {
      searchValue: "",
      dateFrom: "",
      dateTo: "",
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
