// _components/documentos/form/sections/CondicionesSection.tsx
"use client"

import { ChevronDown } from "lucide-react"
import { DocumentoTipo } from "../../../../_domain/types/shared.types"
import { AlmacenDetalle, ComisionistaDetalle, TipoOperacionDetalle } from "../../../../_domain/types/catalogo.types"
import { RenovacionConfig } from "../../../../_domain/types/shared.types"
import { RenovacionSection } from "./RenovacionSection"

// --- Subcomponentes de presentación, compartidos entre los 3 tipos ---

const FormField = ({
  label,
  children,
  multiline = false,
}: {
  label: string
  children: React.ReactNode
  multiline?: boolean
}) => (
  <div className={`flex gap-4 ${multiline ? "items-start" : "items-center"}`}>
    <label className="w-28 text-[13px] font-extrabold text-[#676a6c] flex-shrink-0">{label}</label>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
)

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

// --- Estado y catálogos que maneja este formulario ---

export interface CondicionesValues {
  validez: string
  tipoOperacionId: string
  almacenId: string
  observacion: string
  comisionistaId: string
  tipoDocumento: "Factura" | "Boleta"
  moneda: "soles" | "dolares"
  garantia: string
  formaPago: "Contado" | "Credito"
}

interface CondicionesSectionProps {
  tipo: DocumentoTipo
  values: CondicionesValues
  onChange: (field: keyof CondicionesValues, value: string) => void

  // Catálogos (solo se usan los que correspondan según el tipo)
  almacenes: AlmacenDetalle[]
  comisionistas: ComisionistaDetalle[]
  tiposOperacion: TipoOperacionDetalle[]

  // Renovación (solo aplica a cotización y cotización manual)
  renovacion?: RenovacionConfig
  onRenovacionChange?: (data: RenovacionConfig) => void

  /** Bloque de Cliente (CboData + botón +), insertado como primer campo de la columna izquierda */
  clienteSelector: React.ReactNode
}

