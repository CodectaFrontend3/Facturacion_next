"use client";
import { useState } from "react"
import { usePathname } from "next/navigation";

import { VehiculoTabsNav, VehiculoTab } from "./TabsNav"

import VehiculoPublicoModal from "./VehiculoModal/PublicoModal/VehiculoPublicoModal"
import VehiculoPrivadoModal from "./VehiculoModal/PrivadoModal/VehiculoPrivadoModal"

import "font-awesome/css/font-awesome.min.css"

export default function VehiculoTabsBar() {
    const pathname = usePathname();
    const [modalType, setModalType] = useState<"publico" | "privado" | null>(null);

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
                        onClick={() => {
                            if (pathname.includes("publico")) {
                                setModalType("publico");
                            }

                            if (pathname.includes("privado")) {
                                setModalType("privado");
                            }
                        }}
                        className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white p-2 px-4 rounded cursor-pointer hover:translate-y-[-2px] transition duration-200"
                    >
                        Agregar
                    </button>
                </div>
                {modalType === "publico" && (
                    <VehiculoPublicoModal
                        onClose={() =>
                            setModalType(null)
                        }
                    />
                )}
                {modalType === "privado" && (
                    <VehiculoPrivadoModal
                        onClose={() =>
                            setModalType(null)
                        }
                    />
                )}
            </div>
        </>
    );
}