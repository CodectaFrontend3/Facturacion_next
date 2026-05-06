"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import cotizacionData from "@/app/servicio-tecnico/data/cotizacionData.json";
import {
  ArrowLeft,
  Share2,
  FileText,
  Printer,
  Mail,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";

export default function DetalleCotizacion({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  // Este estado ahora controla la visibilidad de la barra blanca (segunda imagen)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const { id } = use(params);
  const targetId = Number(id);

  const cotizacion = cotizacionData.find((item) => item.id === targetId);

  if (!cotizacion) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-4">
        <p className="uppercase font-bold text-gray-400">
          Cotización no encontrada
        </p>
        <button
          onClick={() => router.back()}
          className="text-blue-500 underline text-sm"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full font-sans text-[#333]">
      {/* 1. BARRA SUPERIOR GRIS (Navegación Fija) */}
      <div className="w-full bg-[#f8f9fa] border-b border-gray-200 px-4 py-2 flex justify-between items-center text-gray-500 sticky top-0 z-20">
        <ArrowLeft
          size={18}
          className="cursor-pointer hover:text-gray-800 transition-colors"
          onClick={() => router.back()}
        />

        <div className="flex gap-4 items-center">
          <div
            className="cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => setIsHeaderVisible(!isHeaderVisible)}
          >
            {isHeaderVisible ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          <X
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => router.back()}
          />
        </div>
      </div>

      {/* 2. BARRA BLANCA (Esta es la parte que se oculta/muestra) */}
      {isHeaderVisible && (
        <div className="w-full px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-9 z-10 animate-in slide-in-from-top-full duration-300">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              {cotizacion.numero}
            </h2>
            <p className="text-xs font-bold text-gray-600">
              R.U.C : 20522045773
            </p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
            <h1 className="text-4xl font-extralight tracking-[0.4em] text-gray-300 uppercase">
              Cotización
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-600"
              onClick={() => router.back()}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

            <div className="flex gap-2">
              <button className="p-2 bg-[#6c757d] text-white rounded hover:bg-[#5a6268]">
                <Share2 size={18} />
              </button>
              <button className="p-2 bg-[#007bff] text-white rounded hover:bg-[#0069d9]">
                <FileText size={18} />
              </button>
              <button className="p-2 bg-[#007bff] text-white rounded hover:bg-[#0069d9]">
                <Printer size={18} />
              </button>
              <button className="p-2 bg-[#6c757d] text-white rounded hover:bg-[#5a6268]">
                <Mail size={18} />
              </button>
              <button className="p-2 bg-[#008000] text-white rounded hover:bg-[#006400]">
                <svg
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTENIDO (Siempre visible) */}
      <div className="w-full px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-10">
          <div className="border border-gray-200 rounded p-6 relative">
            <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
              Contacto Cliente
            </h3>
            <div className="space-y-2 text-[13px]">
              <p>
                <span className="font-bold">Señor(es):</span>{" "}
                {cotizacion.cliente}
              </p>
              <div className="flex gap-12">
                <p>
                  <span className="font-bold">RUC :</span> {cotizacion.ruc_dni}
                </p>
                <p>
                  <span className="font-bold text-gray-800">Fecha:</span>{" "}
                  {cotizacion.fecha_emision} 02:25:52
                </p>
              </div>
              <p>
                <span className="font-bold">Dirección:</span> Lima
              </p>
              <div className="flex gap-10">
                <p>
                  <span className="font-bold">Teléfono:</span> 00000
                </p>
                <p>
                  <span className="font-bold">Celular:</span> 0000000
                </p>
              </div>
              <div className="flex gap-10">
                <p>
                  <span className="font-bold">F. Vencimiento:</span> 18-05-2026
                </p>
                <p>
                  <span className="font-bold">Días restantes:</span> 13 días
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded p-6 relative">
            <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
              Condiciones Generales
            </h3>
            <div className="space-y-2 text-[13px]">
              <p>
                <span className="font-bold">Forma De Pago:</span>{" "}
                {cotizacion.forma_pago || "Credito"}
              </p>
              <p>
                <span className="font-bold">Validez :</span> 7 DIAS
              </p>
              <p>
                <span className="font-bold">Garantía :</span> 6 MESES
              </p>
              <p>
                <span className="font-bold">Tipo de Moneda:</span> soles
              </p>
            </div>
          </div>
        </div>

        <p className="text-[13px] mb-8">
          <span className="font-bold">Observaciones:</span> Emitimos la
          siguiente Cotizacion a vuestra solicitud
        </p>

        {/* TABLA DE ITEMS */}
        <table className="w-full mb-16 text-left border-collapse">
          <thead>
            <tr className="border-y border-gray-200 text-[11px] font-bold text-gray-500 uppercase">
              <th className="py-3 px-1">ITEM</th>
              <th className="py-3 px-1">Código</th>
              <th className="py-3 px-1">Descripción</th>
              <th className="py-3 px-1 text-center">Cantidad</th>
              <th className="py-3 px-1 text-right">P. Unitario</th>
              <th className="py-3 px-1 text-right">P. Total</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700">
            {cotizacion.items?.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-50">
                <td className="py-4 px-1">{item.item}</td>
                <td className="py-4 px-1">{item.codigo}</td>
                <td className="py-4 px-1">{item.descripcion}</td>
                <td className="py-4 px-1 text-center">{item.cantidad}</td>
                <td className="py-4 px-1 text-right">{item.precio_unitario}</td>
                <td className="py-4 px-1 text-right font-medium">
                  {item.precio_total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALES Y BANCOS */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="w-full lg:w-2/3">
            <p className="font-bold text-[13px] mb-12 uppercase text-gray-700">
              Son : {cotizacion.total_letras}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-100 rounded p-4 text-center shadow-sm">
                <div className="bg-[#00a34d] text-white py-1 px-3 text-[11px] font-bold inline-block mb-3 italic">
                  Interbank
                </div>
                <p className="text-[10px] font-bold text-gray-600 uppercase">
                  Cta C. $:{" "}
                  <span className="font-normal text-gray-800 tracking-tighter">
                    121-3233-2323232
                  </span>
                </p>
              </div>
              <div className="border border-gray-100 rounded p-4 text-center shadow-sm">
                <p className="text-[#ec1c24] font-black text-sm mb-3 italic">
                  Scotiabank
                </p>
                <p className="text-[10px] font-bold text-gray-600 uppercase">
                  Cta C. S/:{" "}
                  <span className="font-normal text-gray-800 tracking-tighter">
                    231456987
                  </span>
                </p>
              </div>
              <div className="border border-gray-100 rounded p-4 text-center shadow-sm">
                <p className="text-[#004481] font-bold text-xs mb-3 uppercase">
                  BBVA <span className="font-light italic">Continental</span>
                </p>
                <p className="text-[10px] font-bold text-gray-600 uppercase">
                  Cta C. S/:{" "}
                  <span className="font-normal text-gray-800 tracking-tighter">
                    651247856997
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 border border-gray-200 divide-y divide-gray-100">
            <div className="flex justify-between p-2.5 text-xs text-gray-500 uppercase">
              <span>Subtotal:</span> <span>S/ 100.00</span>
            </div>
            <div className="flex justify-between p-2.5 text-xs text-gray-500 uppercase">
              <span>Op. Gravada:</span> <span>S/ 100.00</span>
            </div>
            <div className="flex justify-between p-2.5 text-xs text-gray-500 uppercase">
              <span>I.G.V. (18%):</span> <span>S/ 18.00</span>
            </div>
            <div className="flex justify-between p-2.5 font-bold text-sm text-gray-800 bg-gray-50 uppercase tracking-tighter">
              <span>Importe Total:</span>
              <span>{cotizacion.importe_total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
