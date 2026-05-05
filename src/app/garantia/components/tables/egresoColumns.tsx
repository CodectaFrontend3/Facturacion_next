import { ColumnDef } from "@tanstack/react-table";
import { Egreso } from "../../interfaces";

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
    },
    {
        header: "Estado",
    },
];