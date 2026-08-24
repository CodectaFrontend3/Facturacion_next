"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";

import { getUnitMeasureColumns } from "../../config/unit-measure-columns";
import type { UnitMeasureManager } from "../../hooks/useUnitMeasureManager";

const searchInputClass =
  "h-10 w-full rounded-none border-gray-300 bg-white px-3 text-[14px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function UnitMeasureList({ manager }: { manager: UnitMeasureManager }) {
  const columns = useMemo(
    () =>
      getUnitMeasureColumns({
        onEdit: manager.editUnit,
        onToggleStatus: manager.toggleStatus,
      }),
    [manager.editUnit, manager.toggleStatus],
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label htmlFor="unit-search" className="text-[13px] text-[#676a6c]">
          Buscar:
        </label>
        <Input
          id="unit-search"
          value={manager.search}
          onChange={(event) => manager.setSearch(event.target.value)}
          className={searchInputClass}
        />
      </div>
      <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-10 [&_[data-slot=table-head]]:px-3">
        <DataTable
          columns={columns}
          data={manager.filteredUnits}
          pageSize={8}
          showSelection={false}
          showPagination
          getRowId={(item) => String(item.id)}
        />
      </div>
    </div>
  );
}
