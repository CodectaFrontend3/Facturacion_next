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

import type { UnitMeasureManager } from "../../hooks/useUnitMeasureManager";
import { UnitMeasureForm } from "./UnitMeasureForm";
import { UnitMeasureList } from "./UnitMeasureList";

interface UnitMeasureModalProps {
  manager: UnitMeasureManager;
}

export function UnitMeasureModal({ manager }: UnitMeasureModalProps) {
  return (
    <Dialog open={manager.isOpen} onOpenChange={manager.handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] !w-[calc(100vw-3rem)] !max-w-[calc(100vw-3rem)] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans sm:!max-w-[1120px]"
      >
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-4">
          <DialogTitle className="text-[17px] font-bold text-[#676a6c]">
            Unidad de Medida
          </DialogTitle>
          <DialogDescription className="sr-only">
            Administra las unidades de medida.
          </DialogDescription>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Cerrar"
              className="cursor-pointer text-[#7b7d80] hover:text-[#3f4246]"
            >
              <X className="size-5 stroke-[4]" />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="overflow-y-auto p-5 sm:p-8">
          <UnitMeasureForm
            key={manager.editingUnit?.id ?? "new"}
            manager={manager}
          />
          <div className="my-5 border-t border-gray-200" />
          <UnitMeasureList manager={manager} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
