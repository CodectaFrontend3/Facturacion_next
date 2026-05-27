"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface VehiculoTab {
    key: string;
    label: string;
    href: string;
}

interface VehiculoTabsNavProps {
    tabs: VehiculoTab[];
}

export function VehiculoTabsNav({
    tabs,
}: VehiculoTabsNavProps) {
    const pathname = usePathname();

    return (
        <div className="flex items-center">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link
                        key={tab.key}
                        href={tab.href}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all relative top-[1px]
                            ${isActive
                                ? "bg-white border-x border-t border-gray-200 text-gray-800 rounded-t-sm"
                                : "text-gray-500 border-x border-t border-transparent"
                            }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}