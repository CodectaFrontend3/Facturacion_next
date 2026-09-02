"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

interface UserRolesTabsNavProps {
  onNew?: () => void;
  newHref?: string;
}

export function UserRolesTabsNav({ onNew, newHref }: UserRolesTabsNavProps) {
  const pathname = usePathname();

  const isUsuariosActive = pathname === "/usuario";
  const isRolesActive = pathname === "/roles";

  return (
    <div className="flex items-end justify-between border-b border-gray-200 bg-white px-5 pt-3">
      {/* Tabs styled like RegistrosSunatTemplate */}
      <div className="flex items-center">
        {/* Tab 1: Usuarios */}
        <Link
          href="/usuario"
          className={`relative top-[1px] flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all rounded-none ${
            isUsuariosActive
              ? "bg-white border-x border-t border-gray-200 text-gray-800"
              : "text-gray-500 border-x border-t border-transparent hover:text-gray-700"
          }`}
        >
          <span
            className="size-2.5 shrink-0 block"
            style={{ backgroundColor: "#1d5fbf" }}
          />
          <span className="text-[13px] font-bold">Usuarios</span>
        </Link>

        {/* Tab 2: Roles y Permisos */}
        <Link
          href="/roles"
          className={`relative top-[1px] flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all rounded-none ${
            isRolesActive
              ? "bg-white border-x border-t border-gray-200 text-gray-800"
              : "text-gray-500 border-x border-t border-transparent hover:text-gray-700"
          }`}
        >
          <span
            className="size-2.5 shrink-0 block"
            style={{ backgroundColor: "#1ab394" }}
          />
          <span className="text-[13px] font-bold">Roles y Permisos</span>
        </Link>
      </div>

      {/* Action Button (+) */}
      <div className="pb-1.5">
        {newHref ? (
          <Link
            href={newHref}
            className="flex size-8 items-center justify-center rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
            title="Nuevo"
          >
            <Plus className="size-4 stroke-[3]" />
          </Link>
        ) : (
          <ActionButton
            type="button"
            label="Nuevo"
            icon={<Plus className="size-4 stroke-[3]" />}
            onClick={onNew}
            className="size-8 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
          />
        )}
      </div>
    </div>
  );
}
