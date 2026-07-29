"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { clienteService } from "../../../_services/clienteService"
import { ClienteDetalle } from "../../../_domain/types/cliente.types"
import { ContactsAndBranchesPanel } from "../../../_components/clientes/detail/contacto/ContactsAndBranchesPanel"
import { ClientDetailPanel } from "../../../_components/clientes/detail/form/ClientDetailPanel"
import { useVentasBasePath } from "../../../VentasContext"

export default function ClientDetailPage() {
  const params = useParams()
  const basePath = useVentasBasePath()
  const id = params.id as string
  
  const [cliente, setCliente] = useState<ClienteDetalle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await clienteService.getById(id)
        if (data) {
          setCliente(data)
        }
      } catch (err) {
        console.error("Error al obtener cliente:", err)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchCliente()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm font-semibold">
        Cargando detalle de cliente...
      </div>
    )
  }

  if (!cliente) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-gray-800">Cliente no encontrado</h3>
        <p className="text-gray-500 mt-1">El cliente solicitado no existe en el sistema.</p>
        <Link
          href={`${basePath}/clientes`}
          className="inline-flex items-center gap-1.5 bg-[#2C1FF3] hover:bg-[#190FCE] text-white px-4 py-2 rounded-[5px] text-[13px] font-bold mt-4 transition-colors"
        >
          <i className="fa fa-arrow-left" /> Volver a Clientes
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 p-1 md:p-2 w-full font-sans bg-gray-50/50 h-fit">
      {/* Barra superior de navegación / Migas de pan */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Link
            href={`${basePath}/clientes`}
            className="text-gray-500 hover:text-[#2C1FF3] flex items-center gap-1 text-[13px] font-bold transition-colors"
          >
            <i className="fa fa-arrow-left" /> Clientes
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-bold text-[13px]">Detalle</span>
        </div>
      </div>

      {/* Grid Principal de 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Columna Izquierda: Contactos y Sucursales */}
        <div className="lg:col-span-2 w-full flex flex-col h-full">
          <ContactsAndBranchesPanel cliente={cliente} />
        </div>

        {/* Columna Derecha: Tarjeta de Datos / Formulario */}
        <div className="lg:col-span-1 w-full flex flex-col h-full">
          <ClientDetailPanel
            cliente={cliente}
            onSave={(updated) => setCliente(updated)}
          />
        </div>
      </div>
    </div>
  )
}
