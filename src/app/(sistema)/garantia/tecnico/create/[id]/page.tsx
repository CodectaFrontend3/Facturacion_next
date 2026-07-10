"use client"
import { InfoCard } from "../../../components/cards-info/cards-info";
import { GridContent } from "../../../components/cards-info/detail-grid";
import { TopHeader } from "../../../components/cards-info/detail-header";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import garantiaMock from "../../../data/garantia-mock.json";

type TabKey = "estetica" | "revision" | "causas" | "solucion";

const TABS: { key: TabKey; label: string }[] = [
    { key: "estetica", label: "Estética" },
    { key: "revision", label: "Revisión y diagnóstico" },
    { key: "causas", label: "Causas del problema" },
    { key: "solucion", label: "Solución" },
];

export default function CreateInformeTecnico({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const garantia = garantiaMock.find((item) => item.id === Number(id));

    const [activeTab, setActiveTab] = useState<TabKey>("estetica");
    const [tabContent, setTabContent] = useState<Record<TabKey, string>>({
        estetica: "",
        revision: "",
        causas: "",
        solucion: "",
    });
    const [images, setImages] = useState<FileList | null>(null);

    if (!garantia) {
        return <div>Garantía no encontrada</div>;
    }

    return (
        <div className="p-5 pb-2">
            <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-2 overflow-hidden">
                <TopHeader>
                    <div className="flex items-center justify-between w-full px-5 py-4">
                        <h1 className="text-lg font-semibold text-gray-700 uppercase">
                            INFORME TÉCNICO {garantia.codigo || "LN-000010"}
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
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 leading-5">
                                    Técnico.<br />Asignado:
                                </label>
                                <input
                                    disabled
                                    value={garantia.tecnico.asignado || "Administrador Web"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Motivo:
                                </label>
                                <input
                                    disabled
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Fecha:
                                </label>
                                <input
                                    type="date"
                                    disabled
                                    value={garantia.fechas.ingreso?.split("/").reverse().join("-") || "2026-06-29"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
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
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Teléfono:</label>
                                <input
                                    disabled
                                    value={garantia.cliente.telefono || "00000"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-4">
                                <label className="text-gray-700">Correo:</label>
                                <input
                                    disabled
                                    value={garantia.cliente.correo || "sincorreo@gmail.com"}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                />
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard title="Datos del Equipo" className="col-span-6">
                        <div className="col-span-2 space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                                    <label className="text-gray-700">Modelo:</label>
                                    <input
                                        disabled
                                        value={garantia.equipo.modelo || "MOUSE INALAMBRICO LENOVO 2 BOTONES"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                    <label className="text-gray-700">Nro. Serie:</label>
                                    <input
                                        disabled
                                        value={garantia.equipo.serie || "0123456"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                    />
                                </div>
                                <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                                    <label className="text-gray-700">Código Interno:</label>
                                    <input
                                        disabled
                                        value={garantia.codigo || "000312"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                    <label className="text-gray-700 leading-5">Fecha de<br />Compra:</label>
                                    <input
                                        type="date"
                                        disabled
                                        value={garantia.equipo.fechaCompra?.split("/").reverse().join("-") || "2026-06-29"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </InfoCard>

                    {/* ── Informe del Problema (pestañas del técnico) ── */}
                    <InfoCard title="Informe del Problema" className="col-span-6">
                        <div className="col-span-2">
                            <div className="border-b border-gray-300">
                                <ul className="flex flex-wrap gap-1">
                                    {TABS.map((tab) => (
                                        <li key={tab.key}>
                                            <button
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`px-4 py-2 transition rounded-t-md font-semibold text-sm
                                                    ${activeTab === tab.key
                                                        ? "border-t border-r border-l border-gray-200 text-gray-700 bg-white relative top-[1px]"
                                                        : "text-gray-400 hover:text-gray-600"
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border border-t-0 border-gray-300 bg-white p-5">
                                <textarea
                                    value={tabContent[activeTab]}
                                    onChange={(e) =>
                                        setTabContent((prev) => ({
                                            ...prev,
                                            [activeTab]: e.target.value,
                                        }))
                                    }
                                    placeholder={`Escribir aquí ${TABS.find(t => t.key === activeTab)?.label}`}
                                    className="w-full min-h-[250px] border border-gray-300 bg-white rounded-sm p-4 resize-none outline-none focus:border-gray-500 text-gray-700"
                                />
                            </div>

                            {/* Imágenes */}
                            <div className="border border-t-0 border-gray-300 p-4 space-y-2">
                                <p className="text-sm text-gray-600 font-medium">Imágenes</p>
                                <div className="border border-gray-200 rounded-sm p-3">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => setImages(e.target.files)}
                                        className="text-sm text-gray-500
                                            file:mr-3 file:py-1 file:px-3
                                            file:rounded-sm file:border file:border-gray-400
                                            file:text-sm file:text-gray-700
                                            file:bg-white file:cursor-pointer
                                            hover:file:bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </InfoCard>
                </GridContent>
                <div className="flex justify-end px-5 pb-5">
                    <button className="bg-[#1a5eb3] hover:bg-[#174a8f] text-white px-6 py-2 rounded-sm font-medium">
                        Grabar
                    </button>
                </div>
            </div>
        </div>
    )
}
