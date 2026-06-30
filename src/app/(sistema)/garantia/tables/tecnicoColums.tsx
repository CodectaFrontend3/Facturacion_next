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
        cell: ({ row }) => {
            return (
                <Link
                    href={`/garantia/tecnico/${row.original.id}`}
                    className="view-btn bg-[#2C1FF3] text-white p-2 rounded hover:bg-[#190FCE]"
                >
                    <i className="bi bi-eye"></i>
                </Link>
            )
        },
    },
];