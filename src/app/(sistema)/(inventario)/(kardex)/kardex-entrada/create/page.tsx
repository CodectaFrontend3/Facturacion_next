"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/app/(sistema)/garantia/components/cards-info/button-action";
import { useRouter } from "next/navigation";

interface ProductoRow {
  id: number;
  idProducto: string;
  unidad: string;
  cantidad: string;
  precio: string;
  total: string;
}

export default function GenerarKardexEntrada() {
  const [productos, setProductos] = useState<ProductoRow[]>([
    { id: 1, idProducto: "", unidad: "1", cantidad: "", precio: "", total: "" },
  ]);
  const router = useRouter();

  const agregarFila = () => {
    setProductos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        idProducto: "",
        unidad: "1",
        cantidad: "",
        precio: "",
        total: "",
      },
    ]);
  };

  const eliminarFila = (id: number) => {
    if (productos.length > 1) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  const updateFila = (id: number, field: keyof ProductoRow, value: string) => {
    setProductos(
      productos.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  return (
    <div className="w-full px-6 py-4 bg-[#fcfcfc] min-h-screen font-sans text-[#333]">
      <div className="w-full border border-gray-200 rounded-sm bg-white shadow-sm">
        {/* Cabecera */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-[13px] font-bold text-gray-700">
            Kardex de Entrada
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Button className="cursor-pointer" onClick={() => router.back()}>
              <X width={16} height={16} />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Fecha y Código de Almacén */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[12px] font-bold text-gray-700">
              22/06/2026
            </span>
            <span className="text-[12px] font-bold text-gray-700 bg-gray-50 px-2 py-0.5 border border-gray-200">
              ALM2 - 2
            </span>
          </div>

          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 mb-10">
            {/* --- SECCIÓN IZQUIERDA --- */}
            <div className="space-y-4">
              {/* Motivo */}
              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Motivo:
                </label>
                <select className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm">
                  <option value="">Seleccionar Motivo</option>
                </select>
              </div>

              {/* Tipo de Comprobante compuesto */}
              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Tipo de Comprobante:
                </label>
                <div className="flex-1 flex items-center gap-2">
                  <select className="w-44 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm">
                    <option value="">Sin Comprobante</option>
                  </select>
                  <label className="text-[12px] font-bold whitespace-nowrap px-1">
                    N° y Fecha:
                  </label>
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    className="flex-1 min-w-0 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] outline-none focus:border-blue-300 shadow-sm"
                  />
                </div>
              </div>

              {/* Tipo de Transporte */}
              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Tipo de transporte:
                </label>
                <select className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm">
                  <option value="">Escoge el tipo de Transporte</option>
                </select>
              </div>

              {/* Categoría */}
              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Categoría:
                </label>
                <input
                  type="text"
                  value="PRODUCTOS"
                  disabled
                  className="flex-1 bg-[#e9ecef] border border-gray-200 rounded-md px-3 py-1.5 text-[12px] text-gray-600 outline-none"
                />
              </div>

              {/* Fecha de compra */}
              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Fecha de compra:
                </label>
                <input
                  type="text"
                  placeholder="dd/mm/aaaa"
                  className="w-1/2 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] outline-none focus:border-blue-300 shadow-sm"
                />
              </div>
            </div>

            {/* --- SECCIÓN DERECHA --- */}
            <div className="space-y-4">
              {/* Proveedor */}
              <div className="flex items-center">
                <label className="w-24 text-[12px] font-bold shrink-0">
                  Proveedor:
                </label>
                <select className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm">
                  <option value="">J & P PERIFERICOS S.A.C.</option>
                </select>
              </div>

              {/* Moneda */}
              <div className="flex items-center">
                <label className="w-24 text-[12px] font-bold shrink-0">
                  Moneda:
                </label>
                <select className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm">
                  <option value="">Seleccionar Moneda</option>
                </select>
              </div>

              {/* Información */}
              <div className="flex items-center">
                <label className="w-24 text-[12px] font-bold shrink-0">
                  Información:
                </label>
                <input
                  type="text"
                  placeholder="Ingreso de productos al almacen"
                  className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] outline-none focus:border-blue-300 shadow-sm"
                />
              </div>

              {/* G. Remisión */}
              <div className="flex items-center">
                <label className="w-24 text-[12px] font-bold shrink-0">
                  G. Remisión:
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] outline-none focus:border-blue-300 shadow-sm"
                />
              </div>

              {/* Archivo */}
              <div className="flex items-center">
                <label className="w-24 text-[12px] font-bold shrink-0">
                  Archivo:
                </label>
                <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-md px-3 py-1.5 bg-white shadow-sm">
                  <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-[11px] px-2 py-0.5 rounded-sm cursor-pointer">
                    Seleccionar archivo
                  </button>
                  <span className="text-[11px] text-gray-400 truncate">
                    Ningún archivo seleccionado
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA DE PRODUCTOS - CORREGIDA EN DISPOSICIÓN */}
          <div className="relative">
            {/* Cabecera Elástica */}
            <div className="flex gap-4 items-center mb-4 border-b border-gray-100 pb-2">
              <div className="w-8 flex justify-center">
                <button
                  onClick={agregarFila}
                  className="bg-gray-100 border border-gray-300 text-gray-600 p-1 rounded-sm hover:bg-gray-200 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Estructura idéntica de anchos fijos a la derecha y elástico a la izquierda */}
              <div className="flex-1 flex gap-4 text-[12px] font-bold text-gray-700 px-1">
                <div className="flex-1 pl-1">Producto</div>
                <div className="w-20 text-center shrink-0">Unidad</div>
                <div className="w-24 text-center shrink-0">Cantidad</div>
                <div className="w-24 text-center shrink-0">Precio</div>
                <div className="w-28 text-center shrink-0">Total</div>
              </div>
            </div>

            {/* Listado de Filas */}
            <div className="space-y-4">
              {productos.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-4 items-center animate-in fade-in duration-300"
                >
                  <button
                    onClick={() => eliminarFila(p.id)}
                    className="bg-[#1A5EB3] text-white p-1.5 rounded-sm hover:opacity-90 transition-colors disabled:opacity-30"
                    disabled={productos.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex-1 flex gap-4 items-center">
                    {/* Producto (Toma dinámicamente todo el espacio que sobra) */}
                    <div className="flex-1">
                      <select
                        value={p.idProducto}
                        onChange={(e) =>
                          updateFila(p.id, "idProducto", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm text-gray-500"
                      >
                        <option value="">Seleccionar Producto</option>
                      </select>
                    </div>

                    {/* Unidad (Ancho Fijo) */}
                    <div className="w-20 shrink-0">
                      <input
                        type="text"
                        value={p.unidad}
                        onChange={(e) =>
                          updateFila(p.id, "unidad", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] text-center outline-none focus:border-blue-300 shadow-sm"
                      />
                    </div>

                    {/* Cantidad (Ancho Fijo) */}
                    <div className="w-24 shrink-0">
                      <input
                        type="text"
                        value={p.cantidad}
                        onChange={(e) =>
                          updateFila(p.id, "cantidad", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] text-center outline-none focus:border-blue-300 shadow-sm"
                      />
                    </div>

                    {/* Precio (Ancho Fijo) */}
                    <div className="w-24 shrink-0">
                      <input
                        type="text"
                        value={p.precio}
                        onChange={(e) =>
                          updateFila(p.id, "precio", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] text-center outline-none focus:border-blue-300 shadow-sm"
                      />
                    </div>

                    {/* Total (Ancho Fijo) */}
                    <div className="w-28 shrink-0">
                      <input
                        type="text"
                        value={p.total}
                        disabled
                        className="w-full border border-transparent rounded-md px-2 py-1.5 text-[12px] bg-[#e9ecef] text-center text-gray-600 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="mt-10 flex justify-end">
            <button className="bg-[#1A5EB3] text-white px-8 py-1.5 rounded-sm text-[12px] font-medium hover:opacity-95 transition-all shadow-sm">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
