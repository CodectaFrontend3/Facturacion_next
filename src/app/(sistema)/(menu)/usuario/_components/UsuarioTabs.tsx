"use client";

import { Plus } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";

import type { ActiveTab } from "../types/usuario";

interface UsuarioTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onNew: () => void;
}

export function UsuarioTabs({
  activeTab,
  onTabChange,
  onNew,
}: UsuarioTabsProps) {
  return (
    <div className="flex items-end justify-between border-b border-gray-200 bg-white px-5 pt-3">
      {/* Tabs styled like RegistrosSunatTemplate */}
      <div className="flex items-center">
        {/* Tab 1: Usuarios */}
        <button
          type="button"
          onClick={() => onTabChange("usuarios")}
          className={`relative top-[1px] flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all rounded-none cursor-pointer ${
            activeTab === "usuarios"
              ? "bg-white border-x border-t border-gray-200 text-gray-800"
              : "text-gray-500 border-x border-t border-transparent hover:text-gray-700"
          }`}
        >
          <span
            className="size-2.5 shrink-0 block"
            style={{ backgroundColor: "#1d5fbf" }}
          />
          <span className="text-[13px] font-bold">Usuarios</span>
        </button>

        {/* Tab 2: Roles y Permisos */}
        <button
          type="button"
          onClick={() => onTabChange("roles")}
          className={`relative top-[1px] flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all rounded-none cursor-pointer ${
            activeTab === "roles"
              ? "bg-white border-x border-t border-gray-200 text-gray-800"
              : "text-gray-500 border-x border-t border-transparent hover:text-gray-700"
          }`}
        >
          <span
            className="size-2.5 shrink-0 block"
            style={{ backgroundColor: "#1ab394" }}
          />
          <span className="text-[13px] font-bold">Roles y Permisos</span>
        </button>
      </div>

      {/* Action Button (+) */}
      <div className="pb-1.5">
        <ActionButton
          type="button"
          label={activeTab === "usuarios" ? "Nuevo Usuario" : "Nuevo Rol"}
          icon={<Plus className="size-4 stroke-[3]" />}
          onClick={onNew}
          className="size-8 rounded-[2px] bg-[#1d5fbf] text-white hover:bg-[#154a96]"
        />
      </div>
    </div>
  );
}
