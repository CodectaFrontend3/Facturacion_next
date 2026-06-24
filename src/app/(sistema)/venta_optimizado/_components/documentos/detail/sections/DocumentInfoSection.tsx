// _components/documentos/detail/sections/DocumentInfoSection.tsx
"use client"

import { ChevronDown } from "lucide-react"
import { CboData } from "@/components/common/CboData"
import { DocumentoTipo } from "../../../../_domain/types/shared.types"
import { ClienteDetalle, ClienteFilaLista } from "../../../../_domain/types/cliente.types"
import { EmpresaConfig } from "../../../../_config/empresa.config"

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

// Formatea YYYY-MM-DD a DD/MM/YYYY (formato exacto usado en este bloque,
// distinto al DD-MM-YYYY que usa format.fecha() en el resto del módulo).
const formatSlash = (dateString: string | null | undefined): string => {
  if (!dateString) return "—"
  const parts = dateString.split("T")[0].split("-")
  if (parts.length !== 3) return dateString
  const [year, month, day] = parts
  return `${day}/${month}/${year}`
}

export interface CondicionesEditables {
  formaPago: string
  validez: string
  garantia: string
  moneda: "soles" | "dolares"
  observacion: string
  renovacionActiva: boolean
  fechaRenovacion: string
}

interface DocumentInfoSectionProps {
  tipo: DocumentoTipo
  cliente?: ClienteDetalle
  fechaEmision: string

  // Solo cotización / cotización_manual
  validez?: string
  garantia?: string
  formaPago?: string
  moneda: "soles" | "dolares"
  comisionistaLabel?: string
  observacion?: string

  /** Fecha de vencimiento del documento (fechaEmision + validez), independiente de la renovación */
  fechaVencimiento?: string
  diasRestantesVencimiento?: number

  // Solo renovación (cuando aplica)
  fechaRenovacion?: string | null
  diasRestantes?: number

  // Solo nota_venta
  empresa?: EmpresaConfig
  logoUrl?: string
  documentTitle?: string
  numero?: string

  // Modo edición
  isEditing?: boolean
  editValues?: CondicionesEditables
  onEditValuesChange?: (field: keyof CondicionesEditables, value: any) => void

  /** Lista de clientes y selección actual, usados para el combobox editable de "Señor(es)" */
  clientes?: ClienteFilaLista[]
  clienteIdSeleccionado?: string
  onClienteChange?: (clienteId: string) => void
}

