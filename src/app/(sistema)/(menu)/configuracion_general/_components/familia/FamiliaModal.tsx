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

import type { FamiliaManager } from "../../hooks/useFamiliaManager";
import { FamiliaForm } from "./FamiliaForm";
import { FamiliaList } from "./FamiliaList";

interface FamiliaModalProps {
  manager: FamiliaManager;
}

export function FamiliaModal({ manager }: FamiliaModalProps) {
  return (
    <Dialog open={manager.isOpen} onOpenChange={manager.handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] !w-[calc(100vw-2rem)] !max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans sm:!max-w-[960px]"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
            Familias
          </DialogTitle>
          <DialogDescription className="sr-only">
            Administra las familias y categorías de productos.
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
        <div className="flex flex-col gap-5 overflow-y-auto p-5 sm:p-6">
          <FamiliaForm
            key={manager.editingFamilia?.id ?? "new"}
            manager={manager}
          />

          <div className="border-t border-gray-200" />

          <FamiliaList manager={manager} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
