import { ColumnDef } from "@tanstack/react-table";
import { Publico } from "../../interfaces/vehiculo/publico";
import Link from "next/link";

export const publicoColumns: ColumnDef<Publico>[] = [
    {
        accessorKey: "item",
        header: "ITEM",
    },
    {
        accessorKey: "empresa",
        header: "Empresa"
    },
    {
        accessorKey: "ruc",
        header: "RUC",
    },
    {
        accessorKey: "mtc",
        header: "N° del MTC",
    },
    {
        accessorKey: "estado",
        header: "Estado",
    },
    {
        header: "Editar",
        id: "editar",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/vehiculo/publico/${row.original.item}`}
                    className="bg-[#23c6c8] text-white px-3 py-1.5 rounded"
                >
                    Editar
                </Link>
            )
        },
    },
];