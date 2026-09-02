"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Printer, Mail, Truck } from "lucide-react";
import { GuiaRemisionRow } from "../page";

export default function DetalleGuiaRemisionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [guia, setGuia] = useState<GuiaRemisionRow | null>(null);

  useEffect(() => {
    const guardadas: GuiaRemisionRow[] = JSON.parse(localStorage.getItem('guias_remision_guardadas') || '[]');
    
    const mockData: GuiaRemisionRow[] = [
      {
        id: 1,
        nro: "T001-00000015",
        rucDni: "20100070031",
        destinatario: "VOLVO PERU S A",
        puntoPartida: "Av. República de Panamá 3545, San Isidro, Lima",
        puntoLlegada: "Carretera Central Km 18.5, Ate, Lima",
        emision: "15-07-2026",
        fechaTraslado: "16-07-2026",
        modalidad: "Transporte Privado"
      },
      {
        id: 2,
        nro: "T001-00000014",
        rucDni: "20522045773",
        destinatario: "CORPORACION LOGISTICA ANDINA S.A.C.",
        puntoPartida: "Almacén Central - Lima",
        puntoLlegada: "Sucursal Arequipa - Parque Industrial",
        emision: "12-07-2026",
        fechaTraslado: "13-07-2026",
        modalidad: "Transporte Público"
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
            href="/comprobantes/guia_remision"
            className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer p-1 inline-flex items-center justify-center hover:bg-gray-100 rounded-full"
            title="Regresar a Guías de Remisión"
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
            <h1 className="text-[20px] font-light text-[#2C1FF3] tracking-wider">GUÍA DE REMISIÓN ELECTRÓNICA - REMITENTE</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed">
              <h3 className="font-bold text-gray-700 uppercase border-b border-gray-100 pb-1 mb-2">Datos del Destinatario</h3>
              <p><span className="font-bold">Razón Social:</span> {guia.destinatario}</p>
              <p><span className="font-bold">R.U.C / Documento:</span> {guia.rucDni}</p>
              <p><span className="font-bold">Motivo de Traslado:</span> Venta sujeta a confirmación</p>
              <p><span className="font-bold">Modalidad:</span> {guia.modalidad}</p>
            </div>
            
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed">
              <h3 className="font-bold text-gray-700 uppercase border-b border-gray-100 pb-1 mb-2">Datos del Envío</h3>
              <p><span className="font-bold">Fecha de Emisión:</span> {guia.emision}</p>
              <p><span className="font-bold">Fecha Inicio de Traslado:</span> {guia.fechaTraslado}</p>
              <p><span className="font-bold">Peso Bruto Total (KGM):</span> 45.50</p>
              <p><span className="font-bold">Número de Bultos:</span> 3</p>
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
              <div><span className="font-bold">Vehículo (Placa):</span> ABC-789</div>
              <div><span className="font-bold">Conductor:</span> Carlos Mendoza Ruiz</div>
              <div><span className="font-bold">Licencia de Conducir:</span> Q12345678</div>
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
                  <td className="py-3 px-2">PROD-REP-01</td>
                  <td className="py-3 px-2">REPUESTOS Y ACCESORIOS PARA MANTENIMIENTO</td>
                  <td className="py-3 px-2">NIU (Unidades)</td>
                  <td className="py-3 px-2 text-right font-bold">10.00</td>
                </tr>
                <tr className="border-b border-gray-100 text-gray-600">
                  <td className="py-3 px-2">2</td>
                  <td className="py-3 px-2">PROD-LUB-04</td>
                  <td className="py-3 px-2">LUBRICANTES INDUSTRIALES SINTÉTICOS</td>
                  <td className="py-3 px-2">GLI (Galones)</td>
                  <td className="py-3 px-2 text-right font-bold">4.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-gray-200 p-4 rounded-sm mb-6 text-[12px]">
            <p className="font-bold text-gray-700 mb-1">Observaciones:</p>
            <p className="text-gray-600">El traslado se realiza respetando todas las normativas de transporte de carga y SUNAT.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
