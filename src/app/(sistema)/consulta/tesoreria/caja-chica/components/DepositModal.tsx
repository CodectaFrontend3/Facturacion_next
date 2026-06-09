"use client"
import { useState } from "react"
import { DateInput } from "./DateInput"

export function DepositModal({ onClose }: { onClose: () => void }) {
  const [date, setDate] = useState("02/06/2026")
  const [paymentMethod, setPaymentMethod] = useState("")
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div 
        className="w-full max-w-[700px] rounded-[8px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d8d8d8] px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="bi bi-receipt text-[16px] text-[#6b7280]"></i>
            <h2 className="text-[15px] font-bold text-[#111827]">Depósito</h2>
          </div>
          <button onClick={onClose} className="text-[#9ca3af] transition-colors hover:text-[#111827]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-[13px] text-[#4b5563]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-medium">Fecha</span>
              <DateInput value={date} onChange={setDate} />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-medium">Nombre y DNI</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nombres"
                  className="h-[40px] w-[60%] rounded-[5px] border border-[#d8d8d8] bg-white px-3 text-[#374151] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#2447b9]"
                />
                <input
                  type="text"
                  placeholder="DNI"
                  className="h-[40px] w-[40%] rounded-[5px] border border-[#d8d8d8] bg-white px-3 text-[#374151] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#2447b9]"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-medium">Tipo de Transacción</span>
              <input
                type="text"
                value="Depósito"
                readOnly
                className="h-[40px] w-full rounded-[5px] border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-medium">Monto</span>
              <div className="flex h-[40px] items-center overflow-hidden rounded-[5px] border border-[#d8d8d8] bg-white focus-within:border-[#2447b9]">
                <span className="flex h-full items-center justify-center bg-white pl-3 pr-1 text-[#6b7280]">
                  S/
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="h-full w-full bg-transparent px-2 text-[#374151] outline-none placeholder:text-[#9ca3af]"
                />
              </div>
            </label>

            <label className="block md:col-span-2">
              <span className="mb-1.5 block font-medium">Descripción</span>
              <input
                type="text"
                placeholder="Detalle o concepto"
                className="h-[40px] w-full rounded-[5px] border border-[#d8d8d8] bg-white px-3 text-[#374151] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#2447b9]"
              />
            </label>

            <div>
              <span className="mb-1.5 block font-medium">Método de Pago:</span>
              <div className="flex gap-2">
                {["Yape", "Plin", "Transferencia", "Efectivo"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-[5px] border px-3 py-1.5 text-[13px] transition-colors ${
                      paymentMethod === method
                        ? "border-[#1a43b3] bg-[#1a43b3] text-white"
                        : "border-[#d8d8d8] bg-white text-[#374151] hover:border-[#1a43b3] hover:bg-[#1a43b3] hover:text-white"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod !== "Efectivo" && (
              <label className="block">
                <span className="mb-1.5 block font-medium">Nro. Operación:</span>
                <input
                  type="text"
                  className="h-[40px] w-full rounded-[5px] border border-[#d8d8d8] bg-white px-3 text-[#374151] outline-none transition-colors focus:border-[#2447b9]"
                />
              </label>
            )}

            {paymentMethod !== "Efectivo" && (
              <label className="block">
                <span className="mb-1.5 block font-medium">Comprobante:</span>
                <div className="flex h-[40px] w-full items-center gap-2 overflow-hidden rounded-[5px] border border-[#d8d8d8] bg-white">
                  <input type="file" className="hidden" id="file-upload" />
                  <label
                    htmlFor="file-upload"
                    className="flex h-full cursor-pointer items-center border-r border-[#d8d8d8] bg-[#f3f4f6] px-3 transition-colors hover:bg-[#e5e7eb]"
                  >
                    Seleccionar archivo
                  </label>
                  <span className="px-2 text-[#9ca3af] truncate">Ningún archivo seleccionado</span>
                </div>
              </label>
            )}

            <label className={`block${paymentMethod === "Efectivo" ? " md:col-span-2" : ""}`}>
              <span className="mb-1.5 block font-medium">Observaciones:</span>
              <textarea
                placeholder="Opcional"
                className="h-[80px] w-full resize-none rounded-[5px] border border-[#d8d8d8] bg-white p-3 text-[#374151] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#2447b9]"
              ></textarea>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#d8d8d8] px-6 py-4">
          <button
            type="button"
            className="rounded-[5px] bg-[#2447b9] px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#1d3a9a]"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  )
}
