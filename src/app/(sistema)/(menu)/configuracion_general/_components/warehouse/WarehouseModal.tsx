import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { WarehouseManager } from "../../hooks/useWarehouseManager";
import { WarehouseForm } from "./WarehouseForm";
import { WarehouseList } from "./WarehouseList";

interface WarehouseModalProps {
  manager: WarehouseManager;
}

export function WarehouseModal({ manager }: WarehouseModalProps) {
  return (
    <Dialog open={manager.isOpen} onOpenChange={manager.handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[90vh] w-[calc(100vw-1rem)] max-w-[1180px] flex-col gap-0 overflow-hidden rounded-none bg-white p-0 font-sans sm:max-w-[1180px]"
      >
        <DialogHeader className="flex-row items-center justify-between gap-0 border-b border-gray-200 px-4 py-3">
          <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
            Almacenes
          </DialogTitle>
          <DialogDescription className="sr-only">
            Administra, crea y edita los almacenes de la empresa.
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

        {manager.view === "list" ? (
          <WarehouseList manager={manager} />
        ) : (
          <WarehouseForm manager={manager} />
        )}
      </DialogContent>
    </Dialog>
  );
}
