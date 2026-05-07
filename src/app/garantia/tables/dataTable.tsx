"use client";
import { ingresoColumns } from "./ingresoColumns";
import { egresoColumns } from "./egresoColumns";
import { tecnicoColumns } from "./tecnicoColums";

import ingresoData from "../data/ingreso.json";
import egresoData from "../data/egreso.json"
import tecnicoData from "../data/tecnico.json";

import { DataTable as Table } from "@/components/ui/shared/DataTable";

export type TableType = "ingreso" | "egreso" | "tecnico";

type Props = {
    type: TableType;
    filters: {
        fechaInicio: string;
        fechaFin: string;
        marca: string;
        estado: string;
        search: string;
    };
};

type Garantia = {
    id: number;
    codigo?: string;
    producto?: string;
    equipo?: string;
    marca?: string;
    serie?: string;
    cliente?: string;
    ruc?: string;
    fecha?: string;
};

export default function DataTable({ type, filters }: Props) {
    const columnsByType = {
        ingreso: ingresoColumns,
        egreso: egresoColumns,
        tecnico: tecnicoColumns,
    };

    const dataByType: Record<TableType, Garantia[]> = {
        ingreso: ingresoData as Garantia[],
        egreso: egresoData as Garantia[],
        tecnico: tecnicoData as Garantia[],
    };

    const filteredData = dataByType[type].filter((item) => {
        const matchMarca =
            !filters.marca ||
            item.marca?.toLowerCase() === filters.marca.toLowerCase();

        const matchSearch =
            !filters.search ||
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(filters.search.toLowerCase());

        const matchFechaInicio = 
            !filters.fechaInicio ||
            new Date(item.fecha || "") >= new Date(filters.fechaInicio);

        const matchFechaFin = 
            !filters.fechaFin ||
            new Date(item.fecha || "") <= new Date(filters.fechaFin);

        return (
            matchMarca &&
            matchSearch &&
            matchFechaInicio &&
            matchFechaFin
        )
    })

    return (
        <Table<any, any>
            columns={columnsByType[type]}
            data={filteredData}
            pageSize={5}
        />
    );
}