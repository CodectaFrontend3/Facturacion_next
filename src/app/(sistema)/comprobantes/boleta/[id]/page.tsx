"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Printer, Mail, Receipt } from "lucide-react";
import { BoletaRow } from "../page";

export default function DetalleBoletaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [boleta, setBoleta] = useState<BoletaRow | null>(null);

  useEffect(() => {
    // 1. Cargamos datos de localStorage
    const guardadas: BoletaRow[] = JSON.parse(localStorage.getItem('boletas_guardadas') || '[]');
    
    // 2. Datos estáticos
    const mockData: BoletaRow[] = [
      { id: 11, nro: "B001-00000010", rucDni: "31245134", cliente: "Mouse", emision: "10-07-2026", forma: "Credito", importe: "S/1,453.76" },
      { id: 10, nro: "B001-00000009", rucDni: "20100070031", cliente: "VOLVO PERU S A", emision: "10-07-2026", forma: "Credito", importe: "S/810.40" }
    ];

    const todasLasBoletas = [...guardadas, ...mockData];
    const registroEncontrado = todasLasBoletas.find(b => String(b.id) === String(id));
    
    if (registroEncontrado) {
      setBoleta(registroEncontrado);
    }
  }, [id]);

  if (!boleta) {
    return <div className="p-8 text-center text-gray-500">Cargando documento...</div>;
  }

  const importeNumerico = parseFloat(boleta.importe.replace(/S\/|,/g, "").trim()) || 0;
  const opGravada = importeNumerico / 1.18;
  const igv = importeNumerico - opGravada;

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen p-4 font-sans text-[#333]">
      <div className="w-full bg-white border border-gray-200 shadow-sm relative overflow-hidden">
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <Link
            href="/comprobantes/boleta"
            className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer p-1 inline-flex items-center justify-center hover:bg-gray-100 rounded-full"
            title="Regresar a Boletas"
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
            <h2 className="text-[16px] font-bold text-gray-800">{boleta.nro}</h2>
            <p className="text-[12px] font-bold text-gray-500">R.U.C : 20522045773</p>
          </div>
          <div className="absolute left-0 w-full text-center z-0 pointer-events-none">
            {/* Título adaptado para boleta */}
            <h1 className="text-[22px] font-light text-gray-400 tracking-wider">BOLETA ELECTRÓNICA</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed">
              <p><span className="font-bold">Cliente:</span> {boleta.cliente}</p>
              <p><span className="font-bold">R.U.C/DNI:</span> {boleta.rucDni}</p>
              <p><span className="font-bold">Dirección:</span> Lima</p>
              <div className="flex gap-8 mt-1">
                <p><span className="font-bold">Condiciones de Pago:</span> {boleta.forma}</p>
                <p><span className="font-bold">Tipo de Moneda:</span> Soles</p>
              </div>
            </div>
            
            <div className="border border-gray-200 p-4 rounded-sm text-[12px] leading-relaxed">
              <p><span className="font-bold">Orden de Compra:</span> --</p>
              <p><span className="font-bold">Guía de Remisión:</span> --</p>
              <p><span className="font-bold">Fecha Emisión:</span> {boleta.emision}</p>
              <p><span className="font-bold">Fecha de Vencimiento:</span> {boleta.emision}</p>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-8">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-y border-gray-200 text-gray-700 font-bold bg-white">
                  <th className="py-3 px-2 w-10">Item</th>
                  <th className="py-3 px-2 w-32">Código de Item</th>
                  <th className="py-3 px-2">Descripción</th>
                  <th className="py-3 px-2 w-20">Cantidad</th>
                  <th className="py-3 px-2 w-24">Valor Unitario</th>
                  <th className="py-3 px-2 w-16">Dscto. %</th>
                  <th className="py-3 px-2 w-24">P. Unitario Desc</th>
                  <th className="py-3 px-2 w-20">Comisión %</th>
                  <th className="py-3 px-2 w-24">P. Unitario Com.</th>
                  <th className="py-3 px-2 w-24 text-right">Valor Venta</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 text-gray-600">
                  <td className="py-3 px-2">1</td>
                  <td className="py-3 px-2">ART-000001</td>
                  <td className="py-3 px-2">PRODUCTO / SERVICIO</td>
                  <td className="py-3 px-2">1.00</td>
                  <td className="py-3 px-2">{opGravada.toFixed(2)}</td>
                  <td className="py-3 px-2">0%</td>
                  <td className="py-3 px-2">{opGravada.toFixed(2)}</td>
                  <td className="py-3 px-2">0%</td>
                  <td className="py-3 px-2">{opGravada.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right">{opGravada.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div className="w-1/2">
              <p className="text-[13px] font-bold text-gray-700">Son : (Texto en letras simulado) soles</p>
            </div>
            
            <div className="w-80 border border-gray-200 p-4 rounded-sm text-[12px]">
              <div className="flex justify-between mb-1.5"><span className="text-gray-600">Subtotal:</span><span>S/ {opGravada.toFixed(2)}</span></div>
              <div className="flex justify-between mb-1.5"><span className="text-gray-600">Op. Gravada:</span><span>S/ {opGravada.toFixed(2)}</span></div>
              <div className="flex justify-between mb-1.5"><span className="text-gray-600">Op. Inafecta:</span><span>S/ 0.00</span></div>
              <div className="flex justify-between mb-1.5"><span className="text-gray-600">Op. Exonerada:</span><span>S/ 0.00</span></div>
              <div className="flex justify-between mb-2.5 pb-2.5 border-b border-gray-100"><span className="text-gray-600">I.G.V.:</span><span>S/ {igv.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-700 font-bold">Importe Total:</span><span className="font-bold">S/ {importeNumerico.toFixed(2)}</span></div>
            </div>
          </div>

          <div className="border border-gray-200 p-4 rounded-sm mb-8 text-[12px]">
            <p className="font-bold text-gray-700 mb-1">Observaciones:</p>
            <p className="text-gray-600">Emitimos la siguiente Boleta a vuestra solicitud</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="border border-gray-200 p-4 flex flex-col items-center justify-center gap-3">
              <div className="bg-[#009B3A] text-white px-3 py-1 font-bold text-[14px] rounded tracking-wide">Interbank</div>
              <p className="text-[11px] text-gray-600 font-bold">Cta C. S/: 121-3233-232323232</p>
            </div>
            <div className="border border-gray-200 p-4 flex flex-col items-center justify-center gap-3">
              <div className="text-[#E0162B] font-bold text-[16px] tracking-wide flex items-center gap-1">
                <i className="bi bi-bank2"></i> Scotiabank
              </div>
              <p className="text-[11px] text-gray-600 font-bold">Cta C. S/: 231456987</p>
            </div>
            <div className="border border-gray-200 p-4 flex flex-col items-center justify-center gap-3">
              <div className="text-[#004481] font-bold text-[16px] tracking-wide flex items-center gap-1">
                <i className="bi bi-wallet-fill"></i> BBVA Continental
              </div>
              <p className="text-[11px] text-gray-600 font-bold">Cta C. S/: 651247856997</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}