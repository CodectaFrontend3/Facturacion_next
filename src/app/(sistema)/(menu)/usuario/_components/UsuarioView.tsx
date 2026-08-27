"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useUsuarioManager } from "../hooks/useUsuarioManager";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { UserRolesTabsNav } from "./UserRolesTabsNav";
import { UsuarioFilterBar } from "./UsuarioFilterBar";
import { UsuarioList } from "./UsuarioList";
import { UsuarioModal } from "./UsuarioModal";

export function UsuarioView() {
  const usuarioManager = useUsuarioManager();

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
        {/* Tabs & Top Add Button (opens UsuarioModal) */}
        <UserRolesTabsNav onNew={usuarioManager.openNewModal} />

        {/* Filter Bar */}
        <UsuarioFilterBar
          filters={usuarioManager.filters}
          onFilterChange={usuarioManager.setFilter}
          onSearch={usuarioManager.applyFilters}
        />

        {/* Tab Content: List of Users */}
        <UsuarioList manager={usuarioManager} />
      </div>

      {/* Modals */}
      <UsuarioModal manager={usuarioManager} />
      <ChangePasswordModal manager={usuarioManager} />
    </div>
  );
}
