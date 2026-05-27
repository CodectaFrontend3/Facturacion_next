"use client";

import { useState } from "react";
import { DataTable as Table } from "@/components/ui/shared/DataTable";

import { activoColumns } from "./activoColumns";
import { inactivoColumns } from "./inactivoColumns";

import activosData from "../../data/personal/activos.json";
import inactivosData from "../../data/personal/inactivos.json"

export type PersonalType = "activos" | "inactivos"

type Props = {
    type: PersonalType
    filters: {
        fechaInicio?: string
        fechaFin?: string
        search: string
    };
};

type Personal = {
    id: number
    nombres_apellidos: string
    dni: number
    fecha?: string
    correo: string
    celular: string
    cargo: string
};

type PageSize = 10 | 25 | 50 | 100;

export default function PersonalTable({ type, filters }: Props) {
    const [pageSize, setPageSize] = useState<PageSize>(10);

    const dataByType = {
        activos: activosData as Personal[],
        inactivos: inactivosData as Personal[],
    };

    const columnsByType = {
        activos: activoColumns,
        inactivos: inactivoColumns,
    };

    const filteredData = dataByType[type].filter((item) => {
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

        return matchSearch && matchFechaInicio && matchFechaFin;
    });

    return (
        <div>
            <div className="px-5 border-l border-gray-200 flex gap-3 mt-[-15px]">
                <label className="mb-5 py-1.5 text-gray-600">Ver</label>
                <select
                    value={pageSize}
                    onChange={(e) =>
                        setPageSize(Number(e.target.value) as PageSize)
                    }
                    className="border border-gray-300 rounded px-2 py-1.5 mb-5"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <Table<any, any>
                columns={columnsByType[type]}
                data={filteredData}
                pageSize={pageSize}
            />
        </div>
    );
}