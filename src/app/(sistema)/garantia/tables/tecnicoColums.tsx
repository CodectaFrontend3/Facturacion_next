import { ColumnDef } from "@tanstack/react-table";
import { Tecnico } from "../interfaces";
import { ActionButton } from "@/components/common/ActionButton";

export const tecnicoColumns = (
    handleOpenModal: (id: number) => void
): ColumnDef<Tecnico>[] => [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "codigo",
        header: "Código Interno",
    },
    {
        accessorKey: "ruc",
        header: "RUC",
    },
    {
        accessorKey: "cliente",
        header: "Cliente",
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
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
        header: "Ver",
        id: "ver",
        size: 80,
        cell: ({ row }) => (
            <ActionButton
                icon={<i className="bi bi-eye"></i>}
                href={`/garantia/tecnico/${row.original.id}`}
            />
        ),
    },
    {
        header: "Acciones",
        id: "acciones",
        size: 80,
        cell: ({ row }) => {
            const isAnulado = row.original.estado === "anulado";

            return (
                <ActionButton
                    icon={<i className="bi bi-trash3"></i>}
                    className={`w-9 h-9 rounded-full text-white ${isAnulado ? 'bg-[#acacac] hover:bg-[#acacac] cursor-not-allowed pointer-events-none shadow-none' : 'bg-[#ed5565] hover:bg-[#ed5565]'}`}
                    onClick={isAnulado ? undefined : () => handleOpenModal(row.original.id)}
                />
            );
        }
    },
    {
        header: "Información",
        id: "informacion",
        size: 80,
        cell: ({ row }) => {
            const isAnulado = row.original.estado === "anulado";

            if (isAnulado) {
                return (
                    <ActionButton
                        icon={<i className="bi bi-x-circle"></i>}
                        className="w-9 h-9 bg-[#ed5565] rounded-full text-white pointer-events-none"
                    />
                );
            }

            // Siempre en check (en revisión o reparado)
            return (
                <ActionButton
                    icon={<i className="bi bi-check-circle"></i>}
                    className="w-9 h-9 bg-[#1c84c6] rounded-full text-white pointer-events-none"
                />
            );
        }
    },
];