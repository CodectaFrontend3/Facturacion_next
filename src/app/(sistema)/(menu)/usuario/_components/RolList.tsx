"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/shared/DataTable";

import { getRolColumns } from "../config/rol-columns";
import type { RolManager } from "../hooks/useRolManager";
import type { Rol } from "../types/usuario";

interface RolListProps {
  manager: RolManager;
}

export function RolList({ manager }: RolListProps) {
  const router = useRouter();
  const { filteredRoles, openViewModal } = manager;

  const handleEditRole = (rol: Rol) => {
    router.push(`/roles/${rol.id}/edit`);
  };

  const columns = useMemo(
    () =>
      getRolColumns({
        onEdit: handleEditRole,
        onViewUsers: openViewModal,
      }),
    [openViewModal],
  );

  return (
    <div className="px-5 pb-5">
      <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-9 [&_[data-slot=table-head]]:px-3">
        <DataTable
          columns={columns}
          data={filteredRoles}
          pageSize={10}
          showSelection={true}
          showPagination={true}
          getRowId={(item) => String(item.id)}
        />
      </div>
    </div>
  );
}
