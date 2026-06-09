"use client";

import { KardexSalidaRow } from "../../types/kardex";
import SalidaProducto from "../../data/SalidaProducto.json";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useSalidaTable } from "../../hooks/useSalidaTable";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { DataTable } from "@/components/shared/DataTable";

const data = SalidaProducto as unknown as KardexSalidaRow[];

export const columns: ColumnDef<KardexSalidaRow>[] = [
  {
    header: "ID",
    accessorKey: "id",
    size: 60,
  },
  {
    header: "Motivo",
    accessorKey: "motivo",
    size: 180,
  },
  {
    header: "Información",
    accessorKey: "informacion",
    size: 180,
  },
  {
    header: "Ver",
    size: 100,
    cell: ({ row }) => (
      <Button
        size="sm"
        onClick={() => console.log("Viendo traslado ID:", row.original.id)}
        className="bg-[#23C6C8] hover:bg-[#1ab394] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
      >
        Ver
      </Button>
    ),
  },
];

export default function Page() {
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useSalidaTable(data);
  return (
    <>
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
    </>
  );
}
