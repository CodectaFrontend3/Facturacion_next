import { useMemo } from "react";
import { Plus } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { DataTable } from "@/components/shared/DataTable";

import { getWarehouseColumns } from "../../config/warehouse-columns";
import type { WarehouseManager } from "../../hooks/useWarehouseManager";

interface WarehouseListProps {
  manager: WarehouseManager;
}

export function WarehouseList({ manager }: WarehouseListProps) {
  const columns = useMemo(
    () =>
      getWarehouseColumns({
        onView: manager.openView,
        onEdit: manager.openEdit,
        onToggleStatus: manager.toggleWarehouseStatus,
      }),
    [manager.openEdit, manager.openView, manager.toggleWarehouseStatus],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
      <div className="flex items-center justify-end">
        <ActionButton
          label="Agregar almacén"
          icon={<Plus className="size-5 stroke-[3]" />}
          onClick={manager.openCreate}
          className="size-9 rounded-[2px] bg-[#2C1FF3] text-white hover:bg-[#190FCE]"
        />
      </div>

      <div className="min-w-0 [&_[data-slot=table]]:min-w-[900px] [&_[data-slot=table-cell]]:px-2 [&_[data-slot=table-cell]]:py-1! [&_[data-slot=table-head]]:h-8 [&_[data-slot=table-head]]:px-2">
        <DataTable
          columns={columns}
          data={manager.warehouses}
          pageSize={5}
          showSelection={false}
          showPagination
          getRowId={(warehouse) => String(warehouse.id)}
        />
      </div>
    </div>
  );
}
