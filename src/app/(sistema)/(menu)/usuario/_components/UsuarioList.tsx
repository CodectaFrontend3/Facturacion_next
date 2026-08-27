"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/shared/DataTable";

import { getUsuarioColumns } from "../config/usuario-columns";
import type { UsuarioManager } from "../hooks/useUsuarioManager";
import type { Usuario } from "../types/usuario";

interface UsuarioListProps {
  manager: UsuarioManager;
}

export function UsuarioList({ manager }: UsuarioListProps) {
  const router = useRouter();
  const { filteredUsuarios, openPasswordModal, toggleStatus } = manager;

  const handleView = (usuario: Usuario) => {
    router.push(`/usuario/${usuario.id}`);
  };

  const columns = useMemo(
    () =>
      getUsuarioColumns({
        onView: handleView,
        onChangePassword: openPasswordModal,
        onToggleStatus: toggleStatus,
      }),
    [openPasswordModal, toggleStatus],
  );

  return (
    <div className="px-5 pb-5">
      <div className="min-w-0 [&_[data-slot=table-cell]]:px-3 [&_[data-slot=table-cell]]:py-2 [&_[data-slot=table-head]]:h-9 [&_[data-slot=table-head]]:px-3">
        <DataTable
          columns={columns}
          data={filteredUsuarios}
          pageSize={15}
          showSelection={true}
          showPagination={true}
          getRowId={(item) => String(item.id)}
        />
      </div>
    </div>
  );
}
