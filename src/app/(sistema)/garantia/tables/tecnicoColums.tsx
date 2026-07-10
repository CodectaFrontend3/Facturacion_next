import { ColumnDef } from "@tanstack/react-table";
import { Tecnico } from "../interfaces";
import { ActionButton } from "@/components/common/ActionButton";

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
                <ActionButton
                    icon={<i className="bi bi-eye"></i>}
                    href={`/garantia/tecnico/${row.original.id}`}
                />
            )
        },
    },
];