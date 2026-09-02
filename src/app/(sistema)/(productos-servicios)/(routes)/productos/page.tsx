"use client"

import { useState, useMemo, useEffect } from "react"
import { DataTable } from "@/components/shared/DataTable"
import { ActionButton } from "@/components/common/ActionButton"
import { showToast } from "@/components/shared/custom-toast"
import { DataTablePagination } from "@/components/DataTable/DataTablePagination"
import { Producto } from "../../types/productos.types"
import { useProductos } from "../../_hooks/useProductos"
import { ProductoModal } from "../../_components/productos/ProductoModal"
import { ReadOnlyDetailModal } from "../../_components/shared/ReadOnlyDetailModal"
import { FichaTecnicaModal } from "../../_components/shared/FichaTecnicaModal"
import { UtilityCalculator } from "../../_components/shared/UtilityCalculator"
import { ImportFileModal } from "../../_components/shared/ImportFileModal"
import { DashboardResumen } from "../../_components/dashboard/DashboardResumen"
import { FilterBar } from "../../_components/shared/FilterBar"
import { getProductosColumns } from "../../_config/productos-columns"
import productosMock from "../../data/productos-mock.json"

const completarProducto = (producto: Producto): Producto => {
  const precioCompra = producto.precioCompra ?? Number((producto.precioNacional * 0.7).toFixed(2))
  const utilidad = precioCompra > 0
    ? Number((((producto.precioNacional - precioCompra) / precioCompra) * 100).toFixed(2))
    : 0

  return {
    ...producto,
    codOrig: producto.codOrig ?? producto.codigo,
    descripcion: producto.descripcion ?? `Producto ${producto.nombre.toLowerCase()}.`,
    peso: producto.peso ?? 0,
    pesoUnidad: producto.pesoUnidad ?? "Kilogramos",
    familia: producto.familia ?? producto.marca,
    subFamilia: producto.subFamilia ?? "General",
    stockMin: producto.stockMin ?? 0,
    stockMax: producto.stockMax ?? Math.max(producto.stock * 2, 10),
    desc1: producto.desc1 ?? 0,
    desc2: producto.desc2 ?? 0,
    descMax: producto.descMax ?? 0,
    origen: producto.origen ?? "Producto Nacional",
    garantia: producto.garantia ?? "12 meses",
    afectacion: producto.afectacion ?? "Gravado - Operación Onerosa",
    detalle: producto.detalle ?? "Sin observaciones adicionales.",
    precioCompra,
    utilidad,
  }
}

