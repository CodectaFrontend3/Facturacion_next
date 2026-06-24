"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Pencil, Reply, X, File as FileIcon } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;
import "react-quill-new/dist/quill.snow.css";

interface ComposeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Función para enviar
  onSend: (data: { para: string; cc: string; asunto: string; cuerpo: string; adjuntos?: File[] }) => void;
  // Nueva función para guardar borrador
  onSaveDraft: (data: { para: string; cc: string; asunto: string; cuerpo: string; adjuntos?: File[] }) => void;
  // Datos iniciales para cuando se reanuda un borrador
  initialData?: { para: string; cc: string; asunto: string; cuerpo: string } | null;
}

export default function ComposeEmailModal({ isOpen, onClose, onSend, onSaveDraft, initialData }: ComposeEmailModalProps) {
  const [formData, setFormData] = useState({
    para: "",
    cc: "",
    asunto: "",
    cuerpo: ""
  });

  const [adjuntos, setAdjuntos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efecto para cargar los datos del borrador cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({ para: "", cc: "", asunto: "", cuerpo: "" });
      }
      setAdjuntos([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const quillModules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }], 
      ['bold', 'italic', 'underline', 'strike'], 
      [{ 'color': [] }, { 'background': [] }], 
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
      [{ 'align': [] }], 
      ['link', 'image'], 
      ['clean'] 
    ],
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nuevosArchivos = Array.from(e.target.files);
      setAdjuntos((prev) => [...prev, ...nuevosArchivos]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAdjunto = (index: number) => {
    setAdjuntos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCerrar = () => {
    setFormData({ para: "", cc: "", asunto: "", cuerpo: "" });
    setAdjuntos([]);
    onClose();
  };

  const handleEnviar = () => {
    if (!formData.para.trim() || !formData.asunto.trim()) {
      alert("Por favor, completa los campos 'Para' y 'Asunto'.");
      return;
    }
    onSend({ ...formData, adjuntos }); 
  };

  // Función exclusiva para guardar el borrador
  const handleGuardarBorrador = () => {
    onSaveDraft({ ...formData, adjuntos });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleCerrar}
    >
      <div 
        className="bg-white rounded-sm shadow-2xl w-full max-w-[700px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-4 flex flex-col flex-grow">
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-3">
            <div>
              <label className="block text-[12px] text-gray-600 mb-1">De:</label>
              <input 
                type="text" 
                defaultValue="danielroman@codecta.pe" 
                disabled
                className="w-full bg-[#eaebed] text-gray-600 border border-gray-200 rounded-sm px-3 py-1.5 text-[13px] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] text-gray-600 mb-1">Para:</label>
              <input 
                type="text" 
                value={formData.para}
                onChange={(e) => setFormData({...formData, para: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#1e61b0] transition-colors"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[12px] text-gray-600 mb-1">CC:</label>
              <input 
                type="text" 
                value={formData.cc}
                onChange={(e) => setFormData({...formData, cc: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#1e61b0] transition-colors"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[12px] text-gray-600 mb-1">Asunto:</label>
              <input 
                type="text" 
                value={formData.asunto}
                onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#1e61b0] transition-colors"
              />
            </div>
          </div>

          <div className="mb-15 pb-2"> 
            <ReactQuill 
              theme="snow"
              value={formData.cuerpo}
              onChange={(content: string) => setFormData({...formData, cuerpo: content})}
              modules={quillModules}
              className="h-[180px]" 
            />
          </div>

          <div className="mb-4">
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className="border border-gray-300 text-gray-600 bg-white hover:bg-gray-50 px-4 py-1.5 rounded-sm text-[12px] font-medium cursor-pointer transition-colors"
            >
              Seleccionar Archivos
            </button>

            {adjuntos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {adjuntos.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-sm px-2 py-1">
                    <FileIcon className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[11px] text-gray-700 truncate max-w-[150px]">{file.name}</span>
                    <button 
                      type="button" 
                      onClick={() => removeAdjunto(idx)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            {/* AQUÍ CONECTAMOS EL BOTÓN BORRADOR */}
            <button 
              type="button" 
              onClick={handleGuardarBorrador}
              className="flex items-center gap-1.5 bg-[#f8ac59] hover:bg-orange-500 text-white px-4 py-2 rounded-sm text-[12px] font-bold transition-colors cursor-pointer shadow-sm"
            >
              <Pencil className="w-3.5 h-3.5" />
              Borrador
            </button>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={handleEnviar}
                className="flex items-center gap-1.5 bg-[#1a5eb3] hover:bg-blue-800 text-white px-4 py-2 rounded-sm text-[12px] font-bold transition-colors cursor-pointer shadow-sm"
              >
                <Reply className="w-3.5 h-3.5 scale-x-[-1]" /> 
                Enviar
              </button>
              <button 
                type="button"
                onClick={handleCerrar} 
                className="bg-[#6c757d] hover:bg-gray-600 text-white px-4 py-2 rounded-sm text-[12px] font-bold transition-colors cursor-pointer shadow-sm"
              >
                Limpiar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}