"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ComprobantesTabTemplate } from "../components/ComprobantesTabTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Check, DollarSign, Mail } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface FacturaManualRow {
  id: string | number;
  nro: string;
  rucDni: string;
  cliente: string;
  emision: string;
  forma: string;
  importe: string;
  pagoInfo?: {
    monto: string;
    fecha: string;
    tipo: string;
    dato: string;
  };
}

const columns: ColumnDef<FacturaManualRow>[] = [
  { id: "select", header: () => <Checkbox />, cell: () => <Checkbox className="mx-auto" /> },
  { accessorKey: "id", header: "ID" },
  { 
    accessorKey: "nro", 
    header: "N°",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span>{row.original.nro}</span>
        <button className="border border-gray-300 rounded text-gray-400 w-[18px] h-[18px] flex items-center justify-center text-[12px] hover:bg-gray-50 transition-colors">+</button>
      </div>
    )
  },
  { accessorKey: "rucDni", header: "RUC/DNI" },
  { accessorKey: "cliente", header: "Cliente" },
  { accessorKey: "emision", header: "Emisión" },
  { accessorKey: "forma", header: "Forma" },
  { accessorKey: "importe", header: "Importe T." },
  { 
    id: "ver", 
    header: () => <div className="text-center">Ver</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Link href={`/comprobantes/factura_manual/${row.original.id}`}>
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
        <div className="bg-[#f8ac59] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm"><i className="bi bi-layers-fill text-[11px]"></i></div>
      </div>
    )
  },
  { 
    id: "pago", 
    header: () => <div className="text-center">Pago</div>,
    cell: ({ row }) => {
      const pago = row.original.pagoInfo || {
        monto: "S/ 0.00",
        fecha: "---",
        tipo: "---",
        dato: "---"
      };

      return (
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="bg-[#2bc5b4] hover:bg-[#24a99a] text-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors outline-none">
                <DollarSign size={14} strokeWidth={2.5} />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              side="right" 
              align="center" 
              sideOffset={12} 
              className="w-36 p-2.5 bg-white rounded-md shadow-lg border border-gray-100 text-[11px] font-sans text-gray-700"
            >
              <div className="font-extrabold underline mb-1.5 decoration-gray-400 underline-offset-2">Info. Ult. Pago</div>
              <div className="flex flex-col gap-0.5">
                <div><span className="font-bold">Monto:</span> {pago.monto}</div>
                <div><span className="font-bold">Fecha:</span> {pago.fecha}</div>
                <div><span className="font-bold">Tipo:</span> {pago.tipo}</div>
                <div><span className="font-bold">Dato:</span> {pago.dato}</div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    }
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

export default function FacturasManualPage() {
  const [data, setData] = useState<FacturaManualRow[]>([]);

  useEffect(() => {
    const mockData: FacturaManualRow[] = [
      {
        id: 1,
        nro: "FM01-00000012",
        rucDni: "20601234567",
        cliente: "DISTRIBUIDORA COMERCIAL DEL SUR S.A.C.",
        emision: "16-07-2026",
        forma: "Credito",
        importe: "S/2,100.00",
        pagoInfo: { monto: "S/ 1,000.00", fecha: "16-07-2026", tipo: "Transferencia", dato: "BCP" }
      },
      {
        id: 2,
        nro: "FM01-00000011",
        rucDni: "20489123891",
        cliente: "SERVICIOS GENERALES INDUSTRIALES E.I.R.L.",
        emision: "12-07-2026",
        forma: "Contado",
        importe: "S/950.00",
        pagoInfo: { monto: "S/ 950.00", fecha: "12-07-2026", tipo: "Depósito", dato: "Interbank" }
      }
    ];

    const guardadas = JSON.parse(localStorage.getItem('facturas_manual_guardadas') || '[]');
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
      activeTab="factura_man" 
      columns={columns} 
      data={data} 
      total={totalFormateado}
      totalGeneral={totalFormateado}
    />
  );
}
