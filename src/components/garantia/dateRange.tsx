"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangeInput() {
    const today = new Date();
    const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [range, setRange] = useState<[Date | null, Date | null]>([
        firstDayMonth,
        today
    ]);
    const [startDate, endDate] = range;

    const resetRange = () => {
        const today = new Date();
        const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setRange([firstDayMonth, today]);
    };

    return (
        <div className="flex flex-1">
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                wrapperClassName="flex-1"
                onChange={(update) => setRange(update)}
                className="w-full border p-2 rounded border-gray-300 bg-gray-300"
                dateFormat="dd/MM/yyyy"
            />

            <button onClick={resetRange} className="reset-btn bg-gray-500 text-white p-2 px-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
                </svg>
            </button>
        </div>
    );
}