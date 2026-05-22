import { ColumnDef } from "@tanstack/react-table";
import { Inactivos } from "../../interfaces/personal/inactivos";
import Link from "next/link";

export const inactivoColumns: ColumnDef<Inactivos>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nombres_apellidos",
        header: "Nombres y Apellidos"
    },
    {
        accessorKey: "dni",
        header: "N° Documento",
    },
    {
        accessorKey: "correo",
        header: "Correo",
    },
    {
        accessorKey: "celular",
        header: "Celular",
    },
    {
        accessorKey: "fecha_inicio",
        header: "Fecha de Inicio",
    },
    {
        accessorKey: "cargo",
        header: "Cargo Ocupacional",
    },
    {
        header: "Ver",
        id: "ver",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/personal/inactivos/${row.original.id}`}
                    className="bg-[#1a5eb3] text-white p-2 rounded hover:bg-blue-800"
                >
                    <i className="bi bi-eye"></i>
                </Link>
            )
        },
    },
];