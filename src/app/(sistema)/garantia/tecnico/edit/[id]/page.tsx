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

export default function EditInformeTecnico({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const garantia = garantiaMock.find((item) => item.id === Number(id));

    const [activeTab, setActiveTab] = useState<TabKey>("estetica");
    const [tabContent, setTabContent] = useState<Record<TabKey, string>>({
        estetica: garantia?.ingreso.estetica || "",
        revision: garantia?.tecnico.revision || "",
        causas: garantia?.ingreso.problemaReportado || "",
        solucion: garantia?.tecnico.solucion || "",
    });
    
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    if (!garantia) {
        return <div>Garantía no encontrada</div>;
    }

    return (
        <div className="p-5 pb-2">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm mb-2 overflow-hidden">
                <TopHeader>
                    <div className="flex items-center justify-between w-full px-5 py-4">
                        <h1 className="text-lg font-semibold text-gray-700 uppercase">
                            EDITAR INFORME TÉCNICO {garantia.codigo || "LN-000010"}
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
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 leading-5">
                                    Técnico.<br />Asignado:
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
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
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
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
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
                                    <label className="text-gray-700">Modelo:</label>
                                    <input
                                        disabled
                                        value={garantia.equipo.modelo || "MOUSE INALAMBRICO LENOVO 2 BOTONES"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                    <label className="text-gray-700">Nro. Serie:</label>
                                    <input
                                        disabled
                                        value={garantia.equipo.serie || "0123456"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="grid grid-cols-[130px_1fr] items-center gap-3">
                                    <label className="text-gray-700">Código Interno:</label>
                                    <input
                                        disabled
                                        value={garantia.codigo || "000312"}
                                        className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                    <label className="text-gray-700 leading-5">Fecha de<br />Compra:</label>
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

                    {/* ── Tabs del técnico ── */}
                    <div className="col-span-6">
                        <div>
                            <div className="border-b border-gray-300">
                                <ul className="flex flex-wrap gap-1">
                                    {TABS.map((tab) => (
                                        <li key={tab.key}>
                                            <button
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`px-4 py-2 transition rounded-none font-semibold text-sm
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
                                    className="w-full min-h-[250px] border border-gray-300 bg-white rounded-none p-4 resize-none outline-none focus:border-gray-500 text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Imágenes separadas */}
                        <div className="mt-4 border border-gray-300 p-4 space-y-2">
                            <p className="text-sm text-gray-600 font-medium">Imágenes</p>
                            <div className="border border-gray-200 rounded-none p-3 flex flex-col gap-4">
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="text-sm text-gray-500
                                            file:mr-3 file:py-1 file:px-3
                                            file:rounded-none file:border file:border-gray-400
                                            file:text-sm file:text-gray-700
                                            file:bg-white file:cursor-pointer
                                            hover:file:bg-gray-50"
                                    />
                                </div>
                                
                                {previewUrl && (
                                    <div className="flex gap-4 mt-2">
                                        <div className="relative border border-gray-300 w-24 h-24 flex flex-col items-center justify-center bg-gray-50 group overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <div className="flex-1 flex items-center justify-center p-1 w-full h-[calc(100%-20px)]">
                                                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <button
                                                onClick={handleRemoveImage}
                                                className="w-full bg-[#3d3d3d] text-white text-[11px] py-[2px] text-center"
                                            >
                                                Remove image
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </GridContent>
                <div className="flex justify-end gap-3 px-5 pb-5">
                    <button
                        onClick={() => router.back()}
                        className="border border-gray-300 text-gray-600 px-6 py-2 rounded-sm font-medium hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button className="bg-[#1a5eb3] hover:bg-[#174a8f] text-white px-6 py-2 rounded-sm font-medium">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    )
}
