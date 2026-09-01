"use client";

import { ChevronUp, X } from "lucide-react";
import { useState, useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { consultaGarantiaColumns, ConsultaGarantiaRow } from "./consultasGarantiaColumns";

interface ConsultasGarantiaLayoutProps {
  title: string;
  data: ConsultaGarantiaRow[];
}

export function ConsultasGarantiaLayout({
  title,
  data,
}: ConsultasGarantiaLayoutProps) {
  const [pageSize, setPageSize] = useState<number>(25);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Memoizado: solo recalcula cuando cambia data o searchTerm
  const filteredData = useMemo(() => data.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.marca.toLowerCase().includes(term) ||
      item.estado.toLowerCase().includes(term) ||
      item.motivo.toLowerCase().includes(term) ||
      item.ingAsignado.toLowerCase().includes(term) ||
      item.ordenServicio.toLowerCase().includes(term) ||
      item.asunto.toLowerCase().includes(term) ||
      item.cliente.toLowerCase().includes(term) ||
      item.nrDocumentoCliente.toLowerCase().includes(term)
    );
  }), [data, searchTerm]);

  return (
    // Se usa <div> en vez de <main> para evitar anidamiento semántico incorrecto
    <div className="min-h-screen bg-gray-100 space-y-6">
      <div className="pl-5 mt-5 pb-5">
        {/* Card contenedor exterior con panel "Vista Previa" */}
        <section className="bg-white rounded-none border border-gray-200 shadow-sm">
          {/* Cabecera del panel / Card Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-200 bg-white">
            <h1 className="text-base font-bold text-[#676A6C]">Vista Previa</h1>
            <div className="flex items-center gap-2 text-gray-400">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hover:text-gray-600 transition-colors p-0.5 cursor-pointer"
              >
                <ChevronUp className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
              </button>
              <button className="hover:text-gray-600 transition-colors p-0.5 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cuerpo del panel */}
          {!isCollapsed && (
            <div className="px-10 pt-4 pb-6 space-y-4">
              {/* Fila superior de Controles */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#676A6C]">
                {/* Selector de cantidad de entradas */}
                <div className="flex items-center gap-2">
                  <span>Ver</span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="border border-gray-300 rounded-none px-2 py-1 bg-white text-[13px] text-[#676A6C] focus:outline-none focus:border-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span>entradas</span>
                </div>

                {/* Búsqueda y botones de exportación */}
                <div className="flex flex-wrap items-center gap-3 ml-auto">
                  <div className="flex items-center gap-2">
                    <span>Buscar:</span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border border-gray-300 rounded-none px-3 py-1 bg-white text-[13px] text-[#676A6C] focus:outline-none focus:border-blue-500 w-48"
                    />
                  </div>

                  {/* Botones de Exportación (sin console.log) */}
                  <div className="inline-flex -space-x-px rounded-[3px] shadow-xs">
                    {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn, index) => (
                      <button
                        key={btn}
                        onClick={() => {}}
                        className={`relative inline-flex items-center border border-gray-300 bg-white hover:bg-gray-100 text-[#676A6C] text-xs px-3 py-1.5 font-medium transition-colors cursor-pointer focus:z-10 ${
                          index === 0
                            ? "rounded-l-[3px]"
                            : index === 4
                              ? "rounded-r-[3px]"
                              : ""
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabla reusable */}
              <div className="overflow-x-auto">
                <DataTable
                  columns={consultaGarantiaColumns}
                  data={filteredData}
                  pageSize={pageSize}
                  showSelection={false}
                  showPagination={true}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
