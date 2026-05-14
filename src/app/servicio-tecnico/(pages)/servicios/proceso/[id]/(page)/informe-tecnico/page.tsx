"use client";
import ProcesoTabs from "@/app/servicio-tecnico/components/ProcesoTabs";
import { InformeTecnico } from "@/app/servicio-tecnico/types/servicios/InformeTecnico";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useInformeTable } from "../../hooks/useInformeTable";

const data: InformeTecnico[] = [];

function InformeTecnicoPage() {
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    pageSize,
    setPageIndex,
  } = useInformeTable(data);

  const columns: ColumnDef<InformeTecnico>[] = [
    { accessorKey: "cliente", header: "Cliente", size: 220 },
    { accessorKey: "servicio_tecnico", header: "Servicio Técnico", size: 220 },
    { accessorKey: "orden_servicio", header: "Orden Servicio", size: 180 },
    { accessorKey: "fecha_registrada", header: "Fecha Registrada", size: 160 },
  ];

  return (
    <ProcesoTabs>
      <div className="flex items-center justify-between mb-4">
        <DataFilters onSearch={applyFilters} onReset={resetFilters}>
          <FilterDateRange
            nameFrom="fechaDesde"
            nameTo="fechaHasta"
            valueFrom={pendingFilters.fechaDesde}
            valueTo={pendingFilters.fechaHasta}
            onChange={setFilterValue}
          />
          <FilterSearch
            name="search"
            value={pendingFilters.search}
            onChange={setFilterValue}
          />
        </DataFilters>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        showSelection={false}
        isLoading={false}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={setPageIndex}
      />
    </ProcesoTabs>
  );
}

export default InformeTecnicoPage;
