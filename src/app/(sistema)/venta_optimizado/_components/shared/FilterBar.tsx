// _components/shared/FilterBar.tsx
"use client"

import { DataFilters } from "@/components/DataFilters/DataFilters"
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange"
import { FilterSelect } from "@/components/DataFilters/FilterSelect"
import { FilterSearch } from "@/components/DataFilters/FilterSearch"
import { CboData, CboItem } from "@/components/common/CboData"
import { VentasFilters } from "../../_hooks/ventas/useVentasFilters"

interface SelectConfig {
  name: string
  options: { label: string; value: string }[]
}

interface ClienteFilterConfig {
  name: string
  items: CboItem[]
  placeholder?: string
}

interface FilterBarProps {
  filters: VentasFilters
  onFilterChange: (name: string, value: string) => void
  onSearchSubmit: () => void
  onReset: () => void

  /** Rango de fechas (Cotización, Cotización Manual, Nota de Venta, Renovación) */
  showDateRange?: boolean

  /** Primer select genérico: tipo de comprobante o tipo de documento */
  selectConfig?: SelectConfig

  /** Segundo select adicional, solo usado en Renovación (Estados) */
  estadoSelectConfig?: SelectConfig

  /**
   * Combobox de cliente con búsqueda (CboData), usado en Nota de Venta.
   * Si se pasa, reemplaza a selectConfig en esa posición del grid.
   */
  clienteFilter?: ClienteFilterConfig
}

/**
 * Barra de filtros genérica y configurable para todos los módulos de venta_optimizado.
 * No contiene lógica propia de ningún módulo — solo decide qué piezas de
 * @/components/DataFilters renderizar según la configuración recibida.
 *
 * Cada route pasa únicamente lo que necesita:
 * - Cotización / Cotización Manual → selectConfig (Factura/Boleta/Nota de Venta)
 * - Nota de Venta                  → clienteFilter (combobox de cliente)
 * - Clientes                       → selectConfig (DNI/RUC), showDateRange={false}
 * - Renovación                     → selectConfig + estadoSelectConfig (2 selects)
 */
export function FilterBar({
  filters,
  onFilterChange,
  onSearchSubmit,
  onReset,
  showDateRange = true,
  selectConfig,
  estadoSelectConfig,
  clienteFilter,
}: FilterBarProps) {
  return (
    <DataFilters onSearch={onSearchSubmit} onReset={onReset}>
      {showDateRange && (
        <FilterDateRange
          nameFrom="dateFrom"
          nameTo="dateTo"
          valueFrom={filters.dateFrom}
          valueTo={filters.dateTo}
          onChange={onFilterChange}
        />
      )}

      {clienteFilter ? (
        <CboData
          items={clienteFilter.items}
          value={filters[clienteFilter.name] ?? ""}
          onChange={(value) => onFilterChange(clienteFilter.name, value)}
          placeholder={clienteFilter.placeholder ?? "Seleccionar Cliente"}
          searchPlaceholder="Buscar cliente..."
          className="w-full"
        />
      ) : (
        selectConfig && (
          <FilterSelect
            name={selectConfig.name}
            value={filters[selectConfig.name] ?? selectConfig.options[0]?.value ?? ""}
            onChange={onFilterChange}
            options={selectConfig.options}
          />
        )
      )}

      {estadoSelectConfig && (
        <FilterSelect
          name={estadoSelectConfig.name}
          value={filters[estadoSelectConfig.name] ?? estadoSelectConfig.options[0]?.value ?? ""}
          onChange={onFilterChange}
          options={estadoSelectConfig.options}
        />
      )}

      <FilterSearch
        name="searchValue"
        value={filters.searchValue}
        onChange={onFilterChange}
        placeholder="Buscar:"
      />
    </DataFilters>
  )
}
