import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { GarantiaManager } from "../../hooks/useGarantiaManager";
import { GarantiaForm } from "./GarantiaForm";
import { GarantiaList } from "./GarantiaList";

interface GarantiaModalProps {
  manager: GarantiaManager;
}

export function GarantiaModal({ manager }: GarantiaModalProps) {
  return (
    <Dialog open={manager.isOpen} onOpenChange={manager.handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-[800px] flex-col gap-0 overflow-hidden rounded-none bg-white p-0 font-sans sm:max-w-[800px]"
      >
        {/* Modal Header */}
        <DialogHeader className="flex-row items-center justify-between gap-0 border-b border-gray-200 px-5 py-3.5">
          <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
            Garantía
          </DialogTitle>
          <DialogDescription className="sr-only">
            Administra los tipos de garantías de los productos.
          </DialogDescription>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Cerrar"
              title="Cerrar"
              className="flex size-8 cursor-pointer items-center justify-center rounded-[2px] text-[#7b7d80] transition-colors hover:bg-gray-100 hover:text-[#3f4246]"
            >
              <X className="size-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Modal Content */}
        <div className="flex flex-col gap-5 overflow-y-auto p-5 sm:p-6">
          {/* Form */}
          <GarantiaForm
            key={manager.editingGarantia?.id ?? "new"}
            manager={manager}
          />

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* List / Table */}
          <GarantiaList manager={manager} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
