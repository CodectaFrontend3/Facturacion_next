"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/shared/DataTable";

import { getTipoCambioColumns } from "../../config/tipo-cambio-columns";
import type { TipoCambioManager } from "../../hooks/useTipoCambioManager";

interface TipoCambioListProps {
  manager: TipoCambioManager;
}

export function TipoCambioList({ manager }: TipoCambioListProps) {
  const columns = useMemo(
    () =>
      getTipoCambioColumns({
        onEdit: manager.editRecord,
      }),
    [manager.editRecord],
  );

  return (
    <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-9 [&_[data-slot=table-head]]:px-3">
      <DataTable
        columns={columns}
        data={manager.filteredRecords}
        pageSize={7}
        showSelection={false}
        showPagination
        getRowId={(item) => String(item.id)}
      />
    </div>
  );
}
