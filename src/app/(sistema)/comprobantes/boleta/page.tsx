"use client";

import React, { useEffect, useState } from "react";
import { ComprobantesTabTemplate } from "../components/ComprobantesTabTemplate";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Check, DollarSign, Mail } from "lucide-react";

export interface BoletaRow {
  id: string | number;
  nro: string;
  rucDni: string;
  cliente: string;
  emision: string;
  forma: string;
  importe: string;
}

const columns: ColumnDef<BoletaRow>[] = [
  { 
    id: "select", 
    header: () => <Checkbox />, 
    cell: () => <Checkbox className="mx-auto" /> 
  },
  { 
    accessorKey: "id", 
    header: "ID" 
  },
  { 
    accessorKey: "nro", 
    header: "N°",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span>{row.original.nro}</span>
        <button className="border border-gray-300 rounded text-gray-400 w-[18px] h-[18px] flex items-center justify-center text-[12px] hover:bg-gray-50 transition-colors">
          +
        </button>
      </div>
    )
  },
  { 
    accessorKey: "rucDni", 
    header: "RUC/DNI" 
  },
  { 
    accessorKey: "cliente", 
    header: "Cliente" 
  },
  { 
    accessorKey: "emision", 
    header: "Emisión" 
  },
  { 
    accessorKey: "forma", 
    header: "Forma" 
  },
  { 
    accessorKey: "importe", 
    header: "Importe T." 
  },
  { 
    id: "ver", 
    header: () => <div className="text-center">Ver</div>,
    cell: () => (
      <div className="flex justify-center">
        <button className="bg-[#1d59bc] hover:bg-[#164696] text-white p-1.5 rounded-[4px] cursor-pointer shadow-sm transition-colors">
          <Eye size={16} />
        </button>
      </div>
    )
  },
  { 
    id: "informacion", 
    header: () => <div className="text-center">Información</div>,
    cell: () => (
      <div className="flex justify-center items-center gap-1.5">
        <div className="bg-[#2bc5b4] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
          <Check size={14} strokeWidth={3} />
        </div>
        <div className="bg-[#f8ac59] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
          <i className="bi bi-layers-fill text-[11px]"></i>
        </div>
      </div>
    )
  },
  { 
    id: "pago", 
    header: () => <div className="text-center">Pago</div>,
    cell: () => (
      <div className="flex justify-center">
        <button className="bg-[#2bc5b4] hover:bg-[#24a99a] text-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors">
          <DollarSign size={14} strokeWidth={2.5} />
        </button>
      </div>
    )
  },
  { 
    id: "compartir", 
    header: () => <div className="text-center">Compartir R.</div>,
    cell: () => (
      <div className="flex justify-center items-center gap-1.5">
        <button className="bg-[#6c757d] hover:bg-[#5a6268] text-white p-1.5 rounded-[4px] cursor-pointer shadow-sm transition-colors">
          <Mail size={16} />
        </button>
        <button className="bg-[#1ab394] hover:bg-[#18a689] text-white p-1.5 rounded-[4px] cursor-pointer shadow-sm transition-colors">
          <i className="bi bi-whatsapp text-[15px]"></i>
        </button>
      </div>
    )
  }
];

export default function BoletasPage() {
  const [data, setData] = useState<BoletaRow[]>([]);

  useEffect(() => {
    // Datos originales por defecto
    const mockData: BoletaRow[] = [
      {
        id: 11,
        nro: "F001-00000010",
        rucDni: "31245134",
        cliente: "Mouse",
        emision: "10-07-2026",
        forma: "Credito",
        importe: "S/1,453.76"
      },
      {
        id: 10,
        nro: "F001-00000009",
        rucDni: "20100070031",
        cliente: "VOLVO PERU S A",
        emision: "10-07-2026",
        forma: "Credito",
        importe: "S/810.40"
      }
    ];

    // Leer las nuevas generadas en el formulario
    const guardadas = JSON.parse(localStorage.getItem('boletas_guardadas') || '[]');
    
    // Unir las nuevas (arriba) con las estáticas (abajo)
    setData([...guardadas, ...mockData]);
  }, []);

  // Calcular el total dinámico para reflejar las nuevas inserciones
  const totalCalculado = data.reduce((sum, row) => {
    // Limpiamos la cadena "S/1,453.76" para quedarnos solo con los números (1453.76)
    const importeStr = row.importe.replace(/S\/|,/g, "").trim();
    const importe = parseFloat(importeStr);
    return sum + (isNaN(importe) ? 0 : importe);
  }, 0);

  const totalFormateado = `S/${totalCalculado.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  return (
    <ComprobantesTabTemplate 
      activeTab="boleta" 
      columns={columns} 
      data={data} 
      total={totalFormateado}
      totalGeneral={totalFormateado}
    />
  );
}