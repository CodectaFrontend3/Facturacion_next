import { ColumnDef } from "@tanstack/react-table"
import { Vendedores } from "../../interfaces/vendedor/vendedores"
import Link from "next/link";

export const vendedoresColumns: ColumnDef<Vendedores>[] = [
    {
        accessorKey: "item",
        header: "ITEM",
    },
    {
        accessorKey: "codigo_c",
        header: "Cód. Cotizador"
    },
    {
        accessorKey: "codigo_bf",
        header: "Cód. Boleta/Factura",
    },
    {
        accessorKey: "estado",
        header: "Estado de Boleta/Factura",
    },
    {
        accessorKey: "costo",
        header: "Costo Total",
    },
    {
        accessorKey: "comision",
        header: "Comisión"
    },
    {
        accessorKey: "liquidacion",
        header: "Liquidación"
    },
    {
        accessorKey: "observacion",
        header: "Observación"
    },
];