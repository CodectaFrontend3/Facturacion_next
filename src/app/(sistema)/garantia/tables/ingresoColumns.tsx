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
            accessorKey: "ruc",
            header: "RUC",
        },
        {
            accessorKey: "cliente",
            header: "Cliente",
        },
        {
            accessorKey: "fecha",
            header: "Fecha de Compra",
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
            header: "Nº Serie",
        },
        {
            header: "Ver",
            id: "ver",
            size: 80,
            cell: ({ row }) => (
                <ActionButton
                    icon={<i className="bi bi-eye"></i>}
                    href={`/garantia/ingreso/${row.original.id}`}
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
                const isInactive = isAnulado || isEgresado;

                return (
                    <div className="flex items-center gap-1.5">
                        <ActionButton
                            icon={<i className="bi bi-trash3"></i>}
                            className={`w-9 h-9 rounded-full text-white transition-opacity ${isInactive ? 'bg-[#acacac] hover:bg-[#acacac] cursor-not-allowed pointer-events-none shadow-none' : 'bg-[#ed5565] hover:bg-[#ed5565]'}`}
                            onClick={isInactive ? undefined : () => handleOpenModal(row.original.id)}
                        />
                        <ActionButton
                            icon={<i className="bi bi-box-arrow-in-right"></i>}
                            className={`w-9 h-9 rounded-[3px] text-white transition-opacity ${isInactive ? 'bg-[#acacac] hover:bg-[#acacac] cursor-not-allowed pointer-events-none shadow-none' : 'bg-[#23c6c8] hover:bg-[#23c6c8]'}`}
                            href={isInactive ? undefined : `/garantia/egreso/create/${row.original.id}`}
                        />
                    </div>
                );
            }
        },
        {
            header: "Información",
            id: "informacion",
            size: 80,
            cell: ({ row }) => {
                const isAnulado = row.original.estado === "anulado";
                const isEgresado = row.original.estado === "egresado" || row.original.estado === "en_revision" || row.original.estado === "reparado";

                if (isAnulado) {
                    return (
                        <ActionButton
                            icon={<i className="bi bi-x-circle"></i>}
                            className="w-9 h-9 bg-[#ed5565] rounded-full text-white pointer-events-none"
                        />
                    );
                }

                if (isEgresado) {
                    return (
                        <ActionButton
                            icon={<i className="bi bi-check-circle"></i>}
                            className="w-9 h-9 bg-[#1c84c6] rounded-full text-white pointer-events-none"
                        />
                    );
                }

                // Si no es ni anulado ni egresado, está "sin procesar"
                return (
                    <ActionButton
                        icon={<i className="bi bi-clock"></i>}
                        className="w-9 h-9 bg-[#f6a041] rounded-full text-white pointer-events-none"
                    />
                );
            }
        },
    ];
