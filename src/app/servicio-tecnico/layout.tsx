"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Printer, Download } from "lucide-react";

const actionButtonClass = `
  flex items-center justify-center
  bg-[#1d4ed8] text-white p-2 rounded-md 
  cursor-pointer transition-all duration-200 ease-in-out
  hover:-translate-y-1 hover:shadow-lg hover:bg-blue-800 
  active:translate-y-0 active:shadow-sm
`;

export default function ServicioTecnicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Servicios",
      href: "/servicio-tecnico/servicios",
      count: 0,
      actions: (
        <button className={actionButtonClass}>
          <Plus size={20} strokeWidth={2.5} />
        </button>
      ),
    },
    {
      name: "Cotización",
      href: "/servicio-tecnico/cotizacion",
      count: 0,
      actions: (
        <div className="flex gap-2">
          <button className={actionButtonClass}>
            <Printer size={20} />
          </button>
          <button className={actionButtonClass}>
            <Download size={20} />
          </button>
        </div>
      ),
    },
    {
      name: "Orden Servicio",
      href: "/servicio-tecnico/orden-servicio",
      count: 0,
      actions: null,
    },
    {
      name: "Entregados",
      href: "/servicio-tecnico/entregados",
      count: 0,
      actions: null,
    },
  ];

  const activeTab = tabs.find((tab) => tab.href === pathname);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-4 lg:p-6">
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
                      ? "bg-white border-gray-300 text-slate-700 font-bold -mb-[1px] z-10 shadow-[0_-2px_5px_rgba(0,0,0,0.02)]"
                      : "bg-transparent border-transparent text-slate-400 hover:text-slate-600 hover:bg-gray-50"
                  }
                `}
              >
                <span className="bg-[#1d4ed8] text-white text-[10px] px-1.5 py-0.5 rounded mr-2 flex items-center justify-center min-w-[18px] font-bold">
                  {tab.count}
                </span>
                {tab.name}
              </Link>
            );
          })}
        </nav>

        <div className="mb-2">{activeTab?.actions}</div>
      </div>

      <div className="bg-white border border-gray-300 rounded-b-lg rounded-tr-none p-6 shadow-sm min-h-[calc(100vh-220px)]">
        {children}
      </div>
    </div>
  );
}
