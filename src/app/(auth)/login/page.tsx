"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    
    // Estado para Contacto
    const [isContactOpen, setIsContactOpen] = useState(false);
    
    // Estado para abrir/cerrar el modal de consulta
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === '1' && password === '1') {
            setErrorMsg(false);
            router.push('/inicio');
        } else {
            setErrorMsg(true);
        }
    };

    return (
        <>
            {/* Contenedor Principal del Formulario */}
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                            </button>
                        </div>
                    </div>
                    {errorMsg && <p className="text-red-500 text-xs text-center mb-3 font-semibold">Usuario o contraseña incorrectos.</p>}
                    <button type="submit" className="w-full bg-[#0044B2] hover:bg-blue-800 text-white font-semibold py-3 rounded transition-colors duration-200 shadow-md cursor-pointer">
                        Ingresar
                    </button>
                </form>

                <div className="mt-8 text-center text-[13px] text-gray-500">
                    ¿Quieres consultar un comprobante?<br />
                    <button onClick={() => setIsModalOpen(true)} className="text-[#00A1FF] font-bold hover:underline transition-all cursor-pointer">Consultar</button>
                </div>
            </div>

            {/* BOTÓN FLOTANTE CONTACTO */}
            <div className="absolute bottom-8 right-8">
                <DropdownMenu open={isContactOpen} onOpenChange={setIsContactOpen}>
                    <DropdownMenuTrigger asChild>
                        <button className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm outline-none border cursor-pointer ${
                            isContactOpen 
                            ? "bg-[#1AB394] border-[#1AB394] text-white" 
                            : "bg-white border-[#0044B2] text-[#0044B2] hover:bg-[#0044B2] hover:text-white"
                        }`}>
                            Contáctanos
                            <i className={`bi ${isContactOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'} text-[10px]`}></i>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" align="end" sideOffset={10} className="w-40 rounded-xl shadow-2xl border-gray-100 overflow-hidden mb-2 p-0">
                        <DropdownMenuItem className="justify-center py-3 text-[12px] border-b border-gray-100 rounded-none cursor-pointer focus:bg-gray-50 font-medium">+51 922 546 853</DropdownMenuItem>
                        <DropdownMenuItem className="justify-center py-3 text-[12px] border-b border-gray-100 rounded-none cursor-pointer focus:bg-gray-50 font-medium">info@codecta.pe</DropdownMenuItem>
                        <DropdownMenuItem className="justify-center py-3 text-[12px] border-b border-gray-100 rounded-none cursor-pointer focus:bg-gray-50 font-medium">+51 922 546 863</DropdownMenuItem>
                        <DropdownMenuItem className="justify-center py-3 text-[12px] rounded-none cursor-pointer focus:bg-gray-50 font-medium">Nuestras oficinas</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* MODAL DE CONSULTA DE COMPROBANTES CON ANIMACIÓN */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
                        
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                            <i className="bi bi-x-lg"></i>
                        </button>
                        <h2 className="text-lg font-bold text-gray-700 mb-6">Consulta de Comprobante</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600">Comprobante:</label>
                                {/* AQUÍ ESTÁN LAS NUEVAS OPCIONES DE COMPROBANTES */}
                                <Select>
                                    <SelectTrigger className="w-full h-10">
                                        <SelectValue placeholder="Selecciona un comprobante" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="boleta">Boleta</SelectItem>
                                        <SelectItem value="factura">Factura</SelectItem>
                                        <SelectItem value="nota-debito">Nota Débito</SelectItem>
                                        <SelectItem value="nota-credito">Nota Crédito</SelectItem>
                                        <SelectItem value="guia-remision">Guía de Remisión Remitente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600">Emisión:</label>
                                <Input type="date" className="h-10 w-full" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600">DNI-RUC Receptor:</label>
                                <Input placeholder="Ingrese DNI o RUC" className="h-10 w-full" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600">Monto total:</label>
                                <Input placeholder="Monto total solo numerico" className="h-10 w-full" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600">Serie:</label>
                                <Input placeholder="Ingrese Serie" className="h-10 w-full" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600">Correlativo:</label>
                                <Input placeholder="Ingrese Correlativo" className="h-10 w-full" />
                            </div>
                        </div>

                        <Button className="w-full md:w-auto bg-[#1a5eb3] hover:bg-blue-800 text-white px-10 transition-colors duration-200 cursor-pointer">
                            Consultar
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}