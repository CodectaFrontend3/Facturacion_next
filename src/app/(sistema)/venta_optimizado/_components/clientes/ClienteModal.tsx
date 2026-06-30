// _components/clientes/ClienteModal.tsx
"use client"

import { useState } from "react"
import { useClienteForm } from "../../_hooks/useClienteForm"
import { CrearClientePayload } from "../../_domain/types/cliente.types"

interface ClienteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (payload: CrearClientePayload) => void
}

export function ClienteModal({ isOpen, onClose, onSave }: ClienteModalProps) {
  const [activeTab, setActiveTab] = useState(1)

  const { formData, errors, isSubmitting, handleChange, handleSubmit, resetForm } =
    useClienteForm({
      onSuccess: (payload) => {
        onSave?.(payload)
        resetForm()
        setActiveTab(1)
        onClose()
      },
    })

  if (!isOpen) return null

  // Adaptador para inputs HTML nativos → handleChange del hook
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    handleChange(name as keyof CrearClientePayload, value || null)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]">
      <div className="w-full max-w-3xl h-[780px] bg-white rounded-xl shadow-2xl flex flex-col relative overflow-hidden">

        {/* Botón cerrar */}
        <button
          onClick={() => { resetForm(); setActiveTab(1); onClose() }}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 focus:outline-none transition-colors"
        >
          <i className="bi bi-x-lg text-xl" />
        </button>

        {/* Header */}
        <div className="px-10 pt-6 pb-1 border-b border-gray-100 w-full mb-5">
          <h2 className="text-2xl font-extrabold text-[#4f566b]">Agregar Nuevo Cliente</h2>
        </div>

        <div className="px-10 pb-10 overflow-y-auto flex-1">
          {/* Barra de consulta RUC/DNI */}
          <div className="flex flex-col items-center justify-center mb-10">
            <h3 className="text-[24px] font-extrabold text-black mb-4">Consultar (RUC - DNI)</h3>
            <div className="flex w-full max-w-[450px] gap-4">
              <input
                type="text"
                placeholder="Ingrese RUC o DNI"
                className="flex-1 border border-gray-300 rounded-full px-5 py-2 text-[15px] focus:outline-none focus:border-[#1a127c] focus:ring-1 focus:ring-[#1a127c] transition-all"
              />
              <button className="bg-[#1a127c] hover:bg-blue-900 text-white px-10 py-2 rounded-full text-[15px] font-semibold transition-colors">
                Buscar
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="w-full">
            <div className="flex px-2">
              {[
                { num: 1, label: "1. Datos Personales" },
                { num: 2, label: "2. Información" },
                { num: 3, label: "3. Contacto" },
              ].map(({ num, label }) => (
                <button
                  key={num}
                  onClick={() => setActiveTab(num)}
                  className={`px-8 py-3 text-[14px] rounded-t-lg transition-colors relative top-[1px] z-10 select-none ${
                    activeTab === num
                      ? "border border-gray-200 border-b-white text-[#4f566b] bg-white font-extrabold"
                      : "text-[#9eabc0] bg-transparent font-semibold border border-transparent"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="border border-gray-200 bg-white p-8 rounded-lg shadow-sm relative z-0">

              {/* Pestaña 1: Datos Personales */}
              {activeTab === 1 && (
                <div className="grid grid-cols-2 gap-x-10 gap-y-3.5">
                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">
                      Documento Identificación
                    </label>
                    <div className="relative">
                      <select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={onInputChange}
                        className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400 text-gray-700 bg-white appearance-none pr-10"
                      >
                        <option value="DNI">DNI</option>
                        <option value="RUC">RUC</option>
                        <option value="Pasaporte">PASAPORTE</option>
                      </select>
                      <i className="bi bi-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-[12px] font-extrabold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">
                      Número de Documento
                    </label>
                    <input
                      type="text"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={onInputChange}
                      className={`w-full border rounded-full px-4 py-2 text-[14px] focus:outline-none ${errors.numeroDocumento ? "border-red-400" : "border-gray-300 focus:border-gray-400"}`}
                    />
                    {errors.numeroDocumento && (
                      <p className="text-red-500 text-[12px] mt-1 pl-2">{errors.numeroDocumento}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Nombre:</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={onInputChange}
                      className={`w-full border rounded-full px-4 py-2 text-[14px] focus:outline-none ${errors.nombre ? "border-red-400" : "border-gray-300 focus:border-gray-400"}`}
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-[12px] mt-1 pl-2">{errors.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Dirección:</label>
                    <input type="text" name="direccion" value={formData.direccion ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Correo:</label>
                    <input type="email" name="correo" value={formData.correo ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Distrito:</label>
                    <input type="text" name="distrito" value={formData.distrito ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Teléfono:</label>
                    <input type="text" name="telefono" value={formData.telefono ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Celular:</label>
                    <input type="text" name="celular" value={formData.celular ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>
                </div>
              )}

              {/* Pestaña 2: Información */}
              {activeTab === 2 && (
                <div className="grid grid-cols-2 gap-x-10 gap-y-3.5">
                  <div>
                    <label className="block text-[14px] font-extrabold text-[#2563eb] mb-2">
                      <i className="bi bi-geo-alt-fill mr-1.5" /> Cod. Ubigeo:
                    </label>
                    <input type="text" name="codUbigeo" value={formData.codUbigeo ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Departamento:</label>
                    <input type="text" name="departamento" value={formData.departamento ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">País:</label>
                    <input type="text" name="pais" value={formData.pais ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Aniversario:</label>
                    <input type="date" name="aniversario" value={formData.aniversario ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400 text-gray-700" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Fecha Registro:</label>
                    <input type="date" name="fechaRegistro" value={formData.fechaRegistro ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400 text-gray-700" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Tipo Cliente:</label>
                    <div className="relative">
                      <select name="tipoCliente" value={formData.tipoCliente} onChange={onInputChange}
                        className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400 text-gray-700 bg-white appearance-none pr-10">
                        <option value="Cliente Frecuente">Cliente Frecuente</option>
                        <option value="Cliente Revendedor">Cliente Revendedor</option>
                        <option value="Cliente Vip">Cliente VIP</option>
                        <option value="Cliente Nuevo">Cliente Nuevo</option>
                        <option value="Cliente Inactivo">Cliente Inactivo</option>
                      </select>
                      <i className="bi bi-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-[12px] font-extrabold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Vendedor Asignado:</label>
                    <div className="relative">
                      <select name="vendedorAsignado" value={formData.vendedorAsignado} onChange={onInputChange}
                        className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400 text-gray-700 bg-white appearance-none pr-10">
                        <option value="Sin vendedor fijo">Sin Vendedor fijo</option>
                        <option value="Demo Demo">Demo Demo</option>
                        <option value="María Gómez">María Gómez</option>
                        <option value="Carlos Sánchez">Carlos Sánchez</option>
                        <option value="Ana Rodríguez">Ana Rodríguez</option>
                      </select>
                      <i className="bi bi-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-[12px] font-extrabold" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Forma Pago Aut.:</label>
                    <div className="relative">
                      <select name="formaPagoAut" value={formData.formaPagoAut} onChange={onInputChange}
                        className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400 text-gray-700 bg-white appearance-none pr-10">
                        <option value="Sin forma de pago fija">Sin forma de pago fija</option>
                        <option value="Contado">Contado</option>
                        <option value="Crédito">Crédito</option>
                      </select>
                      <i className="bi bi-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-[12px] font-extrabold" />
                    </div>
                  </div>
                </div>
              )}

              {/* Pestaña 3: Contacto */}
              {activeTab === 3 && (
                <div className="grid grid-cols-2 gap-x-10 gap-y-3.5">
                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Nombre (Contacto):</label>
                    <input type="text" name="contactoNombre" value={formData.contactoNombre ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-extrabold text-[#4f566b] mb-2">Cargo:</label>
                    <input type="text" name="contactoCargo" value={formData.contactoCargo ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-[#4f566b] mb-2">Teléfono:</label>
                    <input type="text" name="contactoTelefono" value={formData.contactoTelefono ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div>
                    <label className="block text-[14px] font-bold text-[#4f566b] mb-2">Celular:</label>
                    <input type="text" name="contactoCelular" value={formData.contactoCelular ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[14px] font-bold text-[#4f566b] mb-2">Correo del Contacto:</label>
                    <input type="email" name="contactoCorreo" value={formData.contactoCorreo ?? ""} onChange={onInputChange}
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-[14px] focus:outline-none focus:border-gray-400" />
                  </div>
                </div>
              )}

              {/* Navegación entre pestañas */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end gap-3 w-full">
                {activeTab > 1 && (
                  <button
                    onClick={() => setActiveTab(activeTab - 1)}
                    className="bg-[#9ca3af] hover:bg-gray-500 text-white px-7 py-2.5 rounded-md text-[14px] font-bold transition-colors cursor-pointer"
                  >
                    Ant.
                  </button>
                )}
                {activeTab < 3 ? (
                  <button
                    onClick={() => setActiveTab(activeTab + 1)}
                    className="bg-[#1e40af] hover:bg-[#190FCE] text-white px-7 py-2.5 rounded-md text-[14px] font-bold transition-colors cursor-pointer"
                  >
                    Sig.
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#1e40af] hover:bg-[#190FCE] disabled:opacity-60 text-white px-7 py-2.5 rounded-md text-[14px] font-bold transition-colors cursor-pointer"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
