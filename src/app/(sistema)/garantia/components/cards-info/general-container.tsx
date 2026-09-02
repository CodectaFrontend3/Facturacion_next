"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

export function GeneralContainer({ children }: Props) {
    const [headerVisible, setHeaderVisible] = useState(true);
    const router = useRouter();

    const childArray = React.Children.toArray(children);
    const topHeader = childArray[0];     // primer hijo = TopHeader (se colapsa)
    const content = childArray.slice(1); // resto = siempre visible

    return (
        <div className="bg-white border border-gray-200 mb-2">

            {/* Cuadro blanco de arriba: botones de control */}
            <div className="flex items-center justify-end gap-2 px-4 h-12">
                <button
                    type="button"
                    title={headerVisible ? "Ocultar encabezado" : "Mostrar encabezado"}
                    onClick={() => setHeaderVisible(!headerVisible)}
                    className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                    {headerVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <button
                    type="button"
                    title="Volver"
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>
            </div>

            {/* TopHeader: se colapsa con el acordeón */}
            {headerVisible && topHeader}

            {/* Contenido: siempre visible */}
            <div>
                {content}
            </div>
        </div>
    );
}
