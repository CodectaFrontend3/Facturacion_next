import { format, isSameDay, isWithinInterval, isBefore } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { todayDate, getMonthGrid, WEEK_DAYS } from "@/utils/dateRangeUtils"
import { cn } from "@/lib/utils"

interface MiniCalendarProps {
    year: number
    month: number
    onMonthChange: (year: number, month: number) => void
    fromDate: Date | undefined
    toDate: Date | undefined
    hoverDate: Date | undefined
    onDayClick: (date: Date) => void
    onDayHover: (date: Date) => void
    onDayLeave: () => void
    disabledBefore?: Date
    showPrevNav?: boolean
    showNextNav?: boolean
    type: "from" | "to"
}

export function MiniCalendar({
    year, month, onMonthChange,
    fromDate, toDate, hoverDate,
    onDayClick, onDayHover, onDayLeave,
    disabledBefore,
    showPrevNav = true,
    showNextNav = true,
    type,
}: MiniCalendarProps) {
    const grid = getMonthGrid(year, month)
    const today = todayDate()

    const isFrom = (d: Date) => !!fromDate && isSameDay(d, fromDate)
    const isTo = (d: Date) => !!toDate && isSameDay(d, toDate)
    const isHoverTo = (d: Date) => !toDate && !!hoverDate && isSameDay(d, hoverDate)

    const isInRange = (d: Date) => {
        if (!fromDate || !toDate) return false 
        if (isSameDay(fromDate, toDate)) return false
        return isWithinInterval(d, {
            start: isBefore(fromDate, toDate) ? fromDate : toDate,
            end: isBefore(fromDate, toDate) ? toDate : fromDate,
        })
    }
    const isDisabled = (d: Date) => !!disabledBefore && isBefore(d, disabledBefore)
    const isCurrentMonth = (d: Date) => d.getMonth() === month

    const monthName = format(new Date(year, month, 1), "MMMM yyyy", { locale: es })
    const monthLabel = monthName.charAt(0).toUpperCase() + monthName.slice(1)

    const goNext = () => {
        if (month === 11) onMonthChange(year + 1, 0)
        else onMonthChange(year, month + 1)
    }
    const goPrev = () => {
        if (month === 0) onMonthChange(year - 1, 11)
        else onMonthChange(year, month - 1)
    }

    return (
        <div className="border border-gray-200 p-3 min-w-[220px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                {showPrevNav ? (
                    <button 
                        onClick={goPrev} 
                        className="w-6 h-6 flex items-center justify-center cursor-pointer rounded bg-transparent text-[#676A6C] hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeftIcon size={14} />
                    </button>
                ) : <div className="w-6" />}

                <span className="text-[13px] font-bold text-[#676A6C]">{monthLabel}</span>

                {showNextNav ? (
                    <button 
                        onClick={goNext} 
                        className="w-6 h-6 flex items-center justify-center cursor-pointer rounded bg-transparent text-[#676A6C] hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRightIcon size={14} />
                    </button>
                ) : <div className="w-6" />}
            </div>

            {/* Días de semana */}
            <div className="grid grid-cols-7 mb-1">
                {WEEK_DAYS.map(d => (
                    <div key={d} className="text-center text-[11px] font-medium text-[#676A6C] py-0.5">
                        {d}
                    </div>
                ))}
            </div>

            {/* Grid de días */}
            <div className="grid grid-cols-7 gap-px">
                {grid.map((date, i) => {
                    if (!date) return <div key={i} />
                    const from = isFrom(date)
                    const to = isTo(date)
                    const hTo = isHoverTo(date)
                    const inRange = isInRange(date)
                    const disabled = isDisabled(date)
                    const currentMonth = isCurrentMonth(date)
                    const isToday = isSameDay(date, today)

                    const isPrimary = (type === "from" && from) || (type === "to" && to) || (from && to)
                    const isSecondary = (type === "from" && to) || (type === "to" && from) || inRange || hTo

                    return (
                        <div
                            key={i}
                            onClick={() => !disabled && onDayClick(date)}
                            onMouseEnter={() => !disabled && onDayHover(date)}
                            onMouseLeave={onDayLeave}
                            className={cn(
                                "h-[30px] flex items-center justify-center text-[13px] transition-colors duration-100 select-none",
                                disabled ? "cursor-not-allowed text-gray-300 bg-transparent" : "cursor-pointer",
                                !disabled && isPrimary && "bg-[#1D549F] text-white font-semibold rounded-md",
                                !disabled && !isPrimary && isSecondary && "bg-[#BAE0FD] text-white",
                                !disabled && !isPrimary && !isSecondary && (currentMonth ? "text-[#676A6C]" : "text-gray-300"),
                                !disabled && isToday && !isPrimary && "font-bold border border-gray-200"
                            )}
                        >
                            {date.getDate()}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}