export function DocumentInfoSection({
  tipo,
  cliente,
  fechaEmision,
  validez,
  garantia,
  formaPago,
  moneda,
  comisionistaLabel,
  observacion,
  fechaVencimiento,
  diasRestantesVencimiento,
  fechaRenovacion,
  diasRestantes,
  empresa,
  logoUrl,
  documentTitle,
  numero,
  isEditing = false,
  editValues,
  onEditValuesChange,
  clientes = [],
  clienteIdSeleccionado = "",
  onClienteChange,
}: DocumentInfoSectionProps) {
  const isCotizacion = tipo === "cotizacion" || tipo === "cotizacion_manual"
  const monedaLabel = moneda === "soles" ? "Soles" : "Dólares"

  return (
    <>
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
            <div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
                <div className="flex flex-col justify-between rounded-[12px] border border-gray-200 p-6">
                    <p className="mb-5 text-center font-bold text-[15px] text-[#4f566b]">Contacto Cliente</p>
                    <div className="space-y-2 pl-1 leading-relaxed text-[14px] text-[#676a6c]">
                    <p><span className="font-bold">Señor(es):</span> {cliente?.nombre ?? "—"}</p>
                    <p><span className="font-bold">RUC / DNI:</span> {cliente?.numeroDocumento ?? "—"}</p>
                    {isCotizacion && (
                        <p><span className="font-bold">Dirección:</span> {cliente?.direccion ?? "-"}</p>
                    )}
                    <p>
                        <span className="font-bold">N° Contacto:</span>{" "}
                        {cliente?.telefono || "0000000"} / {cliente?.celular || "00000"}
                    </p>
                    {isCotizacion && fechaVencimiento && (
                        <p>
                            <span className="font-bold">F. Vencimiento:</span> {formatSlash(fechaVencimiento)}
                            {diasRestantesVencimiento != null && (
                                <span className="ml-4 font-bold">
                                    Días restantes:{" "}
                                    <span className={`font-normal ${diasRestantesVencimiento < 0 ? "text-red-500" : "text-gray-600"}`}>
                                        {diasRestantesVencimiento < 0 
                                            ? `${diasRestantesVencimiento} días vencido` 
                                            : `${diasRestantesVencimiento} días`
                                        }
                                    </span>
                                </span>
                            )}
                        </p>
                    )}
                    {tipo === "nota_venta" && (
                        <p><span className="font-bold">Fecha:</span> {fechaEmision}</p>
                    )}
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

                <div className="flex flex-col justify-start space-y-5 rounded-[12px] border border-gray-200 p-6">
                    {/* Título de la sección */}
                    <p className="mb-5 text-center font-bold text-[15px] text-[#4f566b]">
                        Condiciones Generales
                    </p>
                    
                    {/* Contenedor de datos estructurado en Grid de 2 columnas */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 pl-1 leading-relaxed text-[14px] text-[#676a6c]">
                        {isCotizacion && (
                            <>
                                <p><span className="font-bold">Forma de Pago:</span> {formaPago}</p>
                                <p><span className="font-bold">Fecha:</span> {fechaEmision}</p>
                                
                                <p><span className="font-bold">Validez:</span> {validez}</p>
                                <p><span className="font-bold">Garantía:</span> {garantia}</p>
                            </>
                        )}
                        
                        {/* Estos elementos ocuparán toda la fila si van solos, 
                            o se alinearán en la primera columna */}
                        <p><span className="font-bold">Tipo de Moneda:</span> {monedaLabel}</p>
                        
                        {comisionistaLabel && (
                            <p><span className="font-bold">Comisionista:</span> {comisionistaLabel}</p>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Observaciones — solo en modo lectura, debajo de las 2 cards */}
        {!isEditing && observacion && (
            <p className="mt-5 text-[14px] text-[#676a6c] pl-7">
            <span className="font-bold">Observaciones:</span> {observacion}
            </p>
        )}

        {/* --- MODO EDICIÓN --- */}
        {isEditing && editValues && onEditValuesChange && (
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            
            {/* Columna izquierda compactada */}
            <div className="rounded-[12px] border border-gray-200 p-8 space-y-4">
            
            {/* Fila: Señor(es) */}
            <div className="flex items-center">
                <label className="w-28 text-right pr-4 text-[13px] font-bold text-[#4f566b] shrink-0">
                Señor(es)
                </label>
                <div className="flex-1">
                <CboData
                    items={clientes.map((c) => ({ value: c.id, label: `${c.nombre} - ${c.numeroDocumento}` }))}
                    value={clienteIdSeleccionado}
                    onChange={(val) => onClienteChange?.(val)}
                    placeholder="Seleccionar Cliente"
                    className="w-full"
                />
                </div>
            </div>

            {isCotizacion && (
                <>
                {/* Fila: Forma de Pago */}
                <div className="flex items-center">
                    <label className="w-28 text-right pr-4 text-[13px] font-bold text-[#4f566b] shrink-0">
                    Forma de Pago:
                    </label>
                    <div className="flex-1">
                    <CustomSelect
                        className={inputStyle}
                        value={editValues.formaPago}
                        onChange={(e) => onEditValuesChange("formaPago", e.target.value)}
                    >
                        <option value="Contado">Contado</option>
                        <option value="Credito">Crédito</option>
                    </CustomSelect>
                    </div>
                </div>

                {/* Fila: Garantía */}
                <div className="flex items-center">
                    <label className="w-28 text-right pr-4 text-[13px] font-bold text-[#4f566b] shrink-0">
                    Garantía:
                    </label>
                    <div className="flex-1">
                    <CustomSelect
                        className={inputStyle}
                        value={editValues.garantia}
                        onChange={(e) => onEditValuesChange("garantia", e.target.value)}
                    >
                        <option value="6 MESES">6 MESES</option>
                        <option value="1 AÑO">1 AÑO</option>
                    </CustomSelect>
                    </div>
                </div>
                </>
            )}
            </div>

            {/* Columna derecha compactada y simétrica */}
            <div className="rounded-[12px] border border-gray-200 p-8 space-y-4">
            
            {isCotizacion && (
                /* Fila: Validez */
                <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-[13px] font-bold text-[#4f566b] shrink-0">
                    Validez:
                </label>
                <div className="flex-1">
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
            )}

            {/* Fila: Tipo de Moneda */}
            <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-[13px] font-bold text-[#4f566b] shrink-0">
                Tipo de Moneda:
                </label>
                <div className="flex-1">
                <input type="text" readOnly value={monedaLabel} className={readOnlyStyle} />
                </div>
            </div>

            {comisionistaLabel && (
                /* Fila: Comisionista */
                <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-[13px] font-bold text-[#4f566b] shrink-0">
                    Comisionista:
                </label>
                <div className="flex-1">
                    <input type="text" readOnly value={comisionistaLabel} className={readOnlyStyle} />
                </div>
                </div>
            )}

            {isCotizacion && (
                /* Fila: Renovación */
                <div className="flex items-center">
                <label className="w-32 text-right pr-4 text-[13px] font-bold text-[#4f566b] shrink-0">
                    Renovación:
                </label>
                <div className="flex-1 flex items-center gap-6">
                    <button
                    type="button"
                    onClick={() => onEditValuesChange("renovacionActiva", !editValues.renovacionActiva)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                        editValues.renovacionActiva ? "bg-[#18a689]" : "bg-gray-300"
                    }`}
                    >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        editValues.renovacionActiva ? "translate-x-6" : "translate-x-1"
                        }`}
                    />
                    </button>

                    {editValues.renovacionActiva && (
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-[#676a6c] whitespace-nowrap">
                        F. Renovación:
                        </span>
                        <input
                        type="date"
                        value={editValues.fechaRenovacion}
                        onChange={(e) => onEditValuesChange("fechaRenovacion", e.target.value)}
                        className="border border-gray-300 rounded-none px-3 h-9 text-[13px] focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    )}
                </div>
                </div>
            )}
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