export function CondicionesSection({
  tipo,
  values,
  onChange,
  almacenes,
  comisionistas,
  tiposOperacion,
  renovacion,
  onRenovacionChange,
  clienteSelector,
}: CondicionesSectionProps) {
  const fechaHoy = new Date()
    .toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/\//g, "-")

  // ============================================================
  // NOTA DE VENTA: formulario simplificado, sin renovación
  // ============================================================
  if (tipo === "nota_venta") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 px-2 py-4">
        <div className="flex flex-col gap-4">
          <FormField label="Cliente:">
            {clienteSelector}
          </FormField>
          <FormField label="Fecha Emisión:">
            <input type="text" readOnly value={fechaHoy} className={readOnlyStyle} />
          </FormField>
          <FormField label="Moneda:">
            <CustomSelect
              className={inputStyle}
              value={values.moneda}
              onChange={(e) => onChange("moneda", e.target.value)}
            >
              <option value="soles">Soles</option>
              <option value="dolares">Dólares</option>
            </CustomSelect>
          </FormField>
        </div>

        <div className="flex flex-col gap-4">
          <FormField label="Almacén:">
            <CustomSelect
              className={inputStyle}
              value={values.almacenId}
              onChange={(e) => onChange("almacenId", e.target.value)}
            >
              {almacenes.map((a) => (
                <option key={a.id} value={a.id}>{a.codigo} - {a.nombre}</option>
              ))}
            </CustomSelect>
          </FormField>
          <FormField label="Forma Pago:">
            <CustomSelect
              className={inputStyle}
              value={values.formaPago}
              onChange={(e) => onChange("formaPago", e.target.value)}
            >
              <option value="Contado">Contado</option>
              <option value="Credito">Crédito</option>
            </CustomSelect>
          </FormField>
          <FormField label="Garantía:">
            <CustomSelect
              className={inputStyle}
              value={values.garantia}
              onChange={(e) => onChange("garantia", e.target.value)}
            >
              <option value="6 MESES">6 MESES</option>
              <option value="12 MESES">12 MESES</option>
              <option value="SIN GARANTIA">SIN GARANTÍA</option>
            </CustomSelect>
          </FormField>
        </div>

        <div className="flex flex-col lg:col-span-2 gap-4">
          <FormField label="Observación:" multiline>
            <textarea
              className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] text-gray-600 focus:outline-none h-9 resize-y"
              value={values.observacion}
              onChange={(e) => onChange("observacion", e.target.value)}
            />
          </FormField>
        </div>
      </div>
    )
  }

  // ============================================================
  // COTIZACIÓN / COTIZACIÓN MANUAL: comparten casi todos los campos.
  // Difieren en: Comisionista (solo cotización) vs Almacén (solo manual)
  // ============================================================
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 px-2 py-2">
      {/* Columna Izquierda */}
      <div className="flex flex-col gap-4">
        <FormField label="Cliente:">
          {clienteSelector}
        </FormField>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Fecha Emisión:">
              <input type="text" readOnly value={fechaHoy} className={readOnlyStyle} />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Validez:">
              <CustomSelect
                className={inputStyle}
                value={values.validez}
                onChange={(e) => onChange("validez", e.target.value)}
              >
                <option value="1 DIA">1 DIA</option>
                <option value="7 DIAS">7 DIAS</option>
                <option value="15 DIAS">15 DIAS</option>
              </CustomSelect>
            </FormField>
          </div>
        </div>

        {tipo === "cotizacion" ? (
          <FormField label="T. Operación:">
            <CustomSelect
              className={inputStyle}
              value={values.tipoOperacionId}
              onChange={(e) => onChange("tipoOperacionId", e.target.value)}
            >
              {tiposOperacion.map((t) => (
                <option key={t.id} value={t.id}>{t.codigo} - {t.nombre}</option>
              ))}
            </CustomSelect>
          </FormField>
        ) : (
          <FormField label="Almacén:">
            <CustomSelect
              className={inputStyle}
              value={values.almacenId}
              onChange={(e) => onChange("almacenId", e.target.value)}
            >
              {almacenes.map((a) => (
                <option key={a.id} value={a.id}>{a.codigo} - {a.nombre}</option>
              ))}
            </CustomSelect>
          </FormField>
        )}

        <FormField label="Observación:" multiline>
          <textarea
            className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400 h-20 resize-y"
            value={values.observacion}
            onChange={(e) => onChange("observacion", e.target.value)}
          />
        </FormField>
      </div>

      {/* Columna Derecha */}
      <div className="flex flex-col gap-4">
        {tipo === "cotizacion" ? (
          <FormField label="Comisionista:">
            <CustomSelect
              className={inputStyle}
              value={values.comisionistaId}
              onChange={(e) => onChange("comisionistaId", e.target.value)}
            >
              {comisionistas.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre} - {c.porcentajeComision}%</option>
              ))}
            </CustomSelect>
          </FormField>
        ) : (
          <FormField label="T. Operación:">
            <CustomSelect
              className={inputStyle}
              value={values.tipoOperacionId}
              onChange={(e) => onChange("tipoOperacionId", e.target.value)}
            >
              {tiposOperacion.map((t) => (
                <option key={t.id} value={t.id}>{t.codigo} - {t.nombre}</option>
              ))}
            </CustomSelect>
          </FormField>
        )}

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Tipo:">
              <CustomSelect
                className={inputStyle}
                value={values.tipoDocumento}
                onChange={(e) => onChange("tipoDocumento", e.target.value)}
              >
                <option value="Factura">Factura</option>
                <option value="Boleta">Boleta</option>
              </CustomSelect>
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Moneda:">
              <CustomSelect
                className={inputStyle}
                value={values.moneda}
                onChange={(e) => onChange("moneda", e.target.value)}
              >
                <option value="soles">Soles</option>
                <option value="dolares">Dólares</option>
              </CustomSelect>
            </FormField>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Garantía:">
              <CustomSelect
                className={inputStyle}
                value={values.garantia}
                onChange={(e) => onChange("garantia", e.target.value)}
              >
                <option value="6 MESES">6 MESES</option>
                <option value="1 AÑO">1 AÑO</option>
              </CustomSelect>
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Forma Pago:">
              <CustomSelect
                className={inputStyle}
                value={values.formaPago}
                onChange={(e) => onChange("formaPago", e.target.value)}
              >
                <option value="Contado">Contado</option>
                <option value="Credito">Crédito</option>
              </CustomSelect>
            </FormField>
          </div>
        </div>

        {renovacion && onRenovacionChange && (
          <RenovacionSection
            isActive={renovacion.isActive}
            fechaRenovacion={renovacion.fechaRenovacion ?? ""}
            onChange={(data) =>
              onRenovacionChange({ isActive: data.isActive, fechaRenovacion: data.fechaRenovacion || null })
            }
          />
        )}
      </div>
    </div>
  )
}
