"use client";

import { useMemo } from "react";
import { CantidadPrecioPieChart } from "./CantidadPrecioPieChart";
import { mockCantidadPrecioData } from "../_data/mockCantidadPrecio";
import productosRaw from "@/app/(sistema)/(productos-servicios)/data/productos-mock.json";
import serviciosRaw from "@/app/(sistema)/(productos-servicios)/data/servicios-mock.json";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ResumenCantidadPrecio() {
  const today = new Date();
  const month = today.toLocaleDateString("es-ES", { month: "long" });
  const mayus = month.charAt(0).toUpperCase() + month.slice(1);
  const title = `Resumen de ${mayus} ${today.getFullYear()}`;

  // Cálculo dinámico de productos desde la data del módulo productos-servicios
  const productosData = useMemo(() => {
    const activos = productosRaw.filter((p: any) => p.estado === "Activo").length;
    const inactivos = productosRaw.filter((p: any) => p.estado === "Inactivo").length;
    const anulados = productosRaw.filter((p: any) => p.estado === "Anulado").length;

    return [
      { name: "Activos", value: activos, color: "#4285F4" },
      { name: "Inactivos", value: inactivos, color: "#E0E0E0" },
      { name: "Anulados", value: anulados, color: "#CCCCCC" },
    ];
  }, []);

  // Cálculo dinámico de servicios desde la data del módulo productos-servicios
  const serviciosData = useMemo(() => {
    const activos = serviciosRaw.filter((s: any) => s.estado === "Activo").length;
    const anulados = serviciosRaw.filter((s: any) => s.estado === "Anulado").length;

    return [
      { name: "Activos", value: activos, color: "#10B981" },
      { name: "Anulados", value: anulados, color: "#1D549F" },
    ];
  }, []);

  const totalProductos = productosRaw.length;
  const totalServicios = serviciosRaw.length;

  return (
    <section className="bg-white rounded-none border border-gray-200 shadow-sm mb-5">
      <Accordion type="single" collapsible defaultValue="resumen">
        <AccordionItem value="resumen" className="border-none">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 rounded-none bg-white">
            <span className="text-sm font-semibold text-[#676a6c]">{title}</span>
            <AccordionTrigger className="p-1 cursor-pointer bg-white hover:bg-white hover:no-underline rounded-none [&>svg]:!hidden">
              <i className="bi bi-chevron-up text-[#c4c4c4] [-webkit-text-stroke:1px_#c4c4c4] transition-transform duration-200 group-data-[state=closed]/accordion-trigger:rotate-180" />
            </AccordionTrigger>
          </div>

          <AccordionContent className="!h-auto !overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-6 items-center">
              <CantidadPrecioPieChart
                data={productosData}
                totalLabel="Productos"
                totalCount={totalProductos}
              />
              <CantidadPrecioPieChart
                data={serviciosData}
                totalLabel="Servicios"
                totalCount={totalServicios}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
