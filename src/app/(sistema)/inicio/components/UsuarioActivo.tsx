"use client";

import { useState } from "react";
import Image from "next/image"; // Importamos el componente optimizado de Next.js

export const UsuarioActivo = () => {
    // Estado para controlar si la imagen falló al cargar
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-white border border-gray-200 shadow-sm flex flex-col h-full">
            {/* Cabecera de la tarjeta */}
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-sm text-gray-700">Usuario Activo</h3>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
                {/* Caja Turquesa Interior */}
                <div className="bg-[#1AB394] text-white rounded p-6 text-center mb-4 shadow-sm">
                    <h4 className="font-bold text-base mb-1">Administrador Web Administrador Web</h4>
                    <p className="text-[11px] mb-6 opacity-90">Usuario interactuando en el sistema</p>

                    {/* Contenedor de la Imagen (Avatar) */}
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-6 flex items-center justify-center p-1 shadow-inner overflow-hidden">
                        {!imageError ? (
                            <Image 
                                src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/profile/images/1755289690profile" 
                                alt="Perfil Usuario" 
                                width={64}
                                height={64}
                                className="w-full h-full rounded-full object-cover"
                                onError={() => setImageError(true)} // Si falla, cambiamos el estado
                            />
                        ) : (
                            /* Diseño de respaldo creado con Tailwind si la imagen no existe */
                            <div className="w-full h-full rounded-full bg-white text-[#1AB394] flex items-center justify-center font-bold text-xl">
                                AW
                            </div>
                        )}
                    </div>

                    {/* Cuadrícula de 3 columnas (Cumpleaños, Celular, Teléfono) */}
                    <div className="grid grid-cols-3 gap-2 text-center mt-2">
                        <div>
                            <p className="font-bold text-sm">2000-01-01</p>
                            <p className="text-[11px] opacity-90 mt-0.5">F.Nacimiento</p>
                        </div>
                        <div>
                            <p className="font-bold text-sm">000000000</p>
                            <p className="text-[11px] opacity-90 mt-0.5">Celular</p>
                        </div>
                        <div>
                            <p className="font-bold text-sm">0000000</p>
                            <p className="text-[11px] opacity-90 mt-0.5">Telefono</p>
                        </div>
                    </div>
                </div>

                {/* Texto Inferior */}
                <div className="px-2 mt-2">
                    <h4 className="font-bold text-[13px] text-gray-800">Administrador Web</h4>
                    <p className="text-xs text-gray-500 mt-1">Usuario Activo en la Empresa Demo.</p>
                </div>
            </div>
        </div>
    );
};