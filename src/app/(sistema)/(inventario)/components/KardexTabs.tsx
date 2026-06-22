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

  const allTabs = [
    { name: "Entradas", href: "/kardex-entrada", count: 0 },
    { name: "Distribuciones", href: "/kardex-entrada-Distribucion", count: 0 },
    { name: "Traslados", href: "/kardex-entrada-Traslado-almacen", count: 0 },
    { name: "Salidas", href: "/kardex-salida", count: 0 },
  ];

  const activeTab = allTabs.find((tab) => pathname === tab.href);

  return (
    <div className="bg-white border border-gray-300 rounded-none p-4 shadow-sm w-full mb-12">
      <div className="flex items-center justify-between mb-1">
        <nav className="flex items-end space-x-1">
          {activeTab ? (
            <Link
              href={activeTab.href}
              className="flex items-center px-4 py-1.5 text-[12px] transition-all border-t border-l border-r rounded-t-md cursor-pointer select-none bg-white border-gray-300 text-slate-700 font-bold -mb-px z-10"
            >
              <span className="bg-[#1A5EB3] text-white text-[9px] px-1.5 py-0.5 rounded-sm mr-1.5 flex items-center justify-center min-w-4 font-bold">
                {activeTab.count}
              </span>
              {activeTab.name}
            </Link>
          ) : (
            <div className="px-4 py-1.5 text-[12px] border-t border-l border-r rounded-t-md bg-white border-gray-300 text-slate-700 font-bold -mb-px z-10">
              Kardex
            </div>
          )}
        </nav>

        <div className="mb-1 flex items-center gap-1.5 scale-90 origin-right">
          {actions}
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-md rounded-tl-none p-4 h-auto relative z-0">
        {children}
      </div>
    </div>
  );
}

export default KardexTabs;
