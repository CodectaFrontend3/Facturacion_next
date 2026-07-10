import { ColumnDef } from "@tanstack/react-table";
import { Tecnico } from "../interfaces";
import Link from "next/link";

export const tecnicoColumns: ColumnDef<Tecnico>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "codigo",
        header: "Código Interno",
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
        size: 80,
        cell: ({ row }) => {
            return (
                <Link
                    href={`/garantia/tecnico/${row.original.id}`}
                    className="view-btn bg-[#1a5eb3] text-white py-2 px-4 rounded hover:bg-blue-800 inline-flex items-center justify-center"
                >
                    <i className="bi bi-eye"></i>
                </Link>
            )
        },
    },
];