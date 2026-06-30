"use client"

import React, { useState, useMemo, useCallback } from "react"
import articulosMock from "../../data/articulo-mock.json"

interface ArticuloSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (articleId: string, cantidad: number) => void
}

const PAGE_SIZE = 10

/**
 * ArticuloRow: Componente optimizado para cada fila.
 * Evita re-renders innecesarios de toda la tabla.
 */
const ArticuloRow = React.memo(({ 
  articulo, 
  cantidad, 
  onCantidadChange, 
  onAdd 
}: { 
  articulo: any, 
  cantidad: number, 
  onCantidadChange: (id: number, val: number) => void,
  onAdd: (id: string, qty: number) => void
}) => (
  <tr
    className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
    onClick={() => onAdd(String(articulo.id), cantidad)}
  >
    <td className="py-2.5 px-2 text-[#676a6c]">{articulo.id}</td>
    <td className="py-2.5 px-2 text-[#676a6c]">{articulo.codigo} | {articulo.codigo}</td>
    <td className="py-2.5 px-2 text-[#676a6c]">{articulo.nombre}</td>
    <td className="py-2.5 px-2 text-center text-[#676a6c]">{articulo.stock}</td>
    <td className="py-2.5 px-2 text-center">
      <input
        type="number"
        className="w-16 border border-gray-300 rounded-sm px-1 py-1 text-center text-[13px] text-[#676a6c] focus:outline-none focus:border-blue-400"
        value={cantidad}
        min={1}
        onClick={e => e.stopPropagation()}
        onChange={e => onCantidadChange(articulo.id, Math.max(1, Number(e.target.value)))}
      />
    </td>
    <td className="py-2.5 px-2 text-right text-[#676a6c]">S/ {articulo.precio.toFixed(2)}</td>
    <td className="py-2.5 px-2 text-right text-[#676a6c]">
      S/ {(articulo.precio * cantidad).toFixed(2)}
    </td>
  </tr>
))

ArticuloRow.displayName = "ArticuloRow"

export function ArticuloSelectorModal({ isOpen, onClose, onAdd }: ArticuloSelectorModalProps) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [cantidades, setCantidades] = useState<Record<number, number>>({})

  // Optimización 1: Filtrado con useMemo
  const filtered = useMemo(() => {
    return articulosMock.filter(a =>
      a.nombre.toLowerCase().includes(search.toLowerCase()) ||
      a.codigo.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  // Optimización 2: Paginación calculada
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const safePage = Math.min(currentPage, totalPages || 1)
  
  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, safePage])

  // Callbacks memorizados
  const handleSearchChange = useCallback((val: string) => {
    setSearch(val)
    setCurrentPage(1)
  }, [])

  const handleCantidadChange = useCallback((id: number, val: number) => {
    setCantidades(prev => ({ ...prev, [id]: val }))
  }, [])

  // Nueva función para limpiar todo antes de cerrar
  const handleInternalClose = () => {
    setSearch("")
    setCurrentPage(1)
    setCantidades({})
    onClose()
  }

  if (!isOpen) return null

  const pageStart = (safePage - 1) * PAGE_SIZE

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 animate-in fade-in duration-200">
      <div className="bg-white rounded-md shadow-xl w-[95vw] max-w-[1250px] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <span className="text-[16px] font-extrabold text-[#4f566b]">Agregado Rápido de Artículos</span>
          <button onClick={handleInternalClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
        </div>

        {/* Búsqueda */}
        <div className="px-6 pt-5 pb-2 flex-shrink-0">
          <input
            type="text"
            placeholder="Buscar por código o nombre del producto o Servicio"
            className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] focus:outline-none focus:border-blue-400 "
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
          />
          <p className="text-[11px] text-gray-400 mt-1 ms-4 uppercase">Filtrado por Producto o Servicio</p>
        </div>

        {/* Tabla */}
        <div className="px-10 py-2 overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-[12px] text-left border-collapse">
            <thead>
              <tr className="border-t border-b border-gray-200 text-[#676a6c] font-bold sticky top-0 bg-white z-10">
                <th className="py-2.5 px-2 text-left font-extrabold text-[#676a6c] text-[12px] tracking-wide">ID</th>
                <th className="py-2.5 px-2 text-left font-extrabold text-[#676a6c] text-[12px] tracking-wide">CÓDIGO</th>
                <th className="py-2.5 px-2 text-left font-extrabold text-[#676a6c] text-[12px] tracking-wide">ARTÍCULO</th>
                <th className="py-2.5 px-2 text-center font-extrabold text-[#676a6c] text-[12px] tracking-wide">STOCK</th>
                <th className="py-2.5 px-2 text-center font-extrabold text-[#676a6c] text-[12px] tracking-wide">CANTIDAD</th>
                <th className="py-2.5 px-2 text-right font-extrabold text-[#676a6c] text-[12px] tracking-wide">PRECIO U.</th>
                <th className="py-2.5 px-2 text-right font-extrabold text-[#676a6c] text-[12px] tracking-wide">PRECIO TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(a => (
                <ArticuloRow 
                  key={a.id}
                  articulo={a}
                  cantidad={cantidades[a.id] || 1}
                  onCantidadChange={handleCantidadChange}
                  onAdd={onAdd}
                />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-gray-400 italic">No se encontraron artículos.</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-shrink-0 relative bg-white">
          <span className="text-[13px] text-[#4f566b]">
            Ver {filtered.length === 0 ? 0 : pageStart + 1} a {Math.min(pageStart + PAGE_SIZE, filtered.length)} de {filtered.length} entradas
          </span>

          {totalPages > 1 && (
            <div className="flex items-center absolute left-1/2 -translate-x-1/2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="h-9 px-4 text-[13px] border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-[#676a6c] bg-white transition-colors"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-9 text-[13px] border border-gray-300 -ml-px transition-colors
                    ${page === safePage ? "bg-[#2C1FF3] text-white z-10" : "bg-white text-[#676a6c] hover:bg-gray-50"}
                  `}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="h-9 px-4 text-[13px] border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-[#676a6c] bg-white transition-colors -ml-px"
              >
                Siguiente
              </button>
            </div>
          )}

          <button
            onClick={handleInternalClose}
            className="bg-[#70757a] hover:bg-[#5a6268] text-white px-5 py-1.5 rounded-sm text-[13px] font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
