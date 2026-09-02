"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useFamiliaDetailManager } from "../hooks/useFamiliaDetailManager";
import { AddSubfamiliaModal } from "./AddSubfamiliaModal";
import { FamiliaInfoCard } from "./FamiliaInfoCard";
import { SubfamiliaList } from "./SubfamiliaList";

interface FamiliaDetailViewProps {
  familiaId: number;
}

export function FamiliaDetailView({ familiaId }: FamiliaDetailViewProps) {
  const manager = useFamiliaDetailManager(familiaId);

  return (
    <div className="w-full flex flex-col gap-3.5 p-3 sm:p-5">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/configuracion_general"
          className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-[13px] font-semibold text-[#676a6c] shadow-2xs border border-gray-200 transition-colors hover:bg-gray-50 hover:text-[#1d5fbf]"
        >
          <ArrowLeft className="size-4" />
          Volver a Configuración General
        </Link>
      </div>

      {/* Top Familia Info Card */}
      <FamiliaInfoCard manager={manager} />

      {/* Subfamilias Table */}
      <SubfamiliaList manager={manager} />

      {/* Add Subfamilia Modal */}
      <AddSubfamiliaModal manager={manager} />
    </div>
  );
}
