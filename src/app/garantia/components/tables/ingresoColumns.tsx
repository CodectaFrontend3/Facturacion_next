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
    },
    {
        header: "Acciones",
    },
];
