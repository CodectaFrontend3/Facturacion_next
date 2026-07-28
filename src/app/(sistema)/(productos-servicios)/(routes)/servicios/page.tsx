"use client"

import { useState, useMemo } from "react"
import { DataTable } from "@/components/shared/DataTable"
import { ActionButton } from "@/components/common/ActionButton"
import { showToast } from "@/components/shared/custom-toast"
import { DataTablePagination } from "@/components/DataTable/DataTablePagination"
import { Servicio } from "../../types/servicios.types"
import { useServicios } from "../../_hooks/useServicios"
import { ServicioModal } from "../../_components/servicios/ServicioModal"
import { DashboardResumen } from "../../_components/dashboard/DashboardResumen"
import { FilterBar } from "../../_components/shared/FilterBar"
import { getServiciosColumns } from "../../_config/servicios-columns"
import serviciosMock from "../../data/servicios-mock.json"

export default function Page() {
  const [servicios, setServicios] = useState<Servicio[]>(() => serviciosMock as Servicio[])
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Extraemos toda la lógica cerebro para manejar filtros, paginado, etc.
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useServicios(servicios)

  // Opciones de filtrado de estado para el select
  const selectOptions = useMemo(() => [
    { label: "Todos los servicios", value: "todos" },
    { label: "Activos", value: "Activo" },
    { label: "Anulados", value: "Anulado" },
  ], [])

  // Calcular la data de estados para el PieChart del Dashboard
  const estadoData = useMemo(() => {
    const activos = servicios.filter((s) => s.estado === "Activo").length
    const anulados = servicios.filter((s) => s.estado === "Anulado").length
    return [
      { name: "Activos", value: activos, color: "#3b82f6" },
      { name: "Anulados", value: anulados, color: "#cbd5e1" },
    ]
  }, [servicios])

  // Calcular la data de familias para el BarChart del Dashboard (totalmente dinámico)
  const barData = useMemo(() => {
    const counts: Record<string, number> = {}
    servicios.forEach((s) => {
      const key = s.familia.toUpperCase()
      counts[key] = (counts[key] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [servicios])

  const handleNewService = () => {
    setSelectedServicio(null)
    setIsModalOpen(true)
  }

  const handleSave = (data: Omit<Servicio, "id"> & { id?: string }) => {
    if (data.id) {
      // Editar
      setServicios((prev) =>
        prev.map((s) => (s.id === data.id ? (data as Servicio) : s))
      )
      showToast("Servicio actualizado con éxito", 1)
    } else {
      // Crear
      const newService: Servicio = {
        ...data,
        id: String(Date.now()),
      }
      setServicios((prev) => [newService, ...prev])
      showToast("Servicio creado con éxito", 1)
    }
  }

  const columns = useMemo(
    () =>
      getServiciosColumns(
        (serv) => {
          setSelectedServicio(serv)
          setIsModalOpen(true)
        },
        (id, currentEstado) => {
          const nextEstado = currentEstado === "Activo" ? "Anulado" : "Activo"
          setServicios((prev) =>
            prev.map((s) => (s.id === id ? { ...s, estado: nextEstado } : s))
          )
          showToast(
            nextEstado === "Activo"
              ? "Servicio activado correctamente"
              : "Servicio desactivado correctamente",
            1
          )
        },
        (id) => {
          setServicios((prev) => prev.filter((s) => s.id !== id))
          showToast("Servicio eliminado con éxito", 1)
        }
      ),
    [servicios]
  )

  const totalEntries = filteredData.length
  const pageSize = 10
  const pageCount = Math.ceil(totalEntries / pageSize)

  return (
    <main className="flex flex-col gap-6 w-full font-sans [&_input]:rounded-none! [&_select]:rounded-none!">
      {/* Sección del Resumen del Dashboard (Sin bordes redondeados y sin sombras) */}
      <DashboardResumen
        titulo="Resumen de Julio 2026"
        totalLabel="Servicios"
        totalCount={servicios.length}
        estadoData={estadoData}
        barData={barData}
        barLabel="Marcas con más servicios"
      />

      {/* Contenedor de la Tabla - registros_sunat style sin exceso de espaciado inferior */}
      <section className="bg-white rounded-none border border-gray-200 shadow-none p-5 flex flex-col mb-2">
        <div className="w-full">
          {/* Cabecera de la Tabla / Tabs y Botones */}
          <div className="flex items-end justify-between border-b border-gray-200">
            <div className="flex items-center">
              <button className="px-4 py-2 text-xs font-bold transition-all relative top-[1px] rounded-none bg-white border-x border-t border-gray-200 text-gray-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 shrink-0 block bg-[#2C1FF3]" />
                <span className="text-[13px] font-bold">
                  Servicios activos ({filteredData.length})
                </span>
              </button>
            </div>
            
            <div className="pb-1 flex items-center gap-1.5">
              <ActionButton
                icon={<i className="fa fa-upload text-[13px]" />}
                className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white w-8 h-8 rounded-[4px] cursor-pointer"
                label="Subir"
                onClick={() => showToast("Subir archivo de servicios...", 1)}
              />
              <ActionButton
                icon={<i className="fa fa-download text-[13px]" />}
                isPopover={true}
                popoverOptions={[
                  {
                    label: "Exportar todo",
                    onClick: () => showToast("Exportando todos los servicios...", 1),
                  },
                  {
                    label: "Exportar seleccionados",
                    onClick: () => showToast("Exportando servicios seleccionados...", 1),
                  },
                ]}
                className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white w-8 h-8 rounded-[4px] cursor-pointer"
                label="Descargar"
                popoverClassName="min-w-[200px]"
              />
              <ActionButton
                icon={<i className="fa fa-plus text-[13px]" />}
                className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white w-8 h-8 rounded-[4px] cursor-pointer"
                label="Agregar Servicio"
                onClick={handleNewService}
              />
            </div>
          </div>

          {/* Contenedor de filtros y tabla (Estructura registros_sunat) */}
          <div className="border-x border-b border-gray-200 bg-white p-4 pb-6 space-y-4 rounded-none">
            {/* Barra de Filtros */}
            <div className="border-b border-gray-100 pb-2">
              <FilterBar
                pendingFilters={pendingFilters as any}
                setFilterValue={setFilterValue}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
                selectOptions={selectOptions}
              />
            </div>

            {/* Tabla DataTable */}
            <div className="mt-1 border border-gray-200 overflow-hidden rounded-none bg-white [&_div.border]:border-0 [&_div.border]:rounded-none">
              <DataTable
                columns={columns}
                data={filteredData}
                showSelection={true}
                isLoading={false}
                pageIndex={pageIndex}
                onPageChange={setPageIndex}
                pageSize={pageSize}
                showPagination={false}
              />
            </div>

            {/* Paginación externa (Fuera del borde del DataTable) */}
            {totalEntries > 0 && (
              <div className="mt-4 pt-1">
                <DataTablePagination
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  dataLength={totalEntries}
                  pageCount={pageCount}
                  canPreviousPage={pageIndex > 0}
                  canNextPage={pageIndex < pageCount - 1}
                  setPageIndex={setPageIndex}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal para Agregar/Editar Servicio */}
      <ServicioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        servicio={selectedServicio}
      />
    </main>
  )
}
