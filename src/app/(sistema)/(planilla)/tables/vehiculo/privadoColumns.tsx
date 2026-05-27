import { ColumnDef } from "@tanstack/react-table";
import { Privado } from "../../interfaces/vehiculo/privado";
import Link from "next/link";

type Props = {
    onEdit: (vehiculo: Privado) => void
}

export const privadoColumns = ({
    onEdit
}: Props): ColumnDef<Privado>[] => [
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