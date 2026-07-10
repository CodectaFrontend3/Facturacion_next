import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import Modal from "./modal"
import { TabsNav } from "./TabsNav";
import 'font-awesome/css/font-awesome.min.css';

export default function TabsBar({ type = "ingreso" }: { type?: "ingreso" | "egreso" | "tecnico" }) {
    const [isOpen, setIsOpen] = useState(false);
    const tabs = [
        { key: "ingreso", label: "Guía de Ingreso", count: 1, color: "#FF0000", href: "/garantia/ingreso"},
        { key: "egreso", label: "Guía de Egreso", count: 1, color: "#008000", href: "/garantia/egreso"},
        { key: "tecnico", label: "Guía de Informe Técnico", count: 1, color: "#FFA500", href: "/garantia/tecnico"},
    ];

    return (
        <>
        <div className="flex items-end justify-between border-b border-gray-200 w-full text-gray-500">
            <div className="flex items-center">
                <TabsNav tabs={tabs} />
            </div>
            
            <div className="flex items-center gap-2 pb-2 pr-4">
                {type === "ingreso" && (
                    <button onClick={() => setIsOpen(true)} className="bg-[#1a5eb3] hover:bg-[#1a3bb3]! add-btn text-white h-9 w-9 flex items-center justify-center rounded">
                        <i className="fa fa-plus" style={{
                            fontSize: "15px",
                            textShadow: "0 0 1px currentColor",
                        }}></i>
                    </button>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="bg-[#1a5eb3] hover:bg-[#1a3bb3]! download-btn text-white h-9 px-6 rounded flex items-center justify-center gap-2">
                            <i className="fa fa-download" style={{
                                fontSize: "15px",
                                textShadow: "0 0 1px currentColor",
                            }}></i>
                            <i className="bi bi-caret-down-fill" style={{
                                fontSize: "10px",
                            }}></i>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="dropdown-menu bg-white text-gray-500 p-5">
                        <DropdownMenuItem className="dropdown-item"><i className="bi bi-printer"></i>Imprimir</DropdownMenuItem>
                        <DropdownMenuItem className="dropdown-item"><i className="bi bi-file-earmark-excel"></i>Excel</DropdownMenuItem>
                        <DropdownMenuItem className="dropdown-item"><i className="bi bi-file-earmark-pdf"></i>PDF</DropdownMenuItem>
                        <DropdownMenuItem className="dropdown-item"><i className="bi bi-envelope"></i>Correo</DropdownMenuItem>
                        <DropdownMenuItem className="dropdown-item"><i className="bi bi-whatsapp"></i>Whatsapp</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {isOpen && (
                <Modal onClose={() => setIsOpen(false)} />
            )}
        </div>
        </>
    );
}