"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, User, Plus, Download, RotateCcw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SummaryCard } from "@/components/shared/SummaryCard";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// NUEVO: Definimos la interfaz estricta para evitar el error de 'any'
export interface FacturaRow {
  id: string | number;
  nro: string;
  rucDni: string;
  cliente: string;
  emision: string;
  forma: string;
  importe: string;
}

// 1. CONFIGURACIÓN DE TARJETAS DE RESUMEN (Duplicamos items para activar las flechas del carrusel)
const boletaManualItems = [
  { icon: FileText, label: "Boleta Manual", count: "0 Documentos", amount: "S/ 0.00", tone: { ring: "border-[#1AB394]", amount: "text-[#1AB394]" } },
  { icon: FileText, label: "Boleta Manual", count: "0 Documentos", amount: "S/ 0.00", tone: { ring: "border-[#1AB394]", amount: "text-[#1AB394]" } }
];

const facturaManualItems = [
  { icon: FileText, label: "Factura Manual", count: "0 Documentos", amount: "S/ 0.00", tone: { ring: "border-[#F8AC59]", amount: "text-[#F8AC59]" } },
  { icon: FileText, label: "Factura Manual", count: "0 Documentos", amount: "S/ 0.00", tone: { ring: "border-[#F8AC59]", amount: "text-[#F8AC59]" } }
];

