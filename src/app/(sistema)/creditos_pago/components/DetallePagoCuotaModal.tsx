"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistorialPago } from "../types/ComprobanteBase";

interface DetallePagoCuotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  pago: HistorialPago | null | undefined;
}

export function DetallePagoCuotaModal({
  isOpen,
  onClose,
  pago,
}: DetallePagoCuotaModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-5xl w-[90vw] bg-white p-0 rounded-none border border-gray-300 shadow-xl font-sans text-slate-700 flex flex-col [&>button]:hidden">
        {/* CABECERA */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white w-full">
          <DialogTitle className="text-xs font-bold text-slate-800 tracking-wide">
            Detalle Pago de la cuota
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-sm cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        {!pago ? (
          <div className="p-10 text-center text-xs text-gray-400 bg-white w-full">
            No se encontraron detalles para este pago.
          </div>
        ) : (
          <div className="p-6 bg-white flex flex-col gap-6 w-full overflow-y-auto">
            {/* CAMPOS SUPERIORES - Extendidos horizontalmente en 3 columnas */}
            <div className="grid grid-cols-3 gap-6 w-full">
              <div className="flex flex-col">
                <label className="block text-[11px] font-bold text-slate-700 mb-2">
                  Tipo de Pago
                </label>
                <div className="w-full bg-[#1e60be] text-white text-[11px] font-medium text-center py-2 px-4 rounded-[4px] shadow-sm select-none">
                  Pago con {pago.metodo_pago}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="block text-[11px] font-bold text-slate-700 mb-2">
                  Moneda y Monto Total de la Cuota
                </label>
                <input
                  type="text"
                  readOnly
                  value={`S/ ${pago.monto_pagado.toFixed(2)}`}
                  className="w-full border border-gray-200 rounded-[4px] px-3 py-1.5 text-xs text-slate-600 bg-white font-medium focus:outline-none h-[34px]"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-[11px] font-bold text-slate-700 mb-2">
                  Estado de la Cuota
                </label>
                <input
                  type="text"
                  readOnly
                  value="Pago Total"
                  className="w-full border border-gray-200 rounded-[4px] px-3 py-1.5 text-xs text-slate-600 bg-white font-medium focus:outline-none h-[34px]"
                />
              </div>
            </div>

            {/* SECCIÓN DE TABS APRECIABLE EN HORIZONTAL */}
            <Tabs defaultValue="detalle" className="w-full flex flex-col">
              <TabsList className="flex bg-transparent border-b border-gray-200 p-0 rounded-none h-auto w-full justify-start items-end gap-1">
                <TabsTrigger
                  value="detalle"
                  className="px-8 py-2.5 text-xs font-bold text-slate-400 border border-transparent bg-transparent rounded-t-[4px] shadow-none -mb-[1px] transition-all
                    data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:border-b-white"
                >
                  Detalle del Pago
                </TabsTrigger>
                <TabsTrigger
                  value="otros"
                  className="px-8 py-2.5 text-xs font-bold text-slate-400 border border-transparent bg-transparent rounded-t-[4px] shadow-none -mb-[1px] transition-all
                    data-[state=active]:border-gray-200 data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:border-b-white"
                >
                  Otros Detalles
                </TabsTrigger>
              </TabsList>

              {/* CONTENIDO: DETALLE DEL PAGO */}
              <TabsContent
                value="detalle"
                className="mt-0 border border-gray-200 rounded-b-[4px] rounded-tr-[4px] p-6 bg-white flex flex-col gap-4 shadow-sm w-full min-h-[220px]"
              >
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
                  <div className="flex flex-col">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Persona que Cancela
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={pago.emisor}
                      className="w-full border border-gray-200 rounded-[4px] px-3 py-1.5 text-xs text-slate-600 bg-white focus:outline-none h-[32px]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Fecha de Pago
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={pago.fecha_pago}
                      className="w-full border border-gray-200 rounded-[4px] px-3 py-1.5 text-xs text-slate-600 bg-white focus:outline-none h-[32px]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Moneda y monto de Pago
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`S/ ${pago.monto_pagado.toFixed(2)}`}
                      className="w-full border border-gray-200 rounded-[4px] px-3 py-1.5 text-xs text-slate-600 bg-white focus:outline-none h-[32px]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Tipo de Cambio
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="w-full border border-gray-200 rounded-[4px] px-3 py-1.5 text-xs bg-white focus:outline-none h-[32px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full pt-1">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Observaciones
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="w-full border border-gray-200 rounded-[4px] px-3 py-1.5 text-xs bg-white focus:outline-none h-[32px]"
                  />
                </div>
              </TabsContent>

              {/* CONTENIDO: OTROS DETALLES */}
              <TabsContent
                value="otros"
                className="mt-0 border border-gray-200 rounded-b-[4px] rounded-tl-[4px] p-6 bg-white flex items-center justify-center min-h-[220px] shadow-sm w-full"
              >
                <span className="text-xs font-bold text-slate-700">
                  Sin otros detalles
                </span>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* PIE DEL MODAL */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4 bg-white w-full">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-5 py-1.5 rounded-[4px] transition-colors cursor-pointer shadow-sm"
          >
            Cerrar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
