"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Articulo {
  id: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
}

export default function CrearNotaCreditoPage() {
  const router = useRouter();

  const [tipoDoc, setTipoDoc] = useState("Factura");
  const [docModifica, setDocModifica] = useState("F001-00000085");
  const [motivo, setMotivo] = useState("01 - Anulación de la operación");
  const [cliente, setCliente] = useState("");
  const [documento, setDocumento] = useState("");
  const [articulos, setArticulos] = useState<Articulo[]>([
    { id: 1, descripcion: "Anulación por error en comprobante", cantidad: 1, precioUnitario: 0 }
  ]);

  const agregarArticulo = () => {
    setArticulos([
      ...articulos,
      { id: Date.now(), descripcion: "", cantidad: 1, precioUnitario: 0 }
    ]);
  };

  const eliminarArticulo = (id: number) => {
    if (articulos.length > 1) {
      setArticulos(articulos.filter(art => art.id !== id));
    }
  };

  const actualizarArticulo = (id: number, campo: keyof Articulo, valor: string | number) => {
    setArticulos(articulos.map(art => 
      art.id === id ? { ...art, [campo]: valor } : art
    ));
  };

  const calcularTotales = () => {
    const subtotal = articulos.reduce((sum, art) => sum + (art.cantidad * art.precioUnitario), 0);
    const grabada = subtotal / 1.18;
    const igv = subtotal - grabada;
    return { grabada, igv, total: subtotal };
  };

  const totales = calcularTotales();

  const handleGuardar = () => {
    const seriePrefix = tipoDoc === "Factura" ? "FC01" : "BC01";
    const nuevaNotaCredito = {
      id: Date.now(),
      nro: `${seriePrefix}-${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`,
      rucDni: documento || "20522045773",
      cliente: cliente || "CORPORACION LOGISTICA ANDINA S.A.C.",
      docModifica: docModifica || "F001-00000001",
      motivo: motivo,
      emision: new Date().toLocaleDateString('es-PE').replace(/\//g, '-'),
      importe: `S/${totales.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    };

    const guardadas = JSON.parse(localStorage.getItem('notas_credito_guardadas') || '[]');
    guardadas.unshift(nuevaNotaCredito); 
    localStorage.setItem('notas_credito_guardadas', JSON.stringify(guardadas));

    alert("¡Nota de Crédito generada con éxito!");
    router.push("/comprobantes/nota_credito"); 
  };

  return (
    <div className="w-full px-6 py-4 bg-[#fcfcfc] min-h-screen font-sans text-[#333]">
      <div className="w-full border border-gray-200 rounded-sm bg-white shadow-sm">
        
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/comprobantes/nota_credito"
              className="text-gray-500 hover:text-gray-800 transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer inline-flex items-center justify-center"
              title="Regresar a Notas de Crédito"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-[14px] font-bold text-gray-700">Generar Nota de Crédito Electrónica</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-8 bg-gray-50/50 p-5 border border-gray-200 rounded-md">
            <div className="space-y-4">
              <h3 className="text-[12px] font-extrabold text-[#ed5565] uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Documento que Modifica</h3>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">Tipo Doc:</label>
                <select
                  value={tipoDoc}
                  onChange={(e) => setTipoDoc(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#ed5565] bg-white"
                >
                  <option value="Factura">Factura Electrónica</option>
                  <option value="Boleta">Boleta de Venta Electrónica</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">N° Documento:</label>
                <input
                  type="text"
                  placeholder="Ej: F001-00000085"
                  value={docModifica}
                  onChange={(e) => setDocModifica(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#ed5565]"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">Tipo Nota (SUNAT):</label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#ed5565] bg-white text-[11px]"
                >
                  <option value="01 - Anulación de la operación">01 - Anulación de la operación</option>
                  <option value="02 - Anulación por error en el RUC">02 - Anulación por error en el RUC</option>
                  <option value="03 - Corrección por error en la descripción">03 - Corrección por error en la descripción</option>
                  <option value="04 - Descuento global">04 - Descuento global</option>
                  <option value="05 - Descuento por ítem">05 - Descuento por ítem</option>
                  <option value="06 - Devolución total">06 - Devolución total</option>
                  <option value="07 - Devolución por ítem">07 - Devolución por ítem</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[12px] font-extrabold text-[#ed5565] uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Datos del Cliente</h3>
              <div className="flex items-center gap-3">
                <label className="w-24 text-[12px] font-bold text-gray-600">RUC / DNI:</label>
                <div className="flex flex-1">
                  <input
                    type="text"
                    placeholder="Documento..."
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#ed5565]"
                  />
                  <button className="bg-[#ed5565] text-white px-3 py-1.5 rounded-r-[4px] hover:bg-red-700 transition-colors cursor-pointer">
                    <Search size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-24 text-[12px] font-bold text-gray-600">Razón / Nombre:</label>
                <input
                  type="text"
                  placeholder="Nombre o Razón Social"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#ed5565]"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-24 text-[12px] font-bold text-gray-600">Fecha Emisión:</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#ed5565]"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-extrabold text-gray-700">Detalle del Monto a Acreditar / Anular</h3>
              <Button 
                onClick={agregarArticulo}
                className="bg-[#1ab394] hover:bg-[#18a689] text-white h-7 px-3 rounded-[4px] text-[11px] font-bold shadow-sm"
              >
                <Plus size={14} className="mr-1" /> Agregar Ítem
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-none overflow-hidden">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <tr>
                    <th className="py-2.5 px-3 font-bold w-12 text-center">Acción</th>
                    <th className="py-2.5 px-3 font-bold">Descripción / Motivo del Detalle</th>
                    <th className="py-2.5 px-3 font-bold w-24 text-center">Cantidad</th>
                    <th className="py-2.5 px-3 font-bold w-32 text-right">P. Unitario (S/)</th>
                    <th className="py-2.5 px-3 font-bold w-32 text-right bg-gray-100">Total (S/)</th>
                  </tr>
                </thead>
                <tbody>
                  {articulos.map((art) => (
                    <tr key={art.id} className="border-b border-gray-100 bg-white">
                      <td className="py-2 px-3 text-center">
                        <button 
                          onClick={() => eliminarArticulo(art.id)}
                          disabled={articulos.length === 1}
                          className="text-[#ed5565] hover:text-red-700 disabled:opacity-30 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                      <td className="py-2 px-3">
                        <input 
                          type="text" 
                          placeholder="Descripción del concepto a ajustar..."
                          value={art.descripcion}
                          onChange={(e) => actualizarArticulo(art.id, "descripcion", e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#ed5565]"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input 
                          type="number" 
                          min="1"
                          value={art.cantidad || ""}
                          onChange={(e) => actualizarArticulo(art.id, "cantidad", Number(e.target.value))}
                          className="w-full border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:border-[#ed5565]"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input 
                          type="number" 
                          min="0"
                          step="0.01"
                          value={art.precioUnitario || ""}
                          onChange={(e) => actualizarArticulo(art.id, "precioUnitario", Number(e.target.value))}
                          className="w-full border border-gray-200 rounded px-2 py-1 text-right focus:outline-none focus:border-[#ed5565]"
                        />
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-gray-700 bg-gray-50/50">
                        {(art.cantidad * art.precioUnitario).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end items-start gap-8 mt-8">
            <div className="w-full md:w-72 bg-gray-50 border border-gray-200 rounded-[4px] p-4">
              <div className="flex justify-between text-[12px] text-gray-600 mb-2">
                <span className="font-bold">Op. Gravada:</span>
                <span>S/ {totales.grabada.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[12px] text-gray-600 mb-3 pb-3 border-b border-gray-200">
                <span className="font-bold">IGV (18%):</span>
                <span>S/ {totales.igv.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[14px] text-red-600">
                <span className="font-extrabold">Total a Acreditar:</span>
                <span className="font-extrabold">S/ {totales.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col justify-end h-full pt-2">
              <Button 
                onClick={handleGuardar}
                className="bg-[#ed5565] hover:bg-red-700 text-white px-8 py-5 rounded-[4px] font-bold text-[13px] shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save size={18} />
                Emitir Nota de Crédito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
