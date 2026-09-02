"use client";

import KardexTabs from "../../components/KardexTabs";
import { KardexDistribucionRow } from "../../types/kardex";
import DistribucionProducto from "../../data/DistribucionProducto.json";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { DataTable } from "@/components/shared/DataTable";
import { useDistribucionTable } from "../../hooks/useDistribucionTable";
import { Download, Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const data = DistribucionProducto as unknown as KardexDistribucionRow[];

export default function Page() {
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useDistribucionTable(data);
  const router = useRouter();

  const columns: ColumnDef<KardexDistribucionRow>[] = [
    { header: "ID", accessorKey: "id", size: 60 },
    { header: "Código", accessorKey: "codigo", size: 150 },
    {
      header: "Fecha Distribución",
      accessorKey: "fecha_distribucion",
      size: 130,
    },
    {
      header: "Cantidad de Productos",
      accessorKey: "cantidad_productos",
      size: 150,
      cell: ({ row }) => {
        const cantidad = row.original.cantidad_productos;
        return <span>{cantidad} producto</span>;
      },
    },
    {
      header: "Cantidad Distribuida",
      accessorKey: "cantidad_distribuida",
      size: 150,
      cell: ({ row }) => {
        const cantidad = row.original.cantidad_distribuida;
        return <span>{cantidad} items</span>;
      },
    },
    { header: "Almacen", accessorKey: "almacen", size: 180 },
    { header: "Guia de Remisión", accessorKey: "guia_remision", size: 250 },
    {
      header: "Ver",
      size: 120,
      cell: ({ row }) => (
        <Button
          size="sm"
          onClick={() =>
            router.push(
              `/kardex-entrada-Distribucion/detalle/${row.original.id}`,
            )
          }
          className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
        >
          Ver
        </Button>
      ),
    },
  ];

  const misBotones = (
    <>
      <button className="flex items-center justify-center bg-[#2C1FF3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#190FCE] transition-all">
        <Upload className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
      <button className="flex items-center justify-center bg-[#2C1FF3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#190FCE] transition-all">
        <Download className="w-4 h-4" size={16} strokeWidth={3} />
      </button>
      <button
        className="flex items-center justify-center bg-[#2C1FF3] text-[#FFFFFF] py-2.5 px-3 rounded-sm hover:bg-[#190FCE] transition-all"
        onClick={() => router.push("/kardex-entrada-Distribucion/create")}
      >
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
