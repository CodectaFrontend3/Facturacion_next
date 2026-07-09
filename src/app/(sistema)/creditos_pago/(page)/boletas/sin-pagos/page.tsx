"use client";

import { DataFilters } from "@/components/DataFilters/DataFilters";
import BoletasTabs from "../../../components/boletas/_boletas/BoletasTabs";
import { useComprobanteTable } from "../../../hooks/useComprobanteTable";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearchSelect } from "@/components/DataFilters/FilterSearchSelect";
import { DataTable } from "@/components/shared/DataTable";
import { getColumns } from "../../../components/Columns";
import Boletas from "../../../data/boletas.json";
import { ComprobanteBase } from "../../../types/ComprobanteBase";

const BoletasData = Boletas as ComprobanteBase[];
const BoletasDataSinPagos = BoletasData.filter(
  (b) => b.estado === "Sin Pagar" && b.tipo_emision === "Automatica",
);

function page() {
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
  } = useComprobanteTable({ data: BoletasDataSinPagos, tipo: "Boleta" }); // Usamos el hook para obtener los datos y funciones de filtrado

  console.log("BoletasData", BoletasData);

  console.log("BoletasDataSinPagos", BoletasDataSinPagos);

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 lg:p-6 flex flex-col justify-between">
      <div className="w-full">
        <BoletasTabs>
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
                name="formaDePago"
                value={pendingFilters.formaDePago || "todos"}
                onChange={setFilterValue}
                options={formasDePagoOptions}
                placeholder="Seleccionar Forma de Pago"
              />
            </DataFilters>
          </div>

          {/* Aquí se renderiza la tabla con los datos */}
          <DataTable
            columns={getColumns({ tipo: "Boleta", esPagado: false })} // Pasamos el tipo de comprobante para obtener las columnas correctas
            data={filteredData}
            showSelection={true}
            isLoading={false}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            showPagination={true}
          />
        </BoletasTabs>
      </div>
    </main>
  );
}

export default page;
