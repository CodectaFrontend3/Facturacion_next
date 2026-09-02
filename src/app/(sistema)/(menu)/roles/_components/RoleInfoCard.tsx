"use client";

import { ChevronUp } from "lucide-react";

import { DEFAULT_AVATAR } from "@/app/(sistema)/(menu)/usuario/data/usuarios";
import { ActionButton } from "@/components/common/ActionButton";
import { Input } from "@/components/ui/input";

import type { RolePermissionsManager } from "../hooks/useRolePermissionsManager";

interface RoleInfoCardProps {
  manager: RolePermissionsManager;
}

const inputClass =
  "h-8 w-full rounded-none border border-gray-200 bg-white px-3 text-[12px] text-[#676a6c] shadow-none outline-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function RoleInfoCard({ manager }: RoleInfoCardProps) {
  const {
    isEdit,
    nombre,
    descripcion,
    isMainCardOpen,
    setNombre,
    setDescripcion,
    toggleMainCard,
    saveRole,
  } = manager;

  return (
    <div className="rounded border border-gray-200 bg-white shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
        <h3 className="text-[13px] font-bold text-[#676a6c]">
          {isEdit
            ? "Editar Rol y Asignar Permisos"
            : "Crear un Rol y Asignar Permisos"}
        </h3>
        <button
          type="button"
          onClick={toggleMainCard}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Colapsar"
        >
          <ChevronUp
            className={`size-4 transition-transform ${
              !isMainCardOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Body */}
      {isMainCardOpen && (
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            {/* Left: Avatar Icon */}
            <div className="flex flex-col items-center justify-center lg:min-w-[130px]">
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-gray-100 bg-gray-50 shadow-xs">
                <img
                  src={DEFAULT_AVATAR}
                  alt="Rol avatar"
                  className="size-full object-cover"
                />
              </div>
            </div>

            {/* Right: Inputs & Save button */}
            <div className="flex flex-1 flex-col gap-3">
              {/* Nombre del Rol */}
              <div className="flex flex-col">
                <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                  Nombre del Rol
                </span>
                <Input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingresa el nombre del rol"
                  className={inputClass}
                />
              </div>

              {/* Descripcion */}
              <div className="flex flex-col">
                <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                  Descripcion
                </span>
                <Input
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ingresa la descripción del rol"
                  className={inputClass}
                />
              </div>

              {/* Button: Guardar */}
              <div className="mt-2">
                <ActionButton
                  type="button"
                  text="Guardar"
                  onClick={saveRole}
                  className="h-8 w-full rounded-[2px] bg-[#1d5fbf] text-[13px] font-medium text-white hover:bg-[#154a96]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
