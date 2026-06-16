"use client"

import React, { useState } from "react"
import { ActionButton } from "@/components/common/ActionButton"
import { ClienteModal } from "@/app/(sistema)/ventas/clientes/components/ClienteModal"
import { addCliente } from "@/app/(sistema)/ventas/clientes/services/clienteService"
import { ClienteFormData } from "@/app/(sistema)/ventas/types/cliente.types"
import { showToast } from "@/components/shared/custom-toast"

export function AddButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)

  const handleSaveCliente = async (formData: ClienteFormData) => {
    try {
      await addCliente(formData)
      setIsClienteModalOpen(false)
      showToast("Cliente registrado correctamente", 1)
      
      // Dispatch custom event to notify mounted tables/views to reload
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cliente-added"))
      }
    } catch (error) {
      console.error("Error al guardar cliente:", error)
      showToast("Ocurrió un error al guardar el cliente", 2)
    }
  }

  return (
    <>
      {/* Contenedor flotante: Centramos horizontalmente los elementos (items-center) */}
      <div className="fixed bottom-12 right-4 z-50 flex flex-col items-center gap-3 pointer-events-none">
        
        {/* Botones secundarios (Productos, Clientes) */}
        <div 
          className={`flex flex-col items-center gap-3 transition-all duration-300 transform origin-bottom ${
            isOpen 
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          {/* Opción 1: Nuevo Producto */}
          <div className="relative flex items-center justify-center">
            {/* Posicionamiento absoluto para que la etiqueta no afecte el centrado del botón */}
            <span className="absolute right-full mr-3 bg-gray-800/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-md backdrop-blur-xs select-none whitespace-nowrap">
              Nuevo Producto
            </span>
            <ActionButton
              onClick={() => {}}
              icon={<i className="bi bi-box-seam text-[16px] text-white"></i>}
              variant="filled"
              className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 border-blue-600 text-white transition-all duration-200"
              label="Nuevo Producto"
            />
          </div>

          {/* Opción 2: Nuevo Cliente */}
          <div className="relative flex items-center justify-center">
            {/* Posicionamiento absoluto para que la etiqueta no afecte el centrado del botón */}
            <span className="absolute right-full mr-3 bg-gray-800/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-md backdrop-blur-xs select-none whitespace-nowrap">
              Nuevo Cliente
            </span>
            <ActionButton
              onClick={() => {
                setIsClienteModalOpen(true)
                setIsOpen(false)
              }}
              icon={<i className="bi bi-person-plus text-[17px] text-white"></i>}
              variant="filled"
              className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 border-blue-600 text-white transition-all duration-200"
              label="Nuevo Cliente"
            />
          </div>
        </div>

        {/* Botón principal circular con el "+" */}
        <div className="pointer-events-auto flex items-center justify-center">
          <ActionButton
            onClick={() => setIsOpen(!isOpen)}
            icon={
              <i 
                className={`bi bi-plus-lg text-[22px] text-white transition-transform duration-300 block ${
                  isOpen ? "rotate-45" : ""
                }`}
              ></i>
            }
            variant="filled"
            className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-[#1a5eb3] hover:bg-[#1a3bb3] border-[#1a5eb3] hover:border-[#1a3bb3] hover:scale-105 active:scale-95 transition-all duration-200"
            label="Acciones rápidas"
          />
        </div>
      </div>

      {/* Modal de Cliente */}
      {isClienteModalOpen && (
        <ClienteModal
          isOpen={isClienteModalOpen}
          onClose={() => setIsClienteModalOpen(false)}
          onSave={handleSaveCliente}
        />
      )}
    </>
  )
}
