"use client";
import type { SelectOption } from "@/app/garantia/filters/FilterSelect";

type FilterKey = "marca" | "estado";

export const marcaOptions: SelectOption[] = [
    { label: "LENOVO", value: "lenovo" },
    { label: "SAMSUNG", value: "samsung" },
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