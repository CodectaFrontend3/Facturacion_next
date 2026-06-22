// _components/documentos/detail/sections/HeaderSection.tsx
"use client"

import { DocumentoTipo } from "../../../../_domain/types/shared.types"
import { ClienteDetalle } from "../../../../_domain/types/cliente.types"
import { EmpresaConfig } from "../../../../_config/empresa.config"

// --- Botón de acción reutilizado en la barra superior ---
function ActionBtn({ icon, color, title, onClick }: { icon: string; color: string; title?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-[32px] w-[32px] items-center justify-center rounded-[4px] ${color} text-white transition-all hover:brightness-95 active:brightness-90`}
      title={title}
    >
      <i className={`bi ${icon} text-[14px]`} />
    </button>
  )
}

interface HeaderSectionProps {
  tipo: DocumentoTipo
  numero: string
  documentTitle: string
  cliente?: ClienteDetalle
  fechaEmision: string

  // Solo cotización / cotización_manual
  validez?: string
  garantia?: string
  formaPago?: string
  moneda: "soles" | "dolares"
  comisionistaLabel?: string

  // Solo renovación (cuando aplica)
  fechaRenovacion?: string | null
  diasRestantes?: number

  // Solo nota_venta
  empresa?: EmpresaConfig
  logoUrl?: string

  onEditar?: () => void
}

export function HeaderSection({
  tipo,
  numero,
  documentTitle,
  cliente,
  fechaEmision,
  validez,
  garantia,
  formaPago,
  moneda,
  comisionistaLabel,
  fechaRenovacion,
  diasRestantes,
  empresa,
  logoUrl,
  onEditar,
}: HeaderSectionProps) {
  const isCotizacion = tipo === "cotizacion" || tipo === "cotizacion_manual"
  const monedaLabel = moneda === "soles" ? "Soles" : "Dólares"

  return (
    <>
      {/* Barra de número/título + acciones */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="font-extrabold tracking-wide text-[#4f566b]">{numero}</h2>
          {isCotizacion && cliente && (
            <p className="mt-0.5 font-bold text-[13px] text-[#676a6c]">R.U.C : {cliente.numeroDocumento}</p>
          )}
        </div>

        <h1 className="text-[18px] font-light uppercase tracking-[0.2em] text-[#676a6c]">{documentTitle}</h1>

        <div className="flex items-center gap-1">
          {isCotizacion ? (
            <>
              <ActionBtn icon="bi-share-fill" color="bg-[#6c757d]" title="Compartir" />
              <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#007bff]" title="PDF" />
              <ActionBtn icon="bi-printer" color="bg-[#17a2b8]" title="Imprimir" />
              <ActionBtn icon="bi-envelope" color="bg-[#6c757d]" title="Correo" />
              <ActionBtn icon="bi-whatsapp" color="bg-[#28a745]" title="WhatsApp" />
              <ActionBtn icon="bi-pencil-fill" color="bg-[#ffc107]" title="Editar" onClick={onEditar} />
            </>
          ) : (
            <>
              <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#1b86c9]" title="PDF" />
              <ActionBtn icon="bi-tag" color="bg-[#27c7c9]" title="Etiqueta" />
              <ActionBtn icon="bi-printer" color="bg-[#1b86c9]" title="Imprimir" />
              <ActionBtn icon="bi-envelope-fill" color="bg-[#6c757d]" title="Correo" />
              <ActionBtn icon="bi-whatsapp" color="bg-[#008000]" title="WhatsApp" />
            </>
          )}
        </div>
      </div>

      {/* --- NOTA DE VENTA: franja de empresa emisora --- */}
      {tipo === "nota_venta" && empresa && (
        <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1fr_380px]">
          <div className="flex items-center">
            {logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt="Logo de la empresa" className="max-h-[120px] w-auto object-contain" />
            )}
          </div>
          <div className="text-center leading-snug text-[13px] text-[#676a6c]">
            <p className="font-bold">{empresa.nombre}</p>
            <p>Tel.: {empresa.telefono} / Móvil: {empresa.movil}</p>
            <p>{empresa.correo}</p>
            <p>{empresa.direccion}</p>
          </div>
          <div className="rounded-[8px] border border-gray-200 px-6 py-5 text-center">
            <p className="text-[14px] font-extrabold">R.U.C {empresa.ruc}</p>
            <p className="mt-3 text-[15px] font-light uppercase tracking-[0.14em]">{documentTitle}</p>
            <p className="mt-3 font-extrabold">{numero}</p>
          </div>
        </div>
      )}

      {/* Bloques de Contacto Cliente / Condiciones Generales */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
          <p className="mb-4 text-center font-bold text-[#676a6c]">Contacto Cliente</p>
          <div className="space-y-1 pl-2 leading-relaxed text-[13px] text-[#676a6c]">
            <p><span className="font-bold">Señor(es):</span> {cliente?.nombre ?? "—"}</p>
            <p><span className="font-bold">RUC / DNI:</span> {cliente?.numeroDocumento ?? "—"}</p>
            {isCotizacion && (
              <p><span className="font-bold">Dirección:</span> {cliente?.direccion ?? "-"}</p>
            )}
            <p><span className="font-bold">Fecha:</span> {fechaEmision}</p>
            {fechaRenovacion && (
              <p>
                <span className="font-bold">F. Renovación:</span> {fechaRenovacion}
                {diasRestantes != null && (
                  <span className="ml-4 font-bold">Días restantes: {diasRestantes}</span>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
          <p className="mb-4 text-center font-bold text-[#676a6c]">Condiciones Generales</p>
          <div className="space-y-1 pl-2 leading-relaxed text-[13px] text-[#676a6c]">
            {isCotizacion && (
              <>
                <div className="flex justify-between gap-4">
                  <p className="flex-1"><span className="font-bold">Forma de Pago:</span> {formaPago}</p>
                  <p className="flex-1"><span className="font-bold">Validez:</span> {validez}</p>
                </div>
                <p><span className="font-bold">Garantía:</span> {garantia}</p>
              </>
            )}
            <p><span className="font-bold">Tipo de Moneda:</span> {monedaLabel}</p>
            {comisionistaLabel && (
              <p><span className="font-bold">Comisionista:</span> {comisionistaLabel}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
