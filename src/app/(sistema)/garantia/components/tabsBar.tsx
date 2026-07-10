import { useState } from "react";
import Modal from "./modal"
import { TabsNav } from "./TabsNav";
import { ActionButton } from "@/components/common/ActionButton";
import { Plus, Download, ChevronDown } from "lucide-react";
import garantiaMock from "../data/garantia-mock.json";

export default function TabsBar({ type = "ingreso" }: { type?: "ingreso" | "egreso" | "tecnico" }) {
    const [isOpen, setIsOpen] = useState(false);

    const ingresoCount = garantiaMock.length;
    const egresoCount = garantiaMock.filter(item => item.estadoActual === "egresado" || item.estadoActual === "en_revision" || item.estadoActual === "reparado").length;
    const tecnicoCount = garantiaMock.filter(item => item.estadoActual === "en_revision" || item.estadoActual === "reparado").length;

    const tabs = [
        { key: "ingreso", label: "Guía de Ingreso", count: ingresoCount, color: "#0d9488", href: "/garantia/ingreso" },
        { key: "egreso", label: "Guía de Egreso", count: egresoCount, color: "#2563eb", href: "/garantia/egreso" },
        { key: "tecnico", label: "Guía de Informe Técnico", count: tecnicoCount, color: "#f97316", href: "/garantia/tecnico" },
    ];

    return (
        <>
            <div className="flex items-end justify-between border-b border-gray-200 w-full text-gray-500">
                <div className="flex items-center">
                    <TabsNav tabs={tabs} />
                </div>

                <div className="flex items-center gap-2 pb-2 pr-4">
                    {type === "ingreso" && (
                        <ActionButton
                            icon={<Plus className="w-4 h-4" strokeWidth={4} />}
                            onClick={() => setIsOpen(true)}
                        />
                    )}
                    <ActionButton
                        icon={
                            <div className="flex items-center gap-1">
                                <Download className="w-4 h-4" strokeWidth={2.5} />
                                <ChevronDown className="w-3 h-3" strokeWidth={3} />
                            </div>
                        }
                        className="px-6"
                        isPopover={true}
                        popoverOptions={[
                            { label: "Imprimir", onClick: () => console.log("Imprimir") },
                            { label: "Excel", onClick: () => console.log("Excel") },
                            { label: "PDF", onClick: () => console.log("PDF") },
                            { label: "Correo", onClick: () => console.log("Correo") },
                            { label: "Whatsapp", onClick: () => console.log("Whatsapp") },
                        ]}
                    />
                </div>

                {isOpen && (
                    <Modal onClose={() => setIsOpen(false)} />
                )}
            </div>
        </>
    );
}