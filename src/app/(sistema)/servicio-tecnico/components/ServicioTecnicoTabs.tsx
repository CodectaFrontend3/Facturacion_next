"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function ServicioTecnicoTabs({ children, actions }: Props) {
  const pathname = usePathname();

  // Los tabs ahora solo manejan la navegación
  const tabs = [
    { name: "Servicios", href: "/servicio-tecnico/servicios", count: 0 },
    { name: "Cotización", href: "/servicio-tecnico/cotizacion", count: 0 },
    {
      name: "Orden Servicio",
      href: "/servicio-tecnico/orden-servicio",
      count: 0,
    },
    { name: "Entregados", href: "/servicio-tecnico/entregados", count: 0 },
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
                <span className="bg-[#2C1FF3] text-white text-[10px] px-1.5 py-0.5 rounded mr-2 flex items-center justify-center min-w-4.5 font-bold">
                  {tab.count}
                </span>
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

export default ServicioTecnicoTabs;
