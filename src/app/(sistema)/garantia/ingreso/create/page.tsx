"use client"
import { InfoCard } from "../../components/cards-info/cards-info";
import { GridContent } from "../../components/cards-info/detail-grid";
import { TopHeader } from "../../components/cards-info/detail-header";
import { useEffect, useState } from "react";

export default function CreateClient() {
    const clientes = [
        { nombre: "ABC", ruc: "891258913" }
    ];

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [activeTab, setActiveTab] = useState("descripcion");

    const [tabContent, setTabContent] = useState({
        descripcion: "",
        revision: "",
        estetica: ""
    });

    return (
        <div className="bg-gray-100 min-h-screen p-5">
            <div className="bg-white border border-gray-200">
                <TopHeader>
                    <div className="flex items-center justify-between w-full px-5 py-4">
                        <h1 className="text-lg font-semibold text-gray-700">
                            GUÍA DE INGRESO LN-000007
                        </h1>
                        <button className="text-gray-400 hover:text-gray-600 text-xl">
                            ✕
                        </button>
                    </div>
                </TopHeader>
                <GridContent>
                    <InfoCard title="Datos Generales">
                        <div className="col-span-2 grid grid-cols-4 gap-6">
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700 leading-5">
                                    Técnico.
                                    <br />
                                    Asignado:
                                </label>
                                <input
                                    placeholder="Administrador Web"
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-[70px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">Fecha:
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-sm outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-4">
                                <label className="text-gray-700">Cliente:</label>
                                <div className="grid grid-cols-[1fr_42px] w-full">
                                    <select className="w-full border border-gray-300 px-3 py-2 rounded-l-sm outline-none">
                                        <option>Seleccionar Cliente</option>
                                        {clientes.map((cliente, index) => (
                                            <option key={index}>
                                                {cliente.nombre} | {cliente.ruc}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        className="bg-gray-600 hover:bg-gray-700 text-white rounded-r-sm"
                                    >
                                        +
                                    </button>
                                </div>

                            </div>
                            <div className="grid grid-cols-[110px_1fr] items-center gap-3 col-span-2">
                                <label className="text-gray-700">
                                    Contacto:
                                </label>
                                <select
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm outline-none"
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
                                <select
                                    className="w-full border border-gray-300 px-3 py-2 rounded-l-sm outline-none"
                                >
                                    <option>MOUSE INALAMBRICO LENOVO 2 BOTONES</option>
                                </select>
                                <button
                                    className="h-full bg-gray-600 hover:bg-gray-700 text-white rounded-r-sm"
                                >
                                    +
                                </button>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700">
                                    Nro. Serie:
                                </label>
                                <input
                                    placeholder="0"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-3">
                                <label className="text-gray-700">
                                    Código Interno:
                                </label>
                                <input
                                    placeholder="000000"
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm outline-none"
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
                                    className="w-full border border-gray-300 px-3 py-2 rounded-sm outline-none"
                                />
                            </div>
                        </div>
                    </InfoCard>
                    <InfoCard
                        title="Informe del Problema"
                        className="col-span-6"
                    >
                        <div className="col-span-2">
                            <div className="border-b border-gray-200">
                                <ul className="flex">
                                    <li>
                                        <button
                                            onClick={() => setActiveTab("descripcion")}
                                            className={`px-4 py-2 transition
                                                ${activeTab === "descripcion"
                                                    ? "border-t border-r border-l border-gray-300 text-blue-600 font-medium"
                                                    : "border border-gray-300 bg-gray-200 text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            Descripción del Problema
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab("revision")}
                                            className={`px-4 py-2 transition
                                                ${activeTab === "revision"
                                                    ? "border-t border-r border-l border-gray-300 text-blue-600 font-medium"
                                                    : "border border-gray-300 bg-gray-200 text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            Revisión y Diagnóstico
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveTab("estetica")}
                                            className={`px-4 py-2 transition
                                                ${activeTab === "estetica"
                                                    ? "border-t border-r border-l border-gray-300 text-blue-600 font-medium"
                                                    : "border border-gray-300 bg-gray-200 text-gray-500 hover:text-gray-700"
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
                                    placeholder="Escribe aquí..."
                                    className="w-full min-h-[250px] border border-gray-200 bg-gray-50 rounded-sm p-4 resize-none outline-none focus:border-blue-400"
                                />
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