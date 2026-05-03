"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

// ─── Helpers ──────────────────────────────────────────────────────────────────
const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"]
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

function fmt(date: Date | null): string {
  if (!date) return ""
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`
}

function parseDate(val: string): Date | null {
  const parts = val.split("/")
  if (parts.length !== 3) return null
  const d = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10) - 1
  const y = parseInt(parts[2], 10)
  if (isNaN(d) || isNaN(m) || isNaN(y)) return null
  const date = new Date(y, m, d)
  if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) return null
  return date
}

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }

// Monday-based: Mon=0 … Sun=6
function firstDayOfMonth(y: number, m: number) {
  const d = new Date(y, m, 1).getDay()
  return d === 0 ? 6 : d - 1
}

interface DR { start: Date | null; end: Date | null }

// ─── Props ────────────────────────────────────────────────────────────────────
interface DateRangerProps {
  initialLabel?: string
  onChange?: (start: Date, end: Date) => void
}

// ─── Component ────────────────────────────────────────────────────────────────
export function DateRanger({ initialLabel = "01/04/2026 - 30/04/2026", onChange }: DateRangerProps) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState<DR>(() => {
    const parts = initialLabel.split(" - ")
    if (parts.length === 2) {
      const s = parseDate(parts[0])
      const e = parseDate(parts[1])
      if (s && e) return { start: s, end: e }
    }
    return { start: null, end: null }
  })
  const [temp, setTemp] = useState<DR>(saved)
  const [pickingEnd, setPickingEnd] = useState(false)

  // Independent calendar months
  const [lm, setLm] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [rm, setRm] = useState(() => {
    const next = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    return { y: next.getFullYear(), m: next.getMonth() }
  })

  // Input states for manual entry
  const [startInput, setStartInput] = useState("")
  const [endInput, setEndInput] = useState("")
  
  // Hover state
  const [hovered, setHovered] = useState<{ date: Date; type: "start" | "end" } | null>(null)

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])

  function openPicker() {
    setTemp(saved)
    setStartInput(fmt(saved.start))
    setEndInput(fmt(saved.end))
    if (saved.start) {
      setLm({ y: saved.start.getFullYear(), m: saved.start.getMonth() })
    }
    if (saved.end) {
      setRm({ y: saved.end.getFullYear(), m: saved.end.getMonth() })
    } else if (saved.start) {
      const next = new Date(saved.start.getFullYear(), saved.start.getMonth() + 1, 1)
      setRm({ y: next.getFullYear(), m: next.getMonth() })
    }
    setPickingEnd(false)
    setOpen(true)
  }

  function reset() {
    setSaved({ start: null, end: null })
    setTemp({ start: null, end: null })
    setStartInput("")
    setEndInput("")
  }

  function clickDay(date: Date, type: "start" | "end") {
    if (type === "start") {
      setTemp(prev => ({ ...prev, start: date }))
      setStartInput(fmt(date))
    } else {
      setTemp(prev => ({ ...prev, end: date }))
      setEndInput(fmt(date))
    }
  }

  function save() {
    if (temp.start && temp.end) {
      setSaved(temp)
      onChange?.(temp.start, temp.end)
    }
    setOpen(false)
  }

  function cancel() { setTemp(saved); setOpen(false) }

  const label = saved.start && saved.end ? `${fmt(saved.start)} - ${fmt(saved.end)}` : initialLabel

  // ── Calendar renderer ──────────────────────────────────────────────────────
  function renderCal(y: number, m: number, type: "start" | "end") {
    const isLeft = type === "start"
    const total = daysInMonth(y, m)
    const first = firstDayOfMonth(y, m)
    const prevTotal = daysInMonth(y, m - 1 < 0 ? 11 : m - 1)

    // Build 42 cells (6 rows × 7 cols)
    const cells: { date: Date; cur: boolean }[] = []
    for (let i = first - 1; i >= 0; i--) {
      const pm = m - 1 < 0 ? 11 : m - 1
      const py = m - 1 < 0 ? y - 1 : y
      cells.push({ date: new Date(py, pm, prevTotal - i), cur: false })
    }
    for (let d = 1; d <= total; d++) cells.push({ date: new Date(y, m, d), cur: true })
    const fill = 42 - cells.length
    for (let d = 1; d <= fill; d++) {
      const nm = m + 1 > 11 ? 0 : m + 1
      const ny = m + 1 > 11 ? y + 1 : y
      cells.push({ date: new Date(ny, nm, d), cur: false })
    }

    const updateMonth = (delta: number) => {
      if (isLeft) {
        setLm(p => {
          const newDate = new Date(p.y, p.m + delta, 1)
          return { y: newDate.getFullYear(), m: newDate.getMonth() }
        })
      } else {
        setRm(p => {
          const newDate = new Date(p.y, p.m + delta, 1)
          return { y: newDate.getFullYear(), m: newDate.getMonth() }
        })
      }
    }

    return (
      <div className="w-[190px]">
        {/* Month header */}
        <div className="flex items-center justify-between mb-2 px-1">
          <button onClick={() => updateMonth(-1)}
            className="p-1 rounded hover:bg-gray-100 text-gray-500">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="text-xs font-bold text-gray-700">{MONTHS[m]} {y}</span>

          <button onClick={() => updateMonth(1)}
            className="p-1 rounded hover:bg-gray-100 text-gray-500">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-gray-500 py-0.5">{d}</div>)}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            const sDate = temp.start
            const eDate = temp.end
            const isStart = sDate?.toDateString() === cell.date.toDateString()
            const isEnd = eDate?.toDateString() === cell.date.toDateString()
            
            let inRange = false
            if (sDate && eDate) {
              const [min, max] = sDate < eDate ? [sDate, eDate] : [eDate, sDate]
              inRange = cell.date > min && cell.date < max
            }

            return (
              <button
                key={i}
                onClick={() => cell.cur && clickDay(cell.date, type)}
                onMouseEnter={() => cell.cur && setHovered({ date: cell.date, type })}
                onMouseLeave={() => setHovered(null)}
                className={[
                  "h-[26px] text-[11px] flex items-center justify-center rounded transition-colors",
                  !cell.cur ? "text-gray-300 cursor-default" : "cursor-pointer",
                  isStart || isEnd ? "bg-[#1a5eb3] text-white font-bold hover:bg-[#1a3bb3]" : "",
                  inRange ? "bg-blue-100 text-blue-700 rounded-none" : "",
                  cell.cur && !isStart && !isEnd && !inRange ? "hover:bg-gray-100 text-gray-700" : "",
                ].join(" ")}
              >
                {cell.date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      {/* ── Trigger ── */}
      <div className="flex">
        <div
          onClick={openPicker}
          className={[
            "flex items-center border rounded-l px-3 text-xs text-gray-600 bg-gray-100 min-w-[360px] h-[34px] cursor-pointer select-none transition-colors",
            open ? "border-[#2C8F7B]" : "border-gray-200 hover:bg-gray-50",
          ].join(" ")}
        >
          {label}
        </div>
        <button
          onClick={reset}
          className="flex items-center justify-center w-[36px] h-[34px] bg-[#6c757d] text-white rounded-r hover:bg-[#5a6268] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Popover ── */}
      {open && (
        <div className="absolute top-[38px] left-0 z-50 bg-white border border-gray-200 shadow-xl rounded p-4 flex gap-6">
          {/* DESDE / HASTA + botones (Left side) */}
          <div className="w-[240px] flex flex-col pt-2">
            <div className="flex gap-3 mb-6">
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-500 mb-1 tracking-wide uppercase">Desde</p>
                <input
                  value={hovered?.type === "start" ? fmt(hovered.date) : startInput}
                  onChange={(e) => {
                    const val = e.target.value
                    setStartInput(val)
                    const d = parseDate(val)
                    if (d) setTemp(prev => ({ ...prev, start: d }))
                  }}
                  placeholder="dd/mm/aaaa"
                  className="border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 w-full bg-white focus:outline-none focus:border-[#2C8F7B]"
                />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-500 mb-1 tracking-wide uppercase">Hasta</p>
                <input
                  value={hovered?.type === "end" ? fmt(hovered.date) : endInput}
                  onChange={(e) => {
                    const val = e.target.value
                    setEndInput(val)
                    const d = parseDate(val)
                    if (d) setTemp(prev => ({ ...prev, end: d }))
                  }}
                  placeholder="dd/mm/aaaa"
                  className="border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 w-full bg-white focus:outline-none focus:border-[#2C8F7B]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={save}
                className="flex-1 py-2 bg-[#1a5eb3] text-white text-xs font-semibold rounded hover:bg-[#1a3bb3] transition-colors">
                Guardar
              </button>
              <button onClick={cancel}
                className="flex-1 py-2 text-gray-600 text-xs rounded hover:bg-gray-100 transition-colors border border-gray-200">
                Cancelar
              </button>
            </div>
          </div>

          {/* Dual calendars */}
          <div className="flex gap-6 items-start border-l border-gray-100 pl-6">
            <div className="border border-gray-100 rounded-lg p-3 bg-white">
              {renderCal(lm.y, lm.m, "start")}
            </div>
            <div className="border border-gray-100 rounded-lg p-3 bg-white">
              {renderCal(rm.y, rm.m, "end")}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
