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

export default function TabsBar() {
    const [isOpen, setIsOpen] = useState(false);
    const tabs = [
        { key: "ingreso", label: "Guía de Ingreso", count: 1, color: "#FF0000", href: "/garantia/ingreso"},
        { key: "egreso", label: "Guía de Egreso", count: 1, color: "#008000", href: "/garantia/egreso"},
        { key: "tecnico", label: "Guía de Informe Técnico", count: 1, color: "#FFA500", href: "/garantia/tecnico"},
    ];

    return (
        <>
        <div className="flex items-center justify-between w-full text-gray-500 mb-1">
            <TabsNav tabs={tabs} />
            
            <div className="flex gap-4">
                <button onClick={() => setIsOpen(true)} className="bg-[#2C1FF3] hover:bg-[#190FCE]! add-btn text-white p-2 px-4 rounded">
                    <i className="fa fa-plus" style={{
                        fontSize: "15px",
                        textShadow: "0 0 1px currentColor",
                        translate: "0 1px"
                    }}></i>
                </button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="bg-[#2C1FF3] hover:bg-[#190FCE]! download-btn text-white p-2 px-4 rounded flex gap-2">
                            <i className="fa fa-download" style={{
                                fontSize: "15px",
                                textShadow: "0 0 1px currentColor",
                                translate: "0 2px"
                            }}></i>
                            <i className="bi bi-caret-down-fill translate-y-1" style={{
                                fontSize: "8px",
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