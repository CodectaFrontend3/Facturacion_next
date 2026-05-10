"use client"; // ¡Obligatorio porque usamos useState y useRouter!

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- Importación exclusiva de Next.js
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter(); // <-- Instanciamos el router de Next.js
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [errorMsg, setErrorMsg] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (username === 'desarrollo@jypsac.com' && password === '@G^e^Fet&VGTsUBqLekW') {
            setErrorMsg(false);
            // ¡ASÍ SE CAMBIA DE PÁGINA EN NEXT.JS!
            router.push('/inicio'); 
        } else {
            setErrorMsg(true);
        }
    };

    return (
        <div className="w-full max-w-90 px-6">
            <div className="flex flex-col items-center mb-10">
                <Image 
    src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/img/login/leono%20soft.png" 
    alt="Logo LeonoSoft" 
    width={200}
    height={56}
    priority
    className="h-14 w-auto mb-1" 
/>
                <p className="text-gray-500 text-xl font-medium">Facturador Electrónico</p>
            </div>

            <form onSubmit={handleLogin}>
                {/* Campo Usuario */}
                <div className="mb-4 flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Usuario</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <i className="bi bi-person-fill"></i>
                        </span>
                        <input 
                            type="text"
                            placeholder="Ingresa tu usuario"
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                {/* Campo Contraseña */}
                <div className="mb-5 flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Contraseña</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingresa tu contraseña"
                            className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                        </button>
                    </div>
                </div>

                {/* Mensaje de Error */}
                {errorMsg && (
                    <p className="text-red-500 text-xs font-semibold text-center mb-3">Usuario o contraseña incorrectos.</p>
                )}

                <button type="submit" className="w-full bg-[#0044B2] hover:bg-blue-800 text-white font-semibold py-3 rounded transition duration-200 shadow-md">
                    Ingresar
                </button>
            </form>

            <div className="mt-8 text-center text-[13px] text-gray-500">
                ¿Quieres consultar un comprobante?<br />
                <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="text-[#00A1FF] font-bold hover:underline">Consultar</a>
            </div>
            
            {/* Si ya migraste tus modales y botones flotantes, descomenta estas líneas y sus importaciones arriba */}
            {/* <ButtonContact /> */}
            {/* <ModalConsulta isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
        </div>
    );
}