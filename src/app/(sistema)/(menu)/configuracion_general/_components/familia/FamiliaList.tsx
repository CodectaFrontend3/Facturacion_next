"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/shared/DataTable";
import { Input } from "@/components/ui/input";

import { getFamiliaColumns } from "../../config/familia-columns";
import type { FamiliaManager } from "../../hooks/useFamiliaManager";

interface FamiliaListProps {
  manager: FamiliaManager;
}

const searchInputClass =
  "h-9 w-full rounded-none border-gray-300 bg-white px-3 text-[13px] text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function FamiliaList({ manager }: FamiliaListProps) {
  const router = useRouter();

  const handleView = (id: number) => {
    manager.handleOpenChange(false);
    router.push(`/familia/${id}`);
  };

  const columns = useMemo(
    () =>
      getFamiliaColumns({
        onView: handleView,
        onToggleStatus: manager.toggleStatus,
      }),
    [manager.toggleStatus],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="flex items-center gap-3">
        <label
          htmlFor="familia-search"
          className="text-[13px] font-normal text-[#676a6c]"
        >
          Buscar:
        </label>
        <Input
          id="familia-search"
          value={manager.search}
          onChange={(e) => manager.setSearch(e.target.value)}
          className={searchInputClass}
        />
      </div>

      {/* DataTable */}
      <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-9 [&_[data-slot=table-head]]:px-3">
        <DataTable
          columns={columns}
          data={manager.filteredFamilias}
          pageSize={8}
          showSelection={false}
          showPagination
          getRowId={(item) => String(item.id)}
        />
      </div>
    </div>
  );
}
