"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ComprobantesTabTemplate } from "../components/ComprobantesTabTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Check, Mail } from "lucide-react";

export interface NotaCreditoRow {
  id: string | number;
  nro: string;
  rucDni: string;
  cliente: string;
  docModifica: string;
  motivo: string;
  emision: string;
  importe: string;
}

const columns: ColumnDef<NotaCreditoRow>[] = [
  { id: "select", header: () => <Checkbox />, cell: () => <Checkbox className="mx-auto" /> },
  { accessorKey: "id", header: "ID" },
  { 
    accessorKey: "nro", 
    header: "N°",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="font-semibold text-[#ed5565]">{row.original.nro}</span>
        <button className="border border-gray-300 rounded text-gray-400 w-[18px] h-[18px] flex items-center justify-center text-[12px] hover:bg-gray-50 transition-colors">+</button>
      </div>
    )
  },
  { accessorKey: "rucDni", header: "RUC/DNI" },
  { accessorKey: "cliente", header: "Cliente" },
  { 
    accessorKey: "docModifica", 
    header: "Doc. Modifica",
    cell: ({ row }) => (
      <span className="px-2 py-0.5 bg-blue-50 text-[#1d59bc] rounded text-[11px] font-semibold border border-blue-100">
        {row.original.docModifica}
      </span>
    )
  },
  { 
    accessorKey: "motivo", 
    header: "Motivo Sustento",
    cell: ({ row }) => (
      <span className="text-[11px] text-gray-600 truncate max-w-[200px] block" title={row.original.motivo}>
        {row.original.motivo}
      </span>
    )
  },
  { accessorKey: "emision", header: "Emisión" },
  { 
    accessorKey: "importe", 
    header: "Importe T.",
    cell: ({ row }) => (
      <span className="font-bold text-gray-800">{row.original.importe}</span>
    )
  },
  { 
    id: "ver", 
    header: () => <div className="text-center">Ver</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Link href={`/comprobantes/nota_credito/${row.original.id}`}>
          <button className="bg-[#1d59bc] hover:bg-[#164696] text-white p-1.5 rounded-[4px] cursor-pointer shadow-sm transition-colors"><Eye size={16} /></button>
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
        <div className="bg-[#ed5565] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm"><i className="bi bi-file-earmark-minus text-[11px]"></i></div>
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

export default function NotaCreditoPage() {
  const [data, setData] = useState<NotaCreditoRow[]>([]);

  useEffect(() => {
    const mockData: NotaCreditoRow[] = [
      {
        id: 1,
        nro: "FC01-00000005",
        rucDni: "20522045773",
        cliente: "CORPORACION LOGISTICA ANDINA S.A.C.",
        docModifica: "F001-00000085",
        motivo: "01 - Anulación de la operación",
        emision: "16-07-2026",
        importe: "S/450.00"
      }
    ];

    const guardadas = JSON.parse(localStorage.getItem('notas_credito_guardadas') || '[]');
    setData([...guardadas, ...mockData]);
  }, []);

  const totalCalculado = data.reduce((sum, row) => {
    const importeStr = row.importe.replace(/S\/|,/g, "").trim();
    const importe = parseFloat(importeStr);
    return sum + (isNaN(importe) ? 0 : importe);
  }, 0);

  const totalFormateado = `S/${totalCalculado.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  return (
    <ComprobantesTabTemplate 
      activeTab="nota_credito" 
      columns={columns} 
      data={data} 
      total={totalFormateado}
      totalGeneral={totalFormateado}
    />
  );
}
