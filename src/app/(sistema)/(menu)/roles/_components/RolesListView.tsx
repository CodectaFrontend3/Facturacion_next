"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RoleUsersModal } from "@/app/(sistema)/(menu)/usuario/_components/RoleUsersModal";
import { RolList } from "@/app/(sistema)/(menu)/usuario/_components/RolList";
import { UserRolesTabsNav } from "@/app/(sistema)/(menu)/usuario/_components/UserRolesTabsNav";
import { UsuarioFilterBar } from "@/app/(sistema)/(menu)/usuario/_components/UsuarioFilterBar";
import { useRolManager } from "@/app/(sistema)/(menu)/usuario/hooks/useRolManager";
import { useUsuarioManager } from "@/app/(sistema)/(menu)/usuario/hooks/useUsuarioManager";

export function RolesListView() {
  const usuarioManager = useUsuarioManager();
  const rolManager = useRolManager(
    usuarioManager.filters.search,
    usuarioManager.filters.rol,
  );

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3.5 p-3 sm:p-5">
      {/* Back button to Configuración General */}
      <div className="flex items-center justify-between">
        <Link
          href="/configuracion_general"
          className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-[13px] font-semibold text-[#676a6c] shadow-2xs border border-gray-200 transition-colors hover:bg-gray-50 hover:text-[#1d5fbf]"
        >
          <ArrowLeft className="size-4" />
          Volver a Configuración General
        </Link>
      </div>

      {/* Main Container */}
      <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-xs">
        {/* Shared Tabs Nav with (+) linking directly to /roles/create */}
        <UserRolesTabsNav newHref="/roles/create" />

        {/* Filter Bar */}
        <UsuarioFilterBar
          filters={usuarioManager.filters}
          onFilterChange={usuarioManager.setFilter}
          onSearch={usuarioManager.applyFilters}
        />

        {/* Roles Table */}
        <RolList manager={rolManager} />
      </div>

      {/* Modal with users belonging to selected role */}
      <RoleUsersModal manager={rolManager} />
    </div>
  );
}
