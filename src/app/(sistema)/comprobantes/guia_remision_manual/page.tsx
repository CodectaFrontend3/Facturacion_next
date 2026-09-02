"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ComprobantesTabTemplate } from "../components/ComprobantesTabTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Check, Truck, Mail } from "lucide-react";

export interface GuiaRemisionManualRow {
  id: string | number;
  nro: string;
  rucDni: string;
  destinatario: string;
  puntoPartida: string;
  puntoLlegada: string;
  emision: string;
  fechaTraslado: string;
  modalidad: string;
}

const columns: ColumnDef<GuiaRemisionManualRow>[] = [
  { id: "select", header: () => <Checkbox />, cell: () => <Checkbox className="mx-auto" /> },
  { accessorKey: "id", header: "ID" },
  { 
    accessorKey: "nro", 
    header: "N°",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="font-semibold text-[#2C1FF3]">{row.original.nro}</span>
        <button className="border border-gray-300 rounded text-gray-400 w-[18px] h-[18px] flex items-center justify-center text-[12px] hover:bg-gray-50 transition-colors">+</button>
      </div>
    )
  },
  { accessorKey: "rucDni", header: "RUC Destinatario" },
  { accessorKey: "destinatario", header: "Destinatario" },
  { 
    accessorKey: "puntoPartida", 
    header: "Pto. Partida",
    cell: ({ row }) => (
      <span className="text-[11px] text-gray-600 truncate max-w-[150px] block" title={row.original.puntoPartida}>
        {row.original.puntoPartida}
      </span>
    )
  },
  { 
    accessorKey: "puntoLlegada", 
    header: "Pto. Llegada",
    cell: ({ row }) => (
      <span className="text-[11px] text-gray-600 truncate max-w-[150px] block" title={row.original.puntoLlegada}>
        {row.original.puntoLlegada}
      </span>
    )
  },
  { accessorKey: "emision", header: "Emisión" },
  { accessorKey: "fechaTraslado", header: "F. Traslado" },
  { 
    accessorKey: "modalidad", 
    header: "Modalidad",
    cell: ({ row }) => (
      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[11px] font-semibold border border-indigo-100 flex items-center gap-1 w-fit">
        <Truck size={12} />
        {row.original.modalidad}
      </span>
    )
  },
  { 
    id: "ver", 
    header: () => <div className="text-center">Ver</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Link href={`/comprobantes/guia_remision_manual/${row.original.id}`}>
          <button className="bg-[#1d59bc] hover:bg-[#166b9a] text-white p-1.5 rounded-[4px] cursor-pointer shadow-sm transition-colors"><Eye size={16} /></button>
        </Link>
      </div>
    )
  },
  { 
    id: "informacion", 
    header: () => <div className="text-center">Información</div>,
    cell: () => (
      <div className="flex justify-center items-center gap-1.5">
        <div className="bg-[#2bc5b4] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm"><Check size={14} strokeWidth={3} /></div>
        <div className="bg-[#2C1FF3] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm"><Truck size={12} /></div>
      </div>
    )
  },
  { 
    id: "compartir", 
    header: () => <div className="text-center">Compartir R.</div>,
    cell: () => (
      <div className="flex justify-center items-center gap-1.5">
        <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white p-1.5 rounded-[4px] cursor-pointer shadow-sm transition-colors"><Mail size={16} /></button>
        <button className="bg-[#1ab394] hover:bg-[#18a689] text-white p-1.5 rounded-[4px] cursor-pointer shadow-sm transition-colors"><i className="bi bi-whatsapp text-[15px]"></i></button>
      </div>
    )
  }
];

export default function GuiaRemisionManualPage() {
  const [data, setData] = useState<GuiaRemisionManualRow[]>([]);

  useEffect(() => {
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

    const guardadas = JSON.parse(localStorage.getItem('guias_remision_manual_guardadas') || '[]');
    setData([...guardadas, ...mockData]);
  }, []);

  return (
    <ComprobantesTabTemplate 
      activeTab="guia_remision_man" 
      columns={columns} 
      data={data} 
      total={`${data.length} Guías`}
      totalGeneral={`${data.length} Guías`}
    />
  );
}
