"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AlmacenModalProps {
  children: React.ReactNode; // Aquí recibimos cualquier botón o elemento disparador
}

export default function AlmacenModal({ children }: AlmacenModalProps) {
  const [selectedAlmacen, setSelectedAlmacen] = useState("3");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleIr = () => {
    // Redirecciona al formulario pasando el almacén por la URL
    router.push(
      `/kardex-entrada-Traslado-almacen/create?emisor=${selectedAlmacen}`,
    );
    setOpen(false); // Cierra el modal automáticamente después de redirigir
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* El DialogTrigger envuelve al children. 
        asChild hace que no cree un botón extra en el HTML, 
        sino que le pasa el evento onClick directamente a tu botón personalizado.
      */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[480px] p-8 gap-0 bg-white rounded-sm flex flex-col items-center">
        {/* Accesibilidad */}
        <DialogHeader className="sr-only">
          <DialogTitle>Seleccionar Almacén Emisor</DialogTitle>
        </DialogHeader>

        {/* Ilustración SVG Oficial */}
        <div className="my-4 flex justify-center">
          <img
            src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/archivos/imagenes/kardex_img/2795451.svg"
            alt="Almacen Ilustración"
            className="w-[140px] h-auto object-contain"
          />
        </div>

        {/* Selector de Almacén */}
        <div className="w-full flex items-center justify-center gap-4 max-w-[360px] mt-2 mb-6">
          <label className="text-[13px] font-normal text-gray-600 whitespace-nowrap">
            Almacén Emisor:
          </label>

          <div className="relative flex-1">
            <select
              value={selectedAlmacen}
              onChange={(e) => setSelectedAlmacen(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-1 text-[13px] bg-white outline-none text-gray-700 appearance-none cursor-pointer pr-8 focus-visible:ring-1 focus-visible:ring-emerald-500"
            >
              <option value="3">3</option>
              <option value="wqdsadas">wqdsadas</option>
              <option value="adsadsa">adsadsa</option>
              <option value="PRUEBA">PRUEBA</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Botón "Ir" */}
        <button
          onClick={handleIr}
          className="bg-[#1A5EB3] text-white px-5 py-1.5 rounded-sm text-[13px] hover:bg-[#16529d] transition-colors shadow-sm font-medium min-w-[55px] mb-1 cursor-pointer"
        >
          Ir
        </button>
      </DialogContent>
    </Dialog>
  );
}
