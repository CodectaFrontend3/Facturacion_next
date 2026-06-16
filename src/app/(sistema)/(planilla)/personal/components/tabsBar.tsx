import { useState } from "react";
import Modal from "@/app/(sistema)/garantia/components/modal";
import { TabsNav } from "./TabsNav";
import 'font-awesome/css/font-awesome.min.css'

export default function TabsBar() {
    const [isOpen, setIsOpen] = useState(false);
    const personalTabs = [
        { key: "activos", label: "Activos", count: 1, color: "#008000", href: "/personal/activos"},
        { key: "inactivos", label: "Inactivos", count: 1, color: "#FFA500", href: "/personal/inactivos"},
    ];

    return (
        <>
        <div className="flex items-center justify-between w-full text-gray-500 mb-1">
            <TabsNav tabs={personalTabs} />
            <div className="flex gap-4">
                <button onClick={() => setIsOpen(true)} className="bg-[#1a5eb3] hover:bg-[#1a3bb3]! add-btn text-white p-2 px-4 rounded">
                    <i className="fa fa-plus" style={{
                        fontSize: "15px",
                        textShadow: "0 0 1px currentColor",
                        translate: "0 1px"
                    }}></i>
                </button>
            </div>

            {isOpen && (
                <Modal onClose={() => setIsOpen(false)} />
            )}
        </div>
        </>
    );
}