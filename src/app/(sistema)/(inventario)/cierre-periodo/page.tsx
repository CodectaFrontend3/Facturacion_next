"use client";

import { Download, Upload } from "lucide-react";
import KardexTabs from "../components/KardexTabs";
import { ColumnDef } from "@tanstack/react-table";
import { CierrePeriodo } from "../types/CierrePeriodo";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import CierrePeriodoData from "../data/CierrePeriodo.json";
import { useRouter } from "next/navigation";
import { useCierreTable } from "../hooks/useCierreTable";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";

const data: CierrePeriodo[] = CierrePeriodoData as unknown as CierrePeriodo[];

const misBotones = (
  <>
    <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
      <Upload className="w-4 h-4" size={16} strokeWidth={3} />
    </button>
    <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
      <Download className="w-4 h-4" size={16} strokeWidth={3} />
    </button>
  </>
);

export default function Page() {
  const {
    filteredData,
    pageIndex,
    setPageIndex,
    pendingFilters,
    applyFilters,
    resetFilters,
    setFilterValue,
  } = useCierreTable(data);
  const router = useRouter();

  const columns: ColumnDef<CierrePeriodo>[] = [
    { accessorKey: "id", header: "ID" },
    {
      header: "Mes",
      cell: ({ row }) => {
        const fechaCierre = new Date(
          row.original.fecha_cierre.replace(/-/g, "\/"),
        );
        return fechaCierre.getMonth() + 1;
      },
    },
    {
      header: "Año",
      cell: ({ row }) => {
        const fechaCierre = new Date(row.original.fecha_cierre);
        return fechaCierre.getFullYear();
      },
    },
    {
      header: "Ver",
      size: 300,
      cell: ({ row }) => (
        <Button
          size="sm"
          onClick={() =>
            router.push(`/cierre-periodo/detalle/${row.original.id}`)
          }
          className="bg-[#1A5EB3] hover:bg-[#154b91] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
        >
          Ver
        </Button>
      ),
    },
  ];

  return (
    <KardexTabs actions={misBotones}>
      {/* Filtros */}
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

      {/* Aquí se renderiza la tabla con los datos */}
      <DataTable
        columns={columns}
        data={filteredData}
        showSelection={false}
        isLoading={false}
        pageIndex={pageIndex}
        onPageChange={setPageIndex}
      />
    </KardexTabs>
  );
}
