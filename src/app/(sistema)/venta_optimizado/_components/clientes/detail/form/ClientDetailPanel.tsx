"use client"

import { useState } from "react"
import { ClienteDetalle } from "../../../../_domain/types/cliente.types"
import { ActionButton } from "@/components/common/ActionButton"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

interface ClientDetailPanelProps {
  cliente: ClienteDetalle
  onSave?: (updated: ClienteDetalle) => void
}

const VENDEDOR_OPTIONS = ["Demo Demo", "María Gómez", "Carlos Sánchez", "Ana Rodríguez", "Sin vendedor fijo"]
const FORMA_PAGO_OPTIONS = ["Contado", "Crédito", "Sin forma de pago fija"]
const TIPO_CLIENTE_OPTIONS = ["Cliente Frecuente", "Cliente Revendedor", "Cliente Vip", "Cliente Nuevo", "Cliente Inactivo"]

export function ClientDetailPanel({ cliente, onSave }: ClientDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCliente, setEditedCliente] = useState<ClienteDetalle>({ ...cliente })

  const handleInputChange = (field: keyof ClienteDetalle, value: string | null) => {
    setEditedCliente((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    if (onSave) {
      onSave(editedCliente)
    }
  }

  const handleCancel = () => {
    setEditedCliente({ ...cliente })
    setIsEditing(false)
  }

  // Asegurar que el vendedor asignado, forma de pago y tipo de cliente actual estén en las opciones select
  const vendedores = VENDEDOR_OPTIONS.includes(editedCliente.vendedorAsignado || "")
    ? VENDEDOR_OPTIONS
    : [...VENDEDOR_OPTIONS, editedCliente.vendedorAsignado || ""]

  const formasPago = FORMA_PAGO_OPTIONS.includes(editedCliente.formaPagoAut || "")
    ? FORMA_PAGO_OPTIONS
    : [...FORMA_PAGO_OPTIONS, editedCliente.formaPagoAut || ""]

  const tiposCliente = TIPO_CLIENTE_OPTIONS.includes(editedCliente.tipoCliente || "")
    ? TIPO_CLIENTE_OPTIONS
    : [...TIPO_CLIENTE_OPTIONS, editedCliente.tipoCliente || ""]

  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm p-6 flex flex-col gap-6 h-full">
      {/* Cabecera / Info Básica */}
      <div className="flex flex-col gap-2">
        {isEditing ? (
          <div className="flex flex-col gap-2.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nombre del Cliente / Razón Social</label>
            <Input
              type="text"
              value={editedCliente.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              className="h-9 w-full bg-white! border border-gray-300 px-3 text-[14px] text-gray-800 font-bold outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
            />
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tipo Doc.</label>
                <select
                  value={editedCliente.tipoDocumento}
                  onChange={(e) => handleInputChange("tipoDocumento", e.target.value as any)}
                  className="w-full border border-gray-300 rounded-none px-2 py-1.5 text-[13px] text-gray-700 bg-white h-9 outline-none focus:border-[#18a689] focus:ring-0 focus-visible:ring-0 focus-visible:border-[#18a689]"
                >
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nº Documento</label>
                <Input
                  type="text"
                  value={editedCliente.numeroDocumento}
                  onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
                  className="h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-[18px] font-bold text-gray-900 leading-tight">
              {editedCliente.nombre}
            </h2>
            <div className="text-[12px] text-gray-600 font-semibold space-y-0.5 mt-1">
              <p>
                {editedCliente.tipoDocumento}: {editedCliente.numeroDocumento}
              </p>
              <p className="text-gray-400">
                Fecha Registrada: {editedCliente.fechaRegistro || "2026-06-05"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Botón Editar (Solo en modo lectura) */}
      {!isEditing && (
        <div className="flex gap-2">
          <ActionButton
            onClick={() => setIsEditing(true)}
            className="w-full bg-[#2C1FF3] hover:bg-[#190FCE] text-white rounded-[4px] h-10 text-[13px]"
            icon={<i className="bi bi-pencil-square" />}
            text="Editar"
            variant="filled"
          />
        </div>
      )}

      {/* Listado de Datos con Iconos */}
      <div className="flex flex-col gap-4 border-t border-gray-100 pt-5">
        {/* Dirección */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500 shrink-0 shadow-sm mt-1">
            <i className="bi bi-geo-alt text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div>
                <label className="mb-1 block text-[12px] font-medium text-gray-700">Dirección</label>
                <Textarea
                  placeholder="Dirección"
                  value={editedCliente.direccion || ""}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                  className="w-full bg-white! border border-gray-300 px-3 py-2 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans min-h-16 resize-y"
                />
              </div>
            ) : (
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dirección</div>
                <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                  {editedCliente.direccion || "Sin dirección"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Correo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 shrink-0 shadow-sm">
            <i className="bi bi-envelope text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div>
                <label className="mb-1 block text-[12px] font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={editedCliente.correo || ""}
                  onChange={(e) => handleInputChange("correo", e.target.value)}
                  className="h-8 w-full bg-white! border border-gray-300 px-2.5 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                />
              </div>
            ) : (
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</div>
                <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                  {editedCliente.correo || "Sin correo"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* País / Departamento */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 shrink-0 shadow-sm">
            <i className="fa fa-globe text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">País</label>
                  <Input
                    type="text"
                    placeholder="País"
                    value={editedCliente.pais}
                    onChange={(e) => handleInputChange("pais", e.target.value)}
                    className="h-8 w-full bg-white! border border-gray-300 px-2.5 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Departamento</label>
                  <Input
                    type="text"
                    placeholder="Departamento"
                    value={editedCliente.departamento || ""}
                    onChange={(e) => handleInputChange("departamento", e.target.value)}
                    className="h-8 w-full bg-white! border border-gray-300 px-2.5 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">País</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.pais || "Perú"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Departamento</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.departamento || "Sin departamento"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ciudad / Código Ubigeo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 shrink-0 shadow-sm">
            <i className="fa fa-globe text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Ciudad</label>
                  <Input
                    type="text"
                    placeholder="Ciudad"
                    value={editedCliente.distrito || ""}
                    onChange={(e) => handleInputChange("distrito", e.target.value)}
                    className="h-8 w-full bg-white! border border-gray-300 px-2.5 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Cod. Ubigeo</label>
                  <Input
                    type="text"
                    placeholder="Código Ubigeo"
                    value={editedCliente.codUbigeo || ""}
                    onChange={(e) => handleInputChange("codUbigeo", e.target.value)}
                    className="h-8 w-full bg-white! border border-gray-300 px-2.5 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ciudad</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.distrito || "Sin ciudad"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Cod. Ubigeo</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.codUbigeo || "Sin Ubigeo"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Teléfono / Celular */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-500 shrink-0 shadow-sm">
            <i className="fa fa-phone text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Teléfono</label>
                  <Input
                    type="text"
                    placeholder="Teléfono fijo"
                    value={editedCliente.telefono || ""}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    className="h-8 w-full bg-white! border border-gray-300 px-2.5 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Celular</label>
                  <Input
                    type="text"
                    placeholder="Celular"
                    value={editedCliente.celular || ""}
                    onChange={(e) => handleInputChange("celular", e.target.value)}
                    className="h-8 w-full bg-white! border border-gray-300 px-2.5 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Teléfono</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.telefono || "Sin teléfono fijo"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Celular</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.celular || "Sin celular"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fecha Aniv. / Fecha Reg. */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500 shrink-0 shadow-sm">
            <i className="bi bi-calendar-event text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Fecha Aniv.</label>
                  <Input
                    type="date"
                    value={editedCliente.aniversario || ""}
                    onChange={(e) => handleInputChange("aniversario", e.target.value)}
                    className="h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Fecha Reg.</label>
                  <Input
                    type="date"
                    value={editedCliente.fechaRegistro || ""}
                    onChange={(e) => handleInputChange("fechaRegistro", e.target.value)}
                    className="h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fecha Aniv.</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.aniversario || "Sin aniversario"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fecha Reg.</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.fechaRegistro || "Sin fecha registro"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vendedor Asignado / Forma Pago Aut. */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0 shadow-sm">
            <i className="bi bi-person-badge text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Vendedor Asignado</label>
                  <NativeSelect
                    value={editedCliente.vendedorAsignado}
                    onChange={(e) => handleInputChange("vendedorAsignado", e.target.value as any)}
                    selectClassName="h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  >
                    {vendedores.map(opt => (
                      <NativeSelectOption key={opt} value={opt}>{opt}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-gray-700">Forma Pago Aut.</label>
                  <NativeSelect
                    value={editedCliente.formaPagoAut}
                    onChange={(e) => handleInputChange("formaPagoAut", e.target.value as any)}
                    selectClassName="h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                  >
                    {formasPago.map(opt => (
                      <NativeSelectOption key={opt} value={opt}>{opt}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Vendedor Asignado</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.vendedorAsignado || "Sin vendedor"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Forma Pago Aut.</div>
                  <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                    {editedCliente.formaPagoAut || "Sin forma pago"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tipo Cliente */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0 shadow-sm">
            <i className="bi bi-person text-[15px]" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div>
                <label className="mb-1 block text-[12px] font-medium text-gray-700">Tipo Cliente</label>
                <NativeSelect
                  value={editedCliente.tipoCliente}
                  onChange={(e) => handleInputChange("tipoCliente", e.target.value as any)}
                  selectClassName="h-9 w-full bg-white! border border-gray-300 px-3 text-[13px] text-gray-700 outline-none rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#18a689] focus:border-[#18a689] font-sans"
                >
                  {tiposCliente.map(opt => (
                    <NativeSelectOption key={opt} value={opt}>{opt}</NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            ) : (
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tipo Cliente</div>
                <div className="bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-[13px] text-gray-700 font-semibold truncate">
                  {editedCliente.tipoCliente || "Sin tipo cliente"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botones de Acción (Guardar/Cancelar en modo edición, debajo de los inputs) */}
        {isEditing && (
          <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-gray-100 shrink-0">
            <ActionButton
              onClick={handleSave}
              className="bg-[#2c1ff3] hover:bg-[#190fce] text-white rounded-[5px] h-9 text-[13px] px-5"
              text="Guardar"
              variant="filled"
            />
            <ActionButton
              onClick={handleCancel}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-[5px] h-9 text-[13px] px-4"
              text="Cancelar"
              variant="filled"
            />
          </div>
        )}
      </div>
    </div>
  )
}
