"use client"

import { useState } from "react"
import { TabTemplate } from "./components/TabTemplate"
import { useProvedorFilters } from "./hook/useProvedorFilters"
import { ProveedorModal } from "./components/ProveedorModal"
import { ProveedorModal as ProveedorModalType } from "./types/proovedor"
import { showToast } from "@/components/shared/custom-toast"

const PROVEDOR_TABS = [
  {
    key: "provedor",
    label: "Proveedores",
    count: 0,
    color: "#18a689",
    href: "/provedor"
  }
]

export default function Page() {
  const { 
    data, 
    filters, 
    isLoading, 
    handleFilterChange, 
    handleSearch, 
    handleReset, 
    addProveedor,
    updateProveedor,
    toggleProveedorAcciones
  } = useProvedorFilters()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null)
  const [isViewOnly, setIsViewOnly] = useState(false)

  const handleSaveProveedor = (formData: ProveedorModalType) => {
    if (selectedProvider) {
      console.log("Actualizando proveedor:", formData)
      updateProveedor(selectedProvider.id, formData)
    } else {
      console.log("Guardando proveedor:", formData)
      addProveedor(formData)
    }
    setIsModalOpen(false)
    setSelectedProvider(null)
  }

  const handleAddClick = () => {
    setSelectedProvider(null)
    setIsViewOnly(false)
    setIsModalOpen(true)
  }

  const handleEdit = (provider: any) => {
    setSelectedProvider(provider)
    setIsViewOnly(false)
    setIsModalOpen(true)
  }

  const handleView = (provider: any) => {
    setSelectedProvider(provider)
    setIsViewOnly(true)
    setIsModalOpen(true)
  }

  const handleCheck = (provider: any) => {
    showToast("Estado actualizado correctamente.", 1)
    toggleProveedorAcciones(provider.id, true)
  }

  const handleCancel = (provider: any) => {
    toggleProveedorAcciones(provider.id, false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProvider(null)
    setIsViewOnly(false)
  }

  return (
    <>
      <TabTemplate
        activeTab="provedor"
        tabs={PROVEDOR_TABS}
        tableData={data}
        filters={filters}
        isLoading={isLoading}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
        onAddClick={handleAddClick}
        onEdit={handleEdit}
        onView={handleView}
        onCheck={handleCheck}
        onCancel={handleCancel}
      />
      <ProveedorModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveProveedor} 
        provider={selectedProvider}
        isViewOnly={isViewOnly}
      />
    </>
  )
}