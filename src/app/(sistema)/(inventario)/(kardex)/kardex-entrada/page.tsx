"use client";

import KardexTabs from "../../components/KardexTabs";
import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { useEntradaTable } from "../../hooks/useEntradaTable";
import EntradaProducto from "../../data/EntradaProducto.json";
import { KardexEntradaRow } from "../../types/kardex";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ModalAnular from "../../components/ModalAnular";

const data = EntradaProducto as KardexEntradaRow[];

export default function Page() {
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useEntradaTable(data);
  const router = useRouter();

  const columns: ColumnDef<KardexEntradaRow>[] = [
    { header: "ID", accessorKey: "id", size: 60 },
    { header: "Código", accessorKey: "codigo", size: 150 },
    { header: "Motivo", accessorKey: "motivo", size: 180 },
    { header: "Proveedor", accessorKey: "proveedor", size: 250 },
    { header: "Fecha Subida", accessorKey: "fecha_subida", size: 130 },
    { header: "Nº de G. Remisión", accessorKey: "numero_remision", size: 140 },
    { header: "Nº de Factura", accessorKey: "numero_factura", size: 130 },
    {
      header: "Ver",
      size: 80,
      cell: ({ row }) => (
        <Button
          size="sm"
          className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white font-semibold text-[12px] uppercase tracking-wider h-8 w-16 rounded-sm shadow-sm"
          onClick={() =>
            router.push(`/kardex-entrada/detalle/${row.original.id}`)
          }
        >
          Ver
        </Button>
      ),
    },
    {
      header: "Anular",
      size: 160,
      cell: ({ row }) => {
        const { estado, codigo, id } = row.original;

        if (codigo === "INVENTARIO INICIAL") return null;

        // w-[134px] o w-36 le da el tamaño exacto para que "Guía en circulación" entre holgado en una sola línea
        const badgeClass =
          "inline-flex items-center justify-center text-[12px] font-medium h-8 w-[134px] rounded-sm select-none text-white text-center leading-none shadow-sm";

        if (estado === "ANULADO") {
          return <span className={`${badgeClass} bg-[#64748B]`}>Anulado</span>;
        }

        if (estado === "CIRCULACION") {
          return (
            <span className={`${badgeClass} bg-[#06B6D4]`}>
              Guía en circulación
            </span>
          );
        }

        return (
          <ModalAnular
            idAnular={id}
            numeroGuia={codigo}
            onConfirm={(id) => {
              // Aquí puedes hacer la llamada al endpoint para anular el kardex entrada usando el ID
              console.log("Anular kardex entrada con ID:", id);
            }}
          >
            {/* Pasamos el botón como hijo directo (children) y quitamos el onClick de aquí */}
            <Button
              size="sm"
              className="h-8 w-33.5 gap-1.5 text-[12px] font-medium rounded-sm shadow-sm bg-[#eb4a4a] hover:bg-[#eb3636] text-white"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
              Anular
            </Button>
          </ModalAnular>
        );
      },
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
        onClick={() => router.push("/kardex-entrada/create")}
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
