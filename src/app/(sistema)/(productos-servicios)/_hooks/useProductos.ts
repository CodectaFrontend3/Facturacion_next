"use client"

import { useTableData } from "@/hooks/useTableData"
import { Producto } from "../types/productos.types"
import { parse, isValid, isWithinInterval } from "date-fns"

const DATE_FORMAT_INPUT = "dd/MM/yyyy"
const DATE_FORMAT_DATA = "dd-MM-yyyy"

const filterFn = (data: Producto[], values: Record<string, string>) => {
    return data.filter((p) => {
        // 1. Buscador de texto (Nombre o Código)
        const matchSearch =
            !values.search ||
            p.nombre.toLowerCase().includes(values.search.toLowerCase()) ||
            p.codigo.toLowerCase().includes(values.search.toLowerCase())

        // 2. Selector de Estado
        const matchEstado =
            !values.estado ||
            values.estado === "todos" ||
            p.estado.toLowerCase() === values.estado.toLowerCase()

        // 3. Rango de Fechas (Desde - Hasta)
        let matchFecha = true
        if (p.fechaRegistro && (values.fechaDesde || values.fechaHasta)) {
            const dateC = parse(p.fechaRegistro, DATE_FORMAT_DATA, new Date())
            const dateDesde = values.fechaDesde ? parse(values.fechaDesde, DATE_FORMAT_INPUT, new Date()) : null
            const dateHasta = values.fechaHasta ? parse(values.fechaHasta, DATE_FORMAT_INPUT, new Date()) : null

            if (isValid(dateC)) {
                if (dateDesde && isValid(dateDesde) && dateHasta && isValid(dateHasta)) {
                    matchFecha = isWithinInterval(dateC, { start: dateDesde, end: dateHasta })
                } else if (dateDesde && isValid(dateDesde)) {
                    matchFecha = dateC >= dateDesde
                } else if (dateHasta && isValid(dateHasta)) {
                    matchFecha = dateC <= dateHasta
                }
            }
        }

        return matchSearch && matchEstado && matchFecha
    })
}

export function useProductos(data: Producto[]) {
    return useTableData({
        data,
        filterFn,
        initialFilters: {
            search: "",
            estado: "todos",
            fechaDesde: "",
            fechaHasta: "",
        },
        pageSize: 10,
    })
}
