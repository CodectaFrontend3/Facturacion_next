"use client";

import { useParams, useRouter } from "next/navigation";
import SalidaProducto from "../../../../data/SalidaProducto.json";
import { KardexSalidaRow } from "@/app/(sistema)/(inventario)/types/kardex";
import { X } from "lucide-react";

const data = SalidaProducto as unknown as KardexSalidaRow[];

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
    <div className="w-full flex flex-col items-end gap-2">
      {/* Botón de cierre posicionado por encima del documento para no tapar la guía */}
      <button
        onClick={() => router.back()}
        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all cursor-pointer"
        title="Regresar"
      >
        <X size={20} strokeWidth={2.5} />
      </button>

      {/* Contenedor principal del documento */}
      <div className="w-full bg-white p-4 font-sans text-[#334155] border border-gray-100 rounded-lg shadow-2xs">
        {/* 1. SECCIÓN DE CABECERA (Bloque Informativo de Guía de Entrada/Salida a la Derecha) */}
        <div className="flex flex-col items-end w-full border-b border-gray-100 pb-4 mb-6">
          <div className="text-right text-[12px] text-slate-700 leading-tight space-y-0.5">
            <p className="text-slate-400 font-medium text-[13px]">
              Guía Entrada
            </p>
            <p className="text-[#00A86B] font-bold text-[15px] tracking-wide">
              GS-000{registro.id}
            </p>
            <p className="text-slate-400 pt-1">Para:</p>
            <p className="flex items-center justify-end gap-1 font-bold text-slate-700">
              <span>👤</span> Demo
            </p>
            <p className="text-slate-500 flex items-center justify-end gap-1">
              <span>🏢</span> Johan strauus 388
            </p>
            <p className="text-slate-500 flex items-center justify-end gap-1">
              <span>📞</span> 0133333333333 / 970102509
            </p>
            <p className="text-slate-700 font-medium pt-2">
              <span className="font-bold text-slate-800">
                Fecha de la factura:
              </span>{" "}
              {registro.fecha_salida} 16:22:17
            </p>
          </div>
        </div>

        {/* 2. BLOQUE HORIZONTAL DE METADATOS */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-[12px] mb-8 w-full">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <span className="text-slate-500 font-medium whitespace-nowrap min-w-[60px]">
              motivos:
            </span>
            <div className="bg-white text-slate-700 px-4 py-2.5 rounded border border-gray-200 w-full shadow-2xs">
              {registro.motivo}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-1/2">
            <span className="text-slate-500 font-medium whitespace-nowrap min-w-[90px]">
              Informaciones:
            </span>
            <div className="bg-white text-slate-700 px-4 py-2.5 rounded border border-gray-200 w-full shadow-2xs">
              {registro.informacion}
            </div>
          </div>
        </div>

        {/* 3. TABLA DE PRODUCTOS */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px] border-collapse">
            <thead>
              <tr className="text-slate-800 font-bold border-b border-gray-200">
                <th className="py-3 px-2 w-10/12 text-[13px]">Producto</th>
                <th className="py-3 px-2 text-right w-2/12 text-[13px]">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {registro.productos && registro.productos.length > 0 ? (
                registro.productos.map((producto) => (
                  <tr
                    key={producto.id}
                    className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors bg-white"
                  >
                    <td className="py-3 px-2 text-slate-700 font-semibold uppercase leading-normal">
                      <div>{producto.nombre.toUpperCase()}</div>
                      <span className="text-[10px] text-slate-400 font-medium tracking-wider block mt-0.5">
                        DETALLE
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-slate-700 text-[13px]">
                      {producto.cantidad}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="py-6 text-center text-slate-400 italic"
                  >
                    No hay productos registrados en esta salida.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
