"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticuloGuia {
  id: number;
  descripcion: string;
  unidad: string;
  cantidad: number;
}

export default function CrearGuiaRemisionManualPage() {
  const router = useRouter();

  const [destinatario, setDestinatario] = useState("");
  const [documento, setDocumento] = useState("");
  const [serie, setSerie] = useState("TM01");
  const [correlativo, setCorrelativo] = useState("");
  const [motivoTraslado, setMotivoTraslado] = useState("Venta");
  const [modalidad, setModalidad] = useState("Transporte Privado");
  const [puntoPartida, setPuntoPartida] = useState("Planta Principal Lurín");
  const [puntoLlegada, setPuntoLlegada] = useState("");
  const [fechaTraslado, setFechaTraslado] = useState(new Date().toISOString().split('T')[0]);
  const [placa, setPlaca] = useState("");
  const [conductor, setConductor] = useState("");
  
  const [articulos, setArticulos] = useState<ArticuloGuia[]>([
    { id: 1, descripcion: "", unidad: "NIU", cantidad: 1 }
  ]);

  const agregarArticulo = () => {
    setArticulos([
      ...articulos,
      { id: Date.now(), descripcion: "", unidad: "NIU", cantidad: 1 }
    ]);
  };

  const eliminarArticulo = (id: number) => {
    if (articulos.length > 1) {
      setArticulos(articulos.filter(art => art.id !== id));
    }
  };

  const actualizarArticulo = (id: number, campo: keyof ArticuloGuia, valor: string | number) => {
    setArticulos(articulos.map(art => 
      art.id === id ? { ...art, [campo]: valor } : art
    ));
  };

  const handleGuardar = () => {
    const nroGenerado = correlativo 
      ? `${serie}-${correlativo.padStart(8, '0')}`
      : `${serie}-${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;

    const nuevaGuia = {
      id: Date.now(),
      nro: nroGenerado,
      rucDni: documento || "20601234567",
      destinatario: destinatario || "Destinatario Manual S.A.C.",
      puntoPartida: puntoPartida || "Almacén Central",
      puntoLlegada: puntoLlegada || "Dirección Destino Cliente",
      emision: new Date().toLocaleDateString('es-PE').replace(/\//g, '-'),
      fechaTraslado: fechaTraslado,
      modalidad: modalidad
    };

    const guardadas = JSON.parse(localStorage.getItem('guias_remision_manual_guardadas') || '[]');
    guardadas.unshift(nuevaGuia); 
    localStorage.setItem('guias_remision_manual_guardadas', JSON.stringify(guardadas));

    alert("¡Guía de Remisión manual registrada con éxito!");
    router.push("/comprobantes/guia_remision_manual"); 
  };

  return (
    <div className="w-full px-6 py-4 bg-[#fcfcfc] min-h-screen font-sans text-[#333]">
      <div className="w-full border border-gray-200 rounded-sm bg-white shadow-sm">
        
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/comprobantes/guia_remision_manual"
              className="text-gray-500 hover:text-gray-800 transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer inline-flex items-center justify-center"
              title="Regresar a Guías de Remisión Manuales"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-[14px] font-bold text-gray-700">Registrar Guía de Remisión Manual</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-8 bg-gray-50/50 p-5 border border-gray-200 rounded-md">
            <div className="space-y-4">
              <h3 className="text-[12px] font-extrabold text-[#2C1FF3] uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Datos del Destinatario</h3>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">RUC / DNI:</label>
                <div className="flex flex-1">
                  <input
                    type="text"
                    placeholder="Buscar RUC..."
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3]"
                  />
                  <button className="bg-[#2C1FF3] text-white px-3 py-1.5 rounded-r-[4px] hover:bg-blue-800 transition-colors cursor-pointer">
                    <Search size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">Destinatario:</label>
                <input
                  type="text"
                  placeholder="Razón Social / Nombres"
                  value={destinatario}
                  onChange={(e) => setDestinatario(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3]"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">Motivo Traslado:</label>
                <select
                  value={motivoTraslado}
                  onChange={(e) => setMotivoTraslado(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3] bg-white"
                >
                  <option value="Venta">Venta</option>
                  <option value="Traslado entre establecimientos">Traslado entre establecimientos de la misma empresa</option>
                  <option value="Compra">Compra</option>
                  <option value="Devolución">Devolución</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[12px] font-extrabold text-[#2C1FF3] uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Comprobante Físico y Envío</h3>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">Serie - Número:</label>
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={serie}
                    onChange={(e) => setSerie(e.target.value)}
                    className="w-20 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3] uppercase"
                  />
                  <input
                    type="text"
                    placeholder="00000001"
                    value={correlativo}
                    onChange={(e) => setCorrelativo(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">Fecha Traslado:</label>
                <input
                  type="date"
                  value={fechaTraslado}
                  onChange={(e) => setFechaTraslado(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3]"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-28 text-[12px] font-bold text-gray-600">Modalidad:</label>
                <select
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3] bg-white"
                >
                  <option value="Transporte Privado">Transporte Privado</option>
                  <option value="Transporte Público">Transporte Público</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-8 bg-gray-50/30 p-5 border border-gray-200 rounded-md">
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">Punto de Partida (Origen):</label>
              <input
                type="text"
                value={puntoPartida}
                onChange={(e) => setPuntoPartida(e.target.value)}
                className="w-full border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">Punto de Llegada (Destino):</label>
              <input
                type="text"
                placeholder="Dirección del destinatario / almacén destino..."
                value={puntoLlegada}
                onChange={(e) => setPuntoLlegada(e.target.value)}
                className="w-full border border-gray-300 rounded-[4px] px-3 py-1.5 text-[12px] focus:outline-none focus:border-[#2C1FF3]"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-extrabold text-gray-700">Detalle de Bienes Físicos Trasladados</h3>
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
                    <th className="py-2.5 px-3 font-bold">Descripción de Bien</th>
                    <th className="py-2.5 px-3 font-bold w-32 text-center">Unidad de Medida</th>
                    <th className="py-2.5 px-3 font-bold w-28 text-center">Cantidad</th>
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
                          placeholder="Descripción del ítem físico transportado..."
                          value={art.descripcion}
                          onChange={(e) => actualizarArticulo(art.id, "descripcion", e.target.value)}
                          className="w-full border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#2C1FF3]"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <select
                          value={art.unidad}
                          onChange={(e) => actualizarArticulo(art.id, "unidad", e.target.value)}
                          className="border border-gray-200 rounded px-2 py-1 text-[12px] bg-white focus:outline-none focus:border-[#2C1FF3]"
                        >
                          <option value="NIU">NIU (Unidades)</option>
                          <option value="KGM">KGM (Kilogramos)</option>
                          <option value="GLI">GLI (Galones)</option>
                          <option value="MTR">MTR (Metros)</option>
                          <option value="BX">BX (Cajas)</option>
                        </select>
                      </td>
                      <td className="py-2 px-3">
                        <input 
                          type="number" 
                          min="1"
                          value={art.cantidad || ""}
                          onChange={(e) => actualizarArticulo(art.id, "cantidad", Number(e.target.value))}
                          className="w-full border border-gray-200 rounded px-2 py-1 text-center focus:outline-none focus:border-[#2C1FF3]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleGuardar}
              className="bg-[#2C1FF3] hover:bg-blue-800 text-white px-8 py-5 rounded-[4px] font-bold text-[13px] shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save size={18} />
              Guardar Guía Manual
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
