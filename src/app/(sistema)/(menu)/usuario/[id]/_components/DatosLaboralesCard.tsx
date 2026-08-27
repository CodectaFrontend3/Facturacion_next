"use client";

import { ChevronUp, X } from "lucide-react";

import type { UsuarioDetailManager } from "../hooks/useUsuarioDetailManager";

interface DatosLaboralesCardProps {
  manager: UsuarioDetailManager;
}

export function DatosLaboralesCard({ manager }: DatosLaboralesCardProps) {
  const { usuario, isLaborInfoOpen, toggleLaborInfo } = manager;

  return (
    <div className="rounded border border-gray-200 bg-white shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
        <h3 className="text-[13px] font-bold text-[#676a6c]">
          Datos Laborales del Usuario
        </h3>
        <div className="flex items-center gap-2 text-gray-400">
          <button
            type="button"
            onClick={toggleLaborInfo}
            className="hover:text-gray-600"
            aria-label="Colapsar"
          >
            <ChevronUp
              className={`size-4 transition-transform ${
                !isLaborInfoOpen ? "rotate-180" : ""
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
      {isLaborInfoOpen && (
        <div className="p-4 sm:p-5">
          {/* Row 1: 3 columns (Área | Cargo | Tipo de Trabajador) */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3">
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Área
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.area || "Administracion"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Cargo
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.cargo || "vendedor"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Tipo de Trabajador
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.tipoTrabajador || "Interno"}
              </div>
            </div>
          </div>

          {/* Subsequent rows: 2 columns */}
          <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            {/* Row 2 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Sede
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.sede || "Sin sede"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Turno
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.turno || "Mañana"}
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Salario
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.salario ?? 0}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Fecha Vinculacion
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.fechaVinculacion || "Sin Registro"}
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Fecha Retiro
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.fechaRetiro || "-- -- --"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Banco abonado
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.bancoAbonado || "BCP"}
              </div>
            </div>

            {/* Row 5 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Numero de Cuenta
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.numeroCuenta || "Sin numero_cuenta"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Seguro de Salud
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.seguroSalud || "Sin Seguro"}
              </div>
            </div>

            {/* Row 6 */}
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Tipo Contrato
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.tipoContrato || "Indefinido"}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold text-[#676a6c]">
                Regimen Pensionario
              </span>
              <div className="flex h-8 items-center rounded-[2px] bg-[#f0f3f6] px-3 text-[12px] text-[#676a6c]">
                {usuario.regimenPensionario || "Sin Regimen"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
