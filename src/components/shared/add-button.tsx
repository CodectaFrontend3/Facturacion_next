"use client"

import React, { useState } from "react"
import { ActionButton } from "@/components/common/ActionButton"
import { ClienteModal } from "@/app/(sistema)/ventas/_components/legacy-clientes/ClienteModal"
import { addCliente } from "@/app/(sistema)/ventas/_services/legacy-clientes/clienteService"
import { ClienteFormData } from "@/app/(sistema)/ventas/_domain/legacy/cliente.types"
import { showToast } from "@/components/shared/custom-toast"
import { ProductoModal } from "@/app/(sistema)/(productos-servicios)/_components/productos/ProductoModal"
import { Producto } from "@/app/(sistema)/(productos-servicios)/types/productos.types"

export function AddButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)
  const [isProductoModalOpen, setIsProductoModalOpen] = useState(false)

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

  const handleSaveProducto = (data: Omit<Producto, "id"> & { id?: string }) => {
    const newProduct: Producto = {
      ...data,
      id: String(Date.now()),
      fechaRegistro: "07-07-2026",
    }
    showToast("Producto registrado correctamente", 1)
    
    // Dispatch custom event to notify mounted tables/views to reload
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("producto-added", { detail: newProduct }))
    }
    setIsProductoModalOpen(false)
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
              onClick={() => {
                setIsProductoModalOpen(true)
                setIsOpen(false)
              }}
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
            className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center bg-[#2C1FF3] hover:bg-[#190FCE] border-[#2C1FF3] hover:border-[#190FCE] hover:scale-105 active:scale-95 transition-all duration-200"
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

      {/* Modal de Producto */}
      {isProductoModalOpen && (
        <ProductoModal
          isOpen={isProductoModalOpen}
          onClose={() => setIsProductoModalOpen(false)}
          onSave={handleSaveProducto}
        />
      )}
    </>
  )
}
