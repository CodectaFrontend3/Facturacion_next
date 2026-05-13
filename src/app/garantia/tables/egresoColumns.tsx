import { ColumnDef } from "@tanstack/react-table";
import { Egreso } from "../interfaces";
import Link from "next/link";

export const egresoColumns: ColumnDef<Egreso>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "codigo",
        header: "Código Interno"
    },
    {
        accessorKey: "equipo",
        header: "Equipo",
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
                    href={`/garantia/egreso/${row.original.id}`}
                    className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
                >
                    <i className="bi bi-eye"></i>
                </Link>
            )
        },
    },
    {
        header: "Estado",
        id: "estado",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <button className="info-btn bg-amber-400 text-white p-2 rounded hover:bg-amber-500"><i className="bi bi-exclamation-lg"></i></button>
                    <button className="sign-btn bg-teal-400 text-white p-2 rounded hover:bg-teal-500"><i className="bi bi-box-arrow-in-right"></i></button>
                </div>
            )
        },
    },
];