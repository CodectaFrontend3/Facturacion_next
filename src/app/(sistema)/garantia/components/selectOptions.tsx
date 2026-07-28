"use client";
import type { SelectOption } from "@/components/DataFilters/FilterSelect";

type FilterKey = "marca" | "estado";

export const marcaOptions: SelectOption[] = [
    { label: "Marcas", value: "" },
    { label: "LENOVO", value: "lenovo" },
    { label: "SAMSUNG", value: "samsung" },
    { label: "HP", value: "hp" },
    { label: "LG", value: "lg" },
    { label: "EPSON", value: "epson" },
    { label: "ASUS", value: "asus" },
    { label: "DELL", value: "dell" },
];

export const estadoIngresoOptions: SelectOption[] = [
    { label: "Todos", value: ""},
    { label: "Pendiente", value: "ingresado"},
    { label: "Egresado", value: "egresado"},
    { label: "En Revisión Técnica", value: "en_revision"},
    { label: "Anulado", value: "anulado"},
];

export const estadoEgresoOptions: SelectOption[] = [
    { label: "Todos", value: ""},
    { label: "Pendiente", value: "egresado"},
    { label: "En Revisión Técnica", value: "en_revision"},
    { label: "Reparado", value: "reparado"},
];