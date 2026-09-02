"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Printer, Mail, Receipt } from "lucide-react";
import { NotaDebitoRow } from "../page";

export default function DetalleNotaDebitoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [nota, setNota] = useState<NotaDebitoRow | null>(null);

  useEffect(() => {
    const guardadas: NotaDebitoRow[] = JSON.parse(localStorage.getItem('notas_debito_guardadas') || '[]');
    
    const mockData: NotaDebitoRow[] = [
      {
        id: 1,
        nro: "FD01-00000002",
        rucDni: "20100070031",
        cliente: "VOLVO PERU S A",
        docModifica: "F001-00000070",
        motivo: "01 - Intereses por mora",
        emision: "14-07-2026",
        importe: "S/120.00"
      }
    ];

    const todasLasNotas = [...guardadas, ...mockData];
    const registroEncontrado = todasLasNotas.find(n => String(n.id) === String(id));
    
    if (registroEncontrado) {
      setNota(registroEncontrado);
    }
  }, [id]);

  if (!nota) {
    return <div className="p-8 text-center text-gray-500">Cargando documento...</div>;
  }

  const importeNumerico = parseFloat(nota.importe.replace(/S\/|,/g, "").trim()) || 0;
  const opGravada = importeNumerico / 1.18;
  const igv = importeNumerico - opGravada;

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen p-4 font-sans text-[#333]">
      <div className="w-full bg-white border border-gray-200 shadow-sm relative overflow-hidden">
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <Link
            href="/comprobantes/nota_debito"
            className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer p-1 inline-flex items-center justify-center hover:bg-gray-100 rounded-full"
            title="Regresar a Notas de Débito"
          >
            <ArrowLeft size={18} />
          </Link>
          
          <div className="flex gap-1.5">
            <button className="bg-[#1c84c6] hover:bg-[#166b9a] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><FileText size={16} /></button>
            <button className="bg-[#2bc5b4] hover:bg-[#23a395] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><Receipt size={16} /></button>
            <button className="bg-[#1c84c6] hover:bg-[#166b9a] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><Printer size={16} /></button>
            <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><Mail size={16} /></button>
            <button className="bg-[#1ab394] hover:bg-[#18a689] text-white p-1.5 rounded-[2px] transition-colors cursor-pointer"><i className="bi bi-whatsapp text-[15px]"></i></button>
          </div>
        </div>

        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 relative">
          <div className="z-10">
            <h2 className="text-[16px] font-bold text-gray-800">{nota.nro}</h2>
            <p className="text-[12px] font-bold text-gray-500">R.U.C : 20522045773</p>
          </div>
          <div className="absolute left-0 w-full text-center z-0 pointer-events-none">
            <h1 className="text-[22px] font-light text-[#f8ac59] tracking-wider">NOTA DE DÉBITO ELECTRÓNICA</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed">
              <p><span className="font-bold">Cliente:</span> {nota.cliente}</p>
              <p><span className="font-bold">R.U.C/DNI:</span> {nota.rucDni}</p>
              <p><span className="font-bold">Dirección:</span> Lima, Perú</p>
              <div className="flex gap-8 mt-1">
                <p><span className="font-bold">Tipo de Moneda:</span> Soles</p>
                <p><span className="font-bold">Fecha Emisión:</span> {nota.emision}</p>
              </div>
            </div>
            
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed bg-amber-50/30">
              <p><span className="font-bold text-amber-700">Documento que Modifica:</span> <span className="font-bold">{nota.docModifica}</span></p>
              <p><span className="font-bold">Tipo Comprobante:</span> Factura / Boleta Electrónica</p>
              <p><span className="font-bold">Motivo o Sustento:</span> {nota.motivo}</p>
              <p><span className="font-bold">Fecha Comprobante Modificado:</span> {nota.emision}</p>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-8">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-y border-gray-200 text-gray-700 font-bold bg-white">
                  <th className="py-3 px-2 w-10">Item</th>
                  <th className="py-3 px-2 w-32">Código</th>
                  <th className="py-3 px-2">Descripción</th>
                  <th className="py-3 px-2 w-20">Cantidad</th>
                  <th className="py-3 px-2 w-24">Valor Unitario</th>
                  <th className="py-3 px-2 w-24 text-right">Valor Venta</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 text-gray-600">
                  <td className="py-3 px-2">1</td>
                  <td className="py-3 px-2">ND-ITEM-001</td>
                  <td className="py-3 px-2">RECARGO / PENALIDAD / {nota.motivo} SOBRE {nota.docModifica}</td>
                  <td className="py-3 px-2">1.00</td>
                  <td className="py-3 px-2">{opGravada.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right">{opGravada.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div className="w-1/2">
              <p className="text-[13px] font-bold text-gray-700">Son : (Texto en letras simulado) soles</p>
              <p className="text-[11px] text-gray-500 mt-2">Documento de débito electrónico emitido según normativa SUNAT.</p>
            </div>
            
            <div className="w-80 border border-gray-200 p-4 rounded-sm text-[12px]">
              <div className="flex justify-between mb-1.5"><span className="text-gray-600">Subtotal:</span><span>S/ {opGravada.toFixed(2)}</span></div>
              <div className="flex justify-between mb-1.5"><span className="text-gray-600">Op. Gravada:</span><span>S/ {opGravada.toFixed(2)}</span></div>
              <div className="flex justify-between mb-1.5"><span className="text-gray-600">Op. Inafecta:</span><span>S/ 0.00</span></div>
              <div className="flex justify-between mb-2.5 pb-2.5 border-b border-gray-100"><span className="text-gray-600">I.G.V. (18%):</span><span>S/ {igv.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-amber-700 font-bold">Total a Debitar:</span><span className="font-bold text-amber-700">S/ {importeNumerico.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
