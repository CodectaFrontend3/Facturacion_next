import { ColumnDef } from "@tanstack/react-table";
import { Ingreso } from "../../interfaces";

export const ingresoColumns: ColumnDef<Ingreso>[] = [
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
                <button className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800"><i className="bi bi-eye"></i></button>
            )
        },
    },
    {
        header: "Acciones",
        id: "acciones",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <button className="bg-amber-400 text-white p-2 rounded hover:bg-amber-500"><i className="bi bi-trash3"></i></button>
                    <button className="bg-teal-400 text-white p-2 rounded hover:bg-teal-500"><i className="bi bi-box-arrow-in-right"></i></button>
                </div>
            )
        }
    },
];
