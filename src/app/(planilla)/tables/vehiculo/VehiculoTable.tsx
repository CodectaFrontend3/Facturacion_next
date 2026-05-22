"use client";

import { useState } from "react";
import { DataTable as Table } from "@/components/ui/shared/DataTable"

import { publicoColumns } from "./publicoColumns"
import { privadoColumns } from "./privadoColumns"

import publicoData from "../../data/vehiculo/publico.json"
import privadoData from "../../data/vehiculo/privado.json"

export type VehiculoType = "publico" | "privado"

type Props = {
    type: VehiculoType;
    filters: {
        search: string;
    };
};

type Vehiculo = {
    item: number;
    empresa?: string;
    ruc?: string;
    mtc?: number;
    estado?: string;
    placa?: string;
    marca?: string;
    modelo?: string;
    tipo?: string;
    certificado?: string;
};

type PageSize = 10 | 25 | 50 | 100;

export default function VehiculoTable({ type, filters }: Props) {
    const [pageSize, setPageSize] = useState<PageSize>(10);

    const dataByType = {
        publico: publicoData as Vehiculo[],
        privado: privadoData as Vehiculo[],
    };

    const columnsByType = {
        publico: publicoColumns,
        privado: privadoColumns,
    };

    const filteredData = dataByType[type].filter((item) => {
        const matchSearch =
            !filters.search ||
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(filters.search.toLowerCase());

        return matchSearch
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