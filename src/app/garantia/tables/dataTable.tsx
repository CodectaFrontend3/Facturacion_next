"use client";
import { ingresoColumns } from "../components/tables/ingresoColumns";
import { egresoColumns } from "../components/tables/egresoColumns";
import { tecnicoColumns } from "../components/tables/tecnicoColums";

import ingresoData from "../data/ingreso.json";
import egresoData from "../data/egreso.json"
import tecnicoData from "../data/tecnico.json";

import { DataTable as Table } from "@/components/ui/shared/DataTable";

export type TableType = "ingreso" | "egreso" | "tecnico";

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

export default function DataTable({ type }: { type: TableType }) {

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

    return (
        <Table<any, any>
            columns={columnsByType[type]}
            data={dataByType[type]}
            pageSize={5}
        />
    );
}