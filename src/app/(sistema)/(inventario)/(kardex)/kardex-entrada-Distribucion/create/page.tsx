"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/app/(sistema)/garantia/components/cards-info/button-action";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

interface DistribucionRow {
  id: number;
  idProducto: string;
  stock: string;
  unidades: string;
  cantidad: string;
  total: string;
}

export default function GenerarKardexDistribucion() {
  const [productos, setProductos] = useState<DistribucionRow[]>([
    {
      id: 1,
      idProducto: "",
      stock: "",
      unidades: "1",
      cantidad: "",
      total: "",
    },
  ]);
  const [generarGuia, setGenerarGuia] = useState(false);
  const router = useRouter();

  const agregarFila = () => {
    setProductos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        idProducto: "",
        stock: "",
        unidades: "1",
        cantidad: "",
        total: "",
      },
    ]);
  };

  const eliminarFila = (id: number) => {
    if (productos.length > 1) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  const updateFila = (
    id: number,
    field: keyof DistribucionRow,
    value: string,
  ) => {
    setProductos(
      productos.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  return (
    <div className="w-full px-6 py-4 bg-[#fcfcfc] min-h-screen font-sans text-[#333]">
      <div className="w-full border border-gray-200 rounded-sm bg-white shadow-sm">
        {/* Cabecera Principal */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-[13px] font-bold text-gray-700">
            Kardex de Distribucion
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Button className="cursor-pointer" onClick={() => router.back()}>
              <X width={16} height={16} />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Fecha y Switch de Guía de Remisión */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[12px] font-bold text-gray-700">
              22/06/2026
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-gray-600">
                Generar Guia de Remision
              </span>
              <Switch checked={generarGuia} onCheckedChange={setGenerarGuia} />
            </div>
          </div>

          {/* GRID DE ENTRADAS SUPERIORES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 mb-10">
            {/* --- SECCIÓN IZQUIERDA --- */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Motivo:
                </label>
                <select className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm text-gray-500">
                  <option value="">Selecciona motivo</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Punto partida:
                </label>
                <input
                  type="text"
                  className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] outline-none focus:border-blue-300 shadow-sm"
                />
              </div>

              <div className="flex items-center">
                <label className="w-36 text-[12px] font-bold shrink-0">
                  Categoría:
                </label>
                <select className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm text-gray-500">
                  <option value="">Selecciona categoria</option>
                </select>
              </div>
            </div>

            {/* --- SECCIÓN DERECHA --- */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-28 text-[12px] font-bold shrink-0">
                  Almacen:
                </label>
                <select className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] bg-white outline-none focus:border-blue-300 shadow-sm text-gray-500">
                  <option value="">Selecciona almacen</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="w-28 text-[12px] font-bold shrink-0">
                  Punto llegada:
                </label>
                <input
                  type="text"
                  className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] outline-none focus:border-blue-300 shadow-sm"
                />
              </div>

              <div className="flex items-start">
                <label className="w-28 text-[12px] font-bold shrink-0 pt-1.5">
                  Observaciones:
                </label>
                <textarea
                  rows={1}
                  className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 text-[12px] outline-none focus:border-blue-300 shadow-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN TABLA CON DISPOSICIÓN EXACTA (REPLICANDO TU CAPTURA MUESTRA) */}
          <div className="w-full mt-10">
            {/* Cabecera de la Tabla */}
            <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-2 w-full">
              {/* Botón agregar (Ancho exacto del botón de abajo) */}
              <div className="w-9 shrink-0 flex justify-center">
                <button
                  onClick={agregarFila}
                  className="bg-gray-100 border border-gray-300 text-gray-600 p-1 rounded-sm hover:bg-gray-200 transition-colors cursor-pointer inline-flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Contenedor flexible para alinear los encabezados con los inputs */}
              <div className="flex-1 flex gap-3 text-[12px] font-bold text-gray-700">
                <div className="flex-1 max-w-[45%] pl-1">Producto</div>
                <div className="flex-1">Stock</div>
                <div className="w-16 text-center shrink-0">Unidades</div>
                <div className="w-20 text-center shrink-0">Cantidad</div>
                <div className="w-24 text-center shrink-0">Total</div>
              </div>
            </div>

            {/* Filas de Productos */}
            <div className="space-y-3 w-full">
              {productos.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 animate-in fade-in duration-200 w-full"
                >
                  {/* Botón Eliminar */}
                  <div className="w-9 shrink-0 flex justify-center">
                    <button
                      onClick={() => eliminarFila(p.id)}
                      className="bg-[#1A5EB3] text-white p-1.5 rounded-sm hover:opacity-90 transition-colors disabled:opacity-30 cursor-pointer inline-flex items-center justify-center"
                      disabled={productos.length === 1}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Fila de inputs usando la misma estructura elástica que la cabecera */}
                  <div className="flex-1 flex gap-3 items-center">
                    {/* Producto (Ocupa hasta el 45% y se expande) */}
                    <div className="flex-1 max-w-[45%]">
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

                    {/* Stock (Toma el resto del espacio libre de la izquierda) */}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={p.stock}
                        disabled
                        className="w-full border border-transparent rounded-md px-3 py-1.5 text-[12px] bg-[#e9ecef] text-left text-gray-600 outline-none"
                      />
                    </div>

                    {/* Unidades (Ancho fijo alineado con la cabecera) */}
                    <div className="w-16 shrink-0">
                      <input
                        type="text"
                        value={p.unidades}
                        onChange={(e) =>
                          updateFila(p.id, "unidades", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] text-center outline-none focus:border-blue-300 shadow-sm"
                      />
                    </div>

                    {/* Cantidad (Ancho fijo alineado con la cabecera) */}
                    <div className="w-20 shrink-0">
                      <input
                        type="text"
                        value={p.cantidad}
                        onChange={(e) =>
                          updateFila(p.id, "cantidad", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[12px] text-center outline-none focus:border-blue-300 shadow-sm"
                      />
                    </div>

                    {/* Total (Ancho fijo al extremo derecho) */}
                    <div className="w-24 shrink-0">
                      <input
                        type="text"
                        value={p.total}
                        disabled
                        className="w-full border border-transparent rounded-md px-3 py-1.5 text-[12px] bg-[#e9ecef] text-left text-gray-600 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="mt-10 flex justify-end">
            <button className="bg-[#1A5EB3] text-white px-8 py-1.5 rounded-sm text-[12px] font-medium hover:opacity-95 transition-all shadow-sm cursor-pointer">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
