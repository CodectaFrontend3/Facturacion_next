import { ColumnDef } from "@tanstack/react-table";
import { RenovacionFilaLista } from "../../_domain/types/documento.types";
import { ActionButton } from "@/components/common/ActionButton";
import { CompartirButtons } from "../../_components/ventas/cells/CompartirButtons";
import { NotaButton } from "../../_components/ventas/cells/NotaButton";

interface NoteColumnOptions {
  getNote?: (rowId: string | number) => string
  onNoteClick?: (rowId: string | number) => void
  /** Navega al detalle del documento (botón del ojo). row.tipo indica si es cotizacion o cotizacion_manual */
  onView?: (row: RenovacionFilaLista) => void
}

export const getRenovacionColumns = (
    noteOptions: NoteColumnOptions = {}
): ColumnDef<RenovacionFilaLista>[] => [

  { accessorKey: "id", header: "ID", size: 40 },
  {
    accessorKey: "numero",
    header: "N°",
    size: 145,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <span className="break-words">{row.original.numero}</span>
        <NotaButton
          note={noteOptions.getNote?.(row.original.id)}
          onClick={() => noteOptions.onNoteClick?.(row.original.id)}
        />
      </div>
    )
  },
  { accessorKey: "clienteDocumento", header: "RUC-DNI", size: 120 },
  { accessorKey: "clienteNombre", header: "Cliente", size: 310 },
  { accessorKey: "fechaEmision", header: "Fecha Emisión", size: 100 },
  { accessorKey: "fechaRenovacion", header: "Renovación", size: 110 },
  { 
    accessorKey: "diasRestantes", 
    header: "Días R.", 
    size: 90,
    cell: ({ row }) => {
      const dias = row.original.diasRestantes;
      const alerta = row.original.alertaVisual;
      
      let badgeClass = "bg-green-100 text-green-800";
      if (alerta === "vencido") badgeClass = "bg-red-100 text-red-800 font-bold";
      else if (alerta === "por_vencer") badgeClass = "bg-amber-100 text-amber-800 animate-pulse";

      return (
        <span className={`px-2 py-0.5 rounded text-xs ${badgeClass}`}>
          {dias <= 0 ? `Vencido hace ${Math.abs(dias)} d.` : `${dias} días`}
        </span>
      );
    }
  },
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
    cell: ({ row }) => {
      const doc = row.original;

      // Misma lógica que en Cotización/Manual:
      // - 2do botón: refleja el ESTADO del documento (no la renovación)
      // - 3er botón ADICIONAL: solo si la renovación está vencida (siempre es el caso aquí,
      //   ya que esta tabla solo lista renovaciones activas, pero se valida igual por consistencia)
      const esPendiente = doc.estado === "Pendiente";
      const renovacionVencida = doc.alertaVisual === "vencido";

      return (
        <div className="flex items-center gap-1.5">
          <ActionButton
            icon={<i className="bi bi-eye"></i>}
            className="w-9 h-9 bg-[#0b65d8] hover:bg-[#0952b1] rounded-[3px]"
            onClick={() => noteOptions.onView?.(doc)}
          />

          {esPendiente ? (
            <ActionButton icon={<i className="bi bi-clock"></i>} className="w-9 h-9 bg-[#f6a041] hover:bg-[#e08b33] rounded-[3px]" />
          ) : (
            <ActionButton icon={<i className="bi bi-check-circle"></i>} className="w-9 h-9 bg-[#20c997] hover:bg-[#1ba87e] rounded-[3px]" />
          )}

          {renovacionVencida && (
            <ActionButton icon={<i className="bi bi-arrow-repeat"></i>} className="w-9 h-9 bg-[#dc3545] hover:bg-[#c82333] rounded-[3px]" />
          )}
        </div>
      );
    }
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
