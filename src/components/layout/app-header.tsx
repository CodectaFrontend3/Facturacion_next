"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import headerDataRaw from "@/data/header.json"
import { HeaderData } from "@/types/header/header"

const headerData: HeaderData = headerDataRaw;

function NotificationCarousel() {
    const [notifIndex, setNotifIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setNotifIndex((prev) => (prev + 1) % headerData.notificacionesCarousel.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const currentNotif = headerData.notificacionesCarousel[notifIndex]

    return (
        <div className="flex h-11.5 items-center overflow-hidden rounded-xl border-3 border-[#1A3BB3] shadow-sm">
            <div className="flex h-full w-40 justify-center items-center gap-4 bg-[#1A3BB3] px-2 text-white transition-all duration-300">
                <i className="fa fa-bell text-[19px]! animate-breathe shrink-0 w-[22.29px] h-[26.4px] flex! items-center! justify-center!"></i>
                <div className="flex w-19 gap-1 text-left">
                    <span className="text-[13px]">{currentNotif.count}</span>
                    <span className="text-[13px]">{currentNotif.label}</span>
                </div>
            </div>
            <Link
                href="#"
                className="flex h-full w-30 justify-center items-center bg-white px-2 text-[13px] font-bold text-[#2641f8] transition-colors hover:bg-gray-50"
            >
                Enviar a Sunat
            </Link>
        </div>
    )
}

export default function AppHeader() {
    return (
        <header className="flex h-16 w-full items-center border-b border-[#e7eaec] bg-white px-4 py-2 font-sans">
            <Link
                href={'/inicio'}
                className="flex items-center gap-2 pr-6"
            >
                <Image
                    src={"http://jypsac.dyndns.org:190/facturacion_20522045773/public/archivos/imagenes/layout/Leonosoft.png"}
                    alt="Leonosoft Logo"
                    width={40}
                    height={40}
                    className="shrink-0"
                    priority
                />
                <h1 className="text-[18px] font-bold tracking-wide">
                    <span className="text-[#2641F8]">LEONO</span>
                    <span className="text-[#808080]">SOFT</span>
                </h1>
            </Link>

            <div className="flex flex-1 items-center justify-evenly">
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
                <NotificationCarousel />

                {/* 3. seccion: indicador de mensajes */}
                <div className="flex h-11.5 items-center overflow-hidden rounded-xl border-3 border-[#1A3BB3] shadow-sm">
                    <div className="flex h-full w-40 justify-center items-center gap-2 bg-[#1A3BB3] px-2 text-white">
                        <i className="fa fa-exclamation-circle text-[26px]! w-[22.29px] h-[26.4px] flex! items-center! justify-center!"></i>
                        <span className="text-[13px]">{headerData.notificacionesMensajes.count} de {headerData.notificacionesMensajes.total}</span>
                    </div>
                    <Link
                        href="#"
                        className="flex h-full w-30 justify-center items-center bg-white px-2 text-[13px] font-bold text-[#2641f8] transition-colors hover:bg-gray-50"
                    >
                        Mensajes
                    </Link>
                </div>

                {/* 4. seccion: calendario con badge */}
                <div className="relative cursor-pointer transition-transform hover:scale-105 w-9 h-9.75 flex! items-center! justify-center!">
                    <i className="fa fa-calendar text-[39px]! text-[#1538A0]"></i>
                    <Badge className="absolute -top-1 -right-3.5 flex h-6 w-4.5 items-center justify-center rounded-sm bg-[#F9AC55] text-[10px] font-black text-white hover:bg-[#F9AC55] p-0 border-none shadow-none">
                        0
                    </Badge>
                </div>

                {/* 5. seccion: sobre de correo */}
                <div className="cursor-pointer transition-transform hover:scale-105 w-9 h-9.75 flex! items-center! justify-center!">
                    <i className="fa fa-envelope text-[39px]! text-[#1538A0]"></i>
                </div>
            </div>
        </header>
    )
}
