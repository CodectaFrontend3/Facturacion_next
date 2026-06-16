"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function KardexTabs({ children, actions }: Props) {
  const pathname = usePathname();

  // Tus rutas configuradas exactamente como las tienes
  const allTabs = [
    { name: "Entradas", href: "/kardex-entrada", count: 0 },
    { name: "Distribuciones", href: "/kardex-entrada-Distribucion", count: 0 },
    { name: "Traslados", href: "/kardex-entrada-Traslado-almacen", count: 0 },
    { name: "Salidas", href: "/kardex-salida", count: 0 },
  ];

  // Buscamos únicamente la pestaña que haga match con la URL actual
  const activeTab = allTabs.find((tab) => pathname === tab.href);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-4 lg:p-6">
      {/* Cabecera: El Único Tab Activo a la izquierda + Acciones a la derecha */}
      <div className="flex items-center justify-between">
        <nav className="flex items-end space-x-1">
          {activeTab ? (
            <Link
              href={activeTab.href}
              className="flex items-center px-5 py-2.5 text-[13px] transition-all border-t border-l border-r rounded-t-lg cursor-pointer select-none bg-white border-gray-300 text-slate-700 font-bold -mb-px z-10 shadow-[0_-2px_5px_rgba(0,0,0,0.02)]"
            >
              {/* Contador azul dinámico de la imagen */}
              <span className="bg-[#1A5EB3] text-white text-[10px] px-1.5 py-0.5 rounded-[5px] mr-2 flex items-center justify-center min-w-4.5 font-bold">
                {activeTab.count}
              </span>
              {activeTab.name}
            </Link>
          ) : (
            /* Fallback por si heredas una subruta que no esté mapeada exactamente en el array */
            <div className="px-5 py-2.5 text-[13px] border-t border-l border-r rounded-t-lg bg-white border-gray-300 text-slate-700 font-bold -mb-px z-10">
              Kardex
            </div>
          )}
        </nav>

        {/* Botones de acción (Upload, Download, Plus) perfectamente alineados a la derecha */}
        <div className="mb-2 flex items-center gap-2">{actions}</div>
      </div>

      {/* Contenedor del contenido (Tabla, filtros, etc.) */}
      <div className="bg-white border border-gray-300 rounded-b-lg rounded-tr-none p-6 shadow-sm h-auto">
        {children}
      </div>
    </div>
  );
}

export default KardexTabs;
