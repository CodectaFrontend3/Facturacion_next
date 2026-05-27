import { format, parse, isValid, startOfMonth, getDay, getDaysInMonth } from "date-fns"

export const DATE_FORMAT = "dd/MM/yyyy"
export const WEEK_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]

export function fmt(date: Date | undefined): string {
    return date && isValid(date) ? format(date, DATE_FORMAT) : ""
}

export function parseInput(value: string): Date | undefined {
    if (!value) return undefined
    const parsed = parse(value, DATE_FORMAT, new Date())
    return isValid(parsed) ? parsed : undefined
}

export function todayDate(): Date {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
}

export function getMonthGrid(year: number, month: number): (Date | null)[] {
    const firstDay = startOfMonth(new Date(year, month, 1))
    let startOffset = (getDay(firstDay) + 6) % 7
    const daysInMonth = getDaysInMonth(new Date(year, month, 1))
    const grid: (Date | null)[] = []

    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const daysInPrev = getDaysInMonth(new Date(prevYear, prevMonth, 1))
    for (let i = startOffset - 1; i >= 0; i--) {
        grid.push(new Date(prevYear, prevMonth, daysInPrev - i))
    }

    for (let d = 1; d <= daysInMonth; d++) {
        grid.push(new Date(year, month, d))
    }

    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    let nextDay = 1
    while (grid.length < 42) {
        grid.push(new Date(nextYear, nextMonth, nextDay++))
    }

    return grid
}