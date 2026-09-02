"use client";

import Image from "next/image";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { MarcaManager } from "../../hooks/useMarcaManager";
import { MarcaForm } from "./MarcaForm";
import { MarcaList } from "./MarcaList";

interface MarcaModalProps {
  manager: MarcaManager;
}

export function MarcaModal({ manager }: MarcaModalProps) {
  return (
    <>
      <Dialog open={manager.isOpen} onOpenChange={manager.handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[92vh] !w-[calc(100vw-2rem)] !max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden rounded-[3px] bg-white p-0 font-sans sm:!max-w-[960px]"
        >
          {/* Header */}
          <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-5 py-3.5">
            <DialogTitle className="text-[16px] font-bold text-[#676a6c]">
              Marcas
            </DialogTitle>
            <DialogDescription className="sr-only">
              Administra las marcas de los productos.
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
            <MarcaForm
              key={manager.editingMarca?.id ?? "new"}
              manager={manager}
            />

            <div className="border-t border-gray-200" />

            <MarcaList manager={manager} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Preview Modal */}
      <Dialog
        open={Boolean(manager.viewingPhoto)}
        onOpenChange={(open) => {
          if (!open) manager.closePhoto();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="flex max-h-[85vh] w-[90vw] max-w-[450px] flex-col gap-0 overflow-hidden rounded-[4px] bg-white p-0"
        >
          <DialogHeader className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
            <DialogTitle className="text-[15px] font-bold text-[#676a6c]">
              {manager.viewingPhoto?.nombre || "Foto de Marca"}
            </DialogTitle>
            <DialogClose asChild>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={manager.closePhoto}
                className="flex size-7 cursor-pointer items-center justify-center text-[#7b7d80] hover:text-[#3f4246]"
              >
                <X className="size-4" />
              </button>
            </DialogClose>
          </DialogHeader>
          <div className="relative flex aspect-square w-full items-center justify-center bg-gray-50 p-4">
            {manager.viewingPhoto?.foto && (
              <Image
                src={manager.viewingPhoto.foto}
                alt={manager.viewingPhoto.nombre}
                fill
                unoptimized
                className="object-contain p-4"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
