"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentFormTemplate } from "@/components/shared/DocumentFormTemplate"
import { ClienteModal } from "../../clientes/components/ClienteModal"
import { addCliente } from "../../clientes/services/clienteService"
import { ClienteFormData } from "../../types/cliente.types"

// Componente utilitario local para mantener el grid ordenado
const FormField = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex items-center gap-4">
    <label className="w-28 text-[13px] font-extrabold text-[#4f566b] flex-shrink-0">{label}</label>
    <div className="flex-1">
      {children}
    </div>
  </div>
)

export default function CrearCotizacionPage() {
  const router = useRouter()
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)

  // Handlers
  const handleClose = () => router.push("/ventas/cotizacion")
  
  const handleSaveCliente = async (formData: ClienteFormData) => {
    try {
      await addCliente(formData)
      setIsClienteModalOpen(false)
      // TODO: Refrescar el listado de clientes en el combo
    } catch (error) {
      console.error("Error al guardar cliente:", error)
    }
  }

  // ==========================================
  // SECCIÓN 1: FORMULARIO SUPERIOR (Grid)
  // ==========================================
  const topForm = (
    <div className="grid grid-cols-2 gap-x-12 gap-y-5">
      
      {/* --- COLUMNA IZQUIERDA --- */}
      <div className="flex flex-col gap-4">
        
        {/* Cliente */}
        <FormField label="Cliente:">
          <div className="flex w-full">
            <select className="flex-1 border border-gray-300 rounded-l-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white relative z-10">
              <option>Seleccionar Cliente</option>
            </select>
            {/* Ícono absoluto del combo, oculto tras el select, o lo pintamos encima con pointer-events-none */}
            <button 
              onClick={() => setIsClienteModalOpen(true)}
              className="bg-[#6b7280] hover:bg-gray-600 text-white px-3 py-1.5 rounded-r-md transition-colors flex items-center justify-center"
            >
              <i className="bi bi-plus-lg text-sm"></i>
            </button>
          </div>
        </FormField>

        {/* Fecha Emisión y Validez */}
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Fecha Emisión:">
              <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none bg-gray-100" defaultValue="2026-05-15" disabled />
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Validez:">
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
                  <option>1 DIAS</option>
                  <option>7 DIAS</option>
                  <option>15 DIAS</option>
                  <option>30 DIAS</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
              </div>
            </FormField>
          </div>
        </div>

        {/* T. Operación */}
        <FormField label="T. Operación:">
          <div className="relative">
            <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
              <option>0101 - Venta Interna</option>
              <option>0200 - Exportación</option>
            </select>
            <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
          </div>
        </FormField>

        {/* Observación */}
        <FormField label="Observación:">
          <textarea 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-[13px] text-gray-600 focus:outline-none resize-none h-12"
            defaultValue="Emitimos la siguiente Cotización a vuestra solicitud"
          />
        </FormField>
      </div>

      {/* --- COLUMNA DERECHA --- */}
      <div className="flex flex-col gap-4">
        
        {/* Comisionista */}
        <FormField label="Comisionista:">
          <div className="relative">
            <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
              <option>Sin Comisión - 0%</option>
            </select>
            <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
          </div>
        </FormField>

        {/* Tipo y Moneda */}
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Tipo:">
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
                  <option>Factura</option>
                  <option>Boleta</option>
                  <option>Nota de Venta</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
              </div>
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Moneda:">
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
                  <option>Soles</option>
                  <option>Dólares</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
              </div>
            </FormField>
          </div>
        </div>

        {/* Garantía y Forma Pago */}
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField label="Garantía:">
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
                  <option>6 MESES</option>
                  <option>12 MESES</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
              </div>
            </FormField>
          </div>
          <div className="flex-1">
            <FormField label="Forma Pago:">
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
                  <option>Contado</option>
                  <option>Crédito</option>
                </select>
                <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
              </div>
            </FormField>
          </div>
        </div>

        {/* Toggle Renovación */}
        <div className="flex items-center gap-3 mt-2 h-12">
          <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer shadow-inner">
            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
          </div>
          <span className="text-[13px] font-extrabold text-[#4f566b]">Activar renovación</span>
        </div>

      </div>
    </div>
  )

  // ==========================================
  // SECCIÓN 2: CABECERAS DE TABLA
  // ==========================================
  const tableHeaders = (
    <>
      <th className="py-4 px-3 w-12 text-center border-b border-gray-200">
        <button className="border border-[#1e40af] text-[#1e40af] hover:bg-blue-50 rounded w-6 h-6 flex items-center justify-center transition-colors mx-auto">
          <i className="bi bi-plus font-bold"></i>
        </button>
      </th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] w-64 border-b border-gray-200">Artículo</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">Stock</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">Cantidad</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">Precio</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">Dcto</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">PU. Dcto.</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">PU. Com.</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">Total</th>
      <th className="py-4 px-2 text-[13px] font-extrabold text-[#4f566b] text-center border-b border-gray-200">Total IGV</th>
    </>
  )

  // ==========================================
  // SECCIÓN 3: CUERPO DE TABLA (Artículos)
  // ==========================================
  const tableBody = (
    <>
      <tr className="border-b border-gray-100">
        <td className="py-4 px-3 text-center align-top">
          <button className="bg-[#1e40af] hover:bg-blue-800 text-white rounded w-7 h-7 flex items-center justify-center transition-colors mx-auto mt-1">
            <i className="bi bi-trash-fill text-[13px]"></i>
          </button>
        </td>
        <td className="py-4 px-2">
          <div className="relative mb-2">
            <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none appearance-none bg-white">
              <option>Seleccionar Artículo</option>
            </select>
            <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px] font-bold"></i>
          </div>
          <textarea 
            className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none resize-none h-16"
            placeholder="Descripción de Item"
          />
        </td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] bg-[#e2e8f0] text-center" disabled /></td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] text-center" /></td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] bg-[#e2e8f0] text-center" disabled /></td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-300 rounded-full px-2 py-1.5 text-[13px] text-center" /></td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] bg-[#e2e8f0] text-center" disabled /></td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] bg-[#e2e8f0] text-center" disabled /></td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] bg-[#e2e8f0] text-center" disabled /></td>
        <td className="py-4 px-2 align-top"><input type="text" className="w-full border border-gray-200 rounded px-2 py-1.5 text-[13px] bg-[#e2e8f0] text-center" disabled /></td>
      </tr>
    </>
  )

  // ==========================================
  // SECCIÓN 4: RESUMEN Y TOTALES
  // ==========================================
  const summarySection = (
    <>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-[13px] font-extrabold text-[#4f566b] ml-4">Subtotal :</span>
        <input type="text" className="w-[300px] bg-[#e2e8f0] border border-[#cbd5e1] rounded px-3 py-1.5 text-[13px]" disabled />
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <span className="text-[13px] font-extrabold text-[#4f566b] ml-4">IGV :</span>
        <input type="text" className="w-[300px] bg-[#e2e8f0] border border-[#cbd5e1] rounded px-3 py-1.5 text-[13px]" disabled />
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="text-[13px] font-extrabold text-[#4f566b] ml-4">Total :</span>
        <input type="text" className="w-[300px] bg-[#e2e8f0] border border-[#cbd5e1] rounded px-3 py-1.5 text-[13px]" disabled />
      </div>
    </>
  )

  // ==========================================
  // SECCIÓN 5: BOTONES DE ACCIÓN
  // ==========================================
  const actions = (
    <>
      <button className="border border-[#1e40af] text-[#1e40af] hover:bg-blue-50 px-6 py-2 rounded text-[13px] font-extrabold transition-colors">
        Guardar
      </button>
      <button className="bg-[#1e40af] hover:bg-blue-800 text-white px-6 py-2 rounded text-[13px] font-extrabold transition-colors">
        Guardar y Finalizar
      </button>
    </>
  )

  return (
    <>
      <div className="px-6 py-4">
        <DocumentFormTemplate 
          title="Generar Cotización"
          onClose={handleClose}
          topForm={topForm}
          tableHeaders={tableHeaders}
          tableBody={tableBody}
          summarySection={summarySection}
          actions={actions}
        />
      </div>

      <ClienteModal 
        isOpen={isClienteModalOpen} 
        onClose={() => setIsClienteModalOpen(false)} 
        onSave={handleSaveCliente}
      />
    </>
  )
}
