import { ColumnDef } from "@tanstack/react-table";
import { Ingreso } from "../interfaces";
import Link from "next/link";

export const ingresoColumns = (
    handleAnular: (id: number) => void,
    handleEgresar: (id: number) => void,
    handleOpenModal: (id: number) => void
): ColumnDef<Ingreso>[] => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "codigo",
            header: "Código Interno",
        },
        {
            accessorKey: "producto",
            header: "Producto",
        },
        {
            accessorKey: "marca",
            header: "Marca",
        },
        {
            accessorKey: "serie",
            header: "Serie",
        },
        {
            accessorKey: "cliente",
            header: "Cliente",
        },
        {
            accessorKey: "ruc",
            header: "RUC",
        },
        {
            accessorKey: "fecha",
            header: "Fecha",
        },
        {
            header: "Ver",
            id: "ver",
            cell: ({ row }) => {
                return (
                    <Link
                        href={`/garantia/ingreso/${row.original.id}`}
                        className="view-btn bg-[#1a5eb3] text-white p-2 rounded"
                    >
                        <i className="bi bi-eye"></i>
                    </Link>
                )
            },
        },
        {
            header: "Acciones",
            id: "acciones",
            cell: ({ row }) => {
                const isAnulado = row.original.estado === "anulados";
                const isEgresado = row.original.estado === "egresados";

                if (isAnulado) {
                    return (
                        <button className="icon-deleted bg-red-500 text-white p-2 h-8 w-8 rounded-full flex items-center justify-center">
                            <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </button>
                    )
                }

                if (isEgresado) {
                    return (
                        <button className="icon-check bg-teal-500 text-white p-2 h-8 w-8 rounded-full flex items-center justify-center">
                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                        </button>
                    )
                }

                return (
                    <div className="flex gap-2">
                        <button className="trash-btn bg-amber-400 text-white p-2 rounded hover:bg-amber-500"
                            onClick={() => handleOpenModal(row.original.id)}
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button className="sign-btn bg-teal-400 text-white p-2 rounded hover:bg-teal-500"
                            onClick={() => handleEgresar(row.original.id)}
                        >
                            <i className="bi bi-box-arrow-in-right"></i>
                        </button>
                    </div>
                )
            }
        },
    ];
