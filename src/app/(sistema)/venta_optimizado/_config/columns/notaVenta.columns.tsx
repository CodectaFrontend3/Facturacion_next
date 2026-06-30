import { ColumnDef } from "@tanstack/react-table";
import { DocumentoFilaLista } from "../../_domain/types/documento.types";
import { ActionButton } from "@/components/common/ActionButton";
import { CompartirButtons } from "../../_components/ventas/cells/CompartirButtons";
import { NotaButton } from "../../_components/ventas/cells/NotaButton";

interface NoteColumnOptions {
  getNote?: (rowId: string | number) => string
  onNoteClick?: (rowId: string | number) => void
  onView?: (row: DocumentoFilaLista) => void
}

export const getNotaVentaColumns = (
    noteOptions: NoteColumnOptions = {}
): ColumnDef<DocumentoFilaLista>[] => [

  { accessorKey: "id", header: "ID", size: 40 },
  {accessorKey: "numero", header: "N°", size: 145 },
  { accessorKey: "clienteDocumento", header: "RUC-DNI", size: 120 },
  { accessorKey: "clienteNombre", header: "Cliente" },
  { accessorKey: "fechaEmision", header: "Fecha Emisión", size: 100 },
  { accessorKey: "formaPago", header: "Forma", size: 100 },
  { 
    accessorKey: "total", 
    header: "Importe T.", 
    size: 120,
    cell: ({ row }) => `S/ ${row.original.total.toFixed(2)}`
  },
  {
    id: "acciones",
    header: "Acciones",
    size: 130,
    // Nota de Venta no tiene estado "Pendiente" ni renovación: al crearse
    // queda confirmada de inmediato, por eso el check es siempre fijo (sin reloj ni flechas).
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <ActionButton
          icon={<i className="bi bi-eye"></i>}
          className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]"
          onClick={() => noteOptions.onView?.(row.original)}
        />
        <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
      </div>
    )
  },
  {
    id: "compartir",
    header: "Compartir R.",
    size: 110,
    cell: ({ row }) => (
      <CompartirButtons 
        celular={row.original.clienteCelular} 
        correo={row.original.clienteCorreo} 
        numeroDoc={row.original.numero} 
      />
    )
  }
];
