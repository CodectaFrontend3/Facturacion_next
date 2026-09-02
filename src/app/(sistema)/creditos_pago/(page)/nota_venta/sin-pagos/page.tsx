"use client";

import { DataFilters } from "@/components/DataFilters/DataFilters";
import NotaVentaTabs from "../../../components/nota_venta/NotaVentaTabs";
import { useComprobanteTable } from "../../../hooks/useComprobanteTable";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearchSelect } from "@/components/DataFilters/FilterSearchSelect";
import { DataTable } from "@/components/shared/DataTable";
import { getColumns } from "../../../components/Columns";
import NotaVenta from "../../../data/notas_venta.json";
import { ComprobanteBase } from "../../../types/ComprobanteBase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";
import { PagoCuotasModal } from "../../../components/PagoCuotasModal";

const NotaVentaData = NotaVenta as ComprobanteBase[];
const NotaVentaSinPagar = NotaVentaData.filter((b) => b.estado === "Sin Pagar");

function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
    filteredData,
    clientesOptions,
    estadosOptions,
    formasDePagoOptions,
    selectedRows,
    handleRowSelectionChange,
  } = useComprobanteTable({ data: NotaVentaSinPagar, tipo: "NotaVenta" }); // Usamos el hook para obtener los datos y funciones de filtrado

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 lg:p-6 flex flex-col justify-between">
      <div className="w-full">
        <NotaVentaTabs
          actions={
            <Button
              type="button"
              size="icon"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 rounded-md shadow-sm h-9 w-9"
            >
              <Banknote className="h-5 w-5" />
            </Button>
          }
        >
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
              <FilterSearchSelect
                name="cliente"
                value={pendingFilters.cliente || "todos"}
                onChange={setFilterValue}
                options={clientesOptions}
                placeholder="Seleccionar Cliente"
              />
              <FilterSearchSelect
                name="estado"
                value={pendingFilters.estado || "todos"}
                onChange={setFilterValue}
                options={estadosOptions}
                placeholder="Seleccionar Estado"
              />
              <FilterSearchSelect
                name="formaPago"
                value={pendingFilters.formaPago || "todos"}
                onChange={setFilterValue}
                options={formasDePagoOptions}
                placeholder="Seleccionar Forma de Pago"
              />
            </DataFilters>
          </div>

          {/* Aquí se renderiza la tabla con los datos */}
          <DataTable
            columns={getColumns({ tipo: "NotaVenta", esPagado: false })} // Pasamos el tipo de comprobante para obtener las columnas correctas
            data={filteredData}
            showSelection={true}
            isLoading={false}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            showPagination={true}
            onRowSelectionChange={(rows) => handleRowSelectionChange(rows)} // Pasamos la función para manejar la selección de filas
          />

          {/* Modal para registrar el pago de cuotas */}
          <PagoCuotasModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            boletasSeleccionadas={selectedRows || []}
          />
        </NotaVentaTabs>
      </div>
    </main>
  );
}

export default page;
