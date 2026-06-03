"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"

type CashBoxTotals = {
  income: number
  expense: number
  balance: number
}

function formatMoney(value: number) {
  return `S/ ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function CajaChicaPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isCashBoxOpen, setIsCashBoxOpen] = useState(false)
  const [pageSize, setPageSize] = useState("10")
  const [searchValue, setSearchValue] = useState("")

  const totals: CashBoxTotals = useMemo(() => ({
    income: 0,
    expense: 0,
    balance: 19,
  }), [])

  return (
    <main className="h-[calc(100vh-99px)] overflow-hidden bg-[#f4f4f6] px-8 py-2 text-[#111827]">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SummaryBox label="Total de Ingresos" value={formatMoney(totals.income)} />
        <SummaryBox label="Total de Egresos" value={formatMoney(totals.expense)} />
      </section>

      <section className="mt-7 rounded-[8px] border border-[#dedede] bg-white px-5 py-4 shadow-[0_3px_12px_rgba(0,0,0,0.09)]">
        <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          <FieldGroup label="Saldo Actual:">
            <input
              value={totals.balance.toFixed(2)}
              readOnly
              className="h-[40px] w-full rounded-[5px] border border-[#d8d8d8] bg-[#fbfbfc] px-3 text-[13px] text-[#374151] outline-none"
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
        <section className="mt-5">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCashBoxOpen(false)}
              className="h-[38px] rounded-[5px] bg-[#f04458] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#d83a4d] active:bg-[#bd2f40]"
            >
              Cerrar Caja
            </button>
            <button
              type="button"
              className="h-[38px] rounded-[5px] bg-[#2447b9] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#1d3a9a] active:bg-[#172f7d]"
            >
              Agregar
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[170px_1fr_290px] md:items-end">
            <div>
              <label className="block text-[13px] text-[#4b5563]">Mostrar</label>
              <select
                value={pageSize}
                onChange={(event) => setPageSize(event.target.value)}
                className="mt-1 h-[40px] w-[108px] rounded-[5px] border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#4b5563] outline-none"
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
                onChange={(event) => setSearchValue(event.target.value)}
                className="mt-1 h-[40px] w-full rounded-[5px] border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#374151] outline-none transition-colors focus:border-[#2447b9]"
              />
            </label>
          </div>

          <div className="mt-3 overflow-hidden rounded-[5px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
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
                <tr>
                  <td colSpan={7} className="h-[44px] text-center text-[13px] text-[#374151]">
                    No hay datos disponibles en la tabla
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid grid-cols-1 items-center gap-4 md:grid-cols-3">
            <p className="text-[13px] text-[#4b5563]">Mostrando 0 a 0 de 0 registros</p>
            <div className="flex justify-center">
              <div className="inline-flex overflow-hidden rounded-[5px] border border-[#d8d8d8] bg-white text-[13px] text-[#4b5563]">
                <button type="button" className="h-[29px] border-r border-[#d8d8d8] px-3">Anterior</button>
                <button type="button" className="h-[29px] px-3">Siguiente</button>
              </div>
            </div>
            <div />
          </div>
        </section>
      ) : (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setIsCashBoxOpen(true)}
            className="h-[38px] rounded-[5px] bg-[#2447b9] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#1d3a9a] active:bg-[#172f7d]"
          >
            Abrir caja
          </button>
        </div>
      )}
    </main>
  )
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-[44px] items-center justify-center rounded-[7px] border-2 border-[#333333] bg-white text-center text-[13px] font-extrabold">
      {label}: {value}
    </div>
  )
}

function DateInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="dd/mm/aaaa"
        className="h-[40px] w-full rounded-[5px] border border-[#d8d8d8] bg-white px-3 pr-10 text-[13px] text-[#374151] outline-none transition-colors placeholder:text-[#4b5563] focus:border-[#2447b9]"
      />
      <i className="bi bi-calendar-event absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-black" />
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-extrabold">{label}</span>
      {children}
    </label>
  )
}
