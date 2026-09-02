"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Printer, Mail, Truck } from "lucide-react";
import { GuiaRemisionManualRow } from "../page";

export default function DetalleGuiaRemisionManualPage() {
  const { id } = useParams();
  const router = useRouter();
  const [guia, setGuia] = useState<GuiaRemisionManualRow | null>(null);

  useEffect(() => {
    const guardadas: GuiaRemisionManualRow[] = JSON.parse(localStorage.getItem('guias_remision_manual_guardadas') || '[]');
    
    const mockData: GuiaRemisionManualRow[] = [
      {
        id: 1,
        nro: "TM01-00000003",
        rucDni: "20601234567",
        destinatario: "DISTRIBUIDORA COMERCIAL DEL SUR S.A.C.",
        puntoPartida: "Planta Industrial Lurín Km 36",
        puntoLlegada: "Almacén Central San Juan de Miraflores",
        emision: "14-07-2026",
        fechaTraslado: "15-07-2026",
        modalidad: "Transporte Privado"
      }
    ];

    const todasLasGuias = [...guardadas, ...mockData];
    const registroEncontrado = todasLasGuias.find(g => String(g.id) === String(id));
    
    if (registroEncontrado) {
      setGuia(registroEncontrado);
    }
  }, [id]);

  if (!guia) {
    return <div className="p-8 text-center text-gray-500">Cargando guía...</div>;
  }

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen p-4 font-sans text-[#333]">
      <div className="w-full bg-white border border-gray-200 shadow-sm relative overflow-hidden">
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <Link
            href="/comprobantes/guia_remision_manual"
            className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer p-1 inline-flex items-center justify-center hover:bg-gray-100 rounded-full"
            title="Regresar a Guías de Remisión Manuales"
          >
            <ArrowLeft size={18} />
          </Link>
          
          <div className="flex gap-1.5">
            <button className="bg-[#1c84c6] hover:bg-[#166b9a] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><FileText size={16} /></button>
            <button className="bg-[#1c84c6] hover:bg-[#166b9a] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><Printer size={16} /></button>
            <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><Mail size={16} /></button>
            <button className="bg-[#1ab394] hover:bg-[#18a689] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><i className="bi bi-whatsapp text-[15px]"></i></button>
          </div>
        </div>

        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 relative">
          <div className="z-10">
            <h2 className="text-[16px] font-bold text-gray-800">{guia.nro}</h2>
            <p className="text-[12px] font-bold text-gray-500">R.U.C : 20522045773 (REMITENTE)</p>
          </div>
          <div className="absolute left-0 w-full text-center z-0 pointer-events-none">
            <h1 className="text-[20px] font-light text-[#2C1FF3] tracking-wider">GUÍA DE REMISIÓN MANUAL - REMITENTE</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed">
              <h3 className="font-bold text-gray-700 uppercase border-b border-gray-100 pb-1 mb-2">Datos del Destinatario</h3>
              <p><span className="font-bold">Razón Social:</span> {guia.destinatario}</p>
              <p><span className="font-bold">R.U.C / Documento:</span> {guia.rucDni}</p>
              <p><span className="font-bold">Motivo de Traslado:</span> Traslado entre establecimientos</p>
              <p><span className="font-bold">Modalidad:</span> {guia.modalidad}</p>
            </div>
            
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed">
              <h3 className="font-bold text-gray-700 uppercase border-b border-gray-100 pb-1 mb-2">Datos del Envío Físico</h3>
              <p><span className="font-bold">Fecha de Emisión:</span> {guia.emision}</p>
              <p><span className="font-bold">Fecha Inicio de Traslado:</span> {guia.fechaTraslado}</p>
              <p><span className="font-bold">Peso Bruto Total (KGM):</span> 80.00</p>
              <p><span className="font-bold">Número de Bultos:</span> 5</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed bg-blue-50/20">
              <h3 className="font-bold text-[#1d59bc] uppercase border-b border-blue-100 pb-1 mb-2">Punto de Partida</h3>
              <p className="text-gray-700">{guia.puntoPartida}</p>
            </div>
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed bg-emerald-50/20">
              <h3 className="font-bold text-[#1ab394] uppercase border-b border-emerald-100 pb-1 mb-2">Punto de Llegada</h3>
              <p className="text-gray-700">{guia.puntoLlegada}</p>
            </div>
          </div>

          <div className="border border-gray-200 p-4 rounded-sm mb-6 text-[12px] leading-relaxed">
            <h3 className="font-bold text-gray-700 uppercase border-b border-gray-100 pb-1 mb-2">Datos de Transporte y Conductor</h3>
            <div className="grid grid-cols-3 gap-4">
              <div><span className="font-bold">Vehículo (Placa):</span> B7X-912</div>
              <div><span className="font-bold">Conductor:</span> Jorge Luis Sánchez</div>
              <div><span className="font-bold">Licencia de Conducir:</span> A98765432</div>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-8">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-y border-gray-200 text-gray-700 font-bold bg-white">
                  <th className="py-3 px-2 w-10">Item</th>
                  <th className="py-3 px-2 w-32">Código</th>
                  <th className="py-3 px-2">Descripción de Bienes Trasladados</th>
                  <th className="py-3 px-2 w-24">Unidad Medida</th>
                  <th className="py-3 px-2 w-20 text-right">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 text-gray-600">
                  <td className="py-3 px-2">1</td>
                  <td className="py-3 px-2">ART-MAN-01</td>
                  <td className="py-3 px-2">MERCADERÍA DIVERSA Y REPUESTOS EN CAJAS</td>
                  <td className="py-3 px-2">BX (Cajas)</td>
                  <td className="py-3 px-2 text-right font-bold">5.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-gray-200 p-4 rounded-sm mb-6 text-[12px]">
            <p className="font-bold text-gray-700 mb-1">Observaciones:</p>
            <p className="text-gray-600">Comprobante físico de contingencia / manual según resolución de SUNAT.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
