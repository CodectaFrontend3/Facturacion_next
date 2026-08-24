"use client";

import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { TipoCambioManager } from "../../hooks/useTipoCambioManager";
import { TipoCambioChart } from "./TipoCambioChart";
import { TipoCambioEditModal } from "./TipoCambioEditModal";
import { TipoCambioFilter } from "./TipoCambioFilter";
import { TipoCambioList } from "./TipoCambioList";
import { TipoCambioStatsCard } from "./TipoCambioStatsCard";

interface TipoCambioModalProps {
  manager: TipoCambioManager;
}

export function TipoCambioModal({ manager }: TipoCambioModalProps) {
  return (
    <>
      <Dialog open={manager.isOpen} onOpenChange={manager.handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[94vh] !w-[calc(100vw-2rem)] !max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans sm:!max-w-[980px]"
        >
          {/* Header */}
          <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-3.5">
            <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
              Tipo de Cambio
            </DialogTitle>
            <DialogDescription className="sr-only">
              Visualiza el historial y estadísticas del tipo de cambio.
            </DialogDescription>
            <DialogClose asChild>
              <button
                type="button"
                aria-label="Cerrar"
                className="flex size-8 cursor-pointer items-center justify-center rounded-[2px] text-[#7b7d80] transition-colors hover:bg-gray-100 hover:text-[#3f4246]"
              >
                <X className="size-4" />
              </button>
            </DialogClose>
          </DialogHeader>

          {/* Content */}
          <div className="flex flex-col gap-6 overflow-y-auto p-5 sm:p-6">
            {/* Top Grid: Chart (Left) | Stats (Right) */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-stretch">
              <div className="md:col-span-8">
                <TipoCambioChart data={manager.chartData} />
              </div>
              <div className="md:col-span-4">
                <TipoCambioStatsCard stats={manager.stats} />
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Filter */}
            <TipoCambioFilter manager={manager} />

            {/* Table */}
            <TipoCambioList manager={manager} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit modal */}
      <TipoCambioEditModal manager={manager} />
    </>
  );
}
