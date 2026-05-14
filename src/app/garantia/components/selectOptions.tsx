"use client";
import type { SelectOption } from "@/components/DataFilters/FilterSelect";

type FilterKey = "marca" | "estado";

export const marcaOptions: SelectOption[] = [
    { label: "LENOVO", value: "lenovo" },
    { label: "SAMSUNG", value: "samsung" },
    { label: "HP", value: "hp" },
    { label: "LG", value: "lg" },
    { label: "EPSON", value: "epson" },
    { label: "ASUS", value: "asus" },
];

export const estadoIngresoOptions: SelectOption[] = [
    { label: "Todos", value: ""},
    { label: "Egresados", value: "egresados"},
    { label: "Sin Egresar", value: "sin_egresar"},
    { label: "Anulados", value: "anulados"},
];

export const estadoEgresoOptions: SelectOption[] = [
    { label: "Procesado", value: "procesado"},
    { label: "Sin Procesar", value: "sin_procesar"},
];