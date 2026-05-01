"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import headerDataRaw from "@/data/header.json"
import { HeaderData } from "@/types/header/header"

const headerData: HeaderData = headerDataRaw;

export default function AppHeader() {
    const [notifIndex, setNotifIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setNotifIndex((prev) => (prev + 1) % headerData.notificacionesCarousel.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const currentNotif = headerData.notificacionesCarousel[notifIndex]

    return (
        <header className="flex h-16 w-full items-center justify-evenly border-b border-gray-200 bg-white px-4 py-2 font-sans">
            {/* 1. seccion: tipos de cambio */}
            <div className="flex items-center gap-6 xl:gap-10">
                <div className="flex flex-col items-center leading-tight">
                    <span className="text-[12px] font-extrabold text-gray-900 tracking-tight">Compra:</span>
                    <span className="text-[13px] font-medium text-gray-600">{headerData.tipoCambio.compra}</span>
                </div>
                <div className="flex flex-col items-center leading-tight">
                    <span className="text-[12px] font-extrabold text-gray-900 tracking-tight">Venta:</span>
                    <span className="text-[13px] font-medium text-gray-600">{headerData.tipoCambio.venta}</span>
                </div>
                <div className="flex flex-col items-center leading-tight">
                    <span className="text-[12px] font-extrabold text-gray-900 tracking-tight">Paralelo:</span>
                    <span className="text-[13px] font-medium text-gray-600">{headerData.tipoCambio.paralelo}</span>
                </div>
            </div>

            {/* 2. seccion: indicador de notificaciones (carrusel) */}
            <div className="flex h-[46px] items-center overflow-hidden rounded-xl border-3 border-[#1A3BB3] shadow-sm">
                <div className="flex h-full w-[160px] justify-center items-center gap-4 bg-[#1A3BB3] px-2 text-white transition-all duration-300">
                    <i className="bi bi-bell-fill text-[24px] animate-breathe shrink-0"></i>
                    <div className="flex w-[76px] gap-1 text-left">
                        <span className="text-[13px]">{currentNotif.count}</span>
                        <span className="text-[13px]">{currentNotif.label}</span>
                    </div>
                </div>
                <Link
                    href="#"
                    className="flex h-full w-[120px] justify-center items-center bg-white px-2 text-[13px] font-bold text-[#2641f8] transition-colors hover:bg-gray-50"
                >
                    Enviar a Sunat
                </Link>
            </div>

            {/* 3. seccion: indicador de mensajes */}
            <div className="flex h-[46px] items-center overflow-hidden rounded-xl border-3 border-[#1A3BB3] shadow-sm">
                <div className="flex h-full w-[160px] justify-center items-center gap-2 bg-[#1A3BB3] px-2 text-white">
                    <i className="bi bi-exclamation-circle-fill text-[28px] font-extrabold"></i>
                    <span className="text-[13px]">{headerData.notificacionesMensajes.count} de {headerData.notificacionesMensajes.total}</span>
                </div>
                <Link
                    href="#"
                    className="flex h-full w-[120px] justify-center items-center bg-white px-2 text-[13px] font-bold text-[#2641f8] transition-colors hover:bg-gray-50"
                >
                    Mensajes
                </Link>
            </div>

            {/* 4. seccion: calendario con badge */}
            <div className="relative cursor-pointer transition-transform hover:scale-105">
                <i className="bi bi-calendar-event text-[34px] text-[#1538A0]"></i>
                <Badge className="absolute -right-3 top-2 flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-[#F9AC55] text-[10px] font-black text-white hover:bg-[#F9AC55] p-0 border-none shadow-none">
                    0
                </Badge>
            </div>

            {/* 5. seccion: sobre de correo */}
            <div className="cursor-pointer transition-transform hover:scale-105">
                <i className="bi bi-envelope-fill text-[40px] text-[#1538A0]"></i>
            </div>
        </header>
    )
}
