"use client";

import { Users } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Input } from "@/components/ui/input";

import type { FamiliaDetailManager } from "../hooks/useFamiliaDetailManager";

interface FamiliaInfoCardProps {
  manager: FamiliaDetailManager;
}

export function FamiliaInfoCard({ manager }: FamiliaInfoCardProps) {
  const {
    familia,
    isEditingFamilia,
    editingFamiliaForm,
    startEditFamilia,
    cancelEditFamilia,
    setFamiliaForm,
    saveFamilia,
    toggleFamiliaStatus,
  } = manager;

  return (
    <div className="rounded border border-gray-200 bg-white p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Icon & Label */}
        <div className="flex flex-col items-center justify-center lg:min-w-[120px]">
          <div className="flex size-16 items-center justify-center text-[#212529]">
            <Users className="size-12 stroke-[1.75]" />
          </div>
          <span className="mt-1 text-center text-[12px] font-bold uppercase tracking-wider text-[#374151]">
            {familia.descripcion}
          </span>
        </div>

        {/* Middle & Right: Form Row */}
        <div className="flex flex-1 flex-wrap items-end gap-3.5 sm:gap-5 lg:justify-start lg:pl-2">
          {/* Codigo */}
          <div className="flex flex-col">
            <span className="mb-1 text-[12px] font-bold text-[#676a6c]">
              Codigo:
            </span>
            <div className="flex h-9 w-24 items-center justify-center rounded-[2px] bg-[#f0f3f6] text-[13px] font-medium text-[#676a6c]">
              {familia.codigo}
            </div>
          </div>

          {/* Descripcion */}
          <div className="flex flex-1 flex-col min-w-[240px]">
            <span className="mb-1 text-[12px] font-bold text-[#676a6c]">
              Descripcion:
            </span>
            {isEditingFamilia ? (
              <Input
                value={editingFamiliaForm.descripcion}
                onChange={(e) =>
                  setFamiliaForm("descripcion", e.target.value)
                }
                autoFocus
                className="h-9 rounded-[2px] border-gray-300 bg-white px-3 text-[13px] font-medium text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0"
              />
            ) : (
              <div className="flex h-9 items-center rounded-[2px] bg-[#f0f3f6] px-3.5 text-[13px] font-medium text-[#676a6c]">
                {familia.descripcion}
              </div>
            )}
          </div>

          {/* Ubicacion */}
          <div className="flex flex-col">
            <span className="mb-1 text-[12px] font-bold text-[#676a6c]">
              Ubicacion:
            </span>
            {isEditingFamilia ? (
              <Input
                value={editingFamiliaForm.ubicacion}
                onChange={(e) =>
                  setFamiliaForm("ubicacion", e.target.value)
                }
                className="h-9 w-28 rounded-[2px] border-gray-300 bg-white px-3 text-center text-[13px] font-medium text-[#676a6c] shadow-none focus-visible:border-[#18a689] focus-visible:ring-0"
              />
            ) : (
              <div className="flex h-9 w-28 items-center justify-center rounded-[2px] bg-[#f0f3f6] text-[13px] font-medium text-[#676a6c]">
                {familia.ubicacion}
              </div>
            )}
          </div>

          {/* Estado Switch */}
          <div className="flex flex-col items-center">
            <span className="mb-1 text-[12px] font-bold text-[#676a6c]">
              Estado
            </span>
            <div className="flex h-9 items-center">
              <button
                type="button"
                role="switch"
                aria-checked={familia.activo}
                onClick={toggleFamiliaStatus}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  familia.activo ? "bg-[#e2445c]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    familia.activo ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Button: Editar / Guardar & Cancelar */}
          <div className="flex items-center self-end lg:ml-auto">
            {isEditingFamilia ? (
              <div className="flex flex-col gap-1.5">
                <ActionButton
                  type="button"
                  text="Guardar"
                  onClick={saveFamilia}
                  className="h-8 w-24 rounded-[2px] bg-[#1d5fbf] text-[13px] font-medium text-white hover:bg-[#154a96]"
                />
                <ActionButton
                  type="button"
                  text="Cancelar"
                  onClick={cancelEditFamilia}
                  className="h-8 w-24 rounded-[2px] bg-[#f59e0b] text-[13px] font-medium text-white hover:bg-[#d97706]"
                />
              </div>
            ) : (
              <ActionButton
                type="button"
                text="Editar"
                onClick={startEditFamilia}
                className="h-9 px-7 rounded-[2px] bg-[#1d5fbf] text-[13px] font-medium text-white hover:bg-[#154a96]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
