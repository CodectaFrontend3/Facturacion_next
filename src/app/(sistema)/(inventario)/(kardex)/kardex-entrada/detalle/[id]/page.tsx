"use client";

import { useParams, useRouter } from "next/navigation";
import EntradaProducto from "../../../../data/EntradaProducto.json";
import { KardexEntradaRow } from "@/app/(sistema)/(inventario)/types/kardex";
import { X } from "lucide-react";

const data = EntradaProducto as KardexEntradaRow[];

function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const registro = data.find((item) => item.id === id);

  if (!registro) {
    return (
      <div className="p-6 text-center text-slate-500 font-medium relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>
        Registro de Kardex no encontrado (ID: {id})
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-4 font-sans text-[#334155] relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-6 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[#0052CC] font-bold text-4xl tracking-wide">
            <span className="border-4 border-[#0052CC] rounded-full w-11 h-11 flex items-center justify-center text-3xl">
              G
            </span>
            ESENER
          </div>
          <span className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-semibold pl-1">
            Smart Energy
          </span>
        </div>

        <div className="border border-gray-200 rounded p-4 min-w-[280px] text-center bg-white shadow-2xs relative group">
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
            {registro.motivo}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px] mb-8">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium whitespace-nowrap">
            Motivos:
          </span>
          <div className="bg-[#EFEFEF] text-slate-700 px-3 py-2 rounded w-full border border-gray-200">
            {registro.motivo}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium whitespace-nowrap">
            Almacén:
          </span>
          <div className="bg-[#EFEFEF] text-slate-700 px-3 py-2 rounded w-full border border-gray-200">
            Almacen Principal
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium whitespace-nowrap">
            Moneda:
          </span>
          <div className="bg-[#EFEFEF] text-slate-700 px-3 py-2 rounded w-full border border-gray-200">
            {registro.moneda}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded">
        <table className="w-full text-left text-[12px] border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] text-slate-700 font-bold border-b border-gray-200">
              <th className="py-3 px-4 w-7/12">Producto</th>
              <th className="py-3 px-4 text-right w-1.5/12">Cantidad</th>
              <th className="py-3 px-4 text-right w-1.5/12">Precio</th>
              <th className="py-3 px-4 text-right w-2/12 bg-[#EFEFEF]/50">
                Precio Total
              </th>
            </tr>
          </thead>
          <tbody>
            {(registro?.productos || []).length > 0 ? (
              registro.productos?.map((producto, index) => (
                <tr
                  key={producto.id}
                  className={`border-b border-gray-100 hover:bg-slate-50/80 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                  }`}
                >
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {producto.nombre}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-600">
                    {producto.cantidad}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-600">
                    {producto.precio.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-700 bg-[#EFEFEF]/20">
                    {producto.total.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-6 text-center text-slate-400 italic"
                >
                  No hay productos registrados en esta entrada.
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
