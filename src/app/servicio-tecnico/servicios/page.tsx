import ServicioTecnicoTabs from "@/components/servicio-tecnico/ServicioTecnicoTabs";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Servicio } from "@/types/servicio-tecnico/servicios/Servicio";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PlusIcon } from "lucide-react";

// Botones para la parte superior derecha
const misBotones = (
  <button
    onClick={() => alert("Botón de acción presionado")}
    className="flex items-center justify-center bg-[#1d4ed8] text-white p-2 rounded-md hover:bg-blue-800 transition-all"
  >
    <PlusIcon size={20} strokeWidth={2.5} />
  </button>
);

const columns: ColumnDef<Servicio>[] = [
  { accessorKey: "cliente", header: "Cliente", size: 200 },
  { accessorKey: "servicioTecnico", header: "Servicio Tec.", size: 220 },
  { accessorKey: "ordenServicio", header: "Orden Servicio.", size: 150 },
  { accessorKey: "fechaRegistrada", header: "Fecha Registrada", size: 160 },
  {
    id: "actions",
    header: "Acciones",
    size: 120,
    cell: ({ row }) => (
      <Button
        size="icon-sm"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
        onClick={() => alert(`Visualizando cliente: ${row.original.cliente}`)}
      >
        <EyeIcon className="size-4" />
      </Button>
    ),
  },
];

function page() {
  return (
    <ServicioTecnicoTabs actions={misBotones}>
      {/* Aquí se renderiza la tabla con los datos */}
      <DataTable columns={columns} data={[]} />
    </ServicioTecnicoTabs>
  );
}

export default page;
