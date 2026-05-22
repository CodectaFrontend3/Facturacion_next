import { ColumnDef } from "@tanstack/react-table";
import { Privado } from "../../interfaces/vehiculo/privado";
import Link from "next/link";

export const privadoColumns: ColumnDef<Privado>[] = [
    {
        accessorKey: "item",
        header: "ITEM",
    },
    {
        accessorKey: "placa",
        header: "Placa"
    },
    {
        accessorKey: "marca",
        header: "Marca",
    },
    {
        accessorKey: "modelo",
        header: "Modelo",
    },
    {
        accessorKey: "tipo",
        header: "Tipo de Vehiculo",
    },
    {
        accessorKey: "año",
        header: "Año"
    },
    {
        accessorKey: "certificado",
        header: "Certificado"
    },
    {
        accessorKey: "estado",
        header: "Activo/Inactivo"
    },
    {
        header: "Editar",
        id: "editar",
        cell: ({ row }) => {
            return (
                <Link
                    href={`/vehiculo/publico/${row.original.item}`}
                    className="bg-[#23c6c8] text-white px-3 py-1.5 rounded hover:bg-blue-800"
                >
                    Editar
                </Link>
            )
        },
    },
];