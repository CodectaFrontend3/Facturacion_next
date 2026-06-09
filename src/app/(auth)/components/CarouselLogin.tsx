"use client"; 

import { useState, useEffect } from 'react';
import Image from 'next/image';

export const CarouselLogin = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [1, 2, 3]; 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative w-full h-full flex flex-col justify-center">
            
            {/* Botón Izquierdo */}
            <button onClick={prevSlide} className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white text-[#1538A0] w-5 h-5 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition z-30 cursor-pointer">
                <i className="bi bi-chevron-left text-[10px] pr-0.5"></i>
            </button>

            {/* Botón Derecho */}
            <button onClick={nextSlide} className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white text-[#1538A0] w-5 h-5 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition z-30 cursor-pointer">
                <i className="bi bi-chevron-right text-[10px] pl-0.5"></i>
            </button>

            {/* Renderizado de los Slides */}
            <div className="relative w-full h-87.5 xl:h-100 px-12">
                {slides.map((num, index) => (
                    <div 
                        key={index} 
                        className={`absolute inset-0 flex flex-row justify-center items-center gap-6 xl:gap-8 px-12 w-full transition-opacity duration-700 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                    >
                        {/* Usamos etiqueta img normal para evitar configurar dominios en Next.js por ahora */}
                        <Image 
    src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/img/login/logoazul.png" 
    alt={`Ilustración ${num}`} 
    width={400}
    height={300}
    priority={index === 0}
    className="h-62.5 xl:h-75 w-auto object-contain drop-shadow-2xl shrink-0" 
/>
                        
                        <h2 className="text-[15px] xl:text-[16px] font-medium text-left leading-snug tracking-tight shrink-0">
                            Con LeonoSoft facturador electrónico<br />
                            descubre una gestión de facturación <span className="font-extrabold">en menos</span><br />
                            <span className="font-extrabold">de un minuto</span> y aumenta el flujo de tus ventas. ({num})
                        </h2>
                    </div>
                ))}
            </div>

            {/* Puntos inferiores */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2.5 z-30">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentSlide(index)} className={`carousel-dot w-1.5 h-1.5 bg-white rounded-full cursor-pointer transition-opacity ${currentSlide === index ? 'opacity-100' : 'opacity-50'}`}></button>
                ))}
            </div>

            <div className="absolute bottom-8 left-8 text-[12px] font-medium z-30">
                © 2024 - 2026 Codecta.pe
            </div>
        </div>
    );
};