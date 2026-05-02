import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

export default function tabsBar({ activeTab, setActiveTab }: any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <div className="flex items-center justify-between w-full text-gray-500 mb-1">
            <div className="flex">
                <button onClick={() => setActiveTab("ingreso")} 
                    className={`py-3 px-5 border-t border-l border-r border-gray-200
                                ${activeTab === "ingreso" ? "tab-active" : "tab-inactive"}`}>🟩 Guía de Ingreso
                </button>
                <button onClick={() => setActiveTab("egreso")} 
                    className={`py-3 px-5 border-t border-l border-r border-gray-200
                                ${activeTab === "egreso" ? "tab-active" : "tab-inactive"}`}>🟨 Guía de Egreso
                </button>
                <button onClick={() => setActiveTab("tecnico")} 
                    className={`py-3 px-5 border-t border-l border-r border-gray-200
                                ${activeTab === "tecnico" ? "tab-active" : "tab-inactive"}`}>🟥 Guía de Informe Técnico
                </button>
            </div>
        
            <div className="flex gap-4">
                <button className="add-btn bg-blue-700 text-white p-2 px-4 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </button>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <button className="download-btn bg-blue-700 text-white p-2 px-4 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                        </svg>
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
            
        </div>
        </>
    );
}