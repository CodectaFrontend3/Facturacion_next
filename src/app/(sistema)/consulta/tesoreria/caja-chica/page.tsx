"use client"

import { useState } from "react"
import { SummaryBox } from "./components/SummaryBox"
import { DateInput } from "./components/DateInput"
import { FieldGroup } from "./components/FieldGroup"
import { DepositModal } from "./components/DepositModal"
import { PaymentModal } from "./components/PaymentModal"
import { ViewModal, type Transaction } from "./components/ViewModal"
import { formatMoney } from "./lib/format"
import mockData from "./data/tesoreria-mock.json"
import { showToast } from "@/components/shared/custom-toast"

type CashBoxTotals = {
  income: number
  expense: number
  balance: number
}

export default function CajaChicaPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isCashBoxOpen, setIsCashBoxOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [pageSize, setPageSize] = useState("10")
  const [searchValue, setSearchValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = mockData.filter((item) => {
    if (!searchValue) return true;
    const s = searchValue.toLowerCase();
    return (
      item.nro_pago.toLowerCase().includes(s) ||
      item.fecha.toLowerCase().includes(s) ||
      item.dni.toLowerCase().includes(s) ||
      item.nombres.toLowerCase().includes(s) ||
      item.tipo.toLowerCase().includes(s) ||
      item.monto.toString().includes(s)
    );
  });

  const parsedPageSize = parseInt(pageSize, 10);
  const totalPages = Math.ceil(filteredData.length / parsedPageSize) || 1;
  const startIndex = (currentPage - 1) * parsedPageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + parsedPageSize);

  // Totales calculados desde los datos reales
  const totals: CashBoxTotals = {
    income: mockData
      .filter((item) => item.tipo === "Depósito")
      .reduce((sum, item) => sum + item.monto, 0),
    expense: mockData
      .filter((item) => item.tipo !== "Depósito")
      .reduce((sum, item) => sum + item.monto, 0),
    get balance() { return this.income - this.expense },
  }

  return (
    <main className="flex min-h-[calc(100vh-99px)] flex-col bg-[#f4f4f6] px-8 py-2 text-[#111827]">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SummaryBox label="Total de Ingresos" value={formatMoney(totals.income)} />
        <SummaryBox label="Total de Egresos" value={formatMoney(totals.expense)} />
      </section>

      <section className="mt-7 rounded-none border border-[#dedede] bg-white px-5 py-4 shadow-[0_3px_12px_rgba(0,0,0,0.09)]">
        <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          <FieldGroup label="Saldo Actual:">
            <input
              value={totals.balance.toFixed(2)}
              readOnly
              className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-[#fbfbfc] px-3 text-[13px] text-[#374151] outline-none"
            />
          </FieldGroup>

          <FieldGroup label="Fecha Inicio:">
            <DateInput value={startDate} onChange={setStartDate} />
          </FieldGroup>

          <FieldGroup label="Fecha Fin:">
            <DateInput value={endDate} onChange={setEndDate} />
          </FieldGroup>

          <button
            type="button"
            className="h-[38px] rounded-[5px] bg-[#2447b9] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#1d3a9a] active:bg-[#172f7d]"
          >
            Filtrar
          </button>
        </div>
      </section>

      {isCashBoxOpen ? (
        <section className="mt-5 flex flex-1 flex-col">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCashBoxOpen(false)
                showToast("Caja cerrada exitosamente.", 1)
              }}
              className="h-[38px] rounded-[5px] bg-[#f04458] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#d83a4d] active:bg-[#bd2f40]"
            >
              Cerrar Caja
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="h-[38px] rounded-[5px] bg-[#2447b9] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#1d3a9a] active:bg-[#172f7d]"
              >
                Agregar
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[120px] rounded-none border border-[#d8d8d8] bg-white py-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
                  <button
                    type="button"
                    onMouseDown={() => {
                      setIsDropdownOpen(false)
                      setIsDepositModalOpen(true)
                    }}
                    className="block w-full px-4 py-2 text-left text-[14px] text-[#374151] hover:bg-[#f3f4f6]"
                  >
                    Recargar
                  </button>
                  <button
                    type="button"
                    onMouseDown={() => {
                      setIsDropdownOpen(false)
                      setIsPaymentModalOpen(true)
                    }}
                    className="block w-full px-4 py-2 text-left text-[14px] text-[#374151] hover:bg-[#f3f4f6]"
                  >
                    Pagar
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[170px_1fr_290px] md:items-end">
            <div>
              <label className="block text-[13px] text-[#4b5563]">Mostrar</label>
              <select
                value={pageSize}
                onChange={(event) => { setPageSize(event.target.value); setCurrentPage(1); }}
                className="mt-1 h-[40px] w-[108px] rounded-none border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#4b5563] outline-none"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <p className="mt-1 text-[13px] text-[#4b5563]">registros por pagina</p>
            </div>

            <div />

            <label className="block">
              <span className="block text-[13px] text-[#4b5563]">Buscar:</span>
              <input
                value={searchValue}
                onChange={(event) => { setSearchValue(event.target.value); setCurrentPage(1); }}
                className="mt-1 h-[40px] w-full rounded-none border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#374151] outline-none transition-colors focus:border-[#2447b9]"
              />
            </label>
          </div>

          <div className="mt-3 overflow-hidden rounded-none bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-[#d8d8d8] text-center font-extrabold text-[#111827]">
                  <th className="h-[44px] px-3">NRO. PAGO</th>
                  <th className="h-[44px] px-3">FECHA</th>
                  <th className="h-[44px] px-3">DNI</th>
                  <th className="h-[44px] px-3">NOMBRES</th>
                  <th className="h-[44px] px-3">TIPO</th>
                  <th className="h-[44px] px-3">MONTO</th>
                  <th className="h-[44px] bg-[#f7f7f8] px-3">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.nro_pago} className="border-b border-[#d8d8d8] text-center text-[13px] text-[#374151] hover:bg-[#f9fafb]">
                      <td className="h-[44px] px-3">{item.nro_pago}</td>
                      <td className="h-[44px] px-3">{item.fecha}</td>
                      <td className="h-[44px] px-3">{item.dni}</td>
                      <td className="h-[44px] px-3">{item.nombres}</td>
                      <td className="h-[44px] px-3">{item.tipo}</td>
                      <td className="h-[44px] px-3">{formatMoney(item.monto)}</td>
                      <td className="h-[44px] bg-[#f7f7f8] px-3">
                        <div className="flex justify-center gap-2">
                          <button 
                            type="button" 
                            onClick={() => setSelectedTransaction(item as Transaction)}
                            className="rounded-[4px] bg-[#2447b9] px-3 py-1.5 text-[12px] text-white hover:bg-[#1d3a9a]"
                          >
                            Ver
                          </button>
                          <button type="button" className="rounded-[4px] bg-[#f04458] px-3 py-1.5 text-[12px] text-white hover:bg-[#d83a4d]">PDF</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="h-[44px] text-center text-[13px] text-[#374151]">
                      No hay datos disponibles en la tabla
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-auto grid grid-cols-1 items-center gap-4 pt-3 pb-3 md:grid-cols-3">
            <p className="text-[13px] text-[#4b5563]">Mostrando {paginatedData.length > 0 ? startIndex + 1 : 0} a {startIndex + paginatedData.length} de {filteredData.length} registros</p>
            <div className="flex justify-center">
              <div className="inline-flex overflow-hidden rounded-none border border-[#d8d8d8] bg-white text-[13px] text-[#4b5563]">
                <button 
                  type="button" 
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-[29px] border-r border-[#d8d8d8] px-3 hover:bg-[#f3f4f6] disabled:opacity-50 disabled:hover:bg-white"
                >
                  Anterior
                </button>
                <button 
                  type="button" 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-[29px] px-3 hover:bg-[#f3f4f6] disabled:opacity-50 disabled:hover:bg-white"
                >
                  Siguiente
                </button>
              </div>
            </div>
            <div />
          </div>
        </section>
      ) : (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setIsCashBoxOpen(true)
              showToast("Caja reabierta exitosamente.", 1)
            }}
            className="h-[38px] rounded-[5px] bg-[#2447b9] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#1d3a9a] active:bg-[#172f7d]"
          >
            Abrir caja
          </button>
        </div>
      )}

      {isDepositModalOpen && (
        <DepositModal onClose={() => setIsDepositModalOpen(false)} />
      )}
      {isPaymentModalOpen && (
        <PaymentModal onClose={() => setIsPaymentModalOpen(false)} />
      )}
      {selectedTransaction && (
        <ViewModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
      )}
    </main>
  )
}
