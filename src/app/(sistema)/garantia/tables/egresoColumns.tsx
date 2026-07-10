import { ColumnDef } from "@tanstack/react-table";
import { Egreso } from "../interfaces";
import { ActionButton } from "@/components/common/ActionButton";
import Link from "next/link";

export const egresoColumns = (
    handleEnviarTecnico: (id: number) => void
): ColumnDef<Egreso>[] => [
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
        id: "ver",
        size: 80,
        cell: ({ row }) => (
            <ActionButton
                icon={<i className="bi bi-eye"></i>}
                href={`/garantia/egreso/${row.original.id}`}
                className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]"
            />
        ),
    },
    {
        header: "Acciones",
        id: "acciones",
        size: 120,
        cell: ({ row }) => {
            const isEnRevision = row.original.estado === "en_revision" || row.original.estado === "reparado";

            if (isEnRevision) {
                return (
                    <ActionButton
                        icon={<i className="bi bi-check-circle"></i>}
                        className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-full"
                    />
                );
            }

            return (
                <div className="flex items-center gap-1.5">
                    <ActionButton
                        icon={<i className="bi bi-exclamation-lg"></i>}
                        className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-full font-bold"
                    />
                    <Link href={`/garantia/tecnico/create/${row.original.id}`}>
                        <ActionButton
                            icon={<i className="bi bi-box-arrow-in-right"></i>}
                            className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]"
                        />
                    </Link>
                </div>
            );
        },
    },
];