"use client";

import { useState, useEffect } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { Input } from "@/components/ui/input";

interface EmpresaRetenedoraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { porcentaje: number; estado: boolean }) => void;
  clienteNombre: string;
  initialData?: { porcentaje: number; estado: boolean };
}

export function EmpresaRetenedoraModal({
  isOpen,
  onClose,
  onSave,
  clienteNombre,
  initialData,
}: EmpresaRetenedoraModalProps) {
  const [porcentaje, setPorcentaje] = useState<number>(0);
  const [estado, setEstado] = useState<boolean>(false);

  // Sincronizar datos al abrir
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setPorcentaje(initialData.porcentaje ?? 0);
        setEstado(initialData.estado ?? false);
      } else {
        setPorcentaje(0);
        setEstado(false);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ porcentaje, estado });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[500px] rounded-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between border-b border-[#d8d8d8] px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="fa fa-percent text-[15px] text-[#2C1FF3]" />
            <h2 className="text-[15px] font-bold text-[#111827]">
              ¿Es Empresa Retenedora? - {clienteNombre}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] transition-colors hover:text-[#111827] cursor-pointer"
            title="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="max-h-[75vh] overflow-y-auto p-6 text-[13px] text-[#4b5563] flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Campo Porcentaje */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-bold text-gray-700">
                Porcentaje:
              </span>

              <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-[15px] bg-gray-50 rounded-[4px] shadow-sm select-none">
                %
              </div>

              <Input
                type="number"
                value={porcentaje}
                onChange={(e) => setPorcentaje(Number(e.target.value))}
                className="h-9 w-full bg-white! border border-gray-300 px-3 text-[14px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                placeholder="0"
              />
            </div>

            {/* Campo Estado */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-bold text-gray-700">
                Estado:
              </span>

              <button
                type="button"
                onClick={() => setEstado(!estado)}
                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-200 focus:outline-none shadow-inner ${
                  estado
                    ? "bg-[#2c1ff3] border-[#2c1ff3]"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md border border-gray-200 transition duration-200 ease-in-out ${
                    estado ? "translate-x-7" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#d8d8d8] px-6 py-4 bg-white">
          <ActionButton
            onClick={onClose}
            className="rounded-[5px] bg-[#6b7280] hover:bg-[#4b5563] text-white"
            text="Cerrar"
            variant="filled"
          />
          <ActionButton
            onClick={handleSave}
            className="rounded-[5px] bg-[#2C1FF3] hover:bg-[#190FCE] text-white"
            text="Grabar"
            variant="filled"
          />
        </div>
      </div>
    </div>
  );
}
