"use client";
import ProcesoTabs from "@/app/servicio-tecnico/components/ProcesoTabs";
import { Egreso } from "@/app/servicio-tecnico/types/servicios/Egreso";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEgresoTable } from "../../hooks/useEgresoTable";
import { Button } from "@/components/ui/button";
import { Clock9, Settings } from "lucide-react";

const egresosData: Egreso[] = [
  {
    id: 1,
    equipo: "Laptop Dell XPS 13",
    serie: "SN123456789",
    fechaInicioReparacion: "2024-05-01",
    diagnostico: "Reemplazo de pantalla",
    tecnicoEncargado: "Juan Pérez",
    fechaFinReparacion: "2024-05-10",
  },
];

function EgresosPage() {
  const { data } = useEgresoTable(egresosData);

  const columns: ColumnDef<Egreso>[] = [
    { accessorKey: "equipo", header: "Equipo", size: 180 },
    { accessorKey: "serie", header: "Serie", size: 160 },
    {
      accessorKey: "fechaInicioReparacion",
      header: "Fecha Inicio Reparación",
      size: 170,
    },
    { accessorKey: "diagnostico", header: "Diagnóstico", size: 230 },
    {
      accessorKey: "tecnicoEncargado",
      header: "Técnico Encargado",
      size: 180,
    },
    {
      accessorKey: "fechaFinReparacion",
      header: "Fecha Fin Reparación",
      size: 170,
    },
    {
      id: "actions",
      header: "Acciones",
      size: 120,
      cell: ({ row }) => (
        <>
          <Button
            size="icon-sm"
            className="bg-[#1A5EB3] hover:bg-[#164e96] text-white rounded-sm py-1.5 px-3 h-8.5 w-9"
            onClick={() =>
              alert(`Ver detalle del egreso: ${row.original.equipo}`)
            }
            aria-label="Ver detalle"
          >
            <Settings size={16} strokeWidth={2.5} />
          </Button>
          <Button
            size="icon-sm"
            className="bg-[#FBAF5D] hover:bg-[#e89d4d] text-white rounded-sm py-1.5 px-3 h-8.5 w-9"
            onClick={() => alert(`Servicio pendiente: ${row.original.equipo}`)}
          >
            <Clock9 size={16} />
          </Button>
        </>
      ),
    },
  ];

  return (
    <ProcesoTabs>
      <DataTable
        columns={columns}
        data={data}
        showSelection={false}
        isLoading={false}
      />
    </ProcesoTabs>
  );
}

export default EgresosPage;
