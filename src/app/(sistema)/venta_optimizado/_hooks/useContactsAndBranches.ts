"use client"

import { useState } from "react"
import { ClienteDetalle } from "../_domain/types/cliente.types"
import { ContactoData } from "../_components/clientes/detail/contacto/ContactoModal"
import { SucursalData } from "../_components/clientes/detail/contacto/SucursalModal"
import { showToast } from "@/components/shared/custom-toast"

interface Contacto {
  nombre: string
  cargo?: string
  correo?: string
  telefono1?: string
  telefono2?: string
  estado: "Activo" | "Inactivo"
}

export function useContactsAndBranches(cliente: ClienteDetalle) {
  const [activeTab, setActiveTab] = useState<"contactos" | "sucursales">("contactos")
  
  // Estados para panel ¿Es Empresa Retenedora?
  const [porcentaje, setPorcentaje] = useState<number>(0)
  const [retenedoraEstado, setRetenedoraEstado] = useState(false)
  const [isRetenedoraModalOpen, setIsRetenedoraModalOpen] = useState(false)

  // Estados para el Modal de Contacto
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedContacto, setSelectedContacto] = useState<Contacto | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // Estados para el Modal de Sucursal
  const [sucursalModalOpen, setSucursalModalOpen] = useState(false)
  const [selectedSucursal, setSelectedSucursal] = useState<SucursalData | null>(null)
  const [editSucursalIndex, setEditSucursalIndex] = useState<number | null>(null)

  // Inicializar contactos
  const [contactos, setContactos] = useState<Contacto[]>(() => {
    const list: Contacto[] = []
    if (cliente.contactoNombre) {
      list.push({
        nombre: cliente.contactoNombre,
        cargo: cliente.contactoCargo || "Representante",
        correo: cliente.contactoCorreo || "",
        telefono1: cliente.contactoTelefono || "",
        telefono2: cliente.contactoCelular || "",
        estado: "Activo"
      })
    }
    list.push({
      nombre: "ContactoTable Tablecontacto",
      cargo: "Jefe de Sistemas",
      correo: "contactotable@gmail.com",
      telefono1: "555555555",
      telefono2: "666666666",
      estado: "Activo"
    })
    return list
  })

  // Inicializar sucursales
  const [sucursales, setSucursales] = useState<SucursalData[]>(() => [
    {
      nombre: "Sucursal Principal - Lima",
      direccion: cliente.direccion || "Av. Principal 123",
      ciudad: cliente.distrito || "Lima",
      departamento: cliente.departamento || "Lima",
      provincia: "Lima",
      distrito: cliente.distrito || "Lima",
      codigoUbigeo: cliente.codUbigeo || "150101",
      estado: "Activo"
    },
    {
      nombre: "Sucursal Norte - Trujillo",
      direccion: "Jr. Pizarro 456, Centro Histórico",
      ciudad: "Trujillo",
      departamento: "La Libertad",
      provincia: "Trujillo",
      distrito: "Trujillo",
      codigoUbigeo: "130101",
      estado: "Activo"
    }
  ])

  const handleAgregarClick = () => {
    setSelectedContacto(null)
    setEditIndex(null)
    setModalOpen(true)
  }

  const handleEditClick = (idx: number) => {
    setSelectedContacto(contactos[idx])
    setEditIndex(idx)
    setModalOpen(true)
  }

  const handleSaveContacto = (data: ContactoData) => {
    if (editIndex !== null) {
      setContactos((prev) => {
        const next = [...prev]
        next[editIndex] = data
        return next
      })
    } else {
      setContactos((prev) => [...prev, data])
    }
  }

  const handleAgregarSucursalClick = () => {
    setSelectedSucursal(null)
    setEditSucursalIndex(null)
    setSucursalModalOpen(true)
  }

  const handleEditSucursalClick = (idx: number) => {
    setSelectedSucursal(sucursales[idx])
    setEditSucursalIndex(idx)
    setSucursalModalOpen(true)
  }

  const handleSaveSucursal = (data: SucursalData) => {
    if (editSucursalIndex !== null) {
      setSucursales((prev) => {
        const next = [...prev]
        next[editSucursalIndex] = data
        return next
      })
    } else {
      setSucursales((prev) => [...prev, data])
    }
  }

  const handleSaveRetenedora = (data: { porcentaje: number; estado: boolean }) => {
    setPorcentaje(data.porcentaje)
    setRetenedoraEstado(data.estado)
    showToast("Configuración de empresa retenedora guardada con éxito", 1)
  }

  return {
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
  }
}
