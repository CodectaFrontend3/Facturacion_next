"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, File as FileIcon, User, Plus, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SummaryCard } from "@/components/shared/SummaryCard";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";

import { DataFilters } from "@/components/DataFilters/DataFilters";
import { FilterDateRange } from "@/components/DataFilters/FilterDateRange";
import { FilterSearch } from "@/components/DataFilters/FilterSearch";
import { FilterSelect } from "@/components/DataFilters/FilterSelect";

// 1. CONFIGURACIÓN DE TARJETAS DE RESUMEN
export interface SummaryItemData {
  icon: any;
  label: string;
  count: string;
  amount: string;
  tone: { ring: string; amount: string };
}

// 2. RUTAS DE LAS PESTAÑAS
export const tabsConfig = [
  { id: "boleta", label: "Boleta", href: "/comprobantes/boleta", color: "#1AB394" },
  { id: "boleta_man", label: "Boleta Man.", href: "/comprobantes/boleta_manual", color: "#1AB394" },
  { id: "factura", label: "Factura", href: "/comprobantes/factura", color: "#F8AC59" },
  { id: "factura_man", label: "Factura Man.", href: "/comprobantes/factura_manual", color: "#F8AC59" },
  { id: "nota_credito", label: "Nota de Crédito", href: "/comprobantes/nota_credito", color: "#ED5565" },
  { id: "nota_debito", label: "Nota de Débito", href: "/comprobantes/nota_debito", color: "#ED5565" },
  { id: "guia_remision", label: "Guía Remisión", href: "/comprobantes/guia_remision", color: "#2C1FF3" },
  { id: "guia_remision_man", label: "Guía Remisión Man.", href: "/comprobantes/guia_remision_manual", color: "#2C1FF3" },
];

// 3. INTERFAZ DE PROPS
interface ComprobantesTabTemplateProps {
  activeTab: string;
  columns: any[];
  data: any[];
  totalGeneral?: string;
  total?: string;
  onSearchChange?: (search: string) => void;
}

