"use client"

import { useState, useCallback, useMemo } from "react"
import { RowData, RenovacionState } from "../types/documento.types"
import articulosMock from "../data/articulo-mock.json"

export function useVentaForm() {
  // Inicializamos con una fila vacía para que no se vea el hueco al cargar
  const [rows, setRows] = useState<RowData[]>([
    {
      id: "initial-row",
      articleId: "",
      cantidad: "" as any,
      isDctoActive: false,
      detalle: ""
    }
  ])
  
  const [renovacion, setRenovacion] = useState<RenovacionState>({
    isActive: false,
    fechaRenovacion: ""
  })

  // Acciones
  const addRow = useCallback((articleId?: string, cantidad: any = "") => {
    const newId = Math.random().toString(36).substring(2, 9)
    const article = articulosMock.find(a => String(a.id) === articleId)
    
    const newRow: RowData = {
      id: newId,
      articleId: articleId || "",
      cantidad,
      isDctoActive: false,
      detalle: article ? article.nombre : "",
      precioManual: article ? article.precio : undefined
    }
    setRows(prev => [...prev, newRow])
  }, [])

  const updateRow = useCallback((id: string, field: keyof RowData, value: any) => {
    setRows(prev => prev.map(r => {
      if (r.id !== id) return r
      
      const updated = { ...r, [field]: value }
      
      // Si cambia el artículo, actualizamos el detalle y precio manual por defecto
      if (field === "articleId") {
        const article = articulosMock.find(a => String(a.id) === value)
        if (article) {
          updated.detalle = article.nombre
          updated.precioManual = article.precio
          updated.isDctoActive = false
        }
      }
      
      return updated
    }))
  }, [])

  const removeRow = useCallback((id: string) => {
    setRows(prev => {
      if (prev.length <= 1) {
        // No permitimos borrar la última fila, la limpiamos
        return [{ id: "initial-row", articleId: "", cantidad: "" as any, isDctoActive: false, detalle: "" }]
      }
      return prev.filter(r => r.id !== id)
    })
  }, [])

  // Cálculos de totales (Exactamente como la lógica de la original)
  const totals = useMemo(() => {
    const subtotal = rows.reduce((sum, row) => {
      const article = articulosMock.find(a => String(a.id) === row.articleId)
      if (!article && !row.precioManual) return sum
      
      const basePrice = row.precioManual ?? (article?.precio ?? 0)
      const dcto = (basePrice * (article?.descuentoPorDefecto ?? 0)) / 100
      const price = row.isDctoActive ? basePrice - dcto : basePrice
      
      return sum + (price * row.cantidad)
    }, 0)

    const igv = subtotal * 0.18
    const total = subtotal + igv

    return { subtotal, igv, total }
  }, [rows])

  return {
    rows,
    renovacion,
    totals,
    actions: {
      addRow,
      updateRow,
      removeRow,
      setRenovacion,
      setRows
    }
  }
}
