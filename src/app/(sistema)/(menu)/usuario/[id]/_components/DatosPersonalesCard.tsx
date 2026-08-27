"use client";

import { ChevronUp, X } from "lucide-react";

import type { UsuarioDetailManager } from "../hooks/useUsuarioDetailManager";

interface DatosPersonalesCardProps {
  manager: UsuarioDetailManager;
}

export function DatosPersonalesCard({ manager }: DatosPersonalesCardProps) {
  const { usuario, isPersonalInfoOpen, togglePersonalInfo } = manager;

  return (
    <div className="rounded border border-gray-200 bg-white shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
        <h3 className="text-[13px] font-bold text-[#676a6c]">
          Datos Personales del Usuario
        </h3>
        <div className="flex items-center gap-2 text-gray-400">
          <button
            type="button"
            onClick={togglePersonalInfo}
            className="hover:text-gray-600"
            aria-label="Colapsar"
          >
            <ChevronUp
              className={`size-4 transition-transform ${
                !isPersonalInfoOpen ? "rotate-180" : ""
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

      {/* Body */}
      {isPersonalInfoOpen && (
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            {/* Row 1 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Tipo de Documento
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.tipoDocumento || "DNI"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Número de Documento
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.dni}
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Fecha de Nacimiento
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.fechaNacimiento || "17-11-1971"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Género
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.genero || "Femenino"}
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Celular
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.celular}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Telefono
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.telefonoFijo || "0000000"}
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Correo
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.correo || " "}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Direccion
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.direccion || "calle"}
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Nivel Educativo
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.nivelEducativo || "universitaria"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Carrera Profesional
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.carreraProfesional || "Ingeniería"}
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Estado Civil
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.estadoCivil || "Soltero"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Licencia de Conducir
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.licenciaConducir || ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
