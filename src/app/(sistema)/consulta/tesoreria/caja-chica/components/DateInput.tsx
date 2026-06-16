"use client"
import { useEffect, useRef, useState } from "react"

const DAYS = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"]
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

// Constante de módulo: no se recalcula en cada render
const TODAY = new Date()

function parseDate(value: string): Date | null {
  // Accepts dd/mm/yyyy
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null
  const d = parseInt(match[1], 10)
  const m = parseInt(match[2], 10) - 1
  const y = parseInt(match[3], 10)
  const date = new Date(y, m, d)
  if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) return null
  return date
}

function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0")
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

export function DateInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false)

  // Viewpoint month/year
  const parsed = parseDate(value)
  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? TODAY.getFullYear())
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? TODAY.getMonth())

  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  // Sync viewMonth/viewYear when value changes externally
  useEffect(() => {
    const p = parseDate(value)
    if (p) {
      setViewYear(p.getFullYear())
      setViewMonth(p.getMonth())
    }
  }, [value])

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // Build calendar grid
  // First day of view month (0=Sun, 1=Mon ...)
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  // Convert Sunday=0 to Monday-based: Mon=0 ... Sun=6
  const startOffset = (firstDay + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  type Cell = { day: number; month: "prev" | "cur" | "next" }
  const cells: Cell[] = []
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, month: "prev" })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: "cur" })
  }
  let next = 1
  while (cells.length % 7 !== 0 || cells.length < 35) {
    cells.push({ day: next++, month: "next" })
  }

  function selectDay(cell: Cell) {
    let m = viewMonth
    let y = viewYear
    if (cell.month === "prev") { m--; if (m < 0) { m = 11; y-- } }
    if (cell.month === "next") { m++; if (m > 11) { m = 0; y++ } }
    const selected = new Date(y, m, cell.day)
    onChange(formatDate(selected))
    setViewMonth(m)
    setViewYear(y)
    setOpen(false)
  }

  const selectedDate = parseDate(value)

  function isSelected(cell: Cell) {
    if (!selectedDate) return false
    let m = viewMonth, y = viewYear
    if (cell.month === "prev") { m--; if (m < 0) { m = 11; y-- } }
    if (cell.month === "next") { m++; if (m > 11) { m = 0; y++ } }
    return selectedDate.getFullYear() === y && selectedDate.getMonth() === m && selectedDate.getDate() === cell.day
  }

  function isToday(cell: Cell) {
    if (cell.month !== "cur") return false
    return TODAY.getFullYear() === viewYear && TODAY.getMonth() === viewMonth && TODAY.getDate() === cell.day
  }

  function handleClear() {
    onChange("")
    setOpen(false)
  }

  function handleToday() {
    onChange(formatDate(TODAY))
    setViewYear(TODAY.getFullYear())
    setViewMonth(TODAY.getMonth())
    setOpen(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d]/g, "")
    let formatted = ""
    for (let i = 0; i < raw.length && i < 8; i++) {
      if (i === 2 || i === 4) {
        formatted += "/"
      }
      formatted += raw[i]
    }
    onChange(formatted)
  }

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="dd/mm/aaaa"
        className="h-[40px] w-full rounded-none border border-[#d8d8d8] bg-white px-3 pr-10 text-[13px] text-[#374151] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#2447b9]"
      />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-black"
        tabIndex={-1}
      >
        <i className="bi bi-calendar-event" />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[270px] border border-[#d8d8d8] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.13)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              className="text-[14px] font-bold text-[#111827] hover:text-[#2447b9]"
              onClick={() => {/* month/year selector future */ }}
            >
              {MONTHS[viewMonth]} de {viewYear} ▾
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-[26px] w-[26px] items-center justify-center text-[#374151] hover:bg-[#f3f4f6]"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-[26px] w-[26px] items-center justify-center text-[#374151] hover:bg-[#f3f4f6]"
              >
                ↓
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-t border-[#e5e7eb]">
            {DAYS.map((d) => (
              <div key={d} className="py-1.5 text-center text-[11px] font-semibold text-[#6b7280]">
                {d}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7">
            {cells.map((cell, i) => {
              const selected = isSelected(cell)
              const todayCell = isToday(cell)
              const isOther = cell.month !== "cur"
              const isSat = i % 7 === 5
              const isSun = i % 7 === 6

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectDay(cell)}
                  className={[
                    "flex h-[34px] w-full items-center justify-center text-[13px] transition-colors",
                    selected
                      ? "bg-[#2447b9] font-bold text-white"
                      : todayCell
                      ? "font-bold text-[#111827] hover:bg-[#f3f4f6]"
                      : isOther
                      ? "text-[#c0c4cc] hover:bg-[#f9fafb]"
                      : (isSat || isSun)
                      ? "text-[#ef4444] hover:bg-[#f3f4f6]"
                      : "text-[#374151] hover:bg-[#f3f4f6]",
                  ].join(" ")}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#e5e7eb] px-4 py-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-[13px] font-medium text-[#2447b9] hover:underline"
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="text-[13px] font-medium text-[#2447b9] hover:underline"
            >
              Hoy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
