"use client"
import { InfoCard } from "../../../components/cards-info/cards-info";
import { GridContent } from "../../../components/cards-info/detail-grid";
import { TopHeader } from "../../../components/cards-info/detail-header";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import garantiaMock from "../../../data/garantia-mock.json";

export default function EditEgreso({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const garantia = garantiaMock.find((item) => item.id === Number(id));

    const [activeTab, setActiveTab] = useState("descripcion");

    const [tabContent, setTabContent] = useState({
        descripcion: garantia?.ingreso.problemaReportado || "",
        diagnostico: garantia?.tecnico.revision || "",
        recomendaciones: garantia?.tecnico.recomendaciones || "",
    });

    if (!garantia) {
        return <div>Garantía no encontrada</div>;
    }

    return (
        <div className="p-5 pb-2">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm mb-2 overflow-hidden">
                <TopHeader>
                    <div className="flex items-center justify-between w-full px-5 py-4">
                        <h1 className="text-lg font-semibold text-gray-700 uppercase">
                            EDITAR GUÍA DE EGRESO — {garantia.codigo || "LN-000010"}
                        </h1>
                        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer">
                            ✕
                        </button>
                    </div>
                </TopHeader>
                <GridContent>
                    <InfoCard title="Datos Generales">
                        <div className="col-span-2 grid grid-cols-4 gap-6">
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 leading-5">
                                    Asunto:
                                </label>
                                <input
                                    disabled
                                    value={garantia.egreso?.asunto || "Entrega de equipo"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 leading-5">
                                    Técnico.
                                    <br />
                                    Asignado:
                                </label>
                                <input
                                    disabled
                                    value={garantia.tecnico.asignado || "Administrador Web"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Motivo:
                                </label>
                                <input
                                    disabled
                                    value={garantia.ingreso?.motivo || "Garantía"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Fecha:
                                </label>
                                <input
                                    type="date"
                                    disabled
                                    value={garantia.fechas.ingreso?.split("/").reverse().join("-") || "2026-06-29"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard title="Datos del Cliente">
                        <div className="col-span-2 grid grid-cols-4 gap-6">
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Nombre:</label>
                                <input
                                    disabled
                                    value={garantia.cliente.nombre || "prueba"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Teléfono:</label>
                                <input
                                    disabled
                                    value={garantia.cliente.telefono || "00000"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-4">
                                <label className="text-gray-700">Correo:</label>
                                <input
                                    disabled
                                    value={garantia.cliente.correo || "sincorreo@gmail.com"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard title="Datos del Equipo" className="col-span-6">
                        <div className="col-span-2 space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                                    <label className="text-gray-700">
                                        Modelo:
                                    </label>
                                    <input
                                        disabled
                                        value={garantia.equipo.modelo || "MOUSE INALAMBRICO LENOVO 2 BOTONES"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                    <label className="text-gray-700">
                                        Nro. Serie:
                                    </label>
                                    <input
                                        disabled
                                        value={garantia.equipo.serie || "0123456"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                                    <label className="text-gray-700">
                                        Código Interno:
                                    </label>
                                    <input
                                        disabled
                                        value={garantia.codigo || "000312"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                    <label className="text-gray-700 leading-5">
                                        Fecha de<br />Compra:
                                    </label>
                                    <input
                                        type="date"
                                        disabled
                                        value={garantia.equipo.fechaCompra?.split("/").reverse().join("-") || "2026-06-29"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    </InfoCard>

                    {/* Informe del Problema — editable */}
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
                                            onClick={() => setActiveTab("diagnostico")}
                                            className={`px-4 py-2 transition rounded-none font-semibold text-sm
                                                ${activeTab === "diagnostico"
                                                    ? "border-t border-r border-l border-gray-200 text-gray-700 bg-white relative top-[1px]"
                                                    : "text-gray-400 hover:text-gray-600"
                                                }`}
                                        >
                                            Diagnóstico y Solucion
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab("recomendaciones")}
                                            className={`px-4 py-2 transition rounded-none font-semibold text-sm
                                                ${activeTab === "recomendaciones"
                                                    ? "border-t border-r border-l border-gray-200 text-gray-700 bg-white relative top-[1px]"
                                                    : "text-gray-400 hover:text-gray-600"
                                                }`}
                                        >
                                            Recomendaciones
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
                                    placeholder={`Escribir aquí...`}
                                    className="w-full min-h-[250px] border border-gray-300 bg-white rounded-none p-4 resize-none outline-none focus:border-gray-500 text-gray-700"
                                />
                            </div>
                        </div>
                    </InfoCard>
                </GridContent>
                <div className="flex justify-end gap-3 px-5 pb-5">
                    <button
                        onClick={() => router.back()}
                        className="border border-gray-300 text-gray-600 px-6 py-2 rounded-sm font-medium hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button className="bg-[#1a5eb3] hover:bg-[#174a8f] text-white px-6 py-2 rounded-sm font-medium">
                        Grabar
                    </button>
                </div>
            </div>
        </div>
    )
}
