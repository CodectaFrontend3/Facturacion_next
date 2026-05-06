import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import Modal from "@/app/garantia/components/modal";
import { TabsNav } from "./TabsNav";

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
                <button onClick={() => setIsOpen(true)} className="add-btn bg-blue-700 text-white p-2 px-4 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                     </svg>
                </button>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="bi bi-download download-btn bg-blue-700 text-white p-2 px-4 rounded">
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