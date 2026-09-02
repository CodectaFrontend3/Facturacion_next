"use client"
import { InfoCard } from "../../../components/cards-info/cards-info";
import { GridContent } from "../../../components/cards-info/detail-grid";
import { TopHeader } from "../../../components/cards-info/detail-header";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import garantiaMock from "../../../data/garantia-mock.json";

export default function EditIngreso({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const garantia = garantiaMock.find((item) => item.id === Number(id));

    const [activeTab, setActiveTab] = useState("descripcion");
    const [serie, setSerie] = useState(garantia?.equipo.serie || "");
    const [codigoInterno, setCodigoInterno] = useState(garantia?.codigo || "");
    const [tabContent, setTabContent] = useState({
        descripcion: garantia?.ingreso.problemaReportado || "",
        revision: garantia?.tecnico.revision || "",
        estetica: garantia?.ingreso.estetica || "",
    });

    if (!garantia) {
        return <div>No encontrado</div>;
    }

    return (
        <div className="p-5 pb-2">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm mb-2 overflow-hidden">
                <TopHeader>
                    <div className="flex items-center justify-between w-full px-5 py-4">
                        <h1 className="text-lg font-semibold text-gray-700">
                            EDITAR GUÍA DE INGRESO — {garantia.codigo}
                        </h1>
                        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer">
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
                                    value="Ingreso de Equipo"
                                    disabled
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                <label className="text-gray-700 font-semibold leading-5">
                                    Técnico
                                    <br />
                                    Asignado:
                                </label>
                                <input
                                    value={garantia.tecnico.asignado || "Administrador Web"}
                                    disabled
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Fila 2 */}
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                <label className="text-gray-700 font-semibold">Motivo:</label>
                                <input
                                    value="Garantía"
                                    disabled
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                                <label className="text-gray-700 font-semibold">Fecha:</label>
                                <input
                                    type="date"
                                    value={garantia.fechas.ingreso?.split("/").reverse().join("-") || ""}
                                    disabled
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Fila 3 */}
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 font-semibold">Cliente:</label>
                                <input
                                    value={`${garantia.cliente.nombre} | ${garantia.cliente.ruc}`}
                                    disabled
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Fila 4 */}
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 font-semibold">Contacto:</label>
                                <input
                                    disabled
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </InfoCard>

                    <InfoCard title="Datos del Equipo">
                        <div className="col-span-2 space-y-4">
                            <div className="grid grid-cols-[130px_1fr_42px] items-center">
                                <label className="text-gray-700">Modelo:</label>
                                <input
                                    disabled
                                    value={garantia.equipo.modelo}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    disabled
                                    className="h-full bg-gray-400 text-white rounded-r-sm px-2 cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700">Nro. Serie:</label>
                                <input
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none focus:border-gray-500"
                                />
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700">Código Interno:</label>
                                <input
                                    value={codigoInterno}
                                    onChange={(e) => setCodigoInterno(e.target.value)}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-none outline-none focus:border-gray-500"
                                />
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700 leading-5">Fecha de<br />Compra:</label>
                                <input
                                    type="date"
                                    disabled
                                    value={garantia.equipo.fechaCompra?.split("/").reverse().join("-") || ""}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-none outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </InfoCard>

                    {/* Informe del Problema — editable */}
                    <InfoCard title="Informe del Problema" className="col-span-6">
                        <div className="col-span-2">
                            <div className="border-b border-gray-300">
                                <ul className="flex gap-1">
                                    {[
                                        { key: "descripcion", label: "Descripción del Problema" },
                                        { key: "revision", label: "Revisión y diagnóstico" },
                                        { key: "estetica", label: "Estética" },
                                    ].map((tab) => (
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
                    <button className="bg-[#2C1FF3] hover:bg-[#190FCE] text-white px-6 py-2 rounded-sm font-medium">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
