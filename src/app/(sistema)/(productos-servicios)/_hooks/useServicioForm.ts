"use client"

import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Servicio } from "../types/servicios.types"
import { servicioSchema, ServicioFormData } from "../_schemas/servicio.schema"

interface UseServicioFormProps {
  isOpen: boolean
  servicio?: Servicio | null
  onSave: (data: Omit<Servicio, "id"> & { id?: string }) => void
  onClose: () => void
}

export function useServicioForm({ isOpen, servicio, onSave, onClose }: UseServicioFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ServicioFormData>({
    resolver: zodResolver(servicioSchema) as any,
    defaultValues: {
      codigoServicio: "",
      codigoOriginal: "",
      nombre: "",
      descripcion: "",
      familia: "Seleccionar",
      subfamilia: "Seleccionar",
      marca: "EXAMPLE01",
      descuento: 0,
      precioVentaPen: 0,
      precioVentaUsd: 0,
      utilidad: 0,
      fechaRegistro: "07-07-2026",
      afectacion: "Gravado - Operación Onerosa",
      estado: "Activo",
      fichaTecnicaUrl: null,
      imagenUrl: null,
    },
  })

  const { reset, handleSubmit, setValue } = form

  useEffect(() => {
    if (isOpen) {
      if (servicio) {
        reset({
          codigoServicio: servicio.codigoServicio,
          codigoOriginal: servicio.codigoOriginal || "",
          nombre: servicio.nombre,
          descripcion: servicio.descripcion || "",
          familia: servicio.familia,
          subfamilia: servicio.subfamilia || "Seleccionar",
          marca: servicio.marca || "EXAMPLE01",
          descuento: servicio.descuento || 0,
          precioVentaPen: servicio.precioVentaPen || 0,
          precioVentaUsd: servicio.precioVentaUsd || 0,
          utilidad: servicio.utilidad || 0,
          fechaRegistro: servicio.fechaRegistro || "07-07-2026",
          afectacion: servicio.afectacion || "Gravado - Operación Onerosa",
          estado: servicio.estado || "Activo",
          fichaTecnicaUrl: servicio.fichaTecnicaUrl || null,
          imagenUrl: servicio.imagenUrl || null,
        })
      } else {
        reset({
          codigoServicio: `SERV-${String(Date.now()).slice(-8)}`,
          codigoOriginal: "",
          nombre: "",
          descripcion: "",
          familia: "Seleccionar",
          subfamilia: "Seleccionar",
          marca: "EXAMPLE01",
          descuento: 0,
          precioVentaPen: 0,
          precioVentaUsd: 0,
          utilidad: 0,
          fechaRegistro: "07-07-2026",
          afectacion: "Gravado - Operación Onerosa",
          estado: "Activo",
          fichaTecnicaUrl: null,
          imagenUrl: null,
        })
      }
    }
  }, [isOpen, servicio, reset])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const localUrl = URL.createObjectURL(file)
      setValue("imagenUrl", localUrl, { shouldValidate: true })
    }
  }

  const onSubmit = handleSubmit((data: ServicioFormData) => {
    onSave({
      id: servicio?.id,
      ...data,
      codigoOriginal: data.codigoOriginal?.trim() || data.codigoServicio,
    })
    onClose()
  })

  return {
    form,
    onSubmit,
    setValue,
    imageInputRef,
    handleImageChange,
  }
}
