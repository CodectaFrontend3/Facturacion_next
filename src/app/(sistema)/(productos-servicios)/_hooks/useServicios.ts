"use client"

import { useTableData } from "@/hooks/useTableData"
import { Servicio } from "../types/servicios.types"
import { parse, isValid, isWithinInterval } from "date-fns"

const DATE_FORMAT_INPUT = "dd/MM/yyyy"
const DATE_FORMAT_DATA = "dd-MM-yyyy"

const filterFn = (data: Servicio[], values: Record<string, string>) => {
    return data.filter((s) => {
        // 1. Buscador de texto (Nombre, Código Servicio o Código Original)
        const matchSearch =
            !values.search ||
            s.nombre.toLowerCase().includes(values.search.toLowerCase()) ||
            s.codigoServicio.toLowerCase().includes(values.search.toLowerCase()) ||
            s.codigoOriginal.toLowerCase().includes(values.search.toLowerCase())

        // 2. Selector de Estado
        const matchEstado =
            !values.estado ||
            values.estado === "todos" ||
            s.estado.toLowerCase() === values.estado.toLowerCase()

        // 3. Rango de Fechas (Desde - Hasta)
        let matchFecha = true
        if (s.fechaRegistro && (values.fechaDesde || values.fechaHasta)) {
            const dateC = parse(s.fechaRegistro, DATE_FORMAT_DATA, new Date())
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

export function useServicios(data: Servicio[]) {
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
