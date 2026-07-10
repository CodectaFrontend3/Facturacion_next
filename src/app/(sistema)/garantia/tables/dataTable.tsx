"use client";
import { ingresoColumns } from "./ingresoColumns";
import { egresoColumns } from "./egresoColumns";
import { tecnicoColumns } from "./tecnicoColums";

import garantiaMock from "../data/garantia-mock.json";

import { DataTable as Table } from "@/components/shared/DataTable";
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

    const mapToGarantia = (item: any): Garantia => ({
        id: item.id,
        codigo: item.codigo,
        producto: item.equipo.tipo,
        equipo: item.equipo.tipo,
        marca: item.equipo.marca,
        serie: item.equipo.serie,
        cliente: item.cliente.nombre,
        ruc: item.cliente.ruc,
        fecha: item.fechas.ingreso,
        estado: item.estadoActual,
    });

    const mappedData = garantiaMock.map(mapToGarantia);

    const [dataByType, setDataByType] = useState<Record<TableType, Garantia[]>>({
        ingreso: mappedData,
        egreso: mappedData.filter(item => item.estado === "egresado" || item.estado === "en_revision" || item.estado === "reparado"),
        tecnico: mappedData.filter(item => item.estado === "en_revision" || item.estado === "reparado"),
    });

    // Actualiza el estado de un item en todos los arrays
    const updateEstadoGlobal = (id: number, nuevoEstado: string) => {
        setDataByType((prev) => {
            const updateArray = (arr: Garantia[]) =>
                arr.map(item => item.id === id ? { ...item, estado: nuevoEstado } : item);
            const updated = {
                ingreso: updateArray(prev.ingreso),
                egreso: updateArray(prev.egreso),
                tecnico: updateArray(prev.tecnico),
            };
            // Si pasa a egresado, agrégalo al array de egreso si no estaba
            if (nuevoEstado === "egresado") {
                const item = updated.ingreso.find(i => i.id === id);
                const yaEstaEnEgreso = updated.egreso.some(i => i.id === id);
                if (item && !yaEstaEnEgreso) {
                    updated.egreso = [{ ...item, estado: nuevoEstado }, ...updated.egreso];
                }
            }
            // Si pasa a en_revision, agrégalo al array de tecnico si no estaba
            if (nuevoEstado === "en_revision") {
                const item = updated.egreso.find(i => i.id === id);
                const yaEstaEnTecnico = updated.tecnico.some(i => i.id === id);
                if (item && !yaEstaEnTecnico) {
                    updated.tecnico = [{ ...item, estado: nuevoEstado }, ...updated.tecnico];
                }
            }
            return updated;
        });
    };

    const handleOpenModal = (id: number) => {
        setSelectedId(id);
        setOpenModal(true);
    }

    const handleAnular = (id: number) => {
        updateEstadoGlobal(id, "anulado");
    };

    const handleEgresar = (id: number) => {
        updateEstadoGlobal(id, "egresado");
    };

    const handleEnviarTecnico = (id: number) => {
        updateEstadoGlobal(id, "en_revision");
    };

    const columnsByType = {
        ingreso: ingresoColumns(handleAnular, handleEgresar, handleOpenModal),
        egreso: egresoColumns(handleEnviarTecnico),
        tecnico: tecnicoColumns,
    };

    // Convierte "DD/MM/YYYY" a Date
    const parseDate = (str: string) => {
        const [d, m, y] = str.split("/");
        return new Date(`${y}-${m}-${d}`);
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
            parseDate(item.fecha || "") >= new Date(filters.fechaInicio);

        const matchFechaFin =
            !filters.fechaFin ||
            parseDate(item.fecha || "") <= new Date(filters.fechaFin);

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

