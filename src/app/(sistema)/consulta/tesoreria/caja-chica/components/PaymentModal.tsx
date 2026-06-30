"use client"
import { useState } from "react"
import { DateInput } from "./DateInput"
import { type FormErrors, isValidDate, isValidDni, isValidMonto } from "../lib/validations"

export function PaymentModal({ onClose }: { onClose: () => void }) {
  const today = new Date()
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`
  const [date, setDate] = useState(formattedToday)
  const [nombre, setNombre] = useState("")
  const [dni, setDni] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [tipoTransaccion, setTipoTransaccion] = useState("")
  const [nroOperacion, setNroOperacion] = useState("")
  const [monto, setMonto] = useState("")
  const [fileName, setFileName] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!date || !isValidDate(date)) e.date = "Ingrese una fecha válida (dd/mm/aaaa)"
    if (!nombre.trim()) e.nombre = "El nombre es requerido"
    if (!isValidDni(dni)) e.dni = "El DNI debe tener 8 dígitos"
    if (!tipoTransaccion) e.tipoTransaccion = "Seleccione el tipo de transacción"
    if (!isValidMonto(monto)) e.monto = "Ingrese un monto válido mayor a 0"
    if (!paymentMethod) e.paymentMethod = "Seleccione un método de pago"
    if (paymentMethod && paymentMethod !== "Efectivo" && !nroOperacion.trim())
      e.nroOperacion = "El Nro. de Operación es requerido"
    return e
  }

  function handleSubmit() {
    setSubmitted(true)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      // TODO: enviar datos al backend
      onClose()
    }
  }

  function fieldClass(error?: string) {
    return error
      ? "border-[#ef4444] focus:border-[#ef4444]"
      : "border-[#d8d8d8] focus:border-[#2447b9]"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-[700px] rounded-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d8d8d8] px-6 py-4">
          <div className="flex items-center gap-2">
            <i className="bi bi-cash-stack text-[16px] text-[#10b981]"></i>
            <h2 className="text-[15px] font-bold text-[#111827]">Pago</h2>
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

            {/* Fecha */}
            <label className="block">
              <span className="mb-1.5 block font-medium">
                Fecha
              </span>
              <input
                type="text"
                value={date}
                readOnly
                className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-[#f9fafb] px-3 text-[#374151] outline-none"
              />
            </label>

            {/* Nombres y DNI */}
            <label className="block">
              <span className="mb-1.5 block font-medium">
                Nombres
              </span>
              <div className={`flex h-[40px] w-full overflow-hidden rounded-none border bg-white ${errors.nombre || errors.dni ? "border-[#ef4444]" : "border-[#d8d8d8] focus-within:border-[#2447b9]"}`}>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => { setNombre(e.target.value); if (submitted) setErrors(prev => ({ ...prev, nombre: undefined })) }}
                  placeholder="Nombres"
                  className="h-full w-full px-3 text-[#374151] outline-none placeholder:text-[#9ca3af]"
                />
                <button type="button" className="flex h-full w-[40px] shrink-0 items-center justify-center border-l border-r border-[#d8d8d8] text-[#6b7280] hover:bg-[#f3f4f6]">
                  <i className="bi bi-funnel" />
                </button>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => { setDni(e.target.value.replace(/\D/g, "").slice(0, 8)); if (submitted) setErrors(prev => ({ ...prev, dni: undefined })) }}
                  placeholder="DNI"
                  maxLength={8}
                  className="h-full w-[120px] shrink-0 px-3 text-[#374151] outline-none placeholder:text-[#9ca3af]"
                />
              </div>
              {errors.nombre && <p className="mt-1 text-[11px] text-[#ef4444]">{errors.nombre}</p>}
              {!errors.nombre && errors.dni && <p className="mt-1 text-[11px] text-[#ef4444]">{errors.dni}</p>}
            </label>

            {/* Descripción */}
            <label className="block md:col-span-2">
              <span className="mb-1.5 block font-medium">Descripción:</span>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Opcional"
                className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-white px-3 text-[#374151] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#2447b9]"
              />
            </label>

            {/* Método de Pago */}
            <div>
              <span className="mb-1.5 block font-medium">
                Método de Pago
              </span>
              <div className="flex flex-wrap gap-2">
                {["Yape", "Plin", "Transferencia", "Efectivo"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => { setPaymentMethod(method); if (submitted) setErrors(prev => ({ ...prev, paymentMethod: undefined, nroOperacion: undefined })) }}
                    className={`rounded-[5px] border px-3 py-1.5 text-[13px] transition-colors ${
                      paymentMethod === method
                        ? "border-[#1a43b3] bg-[#1a43b3] text-white"
                        : errors.paymentMethod
                        ? "border-[#ef4444] bg-white text-[#374151] hover:border-[#1a43b3] hover:bg-[#1a43b3] hover:text-white"
                        : "border-[#d8d8d8] bg-white text-[#374151] hover:border-[#1a43b3] hover:bg-[#1a43b3] hover:text-white"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
              {errors.paymentMethod && <p className="mt-1 text-[11px] text-[#ef4444]">{errors.paymentMethod}</p>}
            </div>

            {/* Tipo de Transacción */}
            <label className="block">
              <span className="mb-1.5 block font-medium">
                Tipo de Transacción
              </span>
              <div className="relative h-[40px] w-full">
                <select
                  value={tipoTransaccion}
                  onChange={(e) => { setTipoTransaccion(e.target.value); if (submitted) setErrors(prev => ({ ...prev, tipoTransaccion: undefined })) }}
                  className={`h-full w-full appearance-none rounded-none border bg-white px-3 pr-8 text-[#374151] outline-none transition-colors ${fieldClass(errors.tipoTransaccion)}`}
                >
                  <option value="">Seleccione tipo</option>
                  <option value="caja">Caja</option>
                  <option value="personal">Personal</option>
                </select>
                <i className="bi bi-chevron-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6b7280]" />
              </div>
              {errors.tipoTransaccion && <p className="mt-1 text-[11px] text-[#ef4444]">{errors.tipoTransaccion}</p>}
            </label>

            {/* Nro. Operación */}
            {paymentMethod && paymentMethod !== "Efectivo" && (
              <label className="block">
                <span className="mb-1.5 block font-medium">
                  Nro. Operación
                </span>
                <input
                  type="text"
                  value={nroOperacion}
                  onChange={(e) => { setNroOperacion(e.target.value); if (submitted) setErrors(prev => ({ ...prev, nroOperacion: undefined })) }}
                  className={`h-[40px] w-full rounded-none border bg-white px-3 text-[#374151] outline-none transition-colors ${fieldClass(errors.nroOperacion)}`}
                />
                {errors.nroOperacion && <p className="mt-1 text-[11px] text-[#ef4444]">{errors.nroOperacion}</p>}
              </label>
            )}

            {/* Monto */}
            <label className={`block${paymentMethod === "Efectivo" ? " md:col-span-2" : ""}`}>
              <span className="mb-1.5 block font-medium">
                Monto
              </span>
              <div className={`flex h-[40px] items-center overflow-hidden rounded-none border bg-[#f3f4f6] ${errors.monto ? "border-[#ef4444]" : "border-[#d8d8d8] focus-within:border-[#2447b9]"}`}>
                <span className="flex h-full items-center justify-center border-r border-[#d8d8d8] px-3 text-[#6b7280]">S/</span>
                <input
                  type="text"
                  value={monto}
                  onChange={(e) => { setMonto(e.target.value); if (submitted) setErrors(prev => ({ ...prev, monto: undefined })) }}
                  placeholder="0.00"
                  className="h-full w-full bg-white px-3 text-[#374151] outline-none placeholder:text-[#9ca3af]"
                />
              </div>
              {errors.monto && <p className="mt-1 text-[11px] text-[#ef4444]">{errors.monto}</p>}
            </label>

            {/* Comprobante */}
            {paymentMethod && paymentMethod !== "Efectivo" && (
              <label className="block">
                <span className="mb-1.5 block font-medium">Comprobante:</span>
                <div className="flex h-[40px] w-full items-center gap-2 overflow-hidden rounded-none border border-[#d8d8d8] bg-white">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload-payment"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                  <label
                    htmlFor="file-upload-payment"
                    className="flex h-full cursor-pointer items-center border-r border-[#d8d8d8] bg-[#f3f4f6] px-3 transition-colors hover:bg-[#e5e7eb] whitespace-nowrap"
                  >
                    Seleccionar archivo
                  </label>
                  <span className="truncate px-2 text-[#9ca3af]">{fileName || "Ningún archivo seleccionado"}</span>
                </div>
              </label>
            )}

            {/* Observaciones */}
            <label className={`block${paymentMethod === "Efectivo" || !paymentMethod ? " md:col-span-2" : ""}`}>
              <span className="mb-1.5 block font-medium">Observaciones:</span>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Opcional"
                className="h-[80px] w-full resize-none rounded-none border border-[#d8d8d8] bg-white p-3 text-[#374151] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#2447b9]"
              />
            </label>
          </div>

          {/* Resumen de errores */}
          {submitted && Object.keys(errors).length > 0 && (
            <div className="mt-4 flex items-center gap-2 border border-[#fca5a5] bg-[#fef2f2] px-4 py-3 text-[12px] text-[#b91c1c]">
              <i className="bi bi-exclamation-circle-fill text-[14px]" />
              <span>Por favor, corrija los campos marcados en rojo antes de continuar.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#d8d8d8] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[5px] bg-[#6b7280] px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#4b5563]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-[5px] bg-[#2447b9] px-6 py-2 text-[13px] font-bold text-white transition-colors hover:bg-[#1d3a9a]"
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  )
}
