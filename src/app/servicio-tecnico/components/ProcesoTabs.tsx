"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function ProcesoTabs({ children, actions }: Props) {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id;

  // Los tabs ahora solo manejan la navegación
  const tabs = [
    { name: "Servicios", href: `/servicio-tecnico/servicios` },
    {
      name: "Ingresos",
      href: `/servicio-tecnico/servicios/proceso/${id}/ingresos`,
      count: 0,
    },
    {
      name: "Informe Técnico",
      href: `/servicio-tecnico/servicios/proceso/${id}/informe-tecnico`,
      count: 0,
    },
    {
      name: "Egresos",
      href: `/servicio-tecnico/servicios/proceso/${id}/egresos`,
      count: 0,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-4 lg:p-6">
      {/* Cabecera: Tabs + Acciones */}
      <div className="flex items-center justify-between">
        <nav className="flex items-end space-x-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`
                  flex items-center px-5 py-2.5 text-[13px] transition-all border-t border-l border-r rounded-t-lg
                  cursor-pointer select-none
                  ${
                    isActive
                      ? "bg-white border-gray-300 text-slate-700 font-bold -mb-px z-10 shadow-[0_-2px_5px_rgba(0,0,0,0.02)]"
                      : "bg-transparent border-transparent text-slate-400 hover:text-slate-600 hover:bg-gray-50"
                  }
                `}
              >
                {Object.hasOwn(tab, "count") && (
                  <span className="bg-[#1A5EB3] text-white text-[10px] px-1.5 py-0.5 rounded-[5px] mr-2 flex items-center justify-center min-w-4.5 font-bold">
                    {tab.count}
                  </span>
                )}
                {tab.name}
              </Link>
            );
          })}
        </nav>

        {/* Botones de acción (Printer, Download, etc.) */}
        <div className="mb-2 flex items-center gap-2">{actions}</div>
      </div>

      {/* Contenedor de contenido: Altura automática */}
      <div className="bg-white border border-gray-300 rounded-b-lg rounded-tr-none p-6 shadow-sm h-auto">
        {children}
      </div>
    </div>
  );
}

export default ProcesoTabs;
