"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useUsuarioDetailManager } from "../hooks/useUsuarioDetailManager";
import { DatosLaboralesCard } from "./DatosLaboralesCard";
import { DatosPersonalesCard } from "./DatosPersonalesCard";
import { UsuarioInfoCard } from "./UsuarioInfoCard";

interface UsuarioDetailViewProps {
  userId: string;
}

export function UsuarioDetailView({ userId }: UsuarioDetailViewProps) {
  const manager = useUsuarioDetailManager(userId);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 p-3 sm:p-5">
      {/* Header back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/usuario"
          className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-[13px] font-semibold text-[#676a6c] shadow-2xs border border-gray-200 transition-colors hover:bg-gray-50 hover:text-[#1d5fbf]"
        >
          <ArrowLeft className="size-4" />
          Volver a Usuarios
        </Link>
      </div>

      {/* Card 1: Top User Info */}
      <UsuarioInfoCard manager={manager} />

      {/* Cards 2 & 3: Bottom Two-column Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
        <DatosPersonalesCard manager={manager} />
        <DatosLaboralesCard manager={manager} />
      </div>
    </div>
  );
}