// Agregamos "\u00A0" para mantener la altura exacta en las tarjetas sin precio
const notasDebitoItems = [
  { icon: FileText, label: "Notas Débito", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#ED5565]", amount: "" } },
  { icon: FileText, label: "Notas Débito", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#ED5565]", amount: "" } }
];

const guiaRemisionItems = [
  { icon: User, label: "Guia Remisión Manual", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#1C84C6]", amount: "" } },
  { icon: User, label: "Guia Remisión Manual", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#1C84C6]", amount: "" } }
];

// 2. CONFIGURACIÓN DE PESTAÑAS (TABS)
const tabsConfig = [
  { id: "boleta", label: "Boleta", count: 0, href: "#" },
  { id: "boleta_man", label: "Boleta Man.", count: 0, href: "#" },
  { id: "factura", label: "Factura", count: 0, href: "/comprobantes/factura" },
  { id: "factura_man", label: "Factura Man.", count: 0, href: "#" },
  { id: "nota_credito", label: "Nota de Crédito", count: 0, href: "#" },
  { id: "nota_debito", label: "Nota de Débito", count: 0, href: "#" },
  { id: "guia_remision", label: "Guía Remisión", count: 0, href: "#" },
  { id: "guia_remision_man", label: "Guía Remisión Man.", count: 0, href: "#" },
];

// 3. DEFINICIÓN DE COLUMNAS DE LA TABLA (Reemplazamos 'any' por la nueva interfaz)
const columns: ColumnDef<FacturaRow>[] = [
  { id: "select", header: ({ table }) => <Checkbox />, cell: ({ row }) => <Checkbox /> },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nro", header: "N°" },
  { accessorKey: "rucDni", header: "RUC/DNI" },
  { accessorKey: "cliente", header: "Cliente" },
  { accessorKey: "emision", header: "Emisión" },
  { accessorKey: "forma", header: "Forma" },
  { accessorKey: "importe", header: "Importe T." },
  { id: "ver", header: "Ver" },
  { id: "info", header: "Información" },
  { id: "pago", header: "Pago" },
  { id: "compartir", header: "Compartir R." },
];

export default function ComprobantesFacturaPage() {
  const activeTab = "factura"; // Pestaña activa actual

  return (
    <div className="min-h-screen bg-[#f3f3f4] p-6 font-sans">
      
      {/* SECCIÓN 1: ACORDEÓN DE RESUMEN */}
      <Accordion type="single" collapsible defaultValue="resumen" className="w-full mb-6 bg-white border border-gray-200 shadow-sm rounded-sm">
        <AccordionItem value="resumen" className="border-none">
          <AccordionTrigger className="px-5 py-3 hover:no-underline border-b border-gray-100 data-[state=open]:border-b-0">
            <span className="font-bold text-[13px] text-gray-700">Resumen de Julio 2026</span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-8 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <SummaryCard items={boletaManualItems} size="lg" />
              <SummaryCard items={facturaManualItems} size="lg" />
              <SummaryCard items={notasDebitoItems} size="lg" />
              <SummaryCard items={guiaRemisionItems} size="lg" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* SECCIÓN 2: CONTENEDOR PRINCIPAL (Pestañas, Filtros y Tabla) */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-5">
        
        {/* Pestañas y Botones de Acción */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 mb-5 gap-4">
          <div className="flex flex-wrap">
            {tabsConfig.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <Link key={tab.id} href={tab.href}>
                  <div className={`flex items-center px-4 py-2.5 text-[12px] font-bold transition-all relative top-[1px] cursor-pointer ${
                    isActive 
                      ? 'bg-white border-x border-t border-gray-200 text-gray-800 rounded-t-sm z-10' 
                      : 'text-gray-500 hover:bg-gray-50 border-transparent border-x border-t'
                  }`}>
                    <span className="bg-[#2C1FF3] text-white text-[10px] px-1.5 py-0.5 rounded-[3px] mr-2">
                      {tab.count}
                    </span>
                    {tab.label}
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="flex gap-2 pb-2">
            <Button className="bg-[#2C1FF3] hover:bg-blue-800 text-white h-8 w-10 px-0 rounded-sm cursor-pointer shadow-sm">
              <Plus size={16} />
            </Button>
            <Button className="bg-[#2C1FF3] hover:bg-blue-800 text-white h-8 px-3 rounded-sm cursor-pointer shadow-sm flex items-center gap-1">
              <Download size={14} />
              <i className="bi bi-caret-down-fill text-[10px] ml-1"></i>
            </Button>
          </div>
        </div>

        {/* Barra de Filtros Manual (Fiel a la imagen) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5 items-center">
          {/* Rango de Fechas */}
          <div className="flex">
            <input 
              type="text" 
              value="01/07/2026 - 31/07/2026" 
              readOnly
              className="w-full bg-[#eaebed] border border-gray-300 text-gray-600 text-[12px] px-3 py-1.5 outline-none rounded-l-sm"
            />
            <button className="bg-[#6c757d] hover:bg-gray-600 text-white px-3 py-1.5 rounded-r-sm transition-colors cursor-pointer border border-[#6c757d]">
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Buscador */}
          <div>
            <input 
              type="text" 
              placeholder="Buscar:" 
              className="w-full border border-gray-300 text-[12px] px-3 py-1.5 outline-none focus:border-[#1ab394] rounded-sm transition-colors"
            />
          </div>

          {/* Select Estado Sunat */}
          <div>
            <select className="w-full border border-gray-300 text-[12px] text-gray-500 px-3 py-1.5 outline-none focus:border-[#1ab394] rounded-sm transition-colors bg-white cursor-pointer">
              <option value="">Estado Sunat</option>
              <option value="enviado">Enviado</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </div>

          {/* Botón Buscar */}
          <div>
            <Button className="w-full bg-[#2C1FF3] hover:bg-blue-800 text-white text-[12px] font-bold rounded-sm h-[32px] cursor-pointer shadow-sm">
              Buscar
            </Button>
          </div>
        </div>

        {/* Tabla (Se asume vacía para mostrar el "No data available in table") */}
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          <DataTable 
            columns={columns} 
            data={[]} 
            showSelection={false} 
          />
          
          {/* Fila de Totales Personalizada (Pegada a la base de la tabla) */}
          <div className="flex justify-end gap-16 bg-white p-3 px-6 border-t border-gray-200 text-[12px] font-bold text-gray-700">
            <span>Total: S/0.00</span>
            <span>Total G.: S/0.00</span>
            <span className="w-[120px]"></span> {/* Espaciador para alinear con columnas */}
          </div>
        </div>

      </div>
    </div>
  );
}