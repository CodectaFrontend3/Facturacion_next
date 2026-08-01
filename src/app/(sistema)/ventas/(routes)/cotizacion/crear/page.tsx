"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentFormTemplate } from "@/components/shared/DocumentFormTemplate"
import { CboData } from "@/components/common/CboData"
import { ActionButton } from "@/components/common/ActionButton"
import { Plus, Save, ChevronDown } from "lucide-react"
import { ClienteModal } from "@/app/(sistema)/ventas/_components/legacy-clientes/ClienteModal"

// Piezas Reutilizables
import { useVentaForm } from "@/app/(sistema)/ventas/_hooks/legacy/useVentaForm"
import { VentaItemsTable } from "@/app/(sistema)/ventas/_components/legacy/shared/VentaItemsTable"
import { VentaSummary } from "@/app/(sistema)/ventas/_components/legacy/shared/VentaSummary"
import { RenovacionFields } from "@/app/(sistema)/ventas/_components/legacy/shared/RenovacionFields"
import { ArticuloSelectorModal } from "@/app/(sistema)/ventas/_components/legacy/shared/ArticuloSelectorModal"

// Mocks
import { clientesOptions } from "@/app/(sistema)/ventas/_utils/legacy/clientesOptions"

const FormField = ({ label, children, multiline }: { label: string; children: React.ReactNode; multiline?: boolean }) => (
  <div className={`flex gap-4 ${multiline ? "items-start" : "items-center"}`}>
    <label className="w-28 text-[13px] font-extrabold text-[#676a6c] flex-shrink-0">{label}</label>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
)

// Estilo unificado para que todos los casilleros sean iguales
const inputStyle = "w-full border border-gray-300 rounded-none px-3 h-9 text-[13px] outline-none focus:border-blue-400 transition-colors"
const readOnlyStyle = "w-full border border-gray-300 rounded-none px-3 h-9 text-[13px] bg-[#e9ecef] text-gray-500 outline-none"

// Componente Select personalizado con flecha limpia
const CustomSelect = ({ children, className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative w-full">
    <select 
      className={`${className} appearance-none pr-8 cursor-pointer`} 
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" strokeWidth={2} />
  </div>
)

export default function CrearCotizacionPage() {
  const router = useRouter()
  const { rows, totals, renovacion, actions } = useVentaForm()
  const [selectedCliente, setSelectedCliente] = useState("");
  
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)
  const [isArticuloModalOpen, setIsArticuloModalOpen] = useState(false)

  const basePath = "/ventas"
  const handleClose = () => router.push(`${basePath}/cotizacion`)

  // Obtener fecha actual en formato DD-MM-YYYY
  const fechaHoy = new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-')

  const handleAddArticulo = (id: string, qty: number) => {
    const emptyRowIndex = rows.findIndex(row => !row.articleId || row.articleId === "")
    
    if (emptyRowIndex !== -1) {
      const targetRow = rows[emptyRowIndex]
      actions.updateRow(targetRow.id, "articleId", id)
      actions.updateRow(targetRow.id, "cantidad", qty)
    } else {
      actions.addRow(id, qty)
    }
  }

  const topForm = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 px-2 py-2">
      {/* Columna Izquierda */}
      <div className="flex flex-col gap-4">
        <FormField label="Cliente:">
          <div className="flex gap-2">
            <CboData items={clientesOptions} value={selectedCliente} onChange={setSelectedCliente} placeholder="Seleccionar Cliente" className="flex-1" hideArrow={true} />
            <button 
              onClick={() => setIsClienteModalOpen(true)}
              className="bg-[#70757a] text-white p-2 rounded-sm hover:bg-gray-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </FormField>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Fecha Emisión:">
              <input type="text" value={fechaHoy} readOnly className={readOnlyStyle} />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Validez:">
              <CustomSelect className={inputStyle}>
                <option>1 DIAS</option>
                <option>7 DIAS</option>
                <option>15 DIAS</option>
              </CustomSelect>              
            </FormField>
          </div>
        </div>

        <FormField label="T. Operación:">
          <CustomSelect className={inputStyle}>
            <option>0101 - Venta Interna</option>
          </CustomSelect>
        </FormField>

        <FormField label="Observación:" multiline>
          <textarea 
            className="w-full border border-gray-300 rounded-sm px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400 h-20 resize-y"
            defaultValue="Emitimos la siguiente Cotizacion a vuestra solicitud"
          />
        </FormField>
      </div>

      {/* Columna Derecha */}
      <div className="flex flex-col gap-4">
        <FormField label="Comisionista:">
          <CustomSelect className={inputStyle}>
            <option>Sin Comisión - 0%</option>
          </CustomSelect>
        </FormField>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Tipo:">
              <CustomSelect className={inputStyle}>
                <option>Factura</option>
                <option>Boleta</option>
              </CustomSelect>
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Moneda:">
              <CustomSelect className={inputStyle}>
                <option>Soles</option>
                <option>Dólares</option>
              </CustomSelect>
            </FormField>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Garantía:">
              <CustomSelect className={inputStyle}>
                <option>6 MESES</option>
                <option>1 AÑO</option>
              </CustomSelect>
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Forma Pago:">
              <CustomSelect className={inputStyle}>
                <option>Contado</option>
                <option>Crédito</option>
              </CustomSelect>
            </FormField>
          </div>
        </div>

        <RenovacionFields 
          isActive={renovacion.isActive}
          fechaRenovacion={renovacion.fechaRenovacion}
          onChange={actions.setRenovacion}
        />
      </div>
    </div>
  )

  return (
    <div className="p-4 bg-[#f5f5f5]">
      <DocumentFormTemplate
        title="Generar Cotización"
        onClose={handleClose}
        topForm={topForm}
        
        tableBody={
          <VentaItemsTable 
            mode="cotizacion" 
            rows={rows} 
            onUpdate={actions.updateRow} 
            onRemove={actions.removeRow}  
            onAddEmpty={() => setIsArticuloModalOpen(true)}
          />
        }

        summarySection={<VentaSummary {...totals} />}

        actions={
          <div className="flex gap-3">
            <ActionButton text="Guardar" variant="outline" icon={<Save className="w-4 h-4" />} onClick={() => console.log("Guardar", { rows, renovacion })} />
            <ActionButton text="Guardar y Finalizar" variant="filled" icon={<Save className="w-4 h-4" />} onClick={() => console.log("Guardar y Finalizar", { rows, renovacion })} />
          </div>
        }
      />

      {/* Modales */}
      <ClienteModal isOpen={isClienteModalOpen} onClose={() => setIsClienteModalOpen(false)} onSave={() => {}} />
      <ArticuloSelectorModal 
        isOpen={isArticuloModalOpen}
        onClose={() => setIsArticuloModalOpen(false)}
        onAdd={handleAddArticulo}
      />
    </div>
  )
}
