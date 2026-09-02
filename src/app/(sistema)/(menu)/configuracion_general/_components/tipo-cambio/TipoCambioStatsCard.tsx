import { FileText } from "lucide-react";

import type { TipoCambioStats } from "../../types/tipo-cambio";

interface TipoCambioStatsCardProps {
  stats: TipoCambioStats;
}

export function TipoCambioStatsCard({ stats }: TipoCambioStatsCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded border border-gray-100 bg-white p-4 shadow-xs">
      <div className="mb-2 flex items-center justify-end">
        <FileText className="size-10 text-gray-500 stroke-[1.5]" />
      </div>

      {/* Mínimo */}
      <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
        <span className="text-[13px] font-semibold text-[#676a6c]">
          Mínimo de valor general
        </span>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-gray-500">{stats.minimo.fecha}</span>
          <span className="text-[13px] font-bold text-[#676a6c]">
            S/ {stats.minimo.valor.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Máximo */}
      <div className="flex flex-col gap-1 pt-3">
        <span className="text-[13px] font-semibold text-[#676a6c]">
          Maximo de valor general
        </span>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-gray-500">{stats.maximo.fecha}</span>
          <span className="text-[13px] font-bold text-[#676a6c]">
            S/ {stats.maximo.valor.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
