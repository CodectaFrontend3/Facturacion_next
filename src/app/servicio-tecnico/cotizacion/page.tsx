import ServicioTecnicoTabs from "@/components/servicio-tecnico/ServicioTecnicoTabs";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Cotizacion } from "@/types/servicio-tecnico/cotizacion/Cotizacion";
import { ColumnDef } from "@tanstack/react-table";
import { DownloadIcon, EyeIcon, Printer } from "lucide-react";

// Botones para la parte superior derecha
const misBotones = (
  <div className="flex gap-2">
    <button
      onClick={() => alert("Imprimiendo...")}
      className="flex items-center justify-center bg-[#1d4ed8] text-white p-2 rounded-md hover:bg-blue-800 transition-all shadow-sm"
    >
      <Printer size={20} strokeWidth={2.5} />
    </button>
    <button
      onClick={() => alert("Descargando...")}
      className="flex items-center justify-center bg-[#1d4ed8] text-white p-2 rounded-md hover:bg-blue-800 transition-all shadow-sm"
    >
      <DownloadIcon size={20} strokeWidth={2.5} />
    </button>
  </div>
);

const columns: ColumnDef<Cotizacion>[] = [
  { accessorKey: "id", header: "ID", size: 200 },
  { accessorKey: "numeroCotizacion", header: "Nº", size: 220 },
  { accessorKey: "rucDni", header: "RUC-DNI", size: 150 },
  { accessorKey: "emision", header: "Emision", size: 160 },
  { accessorKey: "formaPago", header: "Forma de Pago", size: 160 },
  { accessorKey: "importeTotal", header: "Importe Total", size: 160 },
  {
    id: "actions",
    header: "Acciones",
    size: 120,
    cell: ({ row }) => (
      <Button
        size="icon-sm"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
        onClick={() => alert(`Visualizando cliente: ${row.original.id}`)}
      >
        <EyeIcon className="size-4" />
      </Button>
    ),
  },
];

function page() {
  return (
    <ServicioTecnicoTabs actions={misBotones}>
      <DataTable columns={columns} data={[]} />
    </ServicioTecnicoTabs>
  );
}

export default page;
