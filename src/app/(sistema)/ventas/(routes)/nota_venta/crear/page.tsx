"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentFormTemplate } from "@/components/shared/DocumentFormTemplate"
import { CboData } from "@/components/common/CboData"
import { ActionButton } from "@/components/common/ActionButton"
import { Plus, Save, ChevronDown } from "lucide-react"

// Importar los modales
import { ClienteModal } from "@/app/(sistema)/ventas/_components/legacy-clientes/ClienteModal"
import { ArticuloSelectorModal } from "@/app/(sistema)/ventas/_components/legacy/shared/ArticuloSelectorModal"

// Piezas Reutilizables
import { useVentaForm } from "@/app/(sistema)/ventas/_hooks/legacy/useVentaForm"
import { VentaItemsTable } from "@/app/(sistema)/ventas/_components/legacy/shared/VentaItemsTable"

// Mocks
import { clientesOptions } from "@/app/(sistema)/ventas/_utils/legacy/clientesOptions"


// FormField con estilo más suave para coincidir con el diseño
const FormField = ({ label, children, multiline }: { label: string; children: React.ReactNode; multiline?: boolean }) => (
  <div className={`flex gap-4 ${multiline ? "items-start" : "items-center"}`}>
    <label className="w-28 text-[13px] font-extrabold text-[#676a6c] flex-shrink-0 pt-1">{label}</label>
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
  </div >
)

export default function CrearNotaVentaPage() {
  const router = useRouter()
  const { rows, totals, actions } = useVentaForm()
  const [selectedCliente, setSelectedCliente] = useState("")
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)
  const [isArticuloModalOpen, setIsArticuloModalOpen] = useState(false)

  const basePath = "/ventas"
  const handleClose = () => router.push(`${basePath}/nota_venta`)

  const handleAddArticulo = (id: string, qty: number) => {
    const emptyRowIndex = rows.findIndex(row => !row.articleId || row.articleId === "")
    if (emptyRowIndex !== -1) {
      actions.updateRow(rows[emptyRowIndex].id, "articleId", id)
      actions.updateRow(rows[emptyRowIndex].id, "cantidad", qty)
    } else {
      actions.addRow(id, qty)
    }
  }

  // Obtener fecha actual en formato DD-MM-YYYY
  const fechaHoy = new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-')

  const topForm = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 px-2 py-4">
      {/* Columna Izquierda */}
      <div className="flex flex-col gap-4">
        <FormField label="Cliente:">
          <div className="flex gap-2">
            <CboData items={clientesOptions} value={selectedCliente} onChange={setSelectedCliente} placeholder="Seleccionar Cliente" className="flex-1" hideArrow={true} />
            <button 
              type="button"
              onClick={() => setIsClienteModalOpen(true)}
              className="bg-[#70757a] text-white p-2 rounded-sm hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div >
        </FormField >

        <FormField label="Fecha Emisión:">
          <input type="text" readOnly value={fechaHoy} className={readOnlyStyle} />
        </FormField>
        <FormField label="Moneda:">
          <CustomSelect className={inputStyle}>
            <option>soles</option>
            <option>dolares</option>
          </CustomSelect>
        </FormField>
      </div >

    {/* Columna Derecha */ }
    < div className = "flex flex-col gap-4" >
        <FormField label="Almacén:">
          <input type="text" readOnly value="2" className={readOnlyStyle} />
        </FormField>

        <FormField label="Forma Pago:">
          <CustomSelect className={inputStyle}>
            <option>Contado</option>
            <option>Crédito</option>
          </CustomSelect>
        </FormField>
        <FormField label="Garantía:">
          <CustomSelect className={inputStyle}>
            <option>6 MESES</option>
            <option>12 MESES</option>
            <option>SIN GARANTÍA</option>
          </CustomSelect>
        </FormField>
      </div >

    <div className="flex flex-col lg:col-span-2 gap-4">
      <FormField label="Observación:" multiline>
  <textarea
    className="w-full border border-gray-200 rounded-sm px-3 py-2 text-[13px] text-gray-600 focus:outline-none h-9 resize-y"
    defaultValue="Emitimos la siguiente Nota de Venta a vuestra solicitud"
  />
        </FormField >
      </div >
    </div >
  )

  const fmt = (n: number) => (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="p-4 bg-[#f5f5f5]">
        <DocumentFormTemplate
          title="Generar Nota de Venta"
          onClose={handleClose}
          topForm={topForm}
        tableBody={
          <VentaItemsTable
            mode="nota_venta"
            rows={rows}
            onUpdate={actions.updateRow}
            onRemove={actions.removeRow}
              onAddEmpty={() => setIsArticuloModalOpen(true)}
            />
          }
          summarySection={
            <div className="flex items-center gap-4 pb-2 pt-6 border-t border-gray-200 w-full justify-end pr-4">
              <span className="w-32 text-[13px] font-extrabold text-[#676a6c] text-right">Total :</span>
              <input
                type="text"
                readOnly
                value={totals.total === 0 ? "" : fmt(totals.total)}
                className="w-[350px] shrink-0 bg-[#e9ecef] border border-[#e2e8f0] rounded-sm px-3 py-1.5 text-[13px] text-right font-bold focus:outline-none border-[#18a689] text-[#18a689]"
              />
            </div>
          }
          actions={
            <div className="flex gap-3">
            <ActionButton text="Guardar" variant="outline" icon={<Save className="w-4 h-4" />} onClick={() => console.log("Guardar", { rows })} />
            <ActionButton text="Guardar y Finalizar" variant="filled" icon={<Save className="w-4 h-4" />} onClick={() => console.log("Guardar y Finalizar", { rows })} />
          </div >
        }
      />

{/* Modales */ }
      <ClienteModal 
        isOpen={isClienteModalOpen} 
        onClose={() => setIsClienteModalOpen(false)} 
        onSave={() => {}}
      />

      <ArticuloSelectorModal
        isOpen={isArticuloModalOpen}
        onClose={() => setIsArticuloModalOpen(false)}
        onAdd={handleAddArticulo}
      />
    </div >
  )
}
