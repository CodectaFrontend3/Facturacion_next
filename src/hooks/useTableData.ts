import { useState, useMemo, useCallback } from "react";

interface UseTableDataOptions<TData> {
  data: TData[];
  filterFn: (data: TData[], values: Record<string, string>) => TData[];
  initialFilters?: Record<string, string>;
  pageSize?: number;
}

export function useTableData<TData>({
  data,
  filterFn,
  initialFilters = {},
  pageSize = 16,
}: UseTableDataOptions<TData>) {
  // Lo que el usuario va tocando — no filtra hasta Buscar
  const [pendingFilters, setPendingFilters] =
    useState<Record<string, string>>(initialFilters);
  // Lo que realmente filtra la data — se actualiza solo al presionar Buscar
  const [activeFilters, setActiveFilters] =
    useState<Record<string, string>>(initialFilters);
  const [pageIndex, setPageIndex] = useState(0);

  // Actualiza un filtro pendiente sin afectar la tabla
  const setFilterValue = useCallback((name: string, value: string) => {
    setPendingFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Aplica los filtros pendientes a la tabla y resetea la página
  const applyFilters = useCallback(() => {
    setActiveFilters(pendingFilters);
    setPageIndex(0);
  }, [pendingFilters]);

  // Limpia todo — pendientes y activos
  const resetFilters = useCallback(() => {
    setPendingFilters(initialFilters);
    setActiveFilters(initialFilters);
    setPageIndex(0);
  }, [initialFilters]);

  // Solo filtra con activeFilters
  const filteredData = useMemo(() => {
    return filterFn(data, activeFilters);
  }, [data, activeFilters, filterFn]);

  const pageCount = Math.ceil(filteredData.length / pageSize);

  return {
    // Data
    filteredData,
    totalCount: filteredData.length,
    // Filtros
    pendingFilters,
    activeFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    // Paginación
    pageIndex,
    setPageIndex,
    pageCount,
    pageSize,
  };
}
