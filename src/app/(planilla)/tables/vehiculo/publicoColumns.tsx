import { ColumnDef } from "@tanstack/react-table";
import { Publico } from "../../interfaces/vehiculo/publico";
import Link from "next/link";

type Props = {
    onEdit: (vehiculo: Publico) => void
}

export const publicoColumns = ({
    onEdit
}: Props): ColumnDef<Publico>[] => [
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
                <button
                    onClick={() => onEdit(row.original)}
                    className="bg-[#23c6c8] text-white px-3 py-1.5 cursor-pointer hover:translate-y-[-2px] transition duration-200 rounded hover:bg-teal-500"
                >
                    Editar
                </button>
            )
        },
    },
];