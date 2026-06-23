// _components/documentos/detail/sections/HeaderSection.tsx
"use client"

import { ChevronDown } from "lucide-react"
import { DocumentoTipo } from "../../../../_domain/types/shared.types"
import { ClienteDetalle } from "../../../../_domain/types/cliente.types"
import { EmpresaConfig } from "../../../../_config/empresa.config"
import { WhatsappShareButton } from "../../../shared/WhatsappShareButton"

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

const inputStyle =
  "w-full border border-gray-300 rounded-none px-3 h-9 text-[13px] outline-none focus:border-blue-400 transition-colors"
const readOnlyStyle =
  "w-full border border-gray-300 rounded-none px-3 h-9 text-[13px] bg-[#e9ecef] text-gray-500 outline-none"

const CustomSelect = ({
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative w-full">
    <select className={`${className} appearance-none pr-8 cursor-pointer`} {...props}>
      {children}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" strokeWidth={2} />
  </div>
)

export interface CondicionesEditables {
  formaPago: string
  validez: string
  garantia: string
  moneda: "soles" | "dolares"
  observacion: string
  renovacionActiva: boolean
  fechaRenovacion: string
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
  observacion?: string

  // Solo renovación (cuando aplica)
  fechaRenovacion?: string | null
  diasRestantes?: number

  // Solo nota_venta
  empresa?: EmpresaConfig
  logoUrl?: string

  // Compartir
  clienteCelular?: string | null

  // Modo edición
  isEditing?: boolean
  /** Si el documento fue finalizado, el botón de editar no debe mostrarse */
  puedeEditar?: boolean
  onEditar?: () => void
  onGenerarNotaVenta?: () => void
  editValues?: CondicionesEditables
  onEditValuesChange?: (field: keyof CondicionesEditables, value: any) => void
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
  observacion,
  fechaRenovacion,
  diasRestantes,
  empresa,
  logoUrl,
  clienteCelular,
  isEditing = false,
  puedeEditar = true,
  onEditar,
  onGenerarNotaVenta,
  editValues,
  onEditValuesChange,
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
              {/* Generar Nota de Venta: disponible incluso si el documento ya fue finalizado
                  (es el flujo natural: cotización cerrada → se convierte en venta) */}
              {!isEditing && (
                <ActionBtn
                  icon="bi-file-earmark-text"
                  color="bg-[#1ab394]"
                  title="Generar Nota de Venta"
                  onClick={onGenerarNotaVenta}
                />
              )}
              <ActionBtn icon="bi-share-fill" color="bg-[#6c757d]" title="Compartir" />
              <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#007bff]" title="PDF" />
              <ActionBtn icon="bi-printer" color="bg-[#17a2b8]" title="Imprimir" />
              <ActionBtn icon="bi-envelope" color="bg-[#6c757d]" title="Correo" />
              <WhatsappShareButton
                celular={clienteCelular}
                numeroDoc={numero}
                className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#28a745] hover:brightness-95 text-white"
              />
              {isEditing ? (
                <ActionBtn icon="bi-x-lg" color="bg-[#dc3545]" title="Cancelar edición" onClick={onEditar} />
              ) : (
                puedeEditar && (
                  <ActionBtn icon="bi-pencil-fill" color="bg-[#ffc107]" title="Editar" onClick={onEditar} />
                )
              )}
            </>
          ) : (
            <>
              <ActionBtn icon="bi-file-earmark-pdf" color="bg-[#1b86c9]" title="PDF" />
              <ActionBtn icon="bi-tag" color="bg-[#27c7c9]" title="Etiqueta" />
              <ActionBtn icon="bi-printer" color="bg-[#1b86c9]" title="Imprimir" />
              <ActionBtn icon="bi-envelope-fill" color="bg-[#6c757d]" title="Correo" />
              <WhatsappShareButton
                celular={clienteCelular}
                numeroDoc={numero}
                className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#008000] hover:brightness-95 text-white"
              />
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

      {/* --- MODO LECTURA --- */}
      {!isEditing && (
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
      )}

      {/* --- MODO EDICIÓN --- */}
      {isEditing && editValues && onEditValuesChange && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
            <p className="mb-4 text-center font-bold text-[#676a6c]">Contacto Cliente</p>
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-bold text-[#676a6c] mb-1">Señor(es)</label>
                <input type="text" readOnly value={cliente?.nombre ?? "—"} className={readOnlyStyle} />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#676a6c] mb-1">Fecha</label>
                <input type="text" readOnly value={fechaEmision} className={readOnlyStyle} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-5">
            <p className="mb-4 text-center font-bold text-[#676a6c]">Condiciones Generales</p>
            <div className="space-y-3">
              {isCotizacion && (
                <>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-[12px] font-bold text-[#676a6c] mb-1">Forma de Pago</label>
                      <CustomSelect
                        className={inputStyle}
                        value={editValues.formaPago}
                        onChange={(e) => onEditValuesChange("formaPago", e.target.value)}
                      >
                        <option value="Contado">Contado</option>
                        <option value="Credito">Crédito</option>
                      </CustomSelect>
                    </div>
                    <div className="flex-1">
                      <label className="block text-[12px] font-bold text-[#676a6c] mb-1">Validez</label>
                      <CustomSelect
                        className={inputStyle}
                        value={editValues.validez}
                        onChange={(e) => onEditValuesChange("validez", e.target.value)}
                      >
                        <option value="1 DIA">1 DIA</option>
                        <option value="7 DIAS">7 DIAS</option>
                        <option value="15 DIAS">15 DIAS</option>
                      </CustomSelect>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-[#676a6c] mb-1">Garantía</label>
                    <CustomSelect
                      className={inputStyle}
                      value={editValues.garantia}
                      onChange={(e) => onEditValuesChange("garantia", e.target.value)}
                    >
                      <option value="6 MESES">6 MESES</option>
                      <option value="1 AÑO">1 AÑO</option>
                    </CustomSelect>
                  </div>
                </>
              )}

              <div>
                <label className="block text-[12px] font-bold text-[#676a6c] mb-1">Tipo de Moneda</label>
                <CustomSelect
                  className={inputStyle}
                  value={editValues.moneda}
                  onChange={(e) => onEditValuesChange("moneda", e.target.value)}
                >
                  <option value="soles">Soles</option>
                  <option value="dolares">Dólares</option>
                </CustomSelect>
              </div>

              {comisionistaLabel && (
                <p className="text-[13px] text-[#676a6c]"><span className="font-bold">Comisionista:</span> {comisionistaLabel}</p>
              )}

              {isCotizacion && (
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onEditValuesChange("renovacionActiva", !editValues.renovacionActiva)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      editValues.renovacionActiva ? "bg-[#18a689]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        editValues.renovacionActiva ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-[13px] text-[#676a6c]">Renovación</span>
                  {editValues.renovacionActiva && (
                    <input
                      type="date"
                      value={editValues.fechaRenovacion}
                      onChange={(e) => onEditValuesChange("fechaRenovacion", e.target.value)}
                      className="border border-gray-300 rounded-sm px-3 py-1 text-[13px] focus:outline-none focus:border-blue-400"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-[12px] font-bold text-[#676a6c] mb-1">Observación</label>
            <textarea
              className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400 h-20 resize-y"
              value={editValues.observacion}
              onChange={(e) => onEditValuesChange("observacion", e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  )
}
