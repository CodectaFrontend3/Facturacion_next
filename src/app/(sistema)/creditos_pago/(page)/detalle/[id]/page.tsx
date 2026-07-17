"use client";

import { Printer, FileText, Banknote, X } from "lucide-react"; // Importamos el ícono X
import Link from "next/link"; // Importamos Link para la navegación
import { ComprobanteBase, HistorialPago } from "../../../types/ComprobanteBase";
import Boletas from "../../../data/boletas.json";
import Facturas from "../../../data/facturas.json";
import NotasVenta from "../../../data/notas_venta.json";
import historialPago from "../../../data/historialPago.json";
import { use, useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PagoCuotasModal } from "../../../components/PagoCuotasModal";
import { DataTable } from "@/components/shared/DataTable";
import { getHistorialPagoColumns } from "../../../components/ColumnsDetalle";
import { DetallePagoCuotaModal } from "../../../components/DetallePagoCuotaModal";

const BoletasData = Boletas as ComprobanteBase[];
const FacturasData = Facturas as ComprobanteBase[];
const NotasVentaData = NotasVenta as ComprobanteBase[];
const HistorialPagoData = historialPago as HistorialPago[];
const allComprobantesData = [
  ...BoletasData,
  ...FacturasData,
  ...NotasVentaData,
];

export default function ResumenPagosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  // Filtrar la boleta correspondiente al ID proporcionado
  const comprobante = allComprobantesData.find((c) => c.id === id);
  // Filtrar el historial de pagos correspondiente a la boleta
  const historialPagos = HistorialPagoData.filter((h) => h.id === id);
  // Si el historial de pagos no tiene registros, mandamos un array vacío para evitar errores en la tabla
  const historialPagosFinal = historialPagos.length > 0 ? historialPagos : [];

  // Determinar si está pagado o no (normalizando el texto del JSON)
  const isPagado = comprobante?.estado === "Pagado";

  // Variable de estado para el modal de pago
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Variable de estado para el modal de detalle de cuotas
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  // Variable de estado para el pago seleccionado en el modal de detalle
  const [pagoSeleccionado, setPagoSeleccionado] =
    useState<HistorialPago | null>(null);

  const handleVerDetalle = (pago: HistorialPago) => {
    setPagoSeleccionado(pago);
    setIsDetalleModalOpen(true);
  };

  const columns = useMemo(
    () => getHistorialPagoColumns({ onVerDetalle: handleVerDetalle }),
    [],
  );

  // Variable de estado para el checkbox (Inicia en true si ya está pagado)
  const [isCheck, setIsCheck] = useState(isPagado);

  // Sincronizar el checkbox si cambia la boleta cargada en la URL
  useEffect(() => {
    setIsCheck(isPagado);
  }, [isPagado]);

  // Si el check está marcado y la boleta existe, pasamos la boleta en un array. Si no, pasamos array vacío []
  const boletasSeleccionadas = useMemo(() => {
    return isCheck && comprobante ? [comprobante] : [];
  }, [isCheck, comprobante]);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-4 font-sans text-[#334155]">
      {/* Contenedor Principal Card */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm">
        {/* HEADER PRINCIPAL */}
        <div className="flex items-center justify-between border-b border-gray-200 p-3 bg-white">
          <div className="flex items-center gap-3">
            {/* AGREGADO: Botón con ícono X para regresar */}
            <button
              onClick={() => window.history.back()} // Regresa a la página anterior
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-sm hover:bg-gray-100 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <h1 className="text-sm font-semibold text-[#1e293b]">
              Resumen de Pagos {comprobante?.id} -
            </h1>
            <span
              className={`text-white text-[11px] px-2 py-0.5 rounded font-medium ${
                isPagado ? "bg-[#10b981]" : "bg-[#f43f5e]"
              }`}
            >
              {isPagado ? "Pagado Completo" : "Sin pagar"}
            </span>
          </div>

          {/* Botón para abrir el Modal de Pago */}
          <Button
            type="button"
            size="icon"
            onClick={() => setIsModalOpen(true)}
            disabled={isPagado} // Deshabilitado si ya está pagado
            className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded shadow-sm h-8 w-8 cursor-pointer flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            <Banknote className="h-4 w-4" />
          </Button>

          {/* Modal para registrar el pago de cuotas */}
          <PagoCuotasModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            boletasSeleccionadas={boletasSeleccionadas}
          />
        </div>

        {/* CUERPO DEL CONTENIDO (Layout de 2 Columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5">
          {/* COLUMNA IZQUIERDA: Lista de Cuotas */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-sm font-semibold text-[#1e293b] tracking-tight">
              Lista de Cuotas
            </h2>

            {/* Card de Pago Único */}
            <div className="bg-white border border-gray-200 rounded p-3.5 relative">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-[#334155]">
                  Pago Único
                </span>
                <span
                  className={`text-white text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    isPagado ? "bg-[#10b981]" : "bg-[#f43f5e]"
                  }`}
                >
                  {isPagado ? "Pagado" : "Sin pagar"}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <input
                  type="checkbox"
                  checked={isCheck}
                  onChange={(e) => setIsCheck(e.target.checked)}
                  disabled={isPagado} // Queda activado y deshabilitado si ya está pagado
                  className="w-3.5 h-3.5 border-gray-300 rounded text-[#1d4ed8] focus:ring-0 cursor-pointer disabled:opacity-50"
                />
                <span className="text-xs font-semibold text-[#475569]">
                  S/{" "}
                  {comprobante?.monto_total
                    ? comprobante.monto_total.toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Detalle General e Inputs */}
          <div className="lg:col-span-9 space-y-4">
            {/* Subheader del Detalle */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-[#1e293b]">
                Detalle General
              </h3>
              <div className="flex gap-1">
                <button className="bg-[#1d4ed8] text-white p-1.5 rounded hover:bg-[#1e40af] transition-colors">
                  <Printer size={14} />
                </button>
                <button className="bg-[#1d4ed8] text-white p-1.5 rounded hover:bg-[#1e40af] transition-colors">
                  <FileText size={14} />
                </button>
              </div>
            </div>

            {/* Fila de Inputs Planos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Tipo de Pago
                </label>
                <input
                  type="text"
                  value={comprobante?.forma_pago || "Contado"}
                  disabled
                  className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs text-[#475569] bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e293b] mb-1.5">
                  Monto Total
                </label>
                <input
                  type="text"
                  value={`S/ ${comprobante?.monto_total ? comprobante.monto_total.toFixed(2) : "0.00"}`}
                  disabled
                  className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs text-[#475569] bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* DataTable */}
            <div className="w-full pt-4">
              <DataTable
                columns={columns}
                showSelection={false}
                data={historialPagosFinal}
                isLoading={false}
                pageIndex={2}
                showPagination={true}
              />
            </div>

            {/* Modal de Detalle de Pago */}
            <DetallePagoCuotaModal
              isOpen={isDetalleModalOpen}
              pago={pagoSeleccionado}
              onClose={() => {
                setIsDetalleModalOpen(false);
                setPagoSeleccionado(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