export function ComprobantesTabTemplate({ 
  activeTab, 
  columns, 
  data, 
  total = "S/0.00", 
  totalGeneral = "S/0.00" 
}: ComprobantesTabTemplateProps) {

  // ESTADO PARA CONTEO DINÁMICO DE LAS PESTAÑAS Y MONTOS
  const [conteos, setConteos] = useState<Record<string, number>>({
    boleta: 0,
    boleta_man: 0,
    factura: 0,
    factura_man: 0,
    nota_credito: 0,
    nota_debito: 0,
    guia_remision: 0,
    guia_remision_man: 0
  });

  const [totalesResumen, setTotalesResumen] = useState<Record<string, string>>({
    boleta: "S/ 0.00",
    boleta_man: "S/ 0.00",
    factura: "S/ 0.00",
    factura_man: "S/ 0.00",
    nota_credito: "S/ 0.00",
    nota_debito: "S/ 0.00",
    guia_remision: "0 Guías",
    guia_remision_man: "0 Guías"
  });

  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    estadoPago: "",
    estadoSunat: "",
    search: "",
  });

  const calculateSum = (items: any[]) => {
    const sum = items.reduce((acc, row) => {
      if (!row.importe) return acc;
      const num = parseFloat(String(row.importe).replace(/S\/|,/g, "").trim());
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
    return `S/ ${sum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // EFECTO QUE SE DISPARA AL CARGAR LA DATA PARA LEER EL LOCALSTORAGE
  useEffect(() => {
    try {
      const boletasStorage = JSON.parse(localStorage.getItem('boletas_guardadas') || '[]');
      const boletasManStorage = JSON.parse(localStorage.getItem('boletas_manual_guardadas') || '[]');
      const facturasStorage = JSON.parse(localStorage.getItem('facturas_guardadas') || '[]');
      const facturasManStorage = JSON.parse(localStorage.getItem('facturas_manual_guardadas') || '[]');
      const notasCreditoStorage = JSON.parse(localStorage.getItem('notas_credito_guardadas') || '[]');
      const notasDebitoStorage = JSON.parse(localStorage.getItem('notas_debito_guardadas') || '[]');
      const guiasStorage = JSON.parse(localStorage.getItem('guias_remision_guardadas') || '[]');
      const guiasManStorage = JSON.parse(localStorage.getItem('guias_remision_manual_guardadas') || '[]');

      // Default mock totals
      const boletasMock = [
        { importe: "S/1,453.76" },
        { importe: "S/810.40" }
      ];
      const boletasManMock = [
        { importe: "S/320.00" },
        { importe: "S/540.00" }
      ];
      const facturasMock = [
        { importe: "S/1,453.76" }
      ];
      const facturasManMock = [
        { importe: "S/2,100.00" },
        { importe: "S/950.00" }
      ];
      const notasCredMock = [
        { importe: "S/450.00" }
      ];
      const notasDebMock = [
        { importe: "S/120.00" }
      ];

      const allBoletas = [...boletasStorage, ...boletasMock];
      const allBoletasMan = [...boletasManStorage, ...boletasManMock];
      const allFacturas = [...facturasStorage, ...facturasMock];
      const allFacturasMan = [...facturasManStorage, ...facturasManMock];
      const allNotasCred = [...notasCreditoStorage, ...notasCredMock];
      const allNotasDeb = [...notasDebitoStorage, ...notasDebMock];
      const allGuias = [...guiasStorage, { id: 1 }, { id: 2 }];
      const allGuiasMan = [...guiasManStorage, { id: 1 }];

      setConteos({
        boleta: allBoletas.length,
        boleta_man: allBoletasMan.length,
        factura: allFacturas.length,
        factura_man: allFacturasMan.length,
        nota_credito: allNotasCred.length,
        nota_debito: allNotasDeb.length,
        guia_remision: allGuias.length,
        guia_remision_man: allGuiasMan.length
      });

      setTotalesResumen({
        boleta: calculateSum(allBoletas),
        boleta_man: calculateSum(allBoletasMan),
        factura: calculateSum(allFacturas),
        factura_man: calculateSum(allFacturasMan),
        nota_credito: calculateSum(allNotasCred),
        nota_debito: calculateSum(allNotasDeb),
        guia_remision: `${allGuias.length} Guías`,
        guia_remision_man: `${allGuiasMan.length} Guías`
      });
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Interactive filtering is computed below
  };

  const handleReset = () => {
    setFilters({ fechaInicio: "", fechaFin: "", estadoPago: "", estadoSunat: "", search: "" });
  };

  // Filtrado local inteligente sobre la data
  const filteredData = React.useMemo(() => {
    return data.filter(item => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesNro = item.nro ? String(item.nro).toLowerCase().includes(query) : false;
        const matchesCliente = item.cliente ? String(item.cliente).toLowerCase().includes(query) : false;
        const matchesDoc = item.rucDni ? String(item.rucDni).toLowerCase().includes(query) : false;
        const matchesDest = item.destinatario ? String(item.destinatario).toLowerCase().includes(query) : false;
        const matchesMotivo = item.motivo ? String(item.motivo).toLowerCase().includes(query) : false;
        if (!matchesNro && !matchesCliente && !matchesDoc && !matchesDest && !matchesMotivo) {
          return false;
        }
      }
      if (filters.estadoPago) {
        if (filters.estadoPago === "pagado" && item.forma && !item.forma.toLowerCase().includes("contado")) {
          // just basic condition
        }
      }
      return true;
    });
  }, [data, filters]);

  const boletasItems: SummaryItemData[] = [
    { icon: FileText, label: "Boleta", count: `${conteos.boleta} Documentos`, amount: totalesResumen.boleta, tone: { ring: "border-[#1AB394]", amount: "text-[#1AB394]" } },
    { icon: FileText, label: "Boleta Manual", count: `${conteos.boleta_man} Documentos`, amount: totalesResumen.boleta_man, tone: { ring: "border-[#1AB394]", amount: "text-[#1AB394]" } }
  ];

  const facturasItems: SummaryItemData[] = [
    { icon: FileText, label: "Factura", count: `${conteos.factura} Documentos`, amount: totalesResumen.factura, tone: { ring: "border-[#F8AC59]", amount: "text-[#F8AC59]" } },
    { icon: FileText, label: "Factura Manual", count: `${conteos.factura_man} Documentos`, amount: totalesResumen.factura_man, tone: { ring: "border-[#F8AC59]", amount: "text-[#F8AC59]" } }
  ];

  const notasItems: SummaryItemData[] = [
    { icon: FileIcon, label: "Nota de Crédito", count: `${conteos.nota_credito} Documentos`, amount: totalesResumen.nota_credito, tone: { ring: "border-[#ED5565]", amount: "text-[#ED5565]" } },
    { icon: FileIcon, label: "Nota de Débito", count: `${conteos.nota_debito} Documentos`, amount: totalesResumen.nota_debito, tone: { ring: "border-[#ED5565]", amount: "text-[#ED5565]" } }
  ];

  const guiasItems: SummaryItemData[] = [
    { icon: User, label: "Guía Remisión", count: `${conteos.guia_remision} Documentos`, amount: totalesResumen.guia_remision, tone: { ring: "border-[#2C1FF3]", amount: "text-[#2C1FF3]" } },
    { icon: User, label: "Guía Remisión Man.", count: `${conteos.guia_remision_man} Documentos`, amount: totalesResumen.guia_remision_man, tone: { ring: "border-[#2C1FF3]", amount: "text-[#2C1FF3]" } }
  ];
  
  return (
    <main className="min-h-screen bg-[#f3f3f4] space-y-6 font-sans">
      <div className="pl-5 pr-5 mt-5">
        
        {/* ACORDEÓN DE RESUMEN */}
        <Accordion type="single" collapsible defaultValue="resumen" className="w-full bg-white border border-gray-200 shadow-sm rounded-none mb-6">
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

        {/* CONTENEDOR PRINCIPAL TAB + CONTENIDO */}
        <div className="w-full bg-white border border-gray-200 shadow-sm p-4">
          
          {/* Fila superior: Pestañas y Botones */}
          <div className="flex justify-between items-end border-b border-gray-200 relative z-10">
            <div className="flex flex-wrap">
              {tabsConfig.map((tab) => {
                const isActive = tab.id === activeTab;
                // Obtenemos el número dinámico (Si no existe en el estado, muestra 0)
                const numeroRegistros = conteos[tab.id] || 0;

                return (
                  <Link key={tab.id} href={tab.href}>
                    <div className={`flex items-center gap-2 px-4 py-2.5 text-[12px] font-bold transition-all relative top-[1px] ${
                      isActive 
                        ? 'bg-white border-x border-t border-gray-200 text-gray-800 rounded-t-sm z-10' 
                        : 'text-gray-500 border-x border-t border-transparent hover:text-gray-700 hover:bg-gray-50'
                    }`}>
                      <span
                        className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-[3px] text-white text-[10px]"
                        style={{ backgroundColor: tab.color }}
                      >
                        {/* APLICAMOS EL VALOR DINÁMICO */}
                        {numeroRegistros}
                      </span>
                      {tab.label}
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Botones de acción */}
            <div className="flex gap-2 pb-2">              
              <Link href={`${tabsConfig.find(t => t.id === activeTab)?.href}/crear`}>
                <Button className="bg-[#2C1FF3] hover:bg-blue-800 text-white h-8 w-10 px-0 rounded-[4px] shadow-sm cursor-pointer transition-colors">
                  <Plus size={16} />
                </Button>
              </Link>
              <Button className="bg-[#2C1FF3] hover:bg-blue-800 text-white h-8 px-3 rounded-[4px] shadow-sm cursor-pointer transition-colors flex items-center gap-1">
                <Download size={14} />
                <i className="bi bi-chevron-down text-[10px] font-bold ml-1"></i>
              </Button>
            </div>
          </div>

          {/* CAJA PRINCIPAL DE CONTENIDO */}
          <div className="bg-white border-x border-b border-gray-200 p-5 rounded-b-sm shadow-sm space-y-5 relative z-0">
            
            {/* FILTROS GLOBALES */}
            <div className="flex flex-col gap-4 text-gray-500 border border-gray-200 p-4 bg-gray-50/30">
              <DataFilters onSearch={handleSearch} onReset={handleReset}>
                <FilterDateRange
                  nameFrom="fechaInicio"
                  nameTo="fechaFin"
                  valueFrom={filters.fechaInicio}
                  valueTo={filters.fechaFin}
                  onChange={handleFilterChange}
                />

                <FilterSelect
                  name="estadoPago"
                  value={filters.estadoPago}
                  onChange={handleFilterChange}
                  options={[
                    { label: "Estado de Pago", value: "" },
                    { label: "Pagado", value: "pagado" },
                    { label: "Sin Pagar", value: "sin_pagar" },
                  ]}
                />

                <FilterSelect
                  name="estadoSunat"
                  value={filters.estadoSunat}
                  onChange={handleFilterChange}
                  options={[
                    { label: "Estado Sunat", value: "" },
                    { label: "Enviado", value: "enviado" },
                    { label: "Pendiente", value: "pendiente" },
                  ]}
                />

                <FilterSearch
                  name="search"
                  placeholder="Buscar:"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </DataFilters>
            </div>

            {/* TABLA, TOTALES Y PAGINACIÓN INTEGRADA */}
            <div className="flex flex-col w-full relative custom-table-wrapper">
              
              {/* Estilos para colapsar los espacios vacíos y reordenar */}
              <style>{`
                .custom-table-wrapper > div:first-of-type {
                  display: contents;
                }
                .custom-table-wrapper > div:first-of-type > .border {
                  order: 1 !important;
                  border-bottom-width: 0px !important;
                  border-bottom-left-radius: 0px !important;
                  border-bottom-right-radius: 0px !important;
                  /* Elimina la altura mínima forzada que deja el hueco en blanco */
                  min-height: auto !important; 
                  flex-grow: 0 !important;
                  margin-bottom: 0px !important;
                }
                .custom-table-wrapper > div:first-of-type > div:last-of-type {
                  order: 3 !important;
                  padding-top: 1rem;
                  padding-bottom: 0.5rem;
                }
              `}</style>
              
              <DataTable 
                columns={columns} 
                data={filteredData} 
                showSelection={false} 
              />
              
              {/* FILA DE TOTALES */}
              <div className="order-2 flex justify-end bg-white px-8 py-3 border border-gray-200 w-full rounded-b-md shadow-sm z-10">
                <div className="flex gap-14 text-right">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Total</span>
                    <span className="text-[13px] font-extrabold text-gray-800 mt-0.5">{total}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Total G.</span>
                    <span className="text-[13px] font-extrabold text-gray-800 mt-0.5">{totalGeneral}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}