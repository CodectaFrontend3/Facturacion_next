<<<<<<< HEAD
export default function Page() {
  return (
    <main className="flex-1 bg-white p-6">
      <h2 className="text-xl font-semibold text-black">Proveedores</h2>
    </main>
  );
=======
"use client"

import { useState } from "react"
import { TabTemplate } from "./components/TabTemplate"
import { useProvedorFilters } from "./hook/useProvedorFilters"
import { ProveedorModal } from "./components/ProveedorModal"
import { ProveedorModal as ProveedorModalType } from "./types/proovedor"

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
  const { data, filters, isLoading, handleFilterChange, handleSearch, handleReset, addProveedor } = useProvedorFilters()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSaveProveedor = (formData: ProveedorModalType) => {
    console.log("Guardando proveedor:", formData)
    // Llama a la función para añadirlo a la tabla visualmente
    addProveedor(formData)
    setIsModalOpen(false)
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
        onAddClick={() => setIsModalOpen(true)}
      />
      <ProveedorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProveedor} 
      />
    </>
  )
>>>>>>> origin/rodrigo
}
