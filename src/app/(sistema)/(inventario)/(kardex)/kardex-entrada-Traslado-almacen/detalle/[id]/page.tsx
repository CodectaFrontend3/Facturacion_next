"use client";

import { useParams, useRouter } from "next/navigation";
import TrasladoProducto from "../../../../data/TrasladoProducto.json";
import { KardexTrasladoRow } from "@/app/(sistema)/(inventario)/types/kardex";
import { X } from "lucide-react";

const data = TrasladoProducto as unknown as KardexTrasladoRow[];

function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const registro = data.find((item) => item.id === id);

  if (!registro) {
    return (
      <div className="p-6 text-center text-slate-500 font-medium relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
        Registro de Kardex no encontrado (ID: {id})
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 font-sans text-[#334155] relative">
      {/* 1. SECCIÓN DE CABECERA (Info de Traslado + Bloque RUC) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-6 gap-4">
        {/* Lado Izquierdo: Datos de control verticales según imagen */}
        <div className="text-[12px] text-slate-700 leading-relaxed">
          <p className="text-slate-600 font-medium">Traslado de:</p>
          <p className="flex items-center gap-1 font-bold text-slate-700 pl-0.5">
            <span className="text-[13px] font-normal">👤</span> Demo
          </p>
          <p className="text-slate-500">
            Alamacén Emisor:{" "}
            <span className="font-semibold text-slate-700">
              {registro.almacen_origen}
            </span>
          </p>
          <p className="text-slate-500">
            Alamacén Receptor:{" "}
            <span className="font-semibold text-slate-700">
              {registro.almacen_destino}
            </span>
          </p>
          <p className="text-slate-400 flex items-center gap-1 mt-0.5">
            <span>🕒</span> {registro.fecha_traslado || "2022-03-17 21:28:54"}
          </p>
        </div>

        {/* Lado Derecho: Recuadro Informativo */}
        <div className="border border-gray-200 rounded p-4 min-w-[280px] text-center bg-white shadow-2xs relative">
          {/* Botón X para regresar */}
          <button
            onClick={() => router.back()}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-all cursor-pointer"
            title="Regresar"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          <p className="text-[12px] font-bold text-slate-700 tracking-wide pt-1">
            RUC : 20522045773
          </p>
          <h2 className="text-[18px] font-light text-slate-400 mt-1 uppercase tracking-wide">
            {registro.codigo}
          </h2>
          <p className="text-[11px] font-bold text-[#00A86B] uppercase mt-1">
            GUÍA DE TRASLADO
          </p>
        </div>
      </div>

      {/* 2. TABLA DE PRODUCTOS TRASLADADOS */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px] border-collapse">
          <thead>
            <tr className="text-slate-700 font-bold border-b border-gray-200">
              <th className="py-3 px-2 w-2/12">Código</th>
              <th className="py-3 px-2 w-8/12">Nombre/Descripción</th>
              <th className="py-3 px-2 text-right w-2/12">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {registro.productos && registro.productos.length > 0 ? (
              registro.productos.map((producto) => (
                <tr
                  key={producto.id}
                  className="border-b border-gray-100 hover:bg-slate-50/80 transition-colors bg-white"
                >
                  <td className="py-3 px-2 text-slate-600 font-medium">
                    {producto.id.toUpperCase()}
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    {producto.nombre}/{producto.id.toUpperCase()} DETALLE
                  </td>
                  <td className="py-3 px-2 text-right font-medium text-slate-700">
                    {producto.cantidad}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-center text-slate-400 italic"
                >
                  No hay productos en este traslado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
