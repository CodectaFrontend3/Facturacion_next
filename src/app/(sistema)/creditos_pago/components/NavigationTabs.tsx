"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabItem {
  name: string;
  href: string;
  count: number;
  badgeColor?: string;
}

interface NavigationTabsProps {
  tabs: TabItem[];
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function NavigationTabs({ tabs, children, actions }: NavigationTabsProps) {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* CORRECCIÓN AQUÍ: Cambiado 'border' por 'border-b' para que sea una línea divisoria limpia en la base */}
      <div className="flex items-end justify-between border-b border-gray-200 px-6 pt-4 bg-[#fcfcfd]">
        {/* Renderiza las pestañas */}
        <nav className="flex items-end space-x-1">
          {tabs.map((tab) => {
            // Normalización robusta de rutas por si Next.js añade slashes al final
            const cleanPathname = pathname.replace(/\/$/, "");
            const cleanHref = tab.href.replace(/\/$/, "");
            const isActive =
              cleanPathname === cleanHref ||
              pathname.startsWith(`${tab.href}/`);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`
                  flex items-center px-4 py-2.5 text-[13px] transition-all border-t border-l border-r rounded-t-lg
                  cursor-pointer select-none -mb-px
                  ${
                    isActive
                      ? "bg-white border-gray-200 text-slate-800 font-bold z-10 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]"
                      : "bg-gray-50/60 border-transparent text-slate-400 hover:text-slate-600 hover:bg-gray-100/80"
                  }
                `}
              >
                <span
                  style={{ backgroundColor: tab.badgeColor || "#2C1FF3" }}
                  className="text-white text-[10px] px-1.5 py-0.5 rounded mr-2 flex items-center justify-center min-w-[18px] font-bold"
                >
                  {tab.count}
                </span>
                <span
                  className={`text-sm ${isActive ? "font-bold text-slate-900" : "font-medium text-slate-500"}`}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Renderiza las acciones si se proporcionan */}
        {actions && (
          <div className="mb-2 flex items-center gap-2">{actions}</div>
        )}
      </div>

      {/* Contenido de la pestaña */}
      <div className="p-6 h-auto bg-white">{children}</div>
    </div>
  );
}

export default NavigationTabs;
