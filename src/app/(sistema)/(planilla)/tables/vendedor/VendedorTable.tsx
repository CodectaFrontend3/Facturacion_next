"use client";

import { useState } from "react";
import { DataTable as Table } from "@/components/ui/shared/DataTable";

import { vendedoresColumns } from "./vendedoresColumns";

import vendedoresData from "../../data/vendedor/vendedores.json";

type Props = {
    filters: {
        search: string;
    };
};

type Vendedores = {
    item: number;
    codigo_c: string;
    codigo_bf: string;
    estado: string;
    costo: number;
    comision: number;
    liquidacion: string;
    observacion: string;
};

type PageSize = 10 | 25 | 50 | 100;

export default function VendedoresTable({ filters }: Props) {
    const [pageSize, setPageSize] = useState<PageSize>(10);

    const filteredData = vendedoresData.filter((item) => {
        return (
            !filters.search ||
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(filters.search.toLowerCase())
        );
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
            <Table
                columns={vendedoresColumns}
                data={filteredData}
                pageSize={pageSize}
            />
        </div>
    );
}