"use client";

import KardexTabs from "../../components/KardexTabs";
import { KardexSalidaRow } from "../../types/kardex";
import SalidaProducto from "../../data/SalidaProducto.json";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useSalidaTable } from "../../hooks/useSalidaTable";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { DataTable } from "@/components/shared/DataTable";
import { Download, Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const data = SalidaProducto as unknown as KardexSalidaRow[];

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
  const router = useRouter();

  const columns: ColumnDef<KardexSalidaRow>[] = [
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
          onClick={() =>
            router.push(`/kardex-salida/detalle/${row.original.id}`)
          }
          className="bg-[#1A5EB3] hover:bg-[#154b91] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
        >
          Ver
        </Button>
      ),
    },
  ];

  const misBotones = (
    <>
      <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
        <Upload className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
      <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
        <Download className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
      <button className="flex items-center justify-center bg-[#1A5EB3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#164e96] transition-all">
        <Plus className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
    </>
  );

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
