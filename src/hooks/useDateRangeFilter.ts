import { useState } from "react"
import { addMonths, isBefore, differenceInDays, addDays } from "date-fns"
import { todayDate, parseInput, fmt } from "@/utils/dateRangeUtils"

interface UseDateRangeFilterProps {
    valueFrom: string
    valueTo: string
    onChange: (name: string, value: string) => void
    nameFrom: string
    nameTo: string
}

export function useDateRangeFilter({ valueFrom, valueTo, onChange, nameFrom, nameTo }: UseDateRangeFilterProps) {
    const [open, setOpen] = useState(false)
    const now = todayDate()

    const [leftYear, setLeftYear] = useState(now.getFullYear())
    const [leftMonth, setLeftMonth] = useState(now.getMonth())

    const initialRightDate = addMonths(new Date(leftYear, leftMonth, 1), 1)
    const [rightYear, setRightYear] = useState(initialRightDate.getFullYear())
    const [rightMonth, setRightMonth] = useState(initialRightDate.getMonth())

    const [fromDate, setFromDate] = useState<Date | undefined>(() => parseInput(valueFrom) ?? now)
    const [toDate, setToDate] = useState<Date | undefined>(() => parseInput(valueTo) ?? now)
    const [fromInput, setFromInput] = useState(valueFrom || fmt(now))
    const [toInput, setToInput] = useState(valueTo || fmt(now))
    const [hoverDate, setHoverDate] = useState<Date | undefined>()

    const handleLeftMonthChange = (y: number, m: number) => {
        setLeftYear(y)
        setLeftMonth(m)
    }

    const handleRightMonthChange = (y: number, m: number) => {
        setRightYear(y)
        setRightMonth(m)
    }

    const handleLeftDayClick = (date: Date) => {
        if (fromDate && toDate && isBefore(toDate, date)) {
            const diff = differenceInDays(toDate, fromDate)
            const newFrom = date
            const newTo = addDays(newFrom, diff)
            
            setFromDate(newFrom)
            setFromInput(fmt(newFrom))
            setToDate(newTo)
            setToInput(fmt(newTo))

            setRightYear(newTo.getFullYear())
            setRightMonth(newTo.getMonth())
        } else {
            setFromDate(date)
            setFromInput(fmt(date))
        }
    }

    const handleRightDayClick = (date: Date) => {
        if (fromDate && isBefore(date, fromDate)) {
            setToDate(fromDate)
            setToInput(fmt(fromDate))
        } else {
            setToDate(date)
            setToInput(fmt(date))
        }
    }

    const handleLeftDayHover = (date: Date) => {
        setFromInput(fmt(date))
        setHoverDate(date)
    }

    const handleRightDayHover = (date: Date) => {
        setToInput(fmt(date))
        setHoverDate(date)
    }

    const handleLeftDayLeave = () => {
        setFromInput(fmt(fromDate))
        setHoverDate(undefined)
    }

    const handleRightDayLeave = () => {
        setToInput(fmt(toDate))
        setHoverDate(undefined)
    }

    const handleFromInputChange = (val: string) => {
        setFromInput(val)
    }

    const handleToInputChange = (val: string) => {
        setToInput(val)
    }

    const handleFromKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            const parsed = parseInput(fromInput)
            if (parsed) {
                setFromDate(parsed)
                setLeftYear(parsed.getFullYear())
                setLeftMonth(parsed.getMonth())
            }
        }
    }

    const handleToKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            const parsed = parseInput(toInput)
            if (parsed) {
                setToDate(parsed)
                setRightYear(parsed.getFullYear())
                setRightMonth(parsed.getMonth())
            }
        }
    }

    const handleGuardar = () => {
        onChange(nameFrom, fromInput)
        onChange(nameTo, toInput)
        setOpen(false)
    }

    const handleCancelar = () => {
        const from = parseInput(valueFrom) ?? now
        const to = parseInput(valueTo) ?? now
        setFromDate(from)
        setToDate(to)
        setFromInput(valueFrom || fmt(now))
        setToInput(valueTo || fmt(now))
        setOpen(false)
    }

    const handleReset = () => {
        setFromDate(undefined)
        setToDate(undefined)
        setFromInput("")
        setToInput("")
        onChange(nameFrom, "")
        onChange(nameTo, "")
    }

    return {
        open, setOpen,
        leftYear, leftMonth, handleLeftMonthChange,
        rightYear, rightMonth, handleRightMonthChange,
        fromDate, toDate, hoverDate,
        fromInput, toInput,
        handleLeftDayClick, handleRightDayClick,
        handleLeftDayHover, handleRightDayHover,
        handleLeftDayLeave, handleRightDayLeave,
        handleFromInputChange, handleToInputChange,
        handleFromKeyDown, handleToKeyDown,
        handleGuardar, handleCancelar, handleReset
    }
}
