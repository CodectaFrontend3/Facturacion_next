"use client";
import { CarouselLogin } from "./components/CarouselLogin"; 

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full flex font-sans text-gray-800 overflow-hidden">
            {/* Lado Izquierdo (Carrusel) */}
            <div className="hidden md:flex w-[55%] xl:w-[60%] bg-[#0100FF] text-white flex-col relative overflow-hidden h-full">
                <CarouselLogin />
            </div>

            {/* Lado Derecho (Formulario de Login inyectado) */}
            <div className="w-full md:w-[45%] xl:w-[40%] bg-white flex flex-col justify-center items-center relative">
                {children}
            </div>
        </div>
    );
}