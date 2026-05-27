"use client";
import { ingresoColumns } from "./ingresoColumns";
import { egresoColumns } from "./egresoColumns";
import { tecnicoColumns } from "./tecnicoColums";

import ingresoData from "../data/ingreso.json";
import egresoData from "../data/egreso.json"
import tecnicoData from "../data/tecnico.json";

import { DataTable as Table } from "@/components/ui/shared/DataTable";
import { useState } from "react";
import { ConfirmModal } from "../components/modals/confirm-modal";

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
    estado?: string;
};

export default function DataTable({ type, filters }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const [closing, setClosing] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [dataByType, setDataByType] = useState<Record<TableType, Garantia[]>>({
        ingreso: ingresoData as Garantia[],
        egreso: egresoData as Garantia[],
        tecnico: tecnicoData as Garantia[],
    });

    const handleOpenModal = (id: number) => {
        setSelectedId(id);
        setOpenModal(true);
    }

    const handleAnular = (id: number) => {
        setDataByType((prev) => ({
            ...prev,

            [type]: prev[type].map((item) =>
                item.id === id
                    ? { ...item, estado: "anulados" }
                    : item
            ),
        }));
    };

    const handleEgresar = (id: number) => {
        setDataByType((prev) => ({
            ...prev,
            [type]: prev[type].map((item) =>
                item.id === id
                    ? { ...item, estado: "egresados" }
                    : item
            ),
        }));
    }

    const columnsByType = {
        ingreso: ingresoColumns(handleAnular, handleEgresar, handleOpenModal),
        egreso: egresoColumns,
        tecnico: tecnicoColumns,
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

        const matchEstado =
            !filters.estado ||
            item.estado?.toLowerCase() === filters.estado.toLowerCase();

        return (
            matchMarca &&
            matchSearch &&
            matchFechaInicio &&
            matchFechaFin &&
            matchEstado
        )
    })

    return (
        <div>
            <Table<any, any>
                columns={columnsByType[type]}
                data={filteredData}
                pageSize={5}
            />

            {openModal && selectedId !== null && (
                <ConfirmModal
                    title={`¿Seguro que desea anular la guía ${selectedId}?`}
                    description="Esta guía se anulará inmediatamente. Esta acción no se puede deshacer."
                    onConfirm={() => {
                        handleAnular(selectedId)
                        setOpenModal(false)
                    }}
                    onClose={() => setOpenModal(false)}
                />
            )}
        </div>
    );
}

