"use client"

export type Transaction = {
  nro_pago: string
  fecha: string
  dni: string
  nombres: string
  tipo: string
  monto: number
  descripcion?: string
  metodo_pago?: string
  nro_operacion?: string
  comprobante?: string
  observaciones?: string
}

export function ViewModal({ transaction, onClose }: { transaction: Transaction | null; onClose: () => void }) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div 
        className="w-full max-w-[700px] rounded-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d8d8d8] px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="bi bi-eye text-[16px] text-[#6b7280]"></i>
            <h2 className="text-[15px] font-bold text-[#111827]">Detalles de Transacción</h2>
          </div>
          <button onClick={onClose} className="text-[#9ca3af] transition-colors hover:text-[#111827]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 text-[13px] text-[#4b5563]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-medium">Fecha:</span>
              <input
                type="text"
                value={transaction.fecha}
                readOnly
                className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-medium">Nombre y DNI:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={transaction.nombres}
                  readOnly
                  className="h-[40px] w-[60%] rounded-none border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
                />
                <input
                  type="text"
                  value={transaction.dni}
                  readOnly
                  className="h-[40px] w-[40%] rounded-none border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-medium">Tipo de Transacción:</span>
              <input
                type="text"
                value={transaction.tipo}
                readOnly
                className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-medium">Monto:</span>
              <div className="flex h-[40px] items-center overflow-hidden rounded-none border border-[#d8d8d8] bg-[#f9fafb]">
                <span className="flex h-full items-center justify-center bg-[#f9fafb] pl-3 pr-1 text-[#6b7280]">
                  S/
                </span>
                <input
                  type="text"
                  value={transaction.monto.toFixed(2)}
                  readOnly
                  className="h-full w-full bg-transparent px-2 text-[#374151] outline-none"
                />
              </div>
            </label>

            <label className="block md:col-span-2">
              <span className="mb-1.5 block font-medium">Descripción:</span>
              <input
                type="text"
                value={transaction.descripcion || ""}
                readOnly
                className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
              />
            </label>

            <div>
              <span className="mb-1.5 block font-medium">Método de Pago:</span>
              <div className="flex gap-2">
                {["Yape", "Plin", "Transferencia", "Efectivo"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    className={`rounded-[5px] border px-3 py-1.5 text-[13px] ${
                      transaction.metodo_pago === method
                        ? "border-[#1a43b3] bg-[#1a43b3] text-white"
                        : "border-[#d8d8d8] bg-[#f9fafb] text-[#9ca3af] cursor-not-allowed"
                    }`}
                    disabled
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {transaction.metodo_pago !== "Efectivo" && (
              <label className="block">
                <span className="mb-1.5 block font-medium">Nro. Operación:</span>
                <input
                  type="text"
                  value={transaction.nro_operacion || ""}
                  readOnly
                  className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
                />
              </label>
            )}

            {transaction.metodo_pago !== "Efectivo" && (
              <label className="block">
                <span className="mb-1.5 block font-medium">Comprobante:</span>
                <div className="flex h-[40px] w-full items-center gap-2 overflow-hidden rounded-none border border-[#d8d8d8] bg-[#f9fafb]">
                  <div className="flex h-full items-center border-r border-[#d8d8d8] bg-[#f3f4f6] px-3 text-[#9ca3af]">
                    Archivo
                  </div>
                  <span className="px-2 text-[#374151] truncate">
                    {transaction.comprobante || "Ningún archivo"}
                  </span>
                </div>
              </label>
            )}

            <label className={`block${transaction.metodo_pago === "Efectivo" ? " md:col-span-2" : ""}`}>
              <span className="mb-1.5 block font-medium">Observaciones:</span>
              <textarea
                value={transaction.observaciones || ""}
                readOnly
                className="h-[80px] w-full resize-none rounded-none border border-[#d8d8d8] bg-[#f9fafb] p-3 text-[#374151] outline-none"
              ></textarea>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#d8d8d8] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[5px] bg-[#6b7280] px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#4b5563]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
