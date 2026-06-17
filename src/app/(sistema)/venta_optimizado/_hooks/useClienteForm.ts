// _hooks/useClienteForm.ts
"use client"

import { useState } from "react"
import { CrearClientePayload, ClienteDetalle } from "../_domain/types/cliente.types"

const CLIENTE_INICIAL: CrearClientePayload = {
  tipoDocumento: "DNI",
  numeroDocumento: "",
  nombre: "",
  direccion: null,
  distrito: null,
  correo: null,
  telefono: null,
  celular: null,
  codUbigeo: null,
  departamento: null,
  pais: "Perú",
  aniversario: null,
  fechaRegistro: new Date().toISOString().split("T")[0],
  tipoCliente: "Cliente Nuevo",
  vendedorAsignado: "Sin vendedor fijo",
  formaPagoAut: "Sin forma de pago fija",
  contactoNombre: null,
  contactoCargo: null,
  contactoTelefono: null,
  contactoCelular: null,
  contactoCorreo: null,
}

interface UseClienteFormOptions {
  /** Si se pasa un cliente existente, el formulario inicia en modo edición */
  initialData?: ClienteDetalle
  onSuccess?: (payload: CrearClientePayload) => void
}

export const useClienteForm = ({
  initialData,
  onSuccess,
}: UseClienteFormOptions = {}) => {
  const [formData, setFormData] = useState<CrearClientePayload>(
    initialData
      ? // Excluimos el id para respetar el tipo CrearClientePayload
        (({ id: _id, ...rest }) => rest)(initialData)
      : CLIENTE_INICIAL
  )

  const [errors, setErrors] = useState<Partial<Record<keyof CrearClientePayload, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Actualiza un campo individual del formulario
  const handleChange = (
    field: keyof CrearClientePayload,
    value: string | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpia el error del campo al editarlo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Validación básica antes de guardar
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CrearClientePayload, string>> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre o razón social es obligatorio."
    }

    if (!formData.numeroDocumento.trim()) {
      newErrors.numeroDocumento = "El número de documento es obligatorio."
    }

    if (
      formData.tipoDocumento === "DNI" &&
      formData.numeroDocumento.length !== 8
    ) {
      newErrors.numeroDocumento = "El DNI debe tener 8 dígitos."
    }

    if (
      formData.tipoDocumento === "RUC" &&
      formData.numeroDocumento.length !== 11
    ) {
      newErrors.numeroDocumento = "El RUC debe tener 11 dígitos."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setIsSubmitting(true)
    try {
      // TODO: Reemplazar con llamada real al servicio (clienteService.create / update)
      await new Promise((res) => setTimeout(res, 500))
      onSuccess?.(formData)
    } catch (err) {
      console.error("[useClienteForm] Error al guardar cliente:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(CLIENTE_INICIAL)
    setErrors({})
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
