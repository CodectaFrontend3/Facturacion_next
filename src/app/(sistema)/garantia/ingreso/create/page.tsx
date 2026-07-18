"use client"
import { InfoCard } from "../../components/cards-info/cards-info";
import { GridContent } from "../../components/cards-info/detail-grid";
import { TopHeader } from "../../components/cards-info/detail-header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CboData } from "@/components/common/CboData";
import { ClienteModal } from "@/app/(sistema)/venta_optimizado/_components/clientes/ClienteModal";
import { ProductoModal } from "@/app/(sistema)/(productos-servicios)/_components/productos/ProductoModal";
import { marcaOptions } from "../../components/selectOptions";

export default function CreateClient() {
    const router = useRouter();
    const clientes = [
        { nombre: "ABC", ruc: "891258913" }
    ];

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [activeTab, setActiveTab] = useState("descripcion");

    const [selectedCliente, setSelectedCliente] = useState("");
    const [selectedMarca, setSelectedMarca] = useState("");
    const [selectedModelo, setSelectedModelo] = useState("");
    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showProductoModal, setShowProductoModal] = useState(false);

    const clientesOptions = clientes.map((c, i) => ({ value: String(i), label: `${c.nombre} | ${c.ruc}` }));
    const modelosOptions = [{ value: "1", label: "MOUSE INALAMBRICO LENOVO 2 BOTONES" }];

    const [tabContent, setTabContent] = useState({
        descripcion: "",
        revision: "",
        estetica: ""
    });

    return (
        <div className="p-5 pb-2">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm mb-2 overflow-hidden">
                <TopHeader>
                    <div className="flex items-center justify-between w-full px-5 py-4">
                        <h1 className="text-lg font-semibold text-gray-700">
                            GUÍA DE INGRESO LN-000007
                        </h1>
                        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 text-xl">
                            ✕
                        </button>
                    </div>
                </TopHeader>
                <GridContent>
                    <InfoCard title="Datos Generales">
                        <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-4">
                            {/* Fila 1 */}
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                <label className="text-gray-700 font-semibold">Asunto:</label>
                                <input
                                    defaultValue="Ingreso de Equipo"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                <label className="text-gray-700 font-semibold leading-5">
                                    Técnico
                                    <br />
                                    Asignado:
                                </label>
                                <input
                                    value="Administrador Web"
                                    readOnly
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Fila 2 */}
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                <label className="text-gray-700 font-semibold">Motivo:</label>
                                <select className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none text-gray-600">
                                    <option value="Garantía">Garantía</option>
                                    <option value="Servicio">Servicio</option>
                                    <option value="Informativo">Informativo</option>
                                    <option value="Reingreso">Reingreso</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                <label className="text-gray-700 font-semibold">Fecha:</label>
                                <input
                                    type="date"
                                    value={date}
                                    readOnly
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Fila 3 */}
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 font-semibold">Cliente:</label>
                                <div className="grid grid-cols-[1fr_42px] w-full">
                                    <CboData
                                        items={clientesOptions}
                                        value={selectedCliente}
                                        onChange={setSelectedCliente}
                                        placeholder="Seleccionar Cliente"
                                        className="w-full rounded-none border-gray-300 h-full border-r-0"
                                        hideArrow={true}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowClienteModal(true)}
                                        className="bg-[#70757a] text-white px-3 hover:bg-gray-600 transition-colors rounded-r-sm h-[40px]"
                                        title="Agregar nuevo cliente"
                                    >
                                        +
                                    </button>
                                    <ClienteModal
                                        isOpen={showClienteModal}
                                        onClose={() => setShowClienteModal(false)}
                                    />
                                </div>
                            </div>

                            {/* Fila 4 */}
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 font-semibold">Contacto:</label>
                                <select
                                    className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none"
                                >
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </InfoCard>
                    <InfoCard title="Datos del Equipo">
                        <div className="col-span-2 space-y-4">

                            <div className="grid grid-cols-[130px_1fr_42px] items-center">
                                <label className="text-gray-700">
                                    Modelo:
                                </label>
                                <CboData
                                    items={modelosOptions}
                                    value={selectedModelo}
                                    onChange={setSelectedModelo}
                                    placeholder="Seleccionar Modelo"
                                    className="w-full rounded-none border-gray-300 h-full border-r-0"
                                    hideArrow={true}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowProductoModal(true)}
                                    className="h-full bg-[#70757a] hover:bg-gray-600 text-white rounded-r-sm px-2 transition-colors"
                                    title="Agregar nuevo producto"
                                >
                                    +
                                </button>
                                <ProductoModal
                                    isOpen={showProductoModal}
                                    onClose={() => setShowProductoModal(false)}
                                    onSave={() => setShowProductoModal(false)}
                                />
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700">
                                    Nro. Serie:
                                </label>
                                <input
                                    placeholder="0"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700">
                                    Código Interno:
                                </label>
                                <input
                                    placeholder="000000"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700 leading-5">
                                    Fecha de<br />Compra:
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none"
                                />
                            </div>
                        </div>
                    </InfoCard>
                    <InfoCard
                        title="Informe del Problema"
                        className="col-span-6"
                    >
                        <div className="col-span-2">
                            <div className="border-b border-gray-300">
                                <ul className="flex gap-1">
                                    <li>
                                        <button
                                            onClick={() => setActiveTab("descripcion")}
                                            className={`px-4 py-2 transition rounded-none font-semibold text-sm
                                                ${activeTab === "descripcion"
                                                    ? "border-t border-r border-l border-gray-200 text-gray-700 bg-white relative top-[1px]"
                                                    : "text-gray-400 hover:text-gray-600"
                                                }`}
                                        >
                                            Descripción del Problema
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab("revision")}
                                            className={`px-4 py-2 transition rounded-none font-semibold text-sm
                                                ${activeTab === "revision"
                                                    ? "border-t border-r border-l border-gray-200 text-gray-700 bg-white relative top-[1px]"
                                                    : "text-gray-400 hover:text-gray-600"
                                                }`}
                                        >
                                            Revisión y diagnóstico
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab("estetica")}
                                            className={`px-4 py-2 transition rounded-none font-semibold text-sm
                                                ${activeTab === "estetica"
                                                    ? "border-t border-r border-l border-gray-200 text-gray-700 bg-white relative top-[1px]"
                                                    : "text-gray-400 hover:text-gray-600"
                                                }`}
                                        >
                                            Estética
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="border border-t-0 border-gray-300 bg-white p-5">
                                <textarea
                                    value={tabContent[activeTab as keyof typeof tabContent]}
                                    onChange={(e) =>
                                        setTabContent((prev) => ({
                                            ...prev,
                                            [activeTab]: e.target.value,
                                        }))
                                    }
                                    placeholder={`Escribir aquí ${activeTab === 'descripcion' ? 'Descripción Del Problema' : activeTab === 'revision' ? 'Revisión y diagnostico' : 'Estética'}`}
                                    className="w-full min-h-[250px] border border-gray-300 bg-white rounded-none p-4 resize-none outline-none focus:border-gray-500 text-gray-700"
                                />
                            </div>
                        </div>
                    </InfoCard>
                </GridContent>
                <div className="flex justify-end px-5 pb-5">
                    <button className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white px-6 py-2 rounded-sm font-medium">
                        Grabar
                    </button>
                </div>
            </div>
        </div>
    )
}