"use client";
import ProcesoTabs from "@/app/servicio-tecnico/components/ProcesoTabs";
import { Ingreso } from "@/app/servicio-tecnico/types/servicios/Ingreso";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";

const data: Ingreso[] = [
  {
    id: 1,
    equipo: "Laptop Dell XPS 15",
    serie: "SN987654321",
    observacion: "Pantalla no enciende",
    fechaRegistrada: "2024-06-01",
  },
];

function IngresosPage() {
  const columns: ColumnDef<Ingreso>[] = [
    { accessorKey: "equipo", header: "Equipo", size: 200 },
    { accessorKey: "serie", header: "Serie", size: 220 },
    { accessorKey: "observacion", header: "Observación", size: 150 },
    {
      accessorKey: "fechaRegistrada",
      header: "Fecha Registrada",
      size: 160,
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

export default IngresosPage;
