import { ColumnDef } from "@tanstack/react-table";
import { ActionButton } from "@/components/common/ActionButton";

export interface ConsultaGarantiaRow {
  id: number;
  marca: string;
  estado: string;
  motivo: string;
  ingAsignado: string;
  fecha: string;
  ordenServicio: string;
  asunto: string;
  cliente: string;
  nrDocumentoCliente: string;
}

export const consultaGarantiaColumns: ColumnDef<ConsultaGarantiaRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 50,
  },
  {
    accessorKey: "marca",
    header: "Marca",
    size: 110,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    size: 100,
  },
  {
    accessorKey: "motivo",
    header: "Motivo",
    size: 100,
  },
  {
    accessorKey: "ingAsignado",
    header: "Ing Asignado",
    size: 140,
    cell: ({ row }) => (
      <div className="whitespace-normal break-words max-w-[140px]">
        {row.original.ingAsignado}
      </div>
    ),
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    size: 110,
  },
  {
    accessorKey: "ordenServicio",
    header: "Orden servicio",
    size: 120,
  },
  {
    accessorKey: "asunto",
    header: "Asunto",
    size: 160,
    cell: ({ row }) => (
      <div className="whitespace-normal break-words max-w-[160px]">
        {row.original.asunto}
      </div>
    ),
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    size: 260,
    cell: ({ row }) => (
      <div className="whitespace-normal break-words max-w-[260px]">
        {row.original.cliente}
      </div>
    ),
  },
  {
    accessorKey: "nrDocumentoCliente",
    header: "Nr Documento Cliente",
    size: 160,
    cell: ({ row }) => (
      <div className="whitespace-normal break-words max-w-[160px]">
        {row.original.nrDocumentoCliente}
      </div>
    ),
  },
  {
    id: "ver",
    header: "Ver",
    size: 100,
    cell: ({ row }) => (
      <ActionButton
        text="VER"
        className="bg-[#1D549F] hover:bg-[#15407A] text-white font-bold text-xs uppercase px-4 py-1.5 rounded-[3px] h-auto w-auto"
        onClick={() => console.log("Ver item", row.original.id)}
      />
    ),
  },
];