export default function Page() {
  const [productos, setProductos] = useState<Producto[]>(() =>
    (productosMock as Producto[]).map(completarProducto)
  )
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewProducto, setViewProducto] = useState<Producto | null>(null)
  const [fichaTecnicaProducto, setFichaTecnicaProducto] = useState<Producto | null>(null)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  useEffect(() => {
    const handleAdded = (e: Event) => {
      const customEvent = e as CustomEvent<Producto>
      if (customEvent.detail) {
        setProductos((prev) => [customEvent.detail, ...prev])
      }
    }
    window.addEventListener("producto-added" as any, handleAdded)
    return () => window.removeEventListener("producto-added" as any, handleAdded)
  }, [])

  // Extraemos toda la lógica cerebro para manejar filtros, paginado, etc.
  const {
    filteredData,
    pendingFilters,
    setFilterValue,
    applyFilters,
    resetFilters,
    pageIndex,
    setPageIndex,
  } = useProductos(productos)

  // Opciones de filtrado de estado para el select
  const selectOptions = useMemo(() => [
    { label: "Todos los productos", value: "todos" },
    { label: "Activos", value: "Activo" },
    { label: "Inactivos", value: "Inactivo" },
  ], [])

  // Calcular la data de estados para el PieChart del Dashboard
  const estadoData = useMemo(() => {
    const activos = productos.filter((p) => p.estado === "Activo").length
    const inactivos = productos.filter((p) => p.estado === "Inactivo").length
    return [
      { name: "Activos", value: activos, color: "#3b82f6" },
      { name: "Inactivos", value: inactivos, color: "#9ca3af" },
    ]
  }, [productos])

  // Calcular la data de marcas para el BarChart del Dashboard (totalmente dinámico)
  const barData = useMemo(() => {
    const counts: Record<string, number> = {}
    productos.forEach((p) => {
      const key = p.marca.toUpperCase()
      counts[key] = (counts[key] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [productos])

  const handleNewProduct = () => {
    setSelectedProducto(null)
    setIsModalOpen(true)
  }

  const handleSave = (data: Omit<Producto, "id"> & { id?: string }) => {
    if (data.id) {
      // Editar
      setProductos((prev) =>
        prev.map((p) => (p.id === data.id ? (data as Producto) : p))
      )
      showToast("Producto actualizado con éxito", 1)
    } else {
      // Crear
      const newProduct: Producto = {
        ...data,
        id: String(Date.now()),
        fechaRegistro: "07-07-2026", // Fecha de hoy por defecto
      }
      setProductos((prev) => [newProduct, ...prev])
      showToast("Producto creado con éxito", 1)
    }
  }

  const columns = useMemo(
    () =>
      getProductosColumns(
        (prod) => setViewProducto(prod),
        (prod) => {
          setSelectedProducto(prod)
          setIsModalOpen(true)
        },
        (id) => {
          setProductos((prev) =>
            prev.map((p) => (p.id === id && p.estado === "Activo" ? { ...p, estado: "Inactivo" } : p))
          )
          showToast("Producto desactivado correctamente", 1)
        },
        (prod) => setFichaTecnicaProducto(prod)
      ),
    [productos]
  )

  const productoDetailFields = viewProducto
    ? [
        { label: "Código", value: viewProducto.codigo },
        { label: "Cod. Orig.", value: viewProducto.codOrig },
        { label: "Nombre", value: viewProducto.nombre, fullWidth: true },
        { label: "Descripción", value: viewProducto.descripcion, fullWidth: true },
        { label: "Marca", value: viewProducto.marca },
        { label: "Estado", value: viewProducto.estado },
        { label: "Peso", value: viewProducto.peso ? `${viewProducto.peso} ${viewProducto.pesoUnidad ?? ""}` : undefined },
        { label: "Unidad de medida", value: viewProducto.unidad },
        { label: "Familia", value: viewProducto.familia },
        { label: "Subfamilia", value: viewProducto.subFamilia },
        { label: "Stock", value: viewProducto.stock },
        { label: "Stock mínimo", value: viewProducto.stockMin },
        { label: "Stock máximo", value: viewProducto.stockMax },
        { label: "Precio nacional", value: `S/ ${viewProducto.precioNacional.toLocaleString("es-PE", { minimumFractionDigits: 2 })}` },
        { label: "Precio de compra", value: `S/ ${(viewProducto.precioCompra ?? 0).toLocaleString("es-PE", { minimumFractionDigits: 2 })}` },
        { label: "Desc. 1", value: viewProducto.desc1 === undefined ? undefined : `${viewProducto.desc1}%` },
        { label: "Desc. 2", value: viewProducto.desc2 === undefined ? undefined : `${viewProducto.desc2}%` },
        { label: "Desc. máximo", value: viewProducto.descMax === undefined ? undefined : `${viewProducto.descMax}%` },
        { label: "Origen", value: viewProducto.origen },
        { label: "Utilidad", value: viewProducto.utilidad === undefined ? undefined : `${viewProducto.utilidad}%` },
        {
          label: "panel-utilidad",
          fullWidth: true,
          bare: true,
          value: (
            <UtilityCalculator
              variant="producto"
              precioBase={viewProducto.precioNacional}
              precioCompra={viewProducto.precioCompra}
              utilidad={viewProducto.utilidad ?? 0}
              readOnly
              alwaysVisible
            />
          ),
        },
        { label: "Garantía", value: viewProducto.garantia },
        { label: "Afectación", value: viewProducto.afectacion },
        { label: "Fecha", value: viewProducto.fechaRegistro },
        { label: "Detalle", value: viewProducto.detalle, fullWidth: true },
      ]
    : []

  const totalEntries = filteredData.length
  const pageSize = 10
  const pageCount = Math.ceil(totalEntries / pageSize)

  return (
    <main className="flex flex-col gap-6 w-full font-sans [&_input]:rounded-none! [&_select]:rounded-none!">
      {/* Sección del Resumen del Dashboard (Sin bordes redondeados y sin sombras) */}
      <DashboardResumen
        titulo="Resumen de Julio 2026"
        totalLabel="Productos"
        totalCount={productos.length}
        estadoData={estadoData}
        barData={barData}
        barLabel="Marcas con más productos"
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
                  Producto ({filteredData.length})
                </span>
              </button>
            </div>
            
            <div className="pb-1 flex items-center gap-1.5">
              <ActionButton
                icon={<i className="fa fa-upload text-[13px]" />}
                className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white w-8 h-8 rounded-[4px] cursor-pointer"
                label="Subir"
                onClick={() => setIsImportModalOpen(true)}
              />
              <ActionButton
                icon={<i className="fa fa-download text-[13px]" />}
                isPopover={true}
                popoverOptions={[
                  {
                    label: "Exportar todo",
                    onClick: () => showToast("Exportando todos los productos...", 1),
                  },
                  {
                    label: "Exportar seleccionados",
                    onClick: () => showToast("Exportando productos seleccionados...", 1),
                  },
                ]}
                className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white w-8 h-8 rounded-[4px] cursor-pointer"
                label="Descargar"
                popoverClassName="min-w-[200px]"
              />
              <ActionButton
                icon={<i className="fa fa-plus text-[13px]" />}
                className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white w-8 h-8 rounded-[4px] cursor-pointer"
                label="Agregar Producto"
                onClick={handleNewProduct}
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

            {/* Tabla DataTable (con paginación interna deshabilitada) */}
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

      {/* Modal para Agregar/Editar Producto */}
      <ProductoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        producto={selectedProducto}
      />

      <ReadOnlyDetailModal
        isOpen={viewProducto !== null}
        onClose={() => setViewProducto(null)}
        title="Ver Producto"
        iconClass="fa fa-cube"
        fields={productoDetailFields}
        imageUrl={viewProducto?.imagen}
        imageAlt={`Imagen de ${viewProducto?.nombre ?? "producto"}`}
      />

      <FichaTecnicaModal
        isOpen={fichaTecnicaProducto !== null}
        onClose={() => setFichaTecnicaProducto(null)}
        nombre={fichaTecnicaProducto?.nombre ?? ""}
        fichaTecnicaUrl={fichaTecnicaProducto?.fichaTecnicaUrl}
      />

      <ImportFileModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(file) => showToast(`Archivo ${file.name} listo para importar.`, 1)}
      />
    </main>
  )
}
