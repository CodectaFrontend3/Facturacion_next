"use client";

import { useParams, useRouter } from "next/navigation";
import DistribucionProducto from "../../../../data/DistribucionProducto.json";
import { KardexDistribucionRow } from "@/app/(sistema)/(inventario)/types/kardex";
import { X } from "lucide-react";

const data = DistribucionProducto as unknown as KardexDistribucionRow[];

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
      {/* 1. SECCIÓN DE CABECERA (Info Izquierda + Bloque RUC Derecha) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-6 gap-4">
        {/* Lado Izquierdo: Formato Vertical de Distribución */}
        <div className="text-[12px] text-slate-700 leading-relaxed">
          <p className="font-bold text-slate-800">Distribuido:</p>
          <p className="flex items-center gap-1 font-bold pl-0.5 text-slate-700">
            <span className="text-[13px] font-normal">👤</span> Demo
          </p>
          <p className="text-slate-500">
            De: <span className="font-semibold text-slate-700">2</span>
          </p>
          <p className="text-slate-500">
            Al:{" "}
            <span className="font-semibold text-slate-700">
              {registro.almacen}
            </span>
          </p>
        </div>

        {/* Lado Derecho: Recuadro Informativo de la Guía */}
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
            GUIA DE DISTRIBUCION
          </p>
        </div>
      </div>

      {/* 2. TABLA DE PRODUCTOS (Distribución) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px] border-collapse">
          <thead>
            <tr className="text-slate-700 font-bold border-b border-gray-200">
              <th className="py-3 px-2 w-2/12">Codigo</th>
              <th className="py-3 px-2 w-5/12">Nombre/Descripcion</th>
              <th className="py-3 px-2 text-center w-1.5/12">Unidad</th>
              <th className="py-3 px-2 text-right w-1.5/12">Cantidad</th>
              <th className="py-3 px-2 text-right w-2/12">Cantidad Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-slate-50/80 transition-colors bg-white">
              <td className="py-3 px-2 text-slate-600 font-medium">
                LN-000002
              </td>
              <td className="py-3 px-2 text-slate-600">
                TECLADO INALABRICO LENOVO/LN-000002 DETALLE
              </td>
              <td className="py-3 px-2 text-center text-slate-600">
                {registro.cantidad_productos}
              </td>
              <td className="py-3 px-2 text-right text-slate-600">
                {registro.cantidad_distribuida}
              </td>
              <td className="py-3 px-2 text-right font-medium text-slate-700">
                {Number(registro.cantidad_productos) *
                  Number(registro.cantidad_distribuida)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
