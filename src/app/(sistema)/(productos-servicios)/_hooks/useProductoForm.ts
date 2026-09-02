"use client"

import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Producto } from "../types/productos.types"
import { productoSchema, ProductoFormData } from "../_schemas/producto.schema"

const getTodayFormatted = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0")
  const yyyy = today.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

interface UseProductoFormProps {
  isOpen: boolean
  producto?: Producto | null
  onSave: (data: Omit<Producto, "id"> & { id?: string }) => void
  onClose: () => void
}

export function useProductoForm({ isOpen, producto, onSave, onClose }: UseProductoFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ProductoFormData>({
    resolver: zodResolver(productoSchema) as any,
    defaultValues: {
      codigo: "EP-000005",
      codOrig: "",
      nombre: "",
      descripcion: "",
      marca: "EXAMPLE01",
      peso: 0,
      pesoUnidad: "Miligramos",
      familia: "Seleccionar",
      subFamilia: "Seleccionar",
      stockMin: 0,
      stockMax: 0,
      desc1: 0,
      desc2: 0,
      descMax: 0,
      origen: "Producto Nacional",
      utilidad: 0,
      garantia: "12 meses",
      afectacion: "Gravado - Operación Onerosa",
      unidad: "Bolsa",
      fechaRegistro: getTodayFormatted(),
      fichaTecnicaUrl: null,
      imagen: "",
      detalle: "",
      estado: "Activo",
      precioNacional: 0,
      precioCompra: 0,
      stock: 0,
    },
  })

  const { reset, handleSubmit, setValue } = form

  useEffect(() => {
    if (isOpen) {
      if (producto) {
        reset({
          codigo: producto.codigo,
          codOrig: producto.codOrig || "",
          nombre: producto.nombre,
          descripcion: producto.descripcion || "",
          marca: producto.marca,
          peso: producto.peso || 0,
          pesoUnidad: producto.pesoUnidad || "Miligramos",
          familia: producto.familia || "Seleccionar",
          subFamilia: producto.subFamilia || "Seleccionar",
          stockMin: producto.stockMin || 0,
          stockMax: producto.stockMax || 0,
          desc1: producto.desc1 || 0,
          desc2: producto.desc2 || 0,
          descMax: producto.descMax || 0,
          origen: producto.origen || "Producto Nacional",
          utilidad: producto.utilidad || 0,
          garantia: producto.garantia || "12 meses",
          afectacion: producto.afectacion || "Gravado - Operación Onerosa",
          unidad: producto.unidad,
          fechaRegistro: producto.fechaRegistro || getTodayFormatted(),
          fichaTecnicaUrl: producto.fichaTecnicaUrl || null,
          imagen: producto.imagen || "",
          detalle: producto.detalle || "",
          estado: producto.estado,
          precioNacional: producto.precioNacional || 0,
          precioCompra: producto.precioCompra || 0,
          stock: producto.stock || 0,
        })
      } else {
        reset({
          codigo: "EP-000005",
          codOrig: "",
          nombre: "",
          descripcion: "",
          marca: "EXAMPLE01",
          peso: 0,
          pesoUnidad: "Miligramos",
          familia: "Seleccionar",
          subFamilia: "Seleccionar",
          stockMin: 0,
          stockMax: 0,
          desc1: 0,
          desc2: 0,
          descMax: 0,
          origen: "Producto Nacional",
          utilidad: 0,
          garantia: "12 meses",
          afectacion: "Gravado - Operación Onerosa",
          unidad: "Bolsa",
          fechaRegistro: getTodayFormatted(),
          fichaTecnicaUrl: null,
          imagen: "",
          detalle: "",
          estado: "Activo",
          precioNacional: 0,
          precioCompra: 0,
          stock: 0,
        })
      }
    }
  }, [isOpen, producto, reset])

  const handleFichaClick = () => {
    fileInputRef.current?.click()
  }

  const handleFichaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue("fichaTecnicaUrl", `/downloads/${file.name}`, { shouldValidate: true })
    }
  }

  const handleImageClick = () => {
    imageInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setValue("imagen", reader.result as string, { shouldValidate: true })
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = handleSubmit((data: ProductoFormData) => {
    onSave({
      id: producto?.id,
      ...data,
    })
    onClose()
  })

  return {
    form,
    onSubmit,
    setValue,
    fileInputRef,
    imageInputRef,
    handleFichaClick,
    handleFichaChange,
    handleImageClick,
    handleImageChange,
  }
}
