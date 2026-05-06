"use client";

import { useState } from "react";
import { Plus, Trash2, Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ModalNuevoCliente from "@/app/servicio-tecnico/components/NuevoClienteModal";

interface Equipo {
  id: number;
  nombre: string;
  serie: string;
  observacion: string;
}

export default function GenerarServicioTecnico() {
  const [equipos, setEquipos] = useState<Equipo[]>([
    { id: Date.now(), nombre: "", serie: "", observacion: "" },
  ]);

  const [showClientes, setShowClientes] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");

  const router = useRouter();

  const clientesData = [
    { name: "SEBASTIAN GABRIEL ZORRILLA QUISPE", doc: "60975829" },
    { name: "EVERARDO PINO ROJASs", doc: "085202162" },
    { name: "VOLVO PERU S A", doc: "20100070031" },
  ];

  const agregarEquipo = () => {
    setEquipos([
      ...equipos,
      { id: Date.now(), nombre: "", serie: "", observacion: "" },
    ]);
  };

  const eliminarEquipo = (id: number) => {
    if (equipos.length > 1) {
      setEquipos(equipos.filter((e) => e.id !== id));
    }
  };

  const updateEquipo = (id: number, field: keyof Equipo, value: string) => {
    setEquipos(
      equipos.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  return (
    // Padding x-6 para que no choque con el sidebar
    <div className="w-full px-6 py-4 bg-[#fcfcfc] min-h-screen font-sans text-[#333]">
      <div className="w-full border border-gray-200 rounded-sm bg-white shadow-sm">
        {/* Cabecera con Botón Regresar */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-800 transition-colors p-1 hover:bg-gray-100 rounded-full cursor-pointer"
            title="Regresar"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-[13px] font-bold text-gray-700">
            Generar Servicio Técnico
          </h1>
        </div>

        <div className="p-6">
          {/* Fila 1: Cliente y Recepcionista */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 mb-4">
            <div className="flex items-center gap-4">
              <label className="w-20 text-[12px] font-bold">Cliente:</label>
              <div className="relative flex-1 flex">
                <div
                  onClick={() => setShowClientes(!showClientes)}
                  className="flex-1 border border-gray-200 rounded-l-md px-3 py-1.5 text-[12px] flex justify-between items-center cursor-pointer bg-white"
                >
                  <span
                    className={
                      clienteSeleccionado ? "text-gray-800" : "text-gray-400"
                    }
                  >
                    {clienteSeleccionado || "Seleccionar Cliente"}
                  </span>
                </div>
                {/* Botón plomo integrado al input */}
                <ModalNuevoCliente />

                {showClientes && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 z-50 shadow-lg">
                    <div className="p-2 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                      <Search size={14} className="text-gray-400" />
                      <input
                        type="text"
                        className="bg-transparent outline-none text-[12px] w-full"
                        placeholder="Searching..."
                        autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {clientesData.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setClienteSeleccionado(`${c.name} | ${c.doc}`);
                            setShowClientes(false);
                          }}
                          className="px-4 py-2 text-[11px] hover:bg-[#007bff] hover:text-white cursor-pointer border-b border-gray-50 last:border-0 uppercase"
                        >
                          {c.name} | {c.doc}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-[12px] font-bold">
                Recepcionista:
              </label>
              <input
                type="text"
                value="Administrador Web"
                disabled
                className="flex-1 bg-[#e9ecef] border border-gray-200 rounded-md px-3 py-1.5 text-[12px] text-gray-600 outline-none"
              />
            </div>
          </div>

          {/* Fila 2: Fecha y Código */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4 mb-10">
            <div className="flex items-center gap-4">
              <label className="w-20 text-[12px] font-bold">Fecha:</label>
              <input
                type="text"
                value="05-05-2026"
                disabled
                className="w-1/2 bg-[#e9ecef] border border-gray-200 rounded-md px-3 py-1.5 text-[12px] text-gray-600"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-[12px] font-bold">
                Código Servicio Guía:
              </label>
              <input
                type="text"
                value="STEC-0000002"
                disabled
                className="flex-1 bg-[#e9ecef] border border-gray-200 rounded-md px-3 py-1.5 text-[12px] text-gray-600"
              />
            </div>
          </div>

          {/* SECCIÓN EQUIPOS */}
          <div className="relative">
            {/* Cabecera Alineada: Espejo exacto de la fila de abajo */}
            <div className="flex gap-4 items-center mb-4 border-b border-gray-100 pb-2">
              {/* Contenedor del mismo ancho que el botón rojo para que el grid empiece igual */}
              <div className="w-[32px] flex justify-center">
                <button
                  onClick={agregarEquipo}
                  className="bg-[#17a2b8] text-white p-1 rounded-sm hover:bg-[#138496] transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-12 gap-4">
                <div className="col-span-9">
                  <span className="text-[12px] font-bold text-gray-700">
                    Equipos
                  </span>
                </div>
                {/* Usamos col-span-3 y text-left para que empiece justo donde empieza el input de abajo */}
                <div className="col-span-3">
                  <span className="text-[12px] font-bold text-gray-700">
                    Nro. Serie
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {equipos.map((equipo) => (
                <div
                  key={equipo.id}
                  className="flex gap-4 items-start animate-in fade-in duration-300"
                >
                  {/* Botón Eliminar (Ancho fijo de 32px aproximado por el padding/icon) */}
                  <button
                    onClick={() => eliminarEquipo(equipo.id)}
                    className="bg-[#f15a5a] text-white p-1.5 rounded-sm hover:bg-[#d94343] transition-colors disabled:opacity-30"
                    disabled={equipos.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Grid de Inputs */}
                  <div className="flex-1 grid grid-cols-12 gap-4">
                    <div className="col-span-9 space-y-3">
                      <input
                        type="text"
                        placeholder="Nombre Equipo"
                        value={equipo.nombre}
                        onChange={(e) =>
                          updateEquipo(equipo.id, "nombre", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-[12px] focus:border-blue-300 outline-none shadow-sm"
                      />
                      <textarea
                        placeholder="Observación"
                        rows={2}
                        value={equipo.observacion}
                        onChange={(e) =>
                          updateEquipo(equipo.id, "observacion", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-[12px] focus:border-blue-300 outline-none resize-none shadow-sm"
                      />
                    </div>

                    <div className="col-span-3">
                      <input
                        type="text"
                        placeholder="Número Serie"
                        value={equipo.serie}
                        onChange={(e) =>
                          updateEquipo(equipo.id, "serie", e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-[12px] focus:border-blue-300 outline-none shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="mt-10 flex justify-end">
            <button className="border border-blue-800 text-blue-800 px-8 py-1.5 rounded-sm text-[12px] font-medium hover:bg-blue-50 transition-colors">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
