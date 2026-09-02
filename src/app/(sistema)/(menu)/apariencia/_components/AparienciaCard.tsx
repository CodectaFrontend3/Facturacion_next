"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

import { ComprobanteSection } from "./comprobante/ComprobanteSection";
import { OtrosSection } from "./otros/OtrosSection";
import { PerfilSection } from "./perfil/PerfilSection";

export function AparienciaCard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full rounded-[4px] border border-gray-200 bg-white shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
        <h2 className="text-[14px] font-bold text-[#676a6c]">
          Configuración de apariencia
        </h2>
        <button
          type="button"
          aria-label="Colapsar"
          title="Colapsar"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
        >
          <ChevronUp
            className={`size-4 transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      {!isCollapsed && (
        <div className="flex flex-col gap-6 p-6 sm:p-7">
          {/* Top Section: Perfil */}
          <PerfilSection />

          {/* Bottom Grid: Comprobante & Otros */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ComprobanteSection />
            <OtrosSection />
          </div>

          {/* Footer Action */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer rounded-[4px] border border-gray-300 bg-white px-6 py-2 text-[13px] font-semibold text-[#676a6c] shadow-xs transition-colors hover:bg-gray-50"
            >
              Atrás
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-[4px] bg-[#1d5fbf] px-6 py-2 text-[13px] font-semibold text-white shadow-xs transition-colors hover:bg-[#154a96]"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
