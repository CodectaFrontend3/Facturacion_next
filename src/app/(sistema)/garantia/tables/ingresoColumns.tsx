import { ColumnDef } from "@tanstack/react-table";
import { Ingreso } from "../interfaces";
import { ActionButton } from "@/components/common/ActionButton";

export const ingresoColumns = (
    handleAnular: (id: number) => void,
    handleEgresar: (id: number) => void,
    handleOpenModal: (id: number) => void
): ColumnDef<Ingreso>[] => [
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
            size: 80,
            cell: ({ row }) => (
                <ActionButton
                    icon={<i className="bi bi-eye"></i>}
                    href={`/garantia/ingreso/${row.original.id}`}
                    className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]"
                />
            ),
        },
        {
            header: "Acciones",
            id: "acciones",
            size: 120,
            cell: ({ row }) => {
                const isAnulado = row.original.estado === "anulado";
                const isEgresado = row.original.estado === "egresado" || row.original.estado === "en_revision" || row.original.estado === "reparado";

                if (isAnulado) {
                    return (
                        <ActionButton
                            icon={<i className="bi bi-x-circle"></i>}
                            className="w-9 h-9 bg-[#dc3545] hover:bg-[#c82333] rounded-full"
                        />
                    );
                }

                if (isEgresado) {
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
                            icon={<i className="bi bi-trash3"></i>}
                            className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-full"
                            onClick={() => handleOpenModal(row.original.id)}
                        />
                        <ActionButton
                            icon={<i className="bi bi-box-arrow-in-right"></i>}
                            className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]"
                            href={`/garantia/egreso/create/${row.original.id}`}
                        />
                    </div>
                );
            }
        },
    ];
