"use client"

import { ClienteDetalle } from "../../../../_domain/types/cliente.types"
import { ContactoModal } from "./ContactoModal"
import { SucursalModal } from "./SucursalModal"
import { EmpresaRetenedoraModal } from "./EmpresaRetenedoraModal"
import { ContactoCard } from "./ContactoCard"
import { SucursalCard } from "./SucursalCard"
import { ActionButton } from "@/components/common/ActionButton"
import { useContactsAndBranches } from "../../../../_hooks/useContactsAndBranches"

interface ContactsAndBranchesPanelProps {
  cliente: ClienteDetalle
}

export function ContactsAndBranchesPanel({ cliente }: ContactsAndBranchesPanelProps) {
  const {
    activeTab,
    setActiveTab,
    contactos,
    sucursales,
    porcentaje,
    retenedoraEstado,
    isRetenedoraModalOpen,
    setIsRetenedoraModalOpen,
    modalOpen,
    setModalOpen,
    selectedContacto,
    sucursalModalOpen,
    setSucursalModalOpen,
    selectedSucursal,
    handleAgregarClick,
    handleEditClick,
    handleSaveContacto,
    handleAgregarSucursalClick,
    handleEditSucursalClick,
    handleSaveSucursal,
    handleSaveRetenedora
  } = useContactsAndBranches(cliente)

  return (
    <div className="flex flex-col w-full bg-white border border-gray-200 shadow-sm h-full">
      {/* Pestañas de cabecera */}
      <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
        <button
          onClick={() => setActiveTab("contactos")}
          className={`px-6 py-3.5 text-[13px] font-bold tracking-wide transition-all border-r border-gray-200 cursor-pointer ${
            activeTab === "contactos"
              ? "bg-white text-gray-900 border-b-2 border-b-[#2C1FF3]"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Contactos
        </button>
        <button
          onClick={() => setActiveTab("sucursales")}
          className={`px-6 py-3.5 text-[13px] font-bold tracking-wide transition-all border-r border-gray-200 cursor-pointer ${
            activeTab === "sucursales"
              ? "bg-white text-gray-900 border-b-2 border-b-[#2C1FF3]"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Sucursales
        </button>
      </div>

      {/* Contenido */}
      <div className="p-6 flex-1 flex flex-col overflow-y-auto">
        {activeTab === "contactos" && (
          <div className="flex-1 flex flex-col">
            {/* Header del bloque */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 mb-4 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700 font-bold text-[13px]">
                  <i className="fa fa-user text-[14px]" />
                  <span>Contactos</span>
                </div>
                <ActionButton
                  onClick={handleAgregarClick}
                  className="bg-transparent hover:bg-gray-100 text-[#17a2b8] hover:text-[#138496] border border-[#17a2b8] rounded px-3 py-1 text-[11px] font-bold flex items-center gap-1 transition-colors h-7 shadow-none hover:shadow-none cursor-pointer"
                  icon={<span className="text-[13px] font-bold">+</span>}
                  text="Agregar Contacto"
                  variant="outline"
                />
                <ActionButton
                  onClick={() => setIsRetenedoraModalOpen(true)}
                  className="bg-transparent hover:bg-gray-100 text-[#2C1FF3] hover:text-[#190FCE] border border-[#2C1FF3] rounded px-3 py-1 text-[11px] font-bold flex items-center gap-1 transition-colors h-7 shadow-none hover:shadow-none cursor-pointer ml-2"
                  text="¿Es Empresa Retenedora?"
                  variant="outline"
                />
              </div>
              <span className="text-[11px] font-bold text-gray-400">
                {contactos.length} Elementos
              </span>
            </div>

            {/* Listado de contactos */}
            <div className="flex flex-col gap-3">
              {contactos.map((contact, idx) => (
                <ContactoCard
                  key={idx}
                  contacto={contact}
                  onClick={() => handleEditClick(idx)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "sucursales" && (
          <div className="flex-1 flex flex-col">
            {/* Header del bloque */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 mb-4 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700 font-bold text-[13px]">
                  <i className="bi bi-geo-alt-fill text-[14px]" />
                  <span>Sucursales</span>
                </div>
                <ActionButton
                  onClick={handleAgregarSucursalClick}
                  className="bg-transparent hover:bg-gray-100 text-[#17a2b8] hover:text-[#138496] border border-[#17a2b8] rounded px-3 py-1 text-[11px] font-bold flex items-center gap-1 transition-colors h-7 shadow-none hover:shadow-none cursor-pointer"
                  icon={<span className="text-[13px] font-bold">+</span>}
                  text="Agregar Sucursal"
                  variant="outline"
                />
              </div>
              <span className="text-[11px] font-bold text-gray-400">
                {sucursales.length} Elementos
              </span>
            </div>

            {/* Listado de sucursales */}
            <div className="flex flex-col gap-3">
              {sucursales.map((sucursal, idx) => (
                <SucursalCard
                  key={idx}
                  sucursal={sucursal}
                  onClick={() => handleEditSucursalClick(idx)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal para Agregar/Editar Contacto */}
      <ContactoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveContacto}
        contacto={selectedContacto}
        clienteNombre={cliente.nombre}
      />

      {/* Modal para Agregar/Editar Sucursal */}
      <SucursalModal
        isOpen={sucursalModalOpen}
        onClose={() => setSucursalModalOpen(false)}
        onSave={handleSaveSucursal}
        sucursal={selectedSucursal}
        clienteNombre={cliente.nombre}
      />

      {/* Modal para Empresa Retenedora */}
      <EmpresaRetenedoraModal
        isOpen={isRetenedoraModalOpen}
        onClose={() => setIsRetenedoraModalOpen(false)}
        onSave={handleSaveRetenedora}
        clienteNombre={cliente.nombre}
        initialData={{ porcentaje, estado: retenedoraEstado }}
      />
    </div>
  )
}
