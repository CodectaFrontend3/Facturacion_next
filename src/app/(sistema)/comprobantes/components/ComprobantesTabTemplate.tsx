"use client";

import React from "react";
import Link from "next/link";
import { FileText, File as FileIcon, User, Plus, Download, RotateCcw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SummaryCard } from "@/components/shared/SummaryCard";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";

// 1. CONFIGURACIÓN DE TARJETAS DE RESUMEN
const boletasItems = [
  { icon: FileText, label: "Boleta", count: "0 Documentos", amount: "S/ 0.00", tone: { ring: "border-[#1AB394]", amount: "text-[#1AB394]" } },
  { icon: FileText, label: "Boleta Manual", count: "0 Documentos", amount: "S/ 0.00", tone: { ring: "border-[#1AB394]", amount: "text-[#1AB394]" } }
];

const facturasItems = [
  { icon: FileText, label: "Factura", count: "1 Documentos", amount: "S/ 89.00", tone: { ring: "border-[#F8AC59]", amount: "text-[#F8AC59]" } },
  { icon: FileText, label: "Factura Manual", count: "0 Documentos", amount: "S/ 0.00", tone: { ring: "border-[#F8AC59]", amount: "text-[#F8AC59]" } }
];

const notasItems = [
  { icon: FileIcon, label: "Nota de Crédito", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#ED5565]", amount: "" } },
  { icon: FileIcon, label: "Nota de Débito", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#ED5565]", amount: "" } }
];

const guiasItems = [
  { icon: User, label: "Guía Remisión", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#1C84C6]", amount: "" } },
  { icon: User, label: "Guía Remisión Man.", count: "0 Documentos", amount: "\u00A0", tone: { ring: "border-[#1C84C6]", amount: "" } }
];

// 2. RUTAS DE LAS PESTAÑAS (Aquí definimos hacia dónde va cada clic)
const tabsConfig = [
  { id: "boleta", label: "Boleta", count: 0, href: "/comprobantes/boleta" },
  { id: "boleta_man", label: "Boleta Man.", count: 0, href: "/comprobantes/boleta_manual" },
  { id: "factura", label: "Factura", count: 1, href: "/comprobantes/factura" },
  { id: "factura_man", label: "Factura Man.", count: 0, href: "/comprobantes/factura_manual" },
  { id: "nota_credito", label: "Nota de Crédito", count: 0, href: "/comprobantes/nota_credito" },
  { id: "nota_debito", label: "Nota de Débito", count: 0, href: "/comprobantes/nota_debito" },
  { id: "guia_remision", label: "Guía Remisión", count: 0, href: "/comprobantes/guia_remision" },
  { id: "guia_remision_man", label: "Guía Remisión Man.", count: 0, href: "/comprobantes/guia_remision_manual" },
];

// 3. INTERFAZ DE PROPS (Lo que cada página individual le enviará a la plantilla)
interface ComprobantesTabTemplateProps {
  activeTab: string;
  columns: any[];
  data: any[];
  totalGeneral?: string;
  total?: string;
}

export function ComprobantesTabTemplate({ 
  activeTab, 
  columns, 
  data, 
  total = "S/0.00", 
  totalGeneral = "S/0.00" 
}: ComprobantesTabTemplateProps) {
  
  return (
    <main className="min-h-screen bg-gray-100 space-y-6 font-sans">
      <div className="pl-5 pr-5 mt-5">
        
        {/* ACORDEÓN DE RESUMEN */}
        <Accordion type="single" collapsible defaultValue="resumen" className="w-full bg-white border border-gray-200 shadow-sm rounded-sm mb-6">
          <AccordionItem value="resumen" className="border-none">
            <AccordionTrigger className="px-5 py-3 hover:no-underline border-b border-gray-200">
              <span className="font-bold text-[13px] text-gray-700">Resumen de Julio 2026</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-8 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SummaryCard items={boletasItems} size="lg" />
                <SummaryCard items={facturasItems} size="lg" />
                <SummaryCard items={notasItems} size="lg" />
                <SummaryCard items={guiasItems} size="lg" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-4 w-full">
          
          {/* Pestañas y Botones de Acción */}
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 gap-4 mb-4">
            <div className="flex flex-wrap gap-1 px-1">
              {tabsConfig.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <Link key={tab.id} href={tab.href}>
                    <div className={`flex items-center px-4 py-2.5 text-[12px] font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-white border border-gray-200 border-b-white text-gray-800 rounded-t-sm -mb-[1px] relative z-10' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-transparent border-b-transparent'
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

          {/* Filtros y Tabla */}
          <div className="space-y-4">
            {/* Barra de Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              <div className="flex">
                <input 
                  type="text" 
                  value="01/07/2026 - 31/07/2026" 
                  readOnly
                  className="w-full bg-[#eaebed] border border-gray-300 text-gray-600 text-[12px] px-3 py-2 outline-none rounded-l-sm"
                />
                <button className="bg-[#6c757d] hover:bg-gray-600 text-white px-3 py-2 rounded-r-sm transition-colors cursor-pointer border border-[#6c757d]">
                  <RotateCcw size={14} />
                </button>
              </div>

              <div>
                <input type="text" placeholder="Estado de Pago" className="w-full border border-gray-300 text-[12px] px-3 py-2 outline-none focus:border-[#1a5eb3] rounded-sm transition-colors"/>
              </div>

              <div>
                <select className="w-full border border-gray-300 text-[12px] text-gray-500 px-3 py-2 outline-none focus:border-[#1a5eb3] rounded-sm transition-colors bg-white cursor-pointer">
                  <option value="">Estado Sunat</option>
                  <option value="enviado">Enviado</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>

              <div>
                <input type="text" placeholder="Buscar:" className="w-full border border-gray-300 text-[12px] px-3 py-2 outline-none focus:border-[#1a5eb3] rounded-sm transition-colors"/>
              </div>

              <div>
                <Button className="w-full bg-[#2C1FF3] hover:bg-blue-800 text-white text-[12px] font-bold rounded-sm h-[34px] cursor-pointer shadow-sm">
                  Buscar
                </Button>
              </div>
            </div>

            {/* TABLA DINÁMICA (Aquí entran los datos de cada página) */}
            <div className="border border-gray-200 rounded-sm overflow-hidden">
              <DataTable 
                columns={columns} 
                data={data} 
                showSelection={false} 
              />
              <div className="flex justify-end items-center gap-12 bg-white px-6 py-3 border-t border-gray-200 text-[12px] font-bold text-gray-800">
                <span className="mr-8">Total: {total}</span>
                <span className="mr-[12%]">Total G.: {totalGeneral}</span>
              </div>
            </div>

            {/* Paginación */}
            <div className="flex justify-between items-center text-[13px] text-gray-500 pt-1">
              <div>Ver {data.length > 0 ? 1 : 0} a {data.length} de {data.length} entradas</div>
              <div className="flex border border-gray-200 rounded-sm overflow-hidden">
                <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-400 border-r border-gray-200 transition-colors cursor-not-allowed">Anterior</button>
                <button className="px-3 py-1.5 bg-[#2C1FF3] text-white font-medium cursor-default">1</button>
                <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-400 border-l border-gray-200 transition-colors cursor-not-allowed">Siguiente</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}