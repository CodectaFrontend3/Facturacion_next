"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SalidaModalProps {
  children: React.ReactNode; // El icono o botón que metas dentro levantará el modal
}

export default function SalidaModal({ children }: SalidaModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* El DialogTrigger clava el onClick directamente en el elemento hijo */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[480px] p-6 bg-white rounded-sm border border-gray-100 shadow-md font-sans text-[#333]">
        {/* Cabecera limpia con el título requerido */}
        <DialogHeader className="border-b border-gray-100 pb-3 mb-4">
          <DialogTitle className="text-[13px] font-bold text-gray-700 text-left">
            Kardex Salida
          </DialogTitle>
        </DialogHeader>

        {/* Aquí puedes meter dentro cualquier contenido extra si lo necesitas en el futuro */}
        <div className="w-full text-[12px] text-gray-500">
          Contenido del modal...
        </div>
      </DialogContent>
    </Dialog>
  );
}
