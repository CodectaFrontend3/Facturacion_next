"use client";

import { ChevronUp, X } from "lucide-react";

import {
  almacenOptions,
  DEFAULT_AVATAR,
  rolFilterOptions,
} from "@/app/(sistema)/(menu)/usuario/data/usuarios";
import { ActionButton } from "@/components/common/ActionButton";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

import type { UsuarioDetailManager } from "../hooks/useUsuarioDetailManager";

interface UsuarioInfoCardProps {
  manager: UsuarioDetailManager;
}

const inputClass =
  "h-8 w-full rounded-none border border-gray-200 bg-white px-2.5 text-[12px] text-[#676a6c] shadow-none outline-none focus-visible:border-[#18a689] focus-visible:ring-0";

export function UsuarioInfoCard({ manager }: UsuarioInfoCardProps) {
  const {
    usuario,
    isMainInfoOpen,
    toggleMainInfo,
    updateUsuarioField,
    saveChanges,
  } = manager;

  const availableRoles = rolFilterOptions.filter(
    (opt: { label: string; value: string }) => opt.value !== "todos",
  );

  return (
    <div className="rounded border border-gray-200 bg-white shadow-xs">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
        <h3 className="text-[13px] font-bold text-[#676a6c]">
          Información de usuario
        </h3>
        <div className="flex items-center gap-2 text-gray-400">
          <button
            type="button"
            onClick={toggleMainInfo}
            className="hover:text-gray-600"
            aria-label="Colapsar"
          >
            <ChevronUp
              className={`size-4 transition-transform ${
                !isMainInfoOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <button
            type="button"
            className="hover:text-gray-600"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      {isMainInfoOpen && (
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            {/* Left: Avatar */}
            <div className="flex flex-col items-center justify-center lg:min-w-[160px]">
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-gray-100 bg-gray-50 shadow-xs">
                <img
                  src={usuario.avatarUrl || DEFAULT_AVATAR}
                  alt={usuario.nombresApellidos}
                  className="size-full object-cover"
                />
              </div>
              <button
                type="button"
                className="mt-2 text-[10px] text-gray-500 hover:text-[#1d5fbf] hover:underline"
              >
                (Click para cambiar la imagen)
              </button>
            </div>

            {/* Right: Form fields */}
            <div className="flex flex-1 flex-col gap-3">
              {/* User Title */}
              <h2 className="text-center text-[18px] font-light text-[#4b4d50] lg:text-left">
                {usuario.nombresApellidos}
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {/* Row 1: Nombre de Usuario | Correo de Acceso */}
                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Nombre de Usuario:
                  </label>
                  <Input
                    value={usuario.nombreUsuario || usuario.rol}
                    onChange={(e) =>
                      updateUsuarioField("nombreUsuario", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Correo de Acceso:
                  </label>
                  <Input
                    value={usuario.correoAcceso || usuario.correo}
                    onChange={(e) =>
                      updateUsuarioField("correoAcceso", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                {/* Row 2: Nombre Legal | Correo Legal */}
                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Nombre Legal:
                  </label>
                  <Input
                    value={usuario.nombreLegal || usuario.nombresApellidos}
                    onChange={(e) =>
                      updateUsuarioField("nombreLegal", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Correo Legal:
                  </label>
                  <Input
                    value={usuario.correoLegal || usuario.correo}
                    onChange={(e) =>
                      updateUsuarioField("correoLegal", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                {/* Row 3: Celular | Asig. Almacen */}
                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Celular:
                  </label>
                  <Input
                    value={usuario.celular}
                    onChange={(e) =>
                      updateUsuarioField("celular", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Asig. Almacen:
                  </label>
                  <NativeSelect
                    value={usuario.almacen}
                    onChange={(e) =>
                      updateUsuarioField("almacen", e.target.value)
                    }
                    className="w-full"
                    selectClassName={inputClass}
                  >
                    {almacenOptions.map((opt: { label: string; value: string }) => (
                      <NativeSelectOption key={opt.value} value={opt.value}>
                        {opt.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>

                {/* Row 4: Rol Actual | Estado Switch */}
                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Rol Actual:
                  </label>
                  <NativeSelect
                    value={usuario.rol}
                    onChange={(e) =>
                      updateUsuarioField("rol", e.target.value as any)
                    }
                    className="w-full"
                    selectClassName={inputClass}
                  >
                    {availableRoles.map((opt: { label: string; value: string }) => (
                      <NativeSelectOption key={opt.value} value={opt.value}>
                        {opt.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-36 shrink-0 text-[12px] font-medium text-[#676a6c]">
                    Estado:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500">
                      Desactivado
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={usuario.activo}
                      onClick={() =>
                        updateUsuarioField("activo", !usuario.activo)
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        usuario.activo ? "bg-[#1d5fbf]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          usuario.activo ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="text-[11px] text-gray-500">Activo</span>
                  </div>
                </div>
              </div>

              {/* Guardar button */}
              <div className="mt-4 flex justify-center">
                <ActionButton
                  type="button"
                  text="Guardar"
                  onClick={saveChanges}
                  className="h-9 w-full max-w-sm rounded-[2px] bg-[#1d5fbf] text-[13px] font-medium text-white hover:bg-[#154a96]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
