"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";

import { getValidezColumns } from "../../config/validez-columns";
import type { ValidezManager } from "../../hooks/useValidezManager";

interface ValidezListProps {
  manager: ValidezManager;
}

const searchInputClass =
  "h-9 w-full sm:w-[280px] rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function ValidezList({ manager }: ValidezListProps) {
  const columns = useMemo(
    () =>
      getValidezColumns({
        onToggleStatus: manager.toggleStatus,
        onEdit: manager.editValidez,
      }),
    [manager.toggleStatus, manager.editValidez],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="validez-search"
          className="text-[13px] font-normal text-[#676a6c]"
        >
          Buscar:
        </label>
        <Input
          id="validez-search"
          value={manager.search}
          onChange={(e) => manager.setSearch(e.target.value)}
          className={searchInputClass}
        />
      </div>

      {/* DataTable */}
      <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-9 [&_[data-slot=table-head]]:px-3">
        <DataTable
          columns={columns}
          data={manager.filteredValideces}
          pageSize={7}
          showSelection={false}
          showPagination
          getRowId={(item) => String(item.id)}
        />
      </div>
    </div>
  );
}
