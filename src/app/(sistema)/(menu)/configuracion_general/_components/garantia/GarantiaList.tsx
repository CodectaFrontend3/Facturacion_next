"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";

import { getGarantiaColumns } from "../../config/garantia-columns";
import type { GarantiaManager } from "../../hooks/useGarantiaManager";

interface GarantiaListProps {
  manager: GarantiaManager;
}

const searchInputClass =
  "h-9 w-full sm:w-[280px] rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function GarantiaList({ manager }: GarantiaListProps) {
  const columns = useMemo(
    () =>
      getGarantiaColumns({
        onToggleStatus: manager.toggleGarantiaStatus,
        onEdit: manager.editGarantia,
      }),
    [manager.toggleGarantiaStatus, manager.editGarantia],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="garantia-search"
          className="text-[13px] font-normal text-[#676a6c]"
        >
          Buscar:
        </label>
        <Input
          id="garantia-search"
          value={manager.search}
          onChange={(e) => manager.setSearch(e.target.value)}
          className={searchInputClass}
        />
      </div>

      {/* DataTable */}
      <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-9 [&_[data-slot=table-head]]:px-3">
        <DataTable
          columns={columns}
          data={manager.filteredGarantias}
          pageSize={8}
          showSelection={false}
          showPagination
          getRowId={(item) => String(item.id)}
        />
      </div>
    </div>
  );
}
