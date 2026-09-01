"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type CurrencyType = "soles" | "dolares";

interface CompanyCurrencyCardProps {
  initialCurrency?: CurrencyType;
  onCurrencyChange?: (currency: CurrencyType) => void;
}

export function CompanyCurrencyCard({
  initialCurrency = "soles",
  onCurrencyChange,
}: CompanyCurrencyCardProps) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyType>(initialCurrency);

  // Modales
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [pendingCurrency, setPendingCurrency] = useState<CurrencyType | null>(
    null,
  );

  const handleSelectCurrency = (currency: CurrencyType) => {
    if (currency === selectedCurrency) {
      setShowInfoModal(true);
    } else {
      setPendingCurrency(currency);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmChange = () => {
    if (pendingCurrency) {
      setSelectedCurrency(pendingCurrency);
      onCurrencyChange?.(pendingCurrency);
    }
    setShowConfirmModal(false);
    setPendingCurrency(null);
  };

  return (
    <>
      <Card className="w-full bg-white rounded-none border border-slate-200 shadow-sm py-6">
        <p className="text-center text-[13px] font-extrabold text-[#0033FF] tracking-wide uppercase mb-6">
          MONEDA PRINCIPAL
        </p>

        <CardContent className="p-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-start space-y-4">
            {/* Opción Soles */}
            <div
              onClick={() => handleSelectCurrency("soles")}
              className="flex items-center gap-5 cursor-pointer group"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-xl tracking-tight transition-all ${
                  selectedCurrency === "soles"
                    ? "bg-[#F5B054] text-white shadow-inner"
                    : "bg-[#FCDFA0] text-[#E08B34] group-hover:bg-[#F5B054] group-hover:text-white"
                }`}
              >
                S/
              </div>
              <span className="text-[13px] font-extrabold text-slate-900 tracking-tight">
                Soles / Moneda nacional
              </span>
            </div>

            {/* Separador */}
            <div className="w-full border-t border-slate-200/60 my-1" />

            {/* Opción Dólares */}
            <div
              onClick={() => handleSelectCurrency("dolares")}
              className="flex items-center gap-5 cursor-pointer group"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-sans text-xl font-medium transition-all ${
                  selectedCurrency === "dolares"
                    ? "bg-[#717171] text-white"
                    : "bg-[#8E8E8E] text-white group-hover:bg-[#717171]"
                }`}
              >
                $
              </div>
              <span className="text-[13px] font-extrabold text-slate-900 tracking-tight">
                Dolares / Moneda extranjera
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal 1: Confirmación */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-[420px] bg-white rounded-md p-6 text-center shadow-lg border-none"
        >
          <DialogHeader>
            <DialogTitle className="sr-only">
              Confirmar cambio de moneda
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center space-y-4 py-2">
            <div className="w-16 h-16 rounded-full border-2 border-[#F0AD4E] flex items-center justify-center text-[#F0AD4E]">
              <AlertCircle className="w-10 h-10 stroke-[1.5]" />
            </div>
            <p className="text-base font-bold text-slate-700 leading-snug px-4">
              ¿Deseas Cambiar &apos;
              {pendingCurrency === "dolares" ? "$ Dolares" : "S/ Soles"}&apos;
              como moneda Principal ?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 w-full">
              <Button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="bg-[#D3D3D3] hover:bg-[#C0C0C0] text-slate-700 text-xs font-semibold px-5 h-9 rounded-md min-w-[100px]"
              >
                Cancelar!
              </Button>
              <Button
                type="button"
                onClick={handleConfirmChange}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold px-5 h-9 rounded-md min-w-[110px]"
              >
                Si, Cambiar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal 2: Información */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="sm:max-w-[380px] bg-white rounded-md p-6 text-center shadow-lg border-none"
        >
          <DialogHeader>
            <DialogTitle className="sr-only">
              Moneda principal actual
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center space-y-3 py-2">
            <h3 className="text-lg font-bold text-slate-800">
              {selectedCurrency === "soles" ? "S/ soles" : "$ Dolares"}
            </h3>
            <p className="text-xs text-slate-400 max-w-[260px] leading-tight">
              Moneda &apos;{selectedCurrency === "soles" ? "soles" : "dolares"}
              &apos; actualmente registrada como Moneda Principal.
            </p>
            <Button
              type="button"
              onClick={() => setShowInfoModal(false)}
              className="bg-[#A0D3E8] hover:bg-[#83C4DF] text-white text-xs font-semibold px-6 h-8 rounded-md mt-2"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
