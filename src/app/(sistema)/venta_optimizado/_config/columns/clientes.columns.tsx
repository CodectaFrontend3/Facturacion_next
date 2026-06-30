import { ActionButton } from "@/components/common/ActionButton"
import { ColumnDef } from "@tanstack/react-table"
import { ClienteFilaLista } from "../../_domain/types/cliente.types"

export const getClienteColumns = (): ColumnDef<ClienteFilaLista>[] => [
  { accessorKey: "id", header: "ID", size: 40 },
  { accessorKey: "nombre", header: "Nombre" },
  { accessorKey: "tipoDocumento", header: "Tipo Doc.", size: 100 },
  { accessorKey: "numeroDocumento", header: "Nº Doc.", size: 120 },
  { accessorKey: "correo", header: "Correo" },
  { accessorKey: "celular", header: "Celular", size: 100 },
  { accessorKey: "fechaRegistro", header: "Fecha de Registro", size: 130 },
  {
    id: "acciones",
    header: "Ver",
    size: 50,
    cell: () => (
      <ActionButton
        icon={<i className="bi bi-eye"></i>}
        label="Ver detalle"
        className="w-9 h-9 rounded-[3px]"
      />
    )
  }
];