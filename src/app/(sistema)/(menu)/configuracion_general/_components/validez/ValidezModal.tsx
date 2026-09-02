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

import type { ValidezManager } from "../../hooks/useValidezManager";
import { ValidezForm } from "./ValidezForm";
import { ValidezList } from "./ValidezList";

interface ValidezModalProps {
  manager: ValidezManager;
}

export function ValidezModal({ manager }: ValidezModalProps) {
  return (
    <Dialog open={manager.isOpen} onOpenChange={manager.handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] !w-[calc(100vw-1.5rem)] !max-w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans sm:!max-w-[800px]"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
            Validez
          </DialogTitle>
          <DialogDescription className="sr-only">
            Administra los tipos y tiempos de validez.
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
          <ValidezForm
            key={manager.editingValidez?.id ?? "new"}
            manager={manager}
          />

          <div className="border-t border-gray-200" />

          <ValidezList manager={manager} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
