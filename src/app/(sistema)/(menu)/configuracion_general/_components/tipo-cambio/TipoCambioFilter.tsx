"use client";

import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";

import type { TipoCambioManager } from "../../hooks/useTipoCambioManager";

interface TipoCambioFilterProps {
  manager: TipoCambioManager;
}

export function TipoCambioFilter({ manager }: TipoCambioFilterProps) {
  return (
    <div className="w-full">
      <FilterDateRange
        nameFrom="fechaDesde"
        nameTo="fechaHasta"
        label="Fecha:"
        valueFrom={manager.fechaDesde}
        valueTo={manager.fechaHasta}
        onChange={manager.setFilterValue}
      />
    </div>
  );
}
