"use client"

import { useState } from "react"
import { VentasTabTemplate } from "../components/VentasTabTemplate"
import { useClienteFilters } from "./hooks/useClienteFilters"
import { ClienteModal } from "./components/ClienteModal"
import { addCliente } from "./services/clienteService"
import { ClienteFormData } from "../types/cliente.types"

export default function ClientesPage() {
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset } = useClienteFilters()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSaveCliente = async (formData: ClienteFormData) => {
    try {
      await addCliente(formData)
      setIsModalOpen(false)
      handleSearch() // Recargar la tabla con los datos nuevos
    } catch (error) {
      console.error("Error al guardar cliente:", error)
    }
  }

  return (
    <>
      <VentasTabTemplate
        activeTab="clientes"
        data={data}
        filters={filters}
        isLoading={isLoading}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
        onAddClick={() => setIsModalOpen(true)}
        filterSelectConfig={{
          name: "documento",
          options: [
            { label: "Todos los Documentos", value: "Todos los Documentos" },
            { label: "DNI", value: "DNI" },
            { label: "RUC", value: "RUC" }
          ]
        }}
      />
      <ClienteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCliente}
      />
    </>
  )
}
