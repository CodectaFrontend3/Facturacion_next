"use client";

import { useState } from "react";
import { DataTable as Table } from "@/components/ui/shared/DataTable"

import { publicoColumns } from "./publicoColumns"
import { privadoColumns } from "./privadoColumns"

import publicoData from "../../data/vehiculo/publico.json"
import privadoData from "../../data/vehiculo/privado.json"

import VehiculoPrivadoEditModal from "../../vehiculo/components/VehiculoModal/PrivadoModal/VehiculoPrivadoEditModal"
import VehiculoPublicoEditModal from "../../vehiculo/components/VehiculoModal/PublicoModal/VehiculoPublicoEditModal"

import { Privado } from "../../interfaces/vehiculo/privado"
import { Publico } from "../../interfaces/vehiculo/publico"

export type VehiculoType = "publico" | "privado"

type Props = {
    type: VehiculoType
    filters: {
        search: string
    };
};

type Vehiculo = {
    item: number
    empresa?: string
    ruc?: string
    mtc?: number
    estado?: string
    placa?: string
    marca?: string
    modelo?: string
    tipo?: string
    año?: number
    certificado?: string
};

type PageSize = 10 | 25 | 50 | 100;

export default function VehiculoTable({ type, filters }: Props) {
    const [pageSize, setPageSize] = useState<PageSize>(10);
    const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | null>(null);
    const [vehiculoData, setVehiculoData] = useState<Vehiculo[]>(
        type === "publico"
            ? publicoData
            : privadoData
    );

    const handleSave = (updatedVehiculo: Vehiculo) => {
        setVehiculoData((prev: Vehiculo[]) =>
            prev.map((item) =>
                item.item === updatedVehiculo.item
                    ? updatedVehiculo
                    : item
            )
        );

        setEditingVehiculo(null);
    };

    const dataByType = {
        publico: publicoData as Vehiculo[],
        privado: privadoData as Vehiculo[],
    };

    const columns =
        type === "publico"
            ? publicoColumns({
                onEdit: (vehiculo) =>
                    setEditingVehiculo(vehiculo)
            })
            : privadoColumns({
                onEdit: (vehiculo) =>
                    setEditingVehiculo(vehiculo)
            });

    const filteredData = vehiculoData.filter((item) => {
        const matchSearch =
            !filters.search ||
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(filters.search.toLowerCase());

        return matchSearch;
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
                columns={columns}
                data={filteredData}
                pageSize={pageSize}
            />

            {editingVehiculo && type === "publico" && (
                <VehiculoPublicoEditModal
                    vehiculo={editingVehiculo as Publico}
                    onSave={handleSave}
                    onClose={() => setEditingVehiculo(null)}
                />
            )}

            {editingVehiculo && type === "privado" && (
                <VehiculoPrivadoEditModal
                    vehiculo={editingVehiculo as Privado}
                    onSave={handleSave}
                    onClose={() => setEditingVehiculo(null)}
                />
            )}
        </div>
    );
}