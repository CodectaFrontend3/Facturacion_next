import { ColumnDef } from "@tanstack/react-table";
import { Activos } from "../../interfaces";
import Link from "next/link";

export const activoColumns: ColumnDef<Activos>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorFn: (row) => `${row.nombre} ${row.apellido}`,
        id: "nombreCompleto",
        header: "Nombres y Apellidos"
    },
    {
        accessorKey: "n_documento",
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
        accessorKey: "fecha_vinculacion",
        header: "Fecha de Vinculación",
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
                    href={`/personal/activos/${row.original.id}`}
                    className="bg-[#2C1FF3] text-white p-2 rounded hover:bg-[#190FCE]"
                >
                    <i className="bi bi-eye"></i>
                </Link>
            )
        },
    },
];