<<<<<<< HEAD
export default function Page() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h2 className="text-xl font-semibold text-black">Configuración Email</h2>
    </main>
=======
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConfiguracionEmailPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full font-sans items-start">
      
      {/* ================= BARRA LATERAL IZQUIERDA (FOLDERS) ================= */}
      <div className="w-full md:w-[260px] shrink-0 bg-white border border-gray-200 shadow-sm p-4">
        <Button className="w-full bg-[#1a5eb3] hover:bg-blue-800 text-white font-semibold mb-6 h-9 rounded-sm cursor-pointer transition-colors">
          Redactar
        </Button>

        <h3 className="text-xs font-bold text-gray-500 mb-2 px-1">FOLDERS</h3>

        <ul className="space-y-0.5">
          <li>
            <Link href="/email" className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 text-[13px] text-gray-600 border-l-2 border-transparent transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-inbox text-gray-500 text-base"></i>
                Enviados
              </div>
              <span className="bg-[#1AB394] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">2</span>
            </Link>
          </li>
          
          <li>
            <Link href="#" className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 text-[13px] text-gray-600 border-l-2 border-transparent transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-envelope text-gray-500 text-base"></i>
                Borradores
              </div>
              <span className="bg-[#f8ac59] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">0</span>
            </Link>
          </li>

          <li className="border-b border-gray-100 pb-1 mb-1">
            <Link href="/configuracion_email" className="flex items-center justify-between px-2 py-2 bg-gray-50 text-[13px] text-gray-800 font-bold border-l-2 border-[#1a5eb3] transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-gear-fill text-gray-500 text-base"></i>
                Configuracion
              </div>
            </Link>
          </li>

          <li>
            <Link href="/trash" className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 text-[13px] text-gray-600 border-l-2 border-transparent mt-1 transition-colors">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-trash text-gray-500 text-base"></i>
                Papelera
              </div>
              <span className="bg-[#ed5565] text-white text-[10px] font-bold px-1.5 py-[1px] rounded-sm">1</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* ================= PANEL PRINCIPAL DERECHO (FORMULARIO) ================= */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm p-8 w-full flex flex-col">
        
        {/* Título Principal */}
        <h2 className="text-[22px] font-bold text-gray-500 text-center mb-4">Actualizar Correo</h2>
        <hr className="border-gray-100 mb-8 w-full" />

        {/* Formulario (Grid para alinear labels e inputs) */}
        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-y-5 items-center w-full">

          {/* Fila 1: Email */}
          <label className="text-[13px] text-gray-600">Email:</label>
          <Input 
            defaultValue="danielroman@codecta.pe" 
            className="h-9 rounded-sm border-gray-200 text-[13px] text-gray-600 shadow-none focus-visible:ring-0 focus-visible:border-gray-300" 
          />

          {/* Fila 2: Contraseña */}
          <label className="text-[13px] text-gray-600">Contraseña:</label>
          <div className="relative w-full">
            <Input 
              type={showPassword ? "text" : "password"} 
              defaultValue="................." 
              className="h-9 rounded-sm border-gray-200 text-[13px] text-gray-600 shadow-none focus-visible:ring-0 focus-visible:border-gray-300 pr-10" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
            </button>
          </div>

          {/* Fila 3: SMPT y PORT */}
          <label className="text-[13px] text-gray-600">SMPT:</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <Input 
              defaultValue="mail.codecta.pe" 
              className="h-9 rounded-sm border-gray-200 text-[13px] text-gray-600 shadow-none focus-visible:ring-0 focus-visible:border-gray-300 w-full sm:w-1/2" 
            />
            <div className="flex items-center gap-4 w-full sm:w-1/2 pl-0 sm:pl-4">
              <label className="text-[13px] text-gray-600 uppercase">PORT:</label>
              <Input 
                defaultValue="25" 
                className="h-9 rounded-sm border-gray-200 text-[13px] text-gray-600 shadow-none focus-visible:ring-0 focus-visible:border-gray-300 w-full" 
              />
            </div>
          </div>

          {/* Fila 4: Encryption */}
          <label className="text-[13px] text-gray-600">Encryption:</label>
          <div className="w-full sm:w-[calc(50%-1rem)]">
            <Select defaultValue="tls">
              <SelectTrigger className="h-9 rounded-sm border-gray-200 text-[13px] text-gray-600 shadow-none focus:ring-0 focus:border-gray-300 w-full">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tls">TLS</SelectItem>
                <SelectItem value="ssl">SSL</SelectItem>
                <SelectItem value="none">Ninguno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fila 5: CC */}
          <div className="flex items-center gap-1.5">
            <label className="text-[13px] text-gray-600">CC:</label>
            <i className="bi bi-info-circle-fill text-gray-500 text-[12px]"></i>
          </div>
          <div className="w-full sm:w-[calc(50%-1rem)]">
            <Input className="h-9 rounded-sm border-gray-200 text-[13px] text-gray-600 shadow-none focus-visible:ring-0 focus-visible:border-gray-300 w-full" />
          </div>
        </div>

        {/* Sección de Firma de Correo (Fuera de la cuadrícula superior) */}
        <div className="mt-8 flex flex-col">
          <label className="text-[13px] text-gray-600 mb-2">Firma Correo:</label>
          <div className="flex items-center">
            {/* Medida de Alto (Eje Y) */}
            <div className="text-[12px] text-gray-500 mr-2">150px</div>
            
            <div className="flex flex-col">
              {/* Contenedor de la Imagen */}
              <div className="w-[300px] h-[150px] border border-gray-300 flex items-start p-2 relative bg-white">
                <i className="bi bi-image text-gray-400 text-lg"></i>
              </div>
              
              {/* Medida de Ancho (Eje X) */}
              <div className="flex items-center mt-1 w-[300px]">
                <div className="h-px bg-gray-400 flex-1"></div>
                <span className="text-[12px] text-gray-500 px-2 leading-none">300px</span>
                <div className="h-px bg-gray-400 flex-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="mt-8">
          <Button className="bg-[#1a5eb3] hover:bg-blue-800 text-white h-9 px-6 rounded-sm text-[13px] font-medium cursor-pointer">
            Grabar
          </Button>
        </div>
        
      </div>
    </div>
>>>>>>> origin/rodrigo
  );
}
