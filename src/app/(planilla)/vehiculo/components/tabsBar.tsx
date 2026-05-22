"use client";

import { useState } from "react";
import Modal from "@/app/garantia/components/modal";
import {
    VehiculoTabsNav,
    VehiculoTab,
} from "./TabsNav";

import "font-awesome/css/font-awesome.min.css";

export default function VehiculoTabsBar() {
    const [isOpen, setIsOpen] = useState(false);

    const vehiculoTabs: VehiculoTab[] = [
        { key: "publico", label: "Transporte Público", href: "/vehiculo/publico" },
        { key: "privado", label: "Transporte Privado", href: "/vehiculo/privado" },
    ];

    return (
        <>
            <div className="flex items-center justify-between w-full text-gray-500 mb-1">
                <VehiculoTabsNav tabs={vehiculoTabs} />
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-[#1a5eb3] hover:bg-[#1a3bb3] add-btn text-white p-2 px-4 rounded"
                    >
                        Agregar
                    </button>
                </div>
                {isOpen && (
                    <Modal onClose={() => setIsOpen(false)} />
                )}
            </div>
        </>
    );
}